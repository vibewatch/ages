import { afterEach, describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { readLink } from '../../src/client/lib/link.ts';
import { load, save } from '../../src/client/lib/storage.ts';
import { articleUrl, parseExtract } from '../../src/client/lib/wikipedia.ts';
import { bakeStaticMeshes } from '../../src/client/models/pp-kit.ts';
import { packModel, unpackModel } from '../../src/client/models/pack.ts';
import { animate, rig } from '../../src/client/scene/animate.ts';
import { deploy, shape } from '../../src/client/scene/formation.ts';
import { Geo } from '../../src/client/scene/geo.ts';
import { declutter, type LayoutItem } from '../../src/client/scene/layout.ts';
import { growthField } from '../../src/client/scene/morph.ts';
import { buildTerrain } from '../../src/client/scene/terrain.ts';
import { STAGES } from '../../src/shared/data/stage.ts';

describe('shared map layout', () => {
  const item = (owner: string, x: number, prio = 10): LayoutItem => ({
    owner, prio, bounds: { left: x, right: x + 30, top: 0, bottom: 30 },
  });

  it('protects model footprints from unrelated text but keeps an attached name and keyboard target', () => {
    const model = item('site', 0);
    const otherText = item('city', 10, 80);
    const name = { ...item('site', 5), model };
    const hit = { ...item('site', 0), model, passive: true };
    declutter([model], [otherText, name, hit]);
    expect([model.shown, otherText.shown, name.shown, hit.shown]).toEqual([true, false, true, true]);
  });

  it('removes a crowded lower-priority model and its attached labels, not just its name', () => {
    const main = item('capital', 0, 90), detail = item('food', 20);
    const name = { ...item('food', 60), model: detail };
    declutter([detail, main], [name]);
    expect([main.shown, detail.shown, name.shown]).toEqual([true, false, false]);
    detail.bounds.left = 40; detail.bounds.right = 70;
    declutter([detail, main], [name]);
    expect([detail.shown, name.shown]).toEqual([true, true]);
  });

  it('keeps selected models or compact markers ahead of higher-ranked content', () => {
    const main = item('capital', 0, 90), selected = { ...item('food', 20), pinned: true };
    declutter([main, selected], []);
    expect([main.shown, selected.shown]).toEqual([false, true]);
    const badge = { ...item('event', 0), pinned: true };
    declutter([main], [badge]);
    expect([main.shown, badge.shown]).toEqual([false, true]);
  });

  it('keeps the main territory readable unless the selected object needs that space', () => {
    const model = item('person', 0, 64), territory = { ...item('polity', 10, 40), primary: true };
    declutter([model], [territory]);
    expect([model.shown, territory.shown]).toEqual([false, true]);
    model.pinned = true;
    declutter([model], [territory]);
    expect([model.shown, territory.shown]).toEqual([true, false]);
  });
});

describe('wikipedia extract parsing', () => {
  it('splits lead and sections and drops reference-style sections with their subsections', () => {
    const text = [
      'Lead one.', '', 'Lead two.',
      '== History ==', 'Para A.',
      '=== Early ===', 'Para B.',
      '== Empty ==',
      '== References ==', 'Ref 1.',
      '=== Notes ===', 'Ref 2.',
      '== 参考文献 ==', '文献。',
      '== Legacy ==', 'Para C.',
    ].join('\n');
    const { lead, sections } = parseExtract(text);
    expect(lead).toEqual(['Lead one.', 'Lead two.']);
    expect(sections.map(s => [s.title, s.level, s.paras])).toEqual([
      ['History', 2, ['Para A.']],
      ['Early', 3, ['Para B.']],
      ['Legacy', 2, ['Para C.']],
    ]);
  });

  it('keeps a heading whose only content is in its subsections', () => {
    const { sections } = parseExtract('== Parent ==\n=== Child ===\nText.');
    expect(sections.map(s => s.title)).toEqual(['Parent', 'Child']);
  });

  it('builds article URLs with the simplified-Chinese variant', () => {
    expect(articleUrl('zh', '郑和下西洋')).toBe('https://zh.wikipedia.org/wiki/%E9%83%91%E5%92%8C%E4%B8%8B%E8%A5%BF%E6%B4%8B?variant=zh-cn');
    expect(articleUrl('en', 'Ming treasure voyages')).toBe('https://en.wikipedia.org/wiki/Ming_treasure_voyages');
  });
});

describe('deep links', () => {
  it('reads event, year and language and ignores invalid values', () => {
    expect(readLink('#e=zhenghe&lang=zh')).toEqual({ event: 'zhenghe', lang: 'zh' });
    expect(readLink('#y=-221&lang=en')).toEqual({ year: -221, lang: 'en' });
    expect(readLink('#y=12abc&lang=fr')).toEqual({});
    expect(readLink('')).toEqual({});
  });

  it('reads places, people and journeys, from the hash or the query string', () => {
    expect(readLink('#p=kaifeng&y=1100', '')).toEqual({ place: 'kaifeng', year: 1100 });
    expect(readLink('#person=sushi', '')).toEqual({ person: 'sushi' });
    expect(readLink('', '?j=xuanzang&lang=en')).toEqual({ journey: 'xuanzang', lang: 'en' });
    expect(readLink('#e=chibi', '?year=208')).toEqual({ event: 'chibi', year: 208 });
  });

  it('lets a hash subject or year replace a different legacy query subject', () => {
    expect(readLink('#p=kaifeng&y=1100&lang=en', '?event=qin_unify&lang=zh')).toEqual({
      place: 'kaifeng', year: 1100, lang: 'en',
    });
    expect(readLink('#person=sushi', '?place=kaifeng&year=1100')).toEqual({ person: 'sushi', year: 1100 });
    expect(readLink('#y=1405', '?event=qin_unify')).toEqual({ year: 1405 });
    expect(readLink('#lang=en', '?event=qin_unify')).toEqual({ event: 'qin_unify', lang: 'en' });
  });

  it('ignores years outside the safe integer range', () => {
    expect(readLink(`#y=${'9'.repeat(400)}`, '')).toEqual({});
    expect(readLink('#y=9007199254740992', '')).toEqual({});
  });
});

describe('storage fallback', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reads in-memory values when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('storage blocked'); },
      setItem: () => { throw new Error('storage blocked'); },
    });
    save('blocked-storage-test', { count: 2 });
    expect(load('blocked-storage-test', { count: 0 })).toEqual({ count: 2 });
  });

  it('prefers an unsaved value when a full store still contains an older value', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => JSON.stringify('old'),
      setItem: () => { throw new Error('quota exceeded'); },
    });
    save('quota-storage-test', 'new');
    expect(load('quota-storage-test', 'default')).toBe('new');
  });

  it('reads changes from storage after a successful write', () => {
    const data = new Map<string, string>();
    let readable = true;
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => {
        if (!readable) throw new Error('storage blocked');
        return data.get(key) ?? null;
      },
      setItem: (key: string, value: string) => data.set(key, value),
    });
    save('shared-storage-test', 'first');
    data.set('ages:shared-storage-test', JSON.stringify('from another tab'));
    expect(load('shared-storage-test', '')).toBe('from another tab');
    readable = false;
    expect(load('shared-storage-test', '')).toBe('from another tab');
    readable = true;
    data.delete('ages:shared-storage-test');
    expect(load('shared-storage-test', 'default')).toBe('default');
    readable = false;
    expect(load('shared-storage-test', 'default')).toBe('default');
  });
});

