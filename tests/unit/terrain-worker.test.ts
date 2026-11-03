import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DetailJob, DetailResult } from '../../src/client/scene/detail.worker.ts';

describe('terrain detail worker', () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it('retries a failed tile and releases the decoded bitmap after recovery', async () => {
    vi.resetModules();
    const worker: {
      onmessage: ((event: { data: DetailJob }) => Promise<void>) | null;
      postMessage: ReturnType<typeof vi.fn>;
    } = { onmessage: null, postMessage: vi.fn() };
    const close = vi.fn();
    const fetchTile = vi.fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true, blob: async () => new Blob() });
    vi.stubGlobal('self', worker);
    vi.stubGlobal('fetch', fetchTile);
    vi.stubGlobal('createImageBitmap', vi.fn(async () => ({ close })));
    vi.stubGlobal('OffscreenCanvas', class {
      getContext() {
        return { drawImage() {}, getImageData: () => ({ data: new Uint8ClampedArray(256 * 256 * 4) }) };
      }
    });

    await import('../../src/client/scene/detail.worker.ts');
    const job: DetailJob = { id: 1, box: [100, 100.1, 30, 30.1], z: 5, size: 2 };
    await worker.onmessage!({ data: job });
    expect((worker.postMessage.mock.calls[0][0] as DetailResult).data).toBeNull();
    await worker.onmessage!({ data: { ...job, id: 2 } });
    expect(fetchTile).toHaveBeenCalledTimes(2);
    expect((worker.postMessage.mock.calls[1][0] as DetailResult).data).toBeInstanceOf(Uint16Array);
    expect(close).toHaveBeenCalledOnce();
  });
});
