import { App } from './app/app.ts';
import { lang, setLang, t } from './lib/i18n.ts';
import { readLink } from './lib/link.ts';
import { load } from './lib/storage.ts';
import { h } from './ui/dom.ts';
import { initTips } from './ui/tip.ts';

/** Boot: picks the rendering cost, starts the app (src/client/app/) and reports what keeps it from starting. */
const params = new URLSearchParams(location.search);
// ?lowfx forces low cost; otherwise the saved Settings choice, else low only on very weak devices
const lowfx = params.has('lowfx') || (load<'low' | 'high' | null>('quality', null, v => v === 'low' || v === 'high') ?? ((navigator.hardwareConcurrency ?? 4) <= 2 ? 'low' : 'high')) === 'low';

function webgl(): boolean {
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
}

/** Replaces the boot screen with a message (and a reload button when retrying can help). */
function fatal(msg: string, retry: boolean): void {
  document.getElementById('boot')?.remove();
  root.querySelector('.nogl')?.remove();
  root.append(h('div', { class: 'nogl', role: 'alert' },
    h('p', { text: msg }),
    retry ? h('button', { type: 'button', class: 'btn primary', text: t('reload'), onclick: () => location.reload() }) : null));
}

// offline support (production builds only; see src/client/sw.js)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || refreshing) return;
    refreshing = true;
    location.reload();
  });
  addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: 'none' })
      .catch(err => console.warn('Offline support could not be registered.', err));
  });
}

const root = document.getElementById('app')!;
setLang(readLink().lang ?? lang);
initTips();
if (!webgl()) {
  fatal(t('webgl'), false);
} else {
  try {
    const app = new App(root, document.getElementById('stage')!, lowfx);
    (window as unknown as { __atlas: unknown }).__atlas = app;
    app.start().catch(err => {
      console.error(err);
      fatal(/webgl/i.test(String(err)) ? t('webgl') : t('loadFail'), true);
    });
  } catch (err) {
    // the renderer itself could not start (GPU blocklisted, context limit reached)
    console.error(err);
    fatal(t('webgl'), true);
  }
}
