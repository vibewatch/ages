import { expect, test, type Page } from '@playwright/test';
import { markPoints, mockWikipedia, openApp, setMapPose, shot, state, watchErrors } from './helpers.ts';

/** The language switch is a standalone toggle button in the top-right toolbar. */
async function switchLang(page: Page): Promise<void> {
  await page.locator('.b-lang').click();
}

test.describe('Ages atlas', () => {
  test('localizes the initial loading screen before app scripts load', async ({ browser }) => {
    const cases = [
      { url: '/?lang=en#y=-221', saved: '"zh"', locale: 'zh-CN', expected: 'AGES' },
      { url: '/?lang=zh#lang=en', saved: '"zh"', locale: 'zh-CN', expected: 'AGES' },
      { url: '/?lang=en#lang=invalid', saved: '"zh"', locale: 'zh-CN', expected: 'AGES' },
      { url: '/', saved: '"en"', locale: 'zh-CN', expected: 'AGES' },
      { url: '/', saved: 'blocked', locale: 'en-US', expected: 'AGES' },
      { url: '/?lang=en#lang=zh', saved: '"en"', locale: 'en-US', expected: '长河' },
    ];
    for (const c of cases) {
      const ctx = await browser.newContext({ locale: c.locale, serviceWorkers: 'block' });
      try {
        const page = await ctx.newPage();
        await page.addInitScript(saved => {
          if (saved === 'blocked') Object.defineProperty(window, 'localStorage', { get() { throw new Error('storage blocked'); } });
          else localStorage.setItem('ages:lang', saved);
        }, c.saved);
        await page.route('**/*', route => route.request().resourceType() === 'script' ? route.abort() : route.continue());
        await page.goto(c.url);
        expect.soft(await page.locator('.boot-mark-title').textContent(), JSON.stringify(c)).toBe(c.expected);
        if (c.expected === 'AGES') expect.soft(await page.locator('#boot').textContent()).not.toMatch(/[\u4e00-\u9fff]/);
      } finally { await ctx.close(); }
    }
  });

  test('keeps quizzes and card navigation separate from timeline playback', async ({ page }) => {
    await openApp(page, 'y=700&lang=en');
    await page.locator('.tl-play').click();
    await page.locator('.b-hub').click();
    await page.locator('.b-quiz').click();
    expect.soft(await page.evaluate(() => (window as any).__atlas.timeline.playing)).toBe(false);
    await page.locator('.qz-mode[data-mode=locate]').click();
    await page.locator('.quiz [data-act=start]').click();
    await expect(page.locator('#stage')).toHaveClass(/picking/);
    await page.locator('.search .q').fill('Kaifeng');
    await page.locator('.hits li').filter({ hasText: 'Kaifeng' }).first().click();
    await expect(page.locator('.card h2')).toBeVisible();
    expect.soft(await page.locator('.quiz').evaluate(el => (el as HTMLElement).hidden)).toBe(true);
    expect.soft(await page.locator('#stage').getAttribute('class')).not.toContain('picking');
    expect.soft(await page.evaluate(() => (window as any).__atlas.timeline.playing)).toBe(false);

    await page.locator('.tl-play').click();
    await page.locator('.search .q').fill('Zheng He');
    await page.locator('.hits li').filter({ hasText: 'Zheng He' }).first().click();
    await expect.poll(() => page.evaluate(() => {
      const app = (window as any).__atlas;
      return { year: app.timeline.year, mapYear: app.atlas.year, playing: app.timeline.playing };
    })).toEqual({ year: 1405, mapYear: 1405, playing: false });
  });

  test('keeps the toolbar clear of the headline on narrow phones @mobile', async ({ page }) => {
    await openApp(page, 'y=700&lang=en');
    for (const width of [320, 360, 393]) {
      await page.setViewportSize({ width, height: 800 });
      const bounds = await page.evaluate(() => {
        const box = (s: string) => {
          const r = document.querySelector(s)!.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        };
        return { tools: box('.tools'), brand: box('.brand'), head: box('.tl-head') };
      });
      expect.soft(bounds.tools.left, `toolbar inside ${width}px screen`).toBeGreaterThanOrEqual(0);
      expect.soft(bounds.tools.right).toBeLessThanOrEqual(width);
      expect.soft(bounds.brand.right, `brand clear at ${width}px`).toBeLessThanOrEqual(bounds.tools.left);
      expect.soft(bounds.head.top, `headline below controls at ${width}px`).toBeGreaterThanOrEqual(bounds.tools.bottom);
    }
    await page.locator('.b-lang').tap();
    await expect(page.locator('.b-lang')).toHaveText('EN');
  });

  test('boots into the map and switches between English and Chinese', async ({ page }) => {
    const errs = watchErrors(page);
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        (window as any).__bootText = document.getElementById('boot')?.textContent ?? '';
      });
    });
    await openApp(page, 'y=-221&lang=en');
    const bootText = await page.evaluate(() => (window as any).__bootText as string);
    expect(bootText).toContain('AGES');
    expect(bootText).not.toMatch(/[\u4e00-\u9fff]/);
    let s = await state(page);
    expect(s).toMatchObject({ ready: true, year: -221, lang: 'en', snapshot: expect.stringMatching(/qin/) });
    await expect(page.locator('.tl-year')).toHaveText('221 BCE');
    await expect(page.locator('.brand b')).toHaveText('Ages');
    await expect(page.locator('.tools .b-lang')).toHaveText('中');
    await expect(page.locator('.settings .langs')).toHaveCount(0);
    await expect(page.locator('.labels .polity', { hasText: /^Qin$/ }).first()).toBeVisible();
    await shot(page, 'desktop-home-en');

    await switchLang(page);
    await expect(page.locator('html')).toHaveAttribute('lang', /^zh/);
    await expect(page.locator('.tl-year')).toHaveText('前221年');
    await expect(page.locator('.search .q')).toHaveAttribute('placeholder', /搜索/);
    await expect(page.locator('.tl-band', { hasText: '唐' })).toBeVisible();
    await expect(page.locator('.labels .polity', { hasText: /^秦$/ }).first()).toBeVisible();
    expect(page.url()).toContain('lang=zh');
    s = await state(page);
    expect(s.lang).toBe('zh');
    await shot(page, 'desktop-home-zh');

    // controls show the app's own tooltip, never the browser's: titles are lifted into data-tip, and it follows the language
    const details = page.locator('.b-details');
    await details.hover();
    await expect(page.locator('.uitip')).toHaveText('时期详情');
    await expect(details).not.toHaveAttribute('title', /.*/);
    await expect(page.locator('[title]')).toHaveCount(0);
    await page.mouse.move(400, 400);
    await expect(page.locator('.uitip')).toBeHidden();

    // the timeline's transport buttons share one row with the track
    const ctl = (await page.locator('.tl-ctl').boundingBox())!;
    const track = (await page.locator('.tl-track').boundingBox())!;
    expect(ctl.x + ctl.width).toBeLessThanOrEqual(track.x);
    expect(ctl.y).toBeGreaterThanOrEqual(track.y);
    expect(ctl.y + ctl.height).toBeLessThanOrEqual(track.y + track.height);

    // 时期详情, the study hall and settings are popovers, one at a time
    await details.click();
    await expect(page.locator('.pv')).toBeVisible();
    await page.locator('.b-hub').click();
    await expect(page.locator('.hub')).toBeVisible();
    await expect(page.locator('.pv')).toBeHidden();
    await expect(details).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Escape');
    await expect(page.locator('.hub')).toBeHidden();

    // the choice persists across reloads
    await page.goto('/?lowfx=1');
    await expect.poll(() => page.evaluate(() => (window as any).__atlas?.ready)).toBe(true);
    expect((await state(page)).lang).toBe('zh');
    expect(errs).toEqual([]);
  });

  test('search opens an event card with key points, people and textbook units', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=1000&lang=en');
    await page.keyboard.press('/');
    await expect(page.locator('.search .q')).toBeFocused();
    await page.keyboard.type('Zheng He');
    const hit = page.locator('.hits li', { hasText: 'Zheng He' }).first();
    await expect(hit).toBeVisible();
    await hit.click();
    const card = page.locator('.card');
    await expect(card).toBeVisible();
    await expect(card.locator('h2')).toContainText('Zheng He');
    await expect(card).toContainText('Key points');
    await expect(card).toContainText('Grade');
    await expect.poll(async () => (await state(page)).event).toBe('zhenghe');
    const s = await state(page);
    expect(s.year).toBe(1405);
    expect(s.snapshot).toMatch(/ming/);
    expect(s.fx.event).toBeGreaterThan(0);
    expect(page.url()).toContain('e=zhenghe');

    // next / previous event, then close with Escape
    await page.keyboard.press('ArrowRight');
    await expect.poll(async () => (await state(page)).event).not.toBe('zhenghe');
    await page.keyboard.press('ArrowLeft');
    await expect.poll(async () => (await state(page)).event).toBe('zhenghe');
    await shot(page, 'desktop-event-card');
    await page.keyboard.press('Escape');
    await expect(card).toBeHidden();
    expect(errs).toEqual([]);
  });

  test('preserves place deep links across language changes and conflicting legacy query parameters', async ({ page }) => {
    await openApp(page, 'p=kaifeng&y=1100&lang=en', 'lowfx=1&event=qin_unify');
    await expect(page.locator('.card h2')).toHaveText('Bianjing');
    expect((await state(page)).year).toBe(1100);

    await switchLang(page);
    await expect(page).toHaveURL(/#p=kaifeng&y=1100&lang=zh$/);
    await page.evaluate(() => { location.hash = '#p=kaifeng&y=1200&lang=zh'; });
    await expect.poll(async () => (await state(page)).year).toBe(1200);
    await expect(page.locator('.card h2')).toHaveText('汴梁');
    await page.reload();
    await expect.poll(() => page.evaluate(() => !!(window as any).__atlas?.ready), { timeout: 120_000 }).toBe(true);
    await expect(page.locator('.card h2')).toHaveText('汴梁');
    expect((await state(page)).year).toBe(1200);
  });

  test('builds models on the main thread when workers are blocked', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('ages:quality', '"high"');
      Object.defineProperty(window, 'Worker', {
        configurable: true,
        value: class { constructor() { throw new Error('workers blocked'); } },
      });
    });
    await openApp(page, 'e=qin_unify&lang=en', '');
    await expect(page.locator('.nogl')).toHaveCount(0);
    await expect(page.locator('.card h2')).toBeVisible();
    await expect.poll(async () => (await state(page)).fx.event, { timeout: 90_000 }).toBeGreaterThan(0);
  });

  test('keeps the base terrain usable when posting to its detail worker fails', async ({ page }) => {
    const errs = watchErrors(page);
    await page.addInitScript(() => {
      localStorage.setItem('ages:quality', '"high"');
      sessionStorage.setItem('detail-posted', 'no');
      sessionStorage.setItem('detail-terminated', 'no');
      window.Worker = new Proxy(window.Worker, {
        construct(target, args) {
          if (String(args[0]).includes('detail.worker-')) {
            return {
              postMessage() { sessionStorage.setItem('detail-posted', 'yes'); throw new Error('terrain post blocked'); },
              terminate() { sessionStorage.setItem('detail-terminated', 'yes'); },
            };
          }
          return Reflect.construct(target, args);
        },
      });
    });
    await openApp(page, 'y=1405&lang=en', '');
    await setMapPose(page, { lon: 110, lat: 34, dist: 12, tilt: 0.8 });
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('detail-posted'))).toBe('yes');
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('detail-terminated'))).toBe('yes');
    expect(errs).toEqual([]);
  });

  test('plays an animated story with captions, pause and stop', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'e=qin_unify&lang=zh');
    await page.locator('[data-act=play]').click();
    await page.evaluate(() => { (window as any).__atlas.player.speed = 4; });
    await expect(page.locator('.caption')).toBeVisible();
    await expect(page.locator('.card')).toHaveCSS('opacity', '0');
    await expect.poll(async () => (await state(page)).captions, { timeout: 60_000 }).toMatch(/秦|韩/);
    await expect.poll(async () => (await state(page)).fx.story, { timeout: 90_000 }).toBeGreaterThan(0);
    await shot(page, 'desktop-story-qin');
    expect(await page.evaluate(() => {
      const app = (window as any).__atlas;
      return [app.atlas.view.renderer, app.card.preview.renderer].flatMap(r => {
        const gl = r.getContext();
        return r.info.programs.filter((p: any) => !gl.getProgramParameter(p.program, gl.LINK_STATUS))
          .map((p: any) => gl.getProgramInfoLog(p.program));
      });
    })).toEqual([]);

    await page.keyboard.press('Space');
    await expect.poll(async () => (await state(page)).story).toBe('paused');
    await page.keyboard.press('Space');
    await expect.poll(async () => (await state(page)).story).toBe('playing');
    await page.locator('.caption [aria-label="停止"]').click();
    await expect.poll(async () => (await state(page)).story).toBe('idle');
    await expect(page.locator('.caption')).toBeHidden();
    await expect(page.locator('.card')).toHaveCSS('opacity', '1');
    expect((await state(page)).fx.story).toBe(0);
    // the dynasty's landmarks and people stand on the map; a story only orbiting the camera offers no Play button
    expect((await state(page)).fx.scenery).toBeGreaterThan(3);
    // Crowded scenery returns when zooming in, rather than overlapping the selected event or territory name.
    await setMapPose(page, { lon: 111.25, lat: 32.2, dist: 8, tilt: 0.8 });
    await expect.poll(async () => (await markPoints(page)).some(m => m.title === '秦始皇')).toBe(true);
    await page.goto('/?lowfx=1#e=houmuwu&lang=zh');
    await expect(page.locator('.card h2')).toHaveText(/后母戊鼎/);
    await expect(page.locator('.card [data-act=play]')).toHaveCount(0);
    expect(errs).toEqual([]);
  });

  test('only draws and uploads live effects, including after pause, expiry and pool reuse', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=-221&lang=en');
    await page.evaluate(() => {
      const a = (window as any).__atlas.atlas, r = a.view.renderer, gl = r.getContext();
      const pool = new a.fx.particles.pools[0].constructor(4, true);
      const missiles = new a.fx.missiles.constructor();
      const scene = new a.view.scene.constructor();
      scene.add(pool.points, missiles.arrows, missiles.stones);
      const p = a.view.controls.target.clone();
      const check = (ok: boolean, message: string) => { if (!ok) throw new Error(message); };
      const spawn = (life: number) => pool.spawn(p.x, p.y + 1, p.z, 0, 0.1, 0, life, 0.1, [1, 0.6, 0.2], 0);
      let bytes = 0, hits = 0;
      const upload = gl.bufferSubData;
      gl.bufferSubData = function (...args: any[]) {
        bytes += args[2].BYTES_PER_ELEMENT * (args[4] || args[2].length - (args[3] || 0));
        return upload.apply(this, args);
      };
      const draw = () => { bytes = 0; r.render(scene, a.view.camera); };
      const step = (dt: number) => { pool.step(dt, 500); missiles.step(dt); };
      const versions = () => [
        ...Object.values(pool.points.geometry.attributes).map((a: any) => a.version),
        missiles.arrows.instanceMatrix.version, missiles.stones.instanceMatrix.version,
      ].join(',');
      try {
        check(!a.view.scene.matrixAutoUpdate && !a.fx.root.matrixAutoUpdate, 'Scene and fx root must freeze auto matrix updates');
        check(a.terrain.mesh.children.length === 24, 'Terrain must be split into 24 frustum-cullable spatial tiles');
        r.render(a.view.scene, a.view.camera);
        let forced = 0;
        const origMul = a.terrain.mesh.matrixWorld.multiplyMatrices;
        a.terrain.mesh.matrixWorld.multiplyMatrices = function (...args: any[]) {
          forced++;
          return origMul.apply(this, args);
        };
        try {
          r.render(a.view.scene, a.view.camera);
        } finally {
          a.terrain.mesh.matrixWorld.multiplyMatrices = origMul;
        }
        check(forced === 0, 'Static terrain mesh must not recompute matrixWorld on subsequent renders');

        step(0.1); draw();
        check(r.info.render.calls === 0 && bytes === 0, 'Empty pools must not draw or upload');
        spawn(0.2); spawn(2);
        missiles.fire('arrow', p, p.clone().addScalar(1), 1, 0.2, 1, () => hits++);
        missiles.fire('stone', p, p.clone().addScalar(1), 1, 0.6, 1, () => hits++);
        step(0.05); draw(); // Allocate the buffers before checking subrange uploads.
        step(0.05); draw();
        check(r.info.render.points === 2, 'Only the two occupied particle slots should draw');
        check(bytes === 2 * 32 + 2 * 64, `Expected two particles and two matrices, uploaded ${bytes} bytes`);
        const paused = versions();
        pool.step(0, 750); missiles.step(0); draw();
        check(bytes === 0 && versions() === paused, 'Paused effects must reuse GPU buffers');
        check(pool.points.material.uniforms.uPx.value === 750, 'Paused particles must still respond to projection changes');

        step(0.2); draw();
        check(hits === 1 && !missiles.arrows.visible && missiles.stones.visible, 'Expired arrows must hide and hit once');
        check(r.info.render.points === 1 && pool.points.geometry.drawRange.start === 1, 'Expired leading particles must leave the draw range');
        step(0.5); draw();
        check(hits === 2 && !missiles.stones.visible && bytes === 32, 'Only the surviving particle should upload');

        pool.clear(); missiles.clear(); draw();
        check(r.info.render.calls === 0 && bytes === 0, 'Clearing effects must immediately hide them');
        for (let i = 0; i < 6; i++) spawn(i < 4 ? 0.1 : 2);
        step(0.2); draw();
        check(r.info.render.points === 2 && pool.live === 2, 'Wrapping a full pool must preserve the newest particles');
        step(3); draw();
        check(r.info.render.calls === 0, 'An exhausted pool must stop drawing');
        spawn(2); step(0.1); draw();
        check(r.info.render.points === 1 && pool.points.geometry.drawRange.start === 2, 'An exhausted pool must become visible again');

        // Several simulation steps can occur without rendering (for example, while the parent is hidden).
        step(0.1); spawn(2); step(0.1);
        const ranges = pool.points.geometry.getAttribute('position').updateRanges;
        check(ranges.length === 1 && ranges[0].start === 6 && ranges[0].count === 6, 'Pending uploads must retain all changed slots in one range');
        draw();
        check(r.info.render.points === 2 && bytes === 64, 'Both pending particles must upload together');
        step(3); draw();
        const idle = versions();
        step(0.1); draw();
        check(bytes === 0 && versions() === idle && r.info.render.calls === 0, 'Expired pools must stay idle');
        spawn(2);
        missiles.fire('arrow', p, p.clone().addScalar(1), 1, 2, 1);
        step(0); draw();
        check(r.info.render.points === 1 && missiles.arrows.count === 1, 'New effects must initialize even when the clock is paused');
      } finally {
        gl.bufferSubData = upload;
        for (const o of scene.children) { o.geometry.dispose(); o.material.dispose(); }
      }
    });
    expect(errs).toEqual([]);
  });

  test('timeline scrubbing and deep links change the territory map', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=1405&lang=en');
    expect((await state(page)).snapshot).toMatch(/ming/);
    await expect(page.locator('.tl-era')).toHaveText('Ming dynasty');

    const track = page.locator('.tl-track');
    await track.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(async () => (await state(page)).year).toBe(1415);

    const box = (await page.locator('.tl-axis').boundingBox())!;
    const before = (await state(page)).year;
    await page.mouse.click(box.x + box.width * 0.97, box.y + box.height / 2);
    await expect.poll(async () => (await state(page)).year).toBeGreaterThan(before);
    await expect.poll(async () => (await state(page)).snapshot).toMatch(/^prc/);
    expect((await state(page)).year).toBeGreaterThan(1949);
    expect(page.url()).toContain('y=');

    await page.goto('/?lowfx=1#y=-260&lang=en');
    await expect.poll(async () => (await state(page)).snapshot).toMatch(/zhanguo/);
    expect(errs).toEqual([]);
  });

  test('Wikipedia reader shows the article, switches language and handles offline', async ({ page }) => {
    const errs = watchErrors(page);
    const seen = await mockWikipedia(page);
    await openApp(page, 'e=zhenghe&lang=en');
    const wBtn = page.locator('.card [data-act=wiki]');
    await wBtn.click();
    const reader = page.locator('.reader');
    await expect(reader).toBeVisible();
    // it unfolds to the right of the card, inside the same side panel; there is no right-hand drawer
    await expect(wBtn).toHaveAttribute('aria-expanded', 'true');
    // (polled: it slides in from the left)
    await expect.poll(async () => {
      const main = (await page.locator('.card-main').boundingBox())!;
      const rd = (await reader.boundingBox())!;
      return rd.x - (main.x + main.width);
    }).toBeGreaterThanOrEqual(-1);
    expect(await page.locator('.panel-r').count()).toBe(0);
    await expect(reader).toContainText('is a mock article used in tests.');
    await expect(reader).toContainText('Background');
    // sections read straight through: headings and paragraphs, nothing folded
    await expect(reader.locator('details')).toHaveCount(0);
    await expect(reader.locator('h3', { hasText: 'Background' })).toBeVisible();
    await expect(reader).not.toContainText('Should not be shown');
    await expect(reader).toContainText('CC BY-SA');
    await expect(reader.locator('a[href^="https://en.wikipedia.org/wiki/"]').first()).toBeVisible();
    await shot(page, 'desktop-wikipedia');

    await reader.locator('.seg button', { hasText: '中文' }).click();
    await expect(reader).toContainText('是一个用于测试的条目');
    expect(seen.some(x => x.startsWith('zh:'))).toBe(true);
    // folds back into the card from its header, or from the W button
    await reader.locator('header [aria-label="Fold away"]').click();
    await expect(reader).toBeHidden();
    await expect(page.locator('.card')).toBeVisible();
    await expect(wBtn).toHaveAttribute('aria-expanded', 'false');
    await wBtn.click();
    await expect(reader).toBeVisible();
    await wBtn.click();
    await expect(reader).toBeHidden();

    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockWikipedia(page, 'offline');
    await page.goto('/?lowfx=1#e=qin_unify&lang=en');
    await expect.poll(() => page.evaluate(() => (window as any).__atlas?.ready)).toBe(true);
    await page.locator('.card [data-act=wiki]').click();
    await expect(reader.locator('.rd-msg')).toBeVisible();
    await expect(reader.getByRole('button', { name: 'Retry' })).toBeVisible();
    expect(errs).toEqual([]);
  });

  test('quiz: answers when / where / order questions and shows the score', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=700&lang=en');
    await page.locator('.b-hub').click();
    await page.locator('.b-quiz').click();
    await page.locator('[data-act=start]').click();
    const quiz = page.locator('.quiz');
    const total = await page.evaluate(() => (window as any).__atlas.quiz.qs.length);
    expect(total).toBeGreaterThan(3);
    const kinds = new Set<string>();
    for (let i = 0; i < total; i++) {
      const q = await page.evaluate(() => { const z = (window as any).__atlas.quiz; return z.qs[z.i]; });
      kinds.add(q.type);
      if (q.type === 'when') {
        await quiz.locator('.qz-opts .opt').nth(q.options.indexOf(q.answer)).click();
      } else if (q.type === 'where') {
        await expect.poll(() => page.evaluate(() => (window as any).__atlas.atlas.view.flying), { timeout: 30_000 }).toBe(false);
        // Random answers can lie behind the quiz panel in the home view; pan them into clear map space.
        await setMapPose(page, { lon: q.lon, lat: q.lat, dist: 30, tilt: 0.8 });
        const pt = await page.evaluate(([lon, lat]) => (window as any).__atlas.screenOf(lon, lat), [q.lon, q.lat]);
        await page.mouse.click(pt.x, pt.y);
      } else {
        for (const id of q.answer) await quiz.locator(`.qz-opts .opt[data-id="${id}"]`).click();
        await quiz.locator('[data-act=check]').click();
      }
      await expect(quiz.locator('.qz-fb')).toContainText(/Correct/);
      if (i === 0) await shot(page, 'desktop-quiz');
      await quiz.locator('[data-act=next]').click();
    }
    await expect(quiz.locator('.qz-done')).toContainText(`${total}/${total}`);
    expect(kinds.size).toBeGreaterThanOrEqual(2);
    expect(errs).toEqual([]);
  });

  test('journeys play as 3D stories; places and people open their own cards', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=1085&lang=zh');
    await expect(page.locator('.tl-ruler')).toHaveText('北宋神宗 · 元丰八年');
    await page.locator('.b-hub').click();
    await page.locator('.hub-tabs [data-tab=journeys]').click();
    await expect(page.locator('.journeys .jn')).toHaveCount(43);
    await page.locator('[data-journey=sushi]').click();
    await expect(page.locator('.caption')).toBeVisible();
    await expect.poll(() => page.evaluate(() => (window as any).__atlas.player.state)).toBe('playing');
    // the address bar shares the journey while it plays, and returns to the year when it is stopped
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#j=sushi&lang=zh');
    await page.locator('.caption [aria-label=停止]').click();
    await expect.poll(() => page.evaluate(() => (window as any).__atlas.player.state)).toBe('idle');
    await expect.poll(() => page.evaluate(() => location.hash)).toMatch(/^#y=-?\d+&lang=zh$/);

    await page.locator('.search .q').fill('汴梁');
    await page.locator('.hits li', { hasText: '开封' }).first().click();
    const card = page.locator('.card');
    await expect(card.locator('h2')).toHaveText('东京（汴梁）');
    await expect(card).toContainText('历代名称');
    await expect(card).toContainText('今 开封');

    await page.locator('.search .q').fill('苏东坡');
    await page.locator('.hits li', { hasText: '苏轼' }).first().click();
    await expect(card.locator('h2')).toHaveText('苏轼');
    await expect(card.locator('[data-act=journey]')).toBeVisible();

    // the dynasty's buildings, customs and foods stand on the map with their own cards
    await page.evaluate(() => { location.hash = 'life=dayanta&lang=zh'; });
    await expect(card.locator('h2')).toHaveText('大雁塔');
    await expect(card.locator('.type-chip')).toHaveText('建筑');
    await card.locator('.life-chip', { hasText: '胡饼' }).click();
    await expect(card.locator('h2')).toHaveText('胡饼');
    await expect.poll(() => page.evaluate(() => (window as any).__atlas.atlas.selKey)).toBe('life:hubing');

    // models carry no name plates: hovering one grows it and shows the map tooltip, a click opens its card
    await page.keyboard.press('Escape');
    await expect(card).toBeHidden();
    await expect.poll(() => page.evaluate(() => (window as any).__atlas.atlas.view.flying), { timeout: 60_000 }).toBe(false);
    const tip = page.locator('.maptip');
    let free: { key: string; title: string; x: number; y: number } | undefined;
    await expect.poll(async () => {
      const pts = (await markPoints(page)).filter(m => m.key.startsWith('life:') && m.x > 80 && m.x < 1050 && m.y > 120 && m.y < 620);
      const onCanvas = await page.evaluate(ps => ps.map(m => document.elementFromPoint(m.x, m.y)?.tagName === 'CANVAS'), pts);
      for (const [i, m] of pts.entries()) {
        if (!onCanvas[i] || pts.some(o => o !== m && Math.hypot(o.x - m.x, o.y - m.y) < 50)) continue;
        await page.mouse.move(m.x - 60, m.y);
        await page.mouse.move(m.x, m.y, { steps: 5 });
        await page.waitForTimeout(400);
        if (await tip.isVisible() && (await tip.locator('b').textContent()) === m.title) { free = m; return true; }
      }
      return false;
    }, { timeout: 60_000 }).toBe(true);
    await page.mouse.click(free!.x, free!.y);
    await expect(card.locator('h2')).toHaveText(free!.title);
    await expect(tip).toBeHidden();
    // event pins are kind badges: hovering one shows its title in the same tooltip
    await expect.poll(() => page.evaluate(() => (window as any).__atlas.atlas.view.flying)).toBe(false);
    await expect.poll(async () => {
      const pinId = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('.labels .pin[data-id][aria-pressed=false]')].find(el => {
        const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 3;
        return r.width > 0 && document.elementFromPoint(x, y)?.closest('.pin') === el;
      })?.dataset.id);
      if (!pinId) return false;
      const pin = page.locator(`.labels .pin[data-id="${pinId}"]`);
      if (!await pin.hover({ timeout: 2000 }).then(() => true, () => false)) return false;
      await page.waitForTimeout(300);
      return await tip.isVisible() && (await tip.locator('b').textContent()) === await pin.getAttribute('aria-label');
    }, { timeout: 30_000 }).toBe(true);
    // the tooltip never rides along with a moving map: any camera motion clears the hover
    const cameraX = await page.evaluate(() => (window as any).__atlas.atlas.view.camera.position.x as number);
    await page.evaluate(() => { const v = (window as any).__atlas.atlas.view; v.camera.position.x += 0.5; v.controls.target.x += 0.5; });
    await expect.poll(() => page.evaluate(x => Math.abs((window as any).__atlas.atlas.view.camera.position.x - x), cameraX)).toBeGreaterThan(0.1);
    await expect(tip).toBeHidden();
    expect(errs).toEqual([]);
  });

  test('location icons match compact markers and highlight only their rings', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=700&lang=en');
    await page.evaluate(() => {
      const a = (window as unknown as { __atlas: { atlas: { setLayer(k: 'models', on: boolean): void } } }).__atlas.atlas;
      a.setLayer('models', false);
    });
    await setMapPose(page, { lon: 110, lat: 34, dist: 30, tilt: 0.8 });
    const capital = page.locator('.place.cap.on').first();
    await expect(capital.locator('.b')).toBeVisible();
    const offset = await capital.locator('.b').evaluate(el => {
      type Vector3 = import('three').Vector3;
      const a = (window as unknown as { __atlas: { atlas: {
        places: Map<string, { label: { pos: Vector3 } }>;
        view: { canvas: HTMLCanvasElement; project(v: Vector3): Vector3 };
      } } }).__atlas.atlas;
      const id = el.closest<HTMLElement>('.place')!.dataset.place!;
      const p = a.view.project(a.places.get(id)!.label.pos), r = el.getBoundingClientRect();
      const canvas = a.view.canvas.getBoundingClientRect();
      return Math.hypot(r.x + r.width / 2 - p.x - canvas.x, r.y + r.height / 2 - p.y - canvas.y);
    });
    expect(offset).toBeLessThan(1);
    const placeId = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('.place.on:not(.cap)')].find(el => {
        const r = el.querySelector('.b')!.getBoundingClientRect();
        return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest('.place') === el;
      })?.dataset.place);
    expect(placeId).toBeTruthy();
    const place = page.locator(`.place[data-place="${placeId}"]`);
    const pin = page.locator('.pin.on:not(.model-hit)').first();
    for (const button of [capital, pin, place]) {
      const icon = button.locator('.b');
      const normal = await icon.evaluate(el => {
        const s = getComputedStyle(el), r = el.getBoundingClientRect();
        return { width: r.width, height: r.height, background: s.backgroundImage, shadow: s.boxShadow };
      });
      expect(normal.width).toBeCloseTo(22, 2);
      expect(normal.height).toBeCloseTo(22, 2);
      await button.focus();
      if (button === place) await button.hover();
      await expect(button).toHaveCSS('text-decoration-line', 'none');
      await expect(icon).toHaveCSS('transform', 'none');
      await expect(icon).toHaveCSS('background-image', normal.background);
      await expect.poll(() => icon.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe(normal.shadow);
      for (const size of await icon.evaluate(el => [el.getBoundingClientRect().width, el.getBoundingClientRect().height])) {
        expect(size).toBeCloseTo(22, 2);
      }
      await expect(page.getByRole('tooltip')).toBeVisible();
    }
    await page.keyboard.press('Enter');
    await expect(place).toHaveAttribute('aria-pressed', 'true');
    await expect(place.locator('.b')).toHaveCSS('border-color', 'rgb(200, 55, 45)');
    await expect.poll(() => page.evaluate(() => {
      const a = (window as unknown as { __atlas: { atlas: { hoverHalo: { obj: { visible: boolean } }; selHalo: { obj: { visible: boolean } } } } }).__atlas.atlas;
      return a.hoverHalo.obj.visible || a.selHalo.obj.visible;
    })).toBe(false);
    await page.keyboard.press('Escape');
    await switchLang(page);
    for (const dist of [48, 14]) {
      await setMapPose(page, { lon: 110, lat: 34, dist, tilt: 0.8 });
      const sizes = await page.locator('.place.on:not(.modeled) .b, .pin.on:not(.model-hit) .b').evaluateAll(els =>
        [...new Set(els.map(el => { const r = el.getBoundingClientRect(); return `${r.width.toFixed(2)}x${r.height.toFixed(2)}`; }))]);
      expect(sizes).toEqual(['22.00x22.00']);
      const text = await page.locator('.place.on').evaluateAll(els =>
        [...new Set(els.map(el => { const s = getComputedStyle(el); return `${s.fontSize}/${s.fontWeight}/${s.textShadow}/${s.opacity}`; }))]);
      expect(text).toHaveLength(1);
      expect(text[0]).toMatch(/\/600\/none\/1$/);
    }
    await capital.focus();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await expect(capital).toHaveCSS('text-decoration-line', 'none');
    await expect(capital.locator('.b')).toHaveCSS('border-color', 'rgb(34, 195, 230)');
    await page.screenshot({ path: test.info().outputPath('uniform-location-icons.png') });
    expect(errs).toEqual([]);
  });

  test('unifies place names, models and compact markers without overlapping map content', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=700&lang=zh');
    const loading = await page.evaluate(async () => {
      type Object3D = import('three').Object3D;
      const { fx } = (window as unknown as { __atlas: { atlas: { fx: {
        root: Object3D;
        spawn(o: { lon: number; lat: number; model: { kind: 'flag'; color: string }; ring: string }, layer: 'event'): Promise<Object3D | null>;
        showLayer(layer: 'event', on: boolean): void;
        clear(layer: 'event'): void;
      } } } }).__atlas.atlas;
      const pending = fx.spawn({ lon: 117.1, lat: 36.25, model: { kind: 'flag', color: '#123456' }, ring: '#7d5a32' }, 'event');
      const group = fx.root.children.at(-1)!;
      const visibleMeshes = () => {
        let n = 0;
        group.traverseVisible(o => { if (o.type === 'Mesh') n++; });
        return n;
      };
      const initial = visibleMeshes();
      // Changing layers before the model arrives must not expose its empty base ring.
      fx.showLayer('event', false);
      fx.showLayer('event', true);
      const toggled = visibleMeshes();
      const loaded = !!(await pending);
      fx.clear('event');
      return { initial, toggled, loaded };
    });
    expect(loading).toEqual({ initial: 0, toggled: 0, loaded: true });
    await setMapPose(page, { lon: 117.1, lat: 36.25, dist: 20, tilt: 0.75 });
    const name = page.locator('.place[data-place=taishan]');
    const model = page.locator('.model-hit[data-key="place:taishan"]');
    const tip = page.getByRole('tooltip');
    const card = page.locator('.card');
    await expect(name).toBeVisible();
    await expect(name).toHaveClass(/modeled/);
    await name.hover();
    await expect(tip.locator('b')).toHaveText('泰山');
    // Visual captures include the end of the 700 ms model-rise animation.
    await page.waitForTimeout(1000);
    await page.screenshot({ path: test.info().outputPath('unified-place-hover.png') });
    await name.focus();
    await page.keyboard.press('Enter');
    await expect(card.locator('h2')).toHaveText('泰山');
    await expect(card).toContainText('唐玄宗');
    await expect(name).toHaveAttribute('aria-pressed', 'true');
    await expect(tip).toBeHidden();
    await page.keyboard.press('Escape');
    await expect(card).toBeHidden();
    // The model's keyboard target and the geographical name have the same tooltip and destination.
    await model.focus();
    await expect(tip.locator('b')).toHaveText('泰山');
    await page.keyboard.press('Enter');
    await expect(card.locator('h2')).toHaveText('泰山');
    await page.keyboard.press('Escape');

    await switchLang(page);
    await expect(name).toHaveText('Mount Tai');
    // The longer translated name may step aside, leaving the model as this object's keyboard target.
    await expect(model).toBeVisible();
    await model.focus();
    await expect(tip.locator('b')).toHaveText('Mount Tai');
    await model.evaluate(el => el.blur());

    for (const dist of [48, 30, 14]) {
      await setMapPose(page, { lon: 110, lat: 34, dist, tilt: 0.8 });
      await expect.poll(async () => (await state(page)).pose.dist).toBeCloseTo(dist, 0);
      await expect(page.locator('.model-hit.on').first()).toBeVisible();
      await page.waitForTimeout(1000);
      const overlaps = await page.evaluate(() => {
        const models = [...document.querySelectorAll<HTMLElement>('.model-hit.on')];
        const labels = [...document.querySelectorAll<HTMLElement>('.labels > .on:not(.model-hit)')];
        const hits: string[] = [];
        type Object3D = import('three').Object3D;
        type Vector3 = import('three').Vector3;
        const a = (window as unknown as { __atlas: { atlas: {
          marks: { key: string; g: Object3D; label: { el: HTMLElement } }[];
          view: { canvas: HTMLCanvasElement; project(v: Vector3, out: Vector3): Vector3 };
        } } }).__atlas.atlas;
        const canvas = a.view.canvas.getBoundingClientRect();
        // Verify the reserved rectangles contain real mesh geometry, not just the old radius metadata.
        for (const m of a.marks.filter(m => m.g.parent && m.g.visible)) {
          const rect = m.label.el.getBoundingClientRect(), point = m.g.position.clone();
          m.g.traverseVisible(o => {
            if (o.type !== 'Mesh') return;
            const mesh = o as import('three').Mesh;
            if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
            const box = mesh.geometry.boundingBox!;
            for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
              point.set(x, y, z).applyMatrix4(mesh.matrixWorld);
              a.view.project(point, point);
              if (point.x + canvas.left < rect.left - 1 || point.x + canvas.left > rect.right + 1 ||
                  point.y + canvas.top < rect.top - 1 || point.y + canvas.top > rect.bottom + 1) hits.push(`${m.key}: uncovered geometry`);
            }
          });
        }
        for (const [i, a] of models.entries()) {
          const x = a.getBoundingClientRect();
          for (const b of [...models.slice(i + 1), ...labels]) {
            const owner = b.dataset.key ?? (b.dataset.place ? `place:${b.dataset.place}` : '');
            if (owner && owner === a.dataset.key) continue;
            const y = b.getBoundingClientRect();
            if (x.left < y.right && x.right > y.left && x.top < y.bottom && x.bottom > y.top) {
              hits.push(`${a.dataset.key} / ${owner || b.textContent}`);
            }
          }
        }
        return [...new Set(hits)];
      });
      expect(overlaps, `distance ${dist}`).toEqual([]);
      await page.screenshot({ path: test.info().outputPath(`unified-map-${dist}.png`) });
    }
    const compact = page.locator('.pin.on:not(.model-hit)').first();
    const key = (await compact.getAttribute('data-key'))!;
    const title = (await compact.getAttribute('aria-label'))!;
    await compact.focus();
    await expect(tip.locator('b')).toHaveText(title);
    await page.keyboard.press('Enter');
    await expect(card).toBeVisible();
    const selected = page.locator(`.pin[data-key="${key}"][aria-pressed=true].on`);
    await expect(selected).toHaveCount(1);
    await setMapPose(page, { lon: 110, lat: 34, dist: 90, tilt: 0.8 });
    await expect(selected).toHaveCount(1);
    expect(errs).toEqual([]);
  });

  test('course picker lists each unit with its lesson and unit test', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'y=1950&lang=zh');
    await page.locator('.b-hub').click();
    await page.locator('.b-learn').click();
    const course = page.locator('.course');
    await expect(course).toBeVisible();
    await expect(course.locator('.tabs button')).toHaveCount(5);
    await course.locator('.tabs [data-book=g8a]').click();
    const units = course.locator('.unit');
    expect(await units.count()).toBeGreaterThan(3);
    await expect(units.first().locator('.u-ls')).toHaveCount(1);
    await expect(units.first().locator('.u-test')).toHaveCount(1);
    await shot(page, 'desktop-learn');
    await page.keyboard.press('Escape');
    await expect(course).toBeHidden();
    expect(errs).toEqual([]);
  });

  test('history course runs a lesson through its check to a score', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'lang=zh');
    await page.locator('.b-hub').click();
    await page.locator('.b-learn').click();
    await page.locator('.course .tabs [data-book=g7a]').click();
    await page.locator('.course .u-ls[data-lesson="g7a-3"]').click();
    await expect(page.locator('.course')).toBeHidden();
    const ls = page.locator('[data-testid=lesson]');
    await expect(ls).toBeVisible();
    // the lesson scene: the lesson runs in the left column, between the headline and the line key
    await ls.evaluate(el => Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished)));
    const lb = (await ls.boundingBox())!;
    expect(lb.x).toBeLessThan(60);
    expect(lb.y).toBeGreaterThanOrEqual((await page.locator('.hud-tl').boundingBox())!.y + (await page.locator('.hud-tl').boundingBox())!.height);
    expect(lb.y + lb.height).toBeLessThanOrEqual((await page.locator('.map-key').boundingBox())!.y);
    await expect(page).toHaveURL(/#lesson=g7a-3/);
    await expect(ls.locator('.ls-n')).toHaveText('1 / 10');
    await page.keyboard.press('ArrowRight');
    await expect(ls.locator('.ls-n')).toHaveText('2 / 10');
    await shot(page, 'desktop-lesson');
    while (await ls.locator('.ls-h').count()) await ls.locator('[data-act=next]').click();
    for (let i = 0; i < 4; i++) {
      await expect(ls.locator('.ls-q')).toBeVisible();
      if (await ls.locator('[data-act=check]').count()) {
        const opts = ls.locator('.ls-opts .ls-opt:not([disabled])');
        while (await opts.count()) await opts.first().click();
        await ls.locator('[data-act=check]').click();
      } else if (await ls.locator('.ls-opts .ls-opt').count()) {
        await ls.locator('.ls-opt').first().click();
      } else {
        await page.mouse.click(400, 400);
      }
      await expect(ls.locator('.ls-res')).toBeVisible();
      await ls.locator('[data-act=next]').click();
    }
    await expect(ls.locator('.ls-score b')).toHaveText(/^\d\/4$/);
    await expect(ls.locator('.ls-keys li')).toHaveCount(3);
    await ls.locator('[data-act=back], [data-act=next-lesson]').first().click();
    expect(errs).toEqual([]);
  });

  test('lesson deep link opens the lesson in English', async ({ page }) => {
    await openApp(page, 'lesson=hs1-1&lang=en');
    const ls = page.locator('[data-testid=lesson]');
    await expect(ls).toBeVisible();
    await expect(ls.locator('.ls-k')).toContainText('Unit 1');
    await page.keyboard.press('Escape');
    await expect(ls).toBeHidden();
  });

  test('works offline after the first visit, and switches rendering quality in settings', async ({ browser }) => {
    const ctx = await browser.newContext({ serviceWorkers: 'allow', viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs: string[] = [];
    page.on('pageerror', e => errs.push(e.message));
    await openApp(page, 'y=1405');
    await expect(page.locator('link[rel=manifest]')).toHaveAttribute('href', /manifest\.webmanifest$/);
    await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 60_000 }).toBe(true);
    // the worker precached the whole build at install, model packs of eras not yet visited included
    const cached = await page.evaluate(async () => {
      const keys = await Promise.all((await caches.keys()).map(async k => (await (await caches.open(k)).keys()).map(r => new URL(r.url).pathname)));
      return keys.flat();
    });
    expect(cached).toContain('/');
    expect(cached).toContain('/data/terrain/east-asia.webp');
    expect(cached.filter(p => /^\/assets\/life-food-.*\.js$/.test(p)).length).toBeGreaterThan(0);
    await ctx.setOffline(true);
    await page.goto('about:blank');
    await openApp(page, 'e=zhenghe&lang=zh');
    expect((await state(page)).event).toBe('zhenghe');
    await ctx.setOffline(false);

    // the card's share button copies the deep link, minus device flags
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
    const share = page.locator('.card-nav .card-share');
    await share.click();
    await expect(share).toHaveAttribute('aria-label', '链接已复制');
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toMatch(/#e=zhenghe&lang=zh$/);
    expect(copied).not.toContain('lowfx');

    // 03 sound & display: quality, saved and applied by reloading without ?lowfx
    await page.locator('.b-settings').click();
    const q = page.locator('.settings .quality button');
    await expect(q).toHaveText(['高画质', '省电流畅']);
    await expect(q.nth(1)).toHaveAttribute('aria-checked', 'true');
    await Promise.all([page.waitForURL(u => !u.search.includes('lowfx')), q.nth(0).click()]);
    expect(await page.evaluate(() => localStorage.getItem('ages:quality'))).toBe('"high"');
    expect(errs).toEqual([]);
    await ctx.close();
  });

  test('reports load and GPU failures, and keeps keyboard focus in menus', async ({ page }) => {
    // the heightmap is missing (offline, wrong base path): the boot screen gives way to a message and a reload button
    await page.route('**/data/terrain/**', r => r.fulfill({ status: 404, body: '' }));
    await page.goto('/?lowfx=1#lang=zh');
    await expect(page.locator('.nogl[role=alert]')).toContainText('地图数据加载失败');
    await expect(page.locator('.nogl button')).toHaveText('重新加载');
    await expect(page.locator('#boot')).toHaveCount(0);
    await page.unroute('**/data/terrain/**');

    await page.goto('about:blank');
    await openApp(page, 'lang=zh');
    // keyboard users land inside a menu they open and return to its button when Escape closes it
    await page.locator('.b-hub').focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('.hub'))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.locator('.b-hub')).toBeFocused();
    // the help dialog takes focus and gives it back
    await page.locator('.b-settings').click();
    await page.locator('.b-help2').click();
    await expect(page.locator('.modal .help header button')).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('.modal'))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.locator('.modal:has(.help)')).toBeHidden();

    // a lost GPU context is announced, and the note goes once three.js restores it
    await page.evaluate(() => { (window as any).__lose = (window as any).__atlas.atlas.view.renderer.getContext().getExtension('WEBGL_lose_context'); (window as any).__lose.loseContext(); });
    await expect(page.locator('.gl-lost')).toContainText('显卡');
    await page.evaluate(() => (window as any).__lose.restoreContext());
    await expect(page.locator('.gl-lost')).toHaveCount(0);
    await expect.poll(async () => (await state(page)).frames, { timeout: 30_000 }).toBeGreaterThan(5);
  });

  test('mobile layout keeps the map in focus @mobile', async ({ page }) => {
    const errs = watchErrors(page);
    await openApp(page, 'e=chibi&lang=zh');
    const card = page.locator('.card');
    await expect(card).toBeVisible();
    const vp = page.viewportSize()!;
    await card.evaluate(el => Promise.all(el.getAnimations().map(a => a.finished))); // slide-in animation
    const cb = (await card.boundingBox())!;
    const tb = (await page.locator('.tl').boundingBox())!;
    expect(cb.y).toBeGreaterThan(vp.height * 0.4);
    expect((await page.locator('.card-main').boundingBox())!.width).toBeGreaterThanOrEqual(vp.width - 1); // sheet spans the full width
    expect(cb.y + cb.height).toBeLessThanOrEqual(tb.y + 1);
    expect(tb.y + tb.height).toBeLessThanOrEqual(vp.height);
    // the transport buttons share the phase line's row, above the bar
    const ctl = (await page.locator('.tl-ctl').boundingBox())!, amb = (await page.locator('.amb').boundingBox())!;
    expect(Math.abs(ctl.y + ctl.height / 2 - (amb.y + amb.height / 2))).toBeLessThan(4);
    expect(ctl.y + ctl.height).toBeLessThanOrEqual(tb.y + 1);
    // the selected place is framed above the bottom sheet
    const pt = await page.evaluate(() => (window as any).__atlas.screenOf(113.9, 29.83));
    await expect.poll(async () => (await page.evaluate(() => (window as any).__atlas.screenOf(113.9, 29.83))).y, { timeout: 30_000 }).toBeLessThan(cb.y);
    expect(pt.x).toBeGreaterThan(0);
    await shot(page, 'mobile-event');
    await page.locator('[data-act=play]').click();
    await expect(page.locator('.caption')).toBeVisible();
    await expect(card).toHaveCSS('opacity', '0');
    await shot(page, 'mobile-story');
    await page.locator('.caption [aria-label=停止]').click();
    await openApp(page, 'y=700&lang=zh');
    await setMapPose(page, { lon: 117.1, lat: 36.25, dist: 14, tilt: 0.75 });
    const name = page.locator('.place[data-place=taishan]');
    await expect(name).toBeVisible();
    await name.tap();
    await expect(card.locator('h2')).toHaveText('泰山');
    expect(errs).toEqual([]);
  });
});
