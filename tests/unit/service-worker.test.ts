import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

type Event = {
  request: Request;
  waitUntil(promise: Promise<unknown>): void;
  respondWith(promise: Promise<unknown>): void;
};

function harness() {
  const listeners = new Map<string, (event: Event) => void>();
  const cache = {
    add: vi.fn(async (_request: Request) => {}),
    addAll: vi.fn(async (_requests: Request[]) => {}),
    match: vi.fn(async (_request: Request): Promise<Response | undefined> => new Response('current')),
    put: vi.fn(async () => {}),
  };
  const caches = {
    open: vi.fn(async () => cache),
    match: vi.fn(async () => new Response('stale')),
    keys: vi.fn(async () => [] as string[]),
    delete: vi.fn(async (_key: string) => true),
  };
  const fetch = vi.fn(async () => new Response('newer network shell'));
  const self = {
    registration: { scope: 'https://example.test/ages/' },
    clients: { claim: vi.fn(async () => {}) },
    skipWaiting: vi.fn(async () => {}),
    addEventListener: (type: string, handler: (event: Event) => void) => listeners.set(type, handler),
  };
  const source = readFileSync(new URL('../../src/client/sw.js', import.meta.url), 'utf8')
    .replace('__VERSION__', 'test')
    .replace('[/* __PRECACHE__ */]', '["assets/app.js","data/terrain.webp"]');
  runInNewContext(source, { self, caches, fetch, URL, Request, Response, console });

  function dispatch(type: string, request = new Request('https://example.test/ages/assets/app.js')): Promise<unknown> {
    let result: Promise<unknown> | undefined;
    const handler = listeners.get(type);
    if (!handler) throw new Error(`missing ${type} listener`);
    handler({ request, waitUntil: promise => { result = promise; }, respondWith: promise => { result = promise; } });
    if (!result) throw new Error(`${type} did not extend the event`);
    return result;
  }
  return { cache, caches, fetch, self, listeners, dispatch };
}

function navigation(url: string): Request {
  const request = new Request(url);
  Object.defineProperty(request, 'mode', { value: 'navigate' });
  return request;
}

describe('offline service worker', () => {
  it('rejects an incomplete precache instead of activating a broken offline version', async () => {
    const { cache, caches, self, dispatch } = harness();
    const failure = new Error('asset unavailable');
    cache.add.mockRejectedValue(failure);
    cache.addAll.mockRejectedValue(failure);

    await expect(dispatch('install')).rejects.toThrow('asset unavailable');
    expect(caches.delete).toHaveBeenCalledWith(expect.stringContaining('test'));
    expect(self.skipWaiting).not.toHaveBeenCalled();
  });

  it('activates immediately once the full precache succeeds', async () => {
    const { cache, self, dispatch } = harness();
    await dispatch('install');
    expect(cache.addAll).toHaveBeenCalledOnce();
    expect(self.skipWaiting).toHaveBeenCalledOnce();
  });

  it('deletes only obsolete caches for its own scope', async () => {
    const { caches, dispatch } = harness();
    caches.keys.mockResolvedValue([
      'ages:%2Fages%2F:old',
      'ages:%2Fages%2F:test',
      'ages:%2Fother%2F:old',
      'ages-deadbeef0000',
    ]);
    await dispatch('activate');
    expect(caches.delete.mock.calls.map(([key]) => key)).toEqual(['ages:%2Fages%2F:old']);
  });

  it('looks up assets only in the active version cache', async () => {
    const { cache, dispatch } = harness();
    const response = await dispatch('fetch') as Response;
    expect(await response.text()).toBe('current');
    expect(cache.match).toHaveBeenCalledOnce();
  });

  it('does not refresh unversioned data into an older active cache', async () => {
    const { fetch, dispatch } = harness();
    const response = await dispatch('fetch', new Request('https://example.test/ages/data/terrain.webp')) as Response;
    expect(await response.text()).toBe('current');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('keeps the active shell consistent with its precached assets during an update', async () => {
    const { fetch, dispatch } = harness();
    const response = await dispatch('fetch', navigation('https://example.test/ages/?year=1405')) as Response;
    expect(await response.text()).toBe('current');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('fetches and stores the shell if its active cache entry is missing', async () => {
    const { cache, fetch, dispatch } = harness();
    cache.match.mockResolvedValueOnce(undefined);
    const network = new Response('network shell');
    Object.defineProperty(network, 'type', { value: 'basic' });
    fetch.mockResolvedValueOnce(network);
    const response = await dispatch('fetch', navigation('https://example.test/ages/?year=1405')) as Response;
    expect(await response.text()).toBe('network shell');
    expect(cache.put).toHaveBeenCalledWith('https://example.test/ages/', expect.any(Response));
  });

  it('leaves other pages under the scope to the network', () => {
    const { listeners } = harness();
    const respondWith = vi.fn();
    listeners.get('fetch')!({
      request: navigation('https://example.test/ages/other.html'),
      waitUntil() {},
      respondWith,
    });
    expect(respondWith).not.toHaveBeenCalled();
  });
});
