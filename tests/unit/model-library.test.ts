import * as THREE from 'three';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type JobMessage = { id: number; recipe: { kind: string } };

class TestWorker {
  static instances: TestWorker[] = [];
  onmessage: ((event: { data: { id: number; ok: boolean; model: object } }) => void) | null = null;
  onerror: ((event: { preventDefault(): void; message: string }) => void) | null = null;
  onmessageerror: (() => void) | null = null;
  messages: JobMessage[] = [];
  terminated = false;

  constructor() { TestWorker.instances.push(this); }
  postMessage(message: JobMessage): void { this.messages.push(message); }
  terminate(): void { this.terminated = true; }
  complete(): void {
    const job = this.messages.shift();
    if (!job) throw new Error('no worker job to complete');
    this.onmessage?.({ data: { id: job.id, ok: true, model: {} } });
  }
}

describe('model worker pool', () => {
  beforeEach(() => {
    TestWorker.instances = [];
    vi.resetModules();
    vi.stubGlobal('navigator', { hardwareConcurrency: 2 });
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.doMock('../../src/client/models/pack.ts', () => ({ unpackModel: () => new THREE.Group() }));
    vi.doMock('../../src/client/models/kit.ts', () => ({
      whenModelReady: async () => {},
      buildFresh: () => new THREE.Group(),
    }));
    vi.doMock('../../src/client/models/heroes/index.ts', () => ({
      parseHero: (ref: unknown) => typeof ref === 'string' && ref.includes('/')
        ? { pack: ref.split('/')[0], name: ref.split('/')[1] } : null,
      loadHeroesFor: async () => {},
      whenHeroReady: async () => {},
      heroBuilder: () => undefined,
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.doUnmock('../../src/client/models/pack.ts');
    vi.doUnmock('../../src/client/models/kit.ts');
    vi.doUnmock('../../src/client/models/heroes/index.ts');
  });

  it('falls back to the main thread if creating the worker pool fails partway through', async () => {
    vi.stubGlobal('navigator', { hardwareConcurrency: 3 });
    class PartiallyBlockedWorker extends TestWorker {
      constructor() {
        if (TestWorker.instances.length) throw new Error('workers blocked');
        super();
      }
    }
    vi.stubGlobal('Worker', PartiallyBlockedWorker);
    const library = await import('../../src/client/models/library.ts');

    expect(() => library.warmHeroes(['people-a/example'])).not.toThrow();
    expect(TestWorker.instances[0].terminated).toBe(true);
    await expect(library.prototype({ kind: 'hut' })).resolves.toBeInstanceOf(THREE.Group);
  });

  it('falls back for every active and queued job if a worker crashes', async () => {
    vi.stubGlobal('navigator', { hardwareConcurrency: 3 });
    vi.stubGlobal('Worker', TestWorker);
    const library = await import('../../src/client/models/library.ts');
    const jobs = ['hut', 'palace', 'army'].map(kind => library.prototype({ kind }));
    TestWorker.instances[0].onerror?.({ preventDefault() {}, message: 'worker crashed' });

    const result = await Promise.race([
      Promise.all(jobs),
      new Promise<null>(resolve => setTimeout(() => resolve(null), 2000)),
    ]);
    expect(result).toHaveLength(3);
    expect(TestWorker.instances.every(worker => worker.terminated)).toBe(true);
  });

  it('does not strand later jobs if posting to a worker throws', async () => {
    class PostBlockedWorker extends TestWorker {
      override postMessage(): void { throw new Error('posting blocked'); }
    }
    vi.stubGlobal('Worker', PostBlockedWorker);
    const library = await import('../../src/client/models/library.ts');
    const result = await Promise.race([
      Promise.all([library.prototype({ kind: 'hut' }), library.prototype({ kind: 'palace' })]),
      new Promise<null>(resolve => setTimeout(() => resolve(null), 2000)),
    ]);
    expect(result).toHaveLength(2);
    expect(TestWorker.instances[0].terminated).toBe(true);
  });

  it('falls back if a worker response cannot be decoded', async () => {
    vi.stubGlobal('Worker', TestWorker);
    const library = await import('../../src/client/models/library.ts');
    const job = library.prototype({ kind: 'hut' });
    TestWorker.instances[0].onmessageerror?.();
    await expect(job).resolves.toBeInstanceOf(THREE.Group);
    expect(TestWorker.instances[0].terminated).toBe(true);
  });

  it('warms each requested hero pack only once', async () => {
    vi.stubGlobal('Worker', TestWorker);
    const library = await import('../../src/client/models/library.ts');
    library.warmHeroes(['people-a/one', 'people-a/two', 'places/three']);
    library.warmHeroes(['people-a/four']);
    expect(TestWorker.instances[0].messages).toEqual([{ warm: ['people-a/one', 'places/three'] }]);
  });

  it('keeps a replacement request deduplicated after cancelling the old queued request', async () => {
    vi.stubGlobal('Worker', TestWorker);
    const library = await import('../../src/client/models/library.ts');
    const busy = library.prototype({ kind: 'hut' });
    const cancelled = library.prototype({ kind: 'palace' }, { tag: 'era:old' }).catch(err => err);
    library.cancelByTag('era:old');
    const replacement = library.prototype({ kind: 'palace' }, { tag: 'era:new' });
    await cancelled;
    expect(library.prototype({ kind: 'palace' })).toBe(replacement);

    TestWorker.instances[0].complete();
    TestWorker.instances[0].complete();
    await Promise.all([busy, replacement]);
  });
});

describe('hero pack loading', () => {
  it('does not retain a rejected load forever', async () => {
    vi.resetModules();
    const { loadPack } = await import('../../src/client/models/heroes/index.ts');
    const first = loadPack('__missing_pack__');
    await expect(first).rejects.toThrow();
    const retry = loadPack('__missing_pack__');
    expect(retry).not.toBe(first);
    await expect(retry).rejects.toThrow();
  });
});
