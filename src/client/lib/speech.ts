/** Optional narration via the Web Speech API (zh-CN / en). Resolves when the utterance ends (or right away if unsupported). */
import type { Lang } from '../../shared/data/types.ts';

export const canSpeak = (): boolean => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text: string, lang: Lang): Promise<void> {
  if (!canSpeak()) return Promise.resolve();
  return new Promise(done => {
    // partial implementations (some WebViews, private modes) throw instead of failing quietly
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      // the exact language first (zh-CN, not a Cantonese zh-HK voice that happens to come first), then a Mandarin
      // (zh-TW) or any English one
      const voices = speechSynthesis.getVoices(), tag = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-');
      const v = voices.find(v => tag(v) === u.lang)
        ?? voices.find(v => (lang === 'zh' ? tag(v) === 'zh-TW' || /^cmn/.test(tag(v)) : tag(v).startsWith('en')));
      if (v) u.voice = v;
      u.rate = lang === 'zh' ? 1.05 : 1;
      // a safety net for engines that never report the end: long enough for the caption read slowly
      const t = setTimeout(done, Math.max(20_000, text.length * (lang === 'zh' ? 400 : 120)));
      u.onend = u.onerror = () => { clearTimeout(t); done(); };
      speechSynthesis.speak(u);
    } catch {
      done();
    }
  });
}

/** Stops any narration; never throws (some WebViews expose speechSynthesis but throw on use). */
export function hush(): void {
  try { if (canSpeak()) speechSynthesis.cancel(); } catch { /* nothing to stop */ }
}