describe('battle formations', () => {
  const count = (sl: { t: string }[], t: string) => sl.filter(o => o.t === t).length;

  it('shapes a wedge point-first with ranks two wider and keeps the front rank at z = 0', () => {
    const sl = shape('wedge', 9);
    expect(sl).toHaveLength(9);
    expect(Math.min(...sl.map(o => o.z))).toBe(0);
    expect(sl.filter(o => o.z === 0)).toHaveLength(1);
    expect(new Set(sl.map(o => o.z)).size).toBe(3);
  });

  it('faces a circle outward', () => {
    const sl = shape('circle', 12);
    expect(sl[0].face).toBe(0);
    expect(sl[6].face).toBeCloseTo(Math.PI);
  });

  it('equips troops for the period', () => {
    // Zhou: chariots lead the infantry
    const zhou = deploy('line', 'mixed', 30, -1046);
    expect(count(zhou, 'chariot')).toBeGreaterThan(0);
    expect(count(zhou, 'horse')).toBe(0);
    // Tang combined arms: cavalry on the wings, archers in the rear ranks
    const tang = deploy('wings', 'mixed', 30, 750);
    expect(count(tang, 'horse')).toBe(9);
    expect(count(tang, 'archer')).toBe(6);
    const wing = Math.max(...tang.map(o => Math.abs(o.x)));
    expect(tang.find(o => Math.abs(o.x) === wing)!.t).toBe('horse');
    // after 1840 rifles replace spears and bows
    const late = deploy('line', 'foot', 20, 1911);
    expect(count(late, 'gun')).toBe(20);
  });
});

describe('border morph', () => {
  it('grows a conquering polity outward from its old border', () => {
    // 8×1 strip: red holds x < 2 and takes everything up to x < 6 from blue
    const w = 8, px = (red: number) => Array.from({ length: w }, (_, x) => (x < red ? [200, 0, 0, 255] : [0, 0, 200, 255])).flat();
    const f = growthField(new Uint8ClampedArray(px(2)), new Uint8ClampedArray(px(6)), w, 1);
    expect([f[0], f[1], f[6], f[7]]).toEqual([0, 0, 0, 0]);
    expect(f[2]).toBeLessThan(f[3]);
    expect(f[4]).toBeLessThan(f[5]);
    expect(f[5]).toBe(1);
  });
});

describe('3D scene-graph baking and static matrix freezing', () => {
  it('merges nested static emissive meshes, marks tiny detail meshes for LOD hide, prunes empty groups, and freezes child matrices', () => {
    const root = new THREE.Group();
    const inner = new THREE.Group();
    inner.scale.setScalar(1.4);
    root.add(inner);

    const baseMat = new THREE.MeshStandardMaterial({ color: '#886644' });
    const glowMat = new THREE.MeshStandardMaterial({ color: '#ffaa22', emissive: '#ff8800', emissiveIntensity: 0.6 });
    const tinyMat = new THREE.MeshStandardMaterial({ color: '#22aaff', transparent: true, opacity: 0.5 });

    const sub = new THREE.Group();
    inner.add(sub);
    sub.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), baseMat));
    sub.add(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), glowMat));
    const glow2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), glowMat);
    glow2.position.set(0.5, 0, 0);
    sub.add(glow2);
    const tiny = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), tinyMat);
    inner.add(tiny);

    bakeStaticMeshes(root);

    // Empty sub-group was pruned after its static and emissive meshes were merged into root
    expect(inner.children).not.toContain(sub);
    // Tiny unmerged transparent detail mesh is tagged for far-LOD hiding
    expect(tiny.userData.lodHide).toBe(true);
    // The two nested glowMat meshes were merged into a single mesh
    let glowCount = 0;
    root.traverse(o => {
      if ((o as THREE.Mesh).isMesh && (o as THREE.Mesh).material === glowMat) glowCount++;
      if (o !== root) expect(o.matrixAutoUpdate).toBe(false);
    });
    expect(glowCount).toBe(1);

    const unpacked = unpackModel(packModel(root).model);
    unpacked.traverse(o => {
      if (o !== unpacked) expect(o.matrixAutoUpdate).toBe(false);
    });
  });

  it('updates local matrices on animated rig parts when matrixAutoUpdate is false', () => {
    const root = new THREE.Group();
    const spin = new THREE.Group();
    spin.name = 'spin';
    spin.matrixAutoUpdate = false;
    root.add(spin);

    const rigs = rig(root);
    expect(rigs).toHaveLength(1);
    spin.matrixWorldNeedsUpdate = false;
    animate(rigs, 1.5, 0);
    expect(spin.rotation.x).toBeCloseTo(1.5 * 2);
    expect(spin.matrixWorldNeedsUpdate).toBe(true);
  });

  it('chunks terrain into a 6x4 spatial grid with frozen matrices and seamless tile boundaries', () => {
    const geo = new Geo(STAGES.china);
    const w = 16, h = 12;
    const rgba = new Uint8Array(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      rgba[i * 4] = 45;
      rgba[i * 4 + 1] = (i * 17) & 255;
      rgba[i * 4 + 2] = i % 5 === 0 ? 255 : 0;
      rgba[i * 4 + 3] = 255;
    }
    geo.setHeightmap(rgba, w, h);
    const terrain = buildTerrain(geo, true);
    expect(terrain.mesh.matrixAutoUpdate).toBe(false);
    expect(terrain.mesh.children).toHaveLength(24);
    for (const tile of terrain.mesh.children) {
      expect(tile.matrixAutoUpdate).toBe(false);
      expect((tile as THREE.Mesh).geometry.boundingSphere).not.toBeNull();
    }
    // Check that the right edge of tile (0,0) matches the left edge of tile (1,0) exactly
    const t0 = (terrain.mesh.children[0] as THREE.Mesh).geometry.getAttribute('position') as THREE.BufferAttribute;
    const t1 = (terrain.mesh.children[1] as THREE.Mesh).geometry.getAttribute('position') as THREE.BufferAttribute;
    const sx = 320, x1 = Math.round(sx / 6);
    expect(t0.getX(x1)).toBe(t1.getX(0));
    expect(t0.getY(x1)).toBe(t1.getY(0));
    expect(t0.getZ(x1)).toBe(t1.getZ(0));
  });
});

