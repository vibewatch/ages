import type { Chapter } from '../../shared/data/chapters.ts';
import { ERAS } from '../../shared/data/eras.ts';
import { EVENT } from '../../shared/data/events.ts';
import type { Lang } from '../../shared/data/i18n.ts';
import type { Journey, Person } from '../../shared/data/corpus.ts';
import { LIFE, type LifeItem } from '../../shared/data/life.ts';
import { PLACE } from '../../shared/data/places.ts';
import { journeyStory } from '../../shared/data/stories.ts';
import { TRAIL } from '../../shared/data/trails.ts';
import type { Era, HistEvent, Lesson, Place, Wiki, Year } from '../../shared/data/types.ts';
import { phaseAt } from '../../shared/lib/chronicle.ts';
import { addYears, clampYear } from '../../shared/lib/timeline.ts';
import { lang, onLang, setLang, t } from '../lib/i18n.ts';
import { readLink, writeLink } from '../lib/link.ts';
import { canSpeak, speak } from '../lib/speech.ts';
import { load, Progress, save } from '../lib/storage.ts';
import { Atlas } from '../scene/atlas.ts';
import { SURFACES, type Surface } from '../scene/terrain.ts';
import { StoryPlayer } from '../story/player.ts';
import { Caption } from '../ui/caption.ts';
import { Card } from '../ui/card.ts';
import { Chronicle } from '../ui/chronicle.ts';
import { h } from '../ui/dom.ts';
import { BootIntro } from '../ui/intro.ts';
import { Learn } from '../ui/learn.ts';
import { LessonView } from '../ui/lesson.ts';
import { Help, HubMenu, SettingsMenu } from '../ui/menus.ts';
import { Music } from '../ui/music.ts';
import { ALL_KEYS, PathView } from '../ui/path.ts';
import { ReportView } from '../ui/report.ts';
import { ClassroomView, Presenter } from '../ui/present.ts';
import { ProSheet } from '../ui/pro.ts';
import { Plan } from '../lib/plan.ts';
import { decodePlaylist, type Playlist } from '../../shared/lib/playlist.ts';
import { level } from '../../shared/lib/mastery.ts';
import { Period } from '../ui/period.ts';
import { Quiz } from '../ui/quiz.ts';
import { Reader } from '../ui/reader.ts';
import { SearchBox } from '../ui/searchbox.ts';
import { Timeline } from '../ui/timeline.ts';
import { TrailBar } from '../ui/trail.ts';
import { learnFocus, sameFocus, type LearnFocus } from './focus.ts';
import { hashSubject, hitSubject, linkSubjects, linkYear, type Arrival, type Subject } from './router.ts';
import { Shell } from './shell.ts';

/**
 * The app's flows: what opens what, and what closes when something else opens. The screen's frame lives in `Shell`,
 * links and search hits become subjects in `router.ts`, and the learning focus (`focus.ts`) is derived from the path,
 * the lesson and the chapter check and handed to the map, the timeline, the period line and the card.
 */
export class App {
  atlas: Atlas;
  progress = new Progress();
  timeline = new Timeline();
  card: Card;
  reader = new Reader();
  caption = new Caption(canSpeak());
  search = new SearchBox();
  chronicle = new Chronicle(this.progress);
  period = new Period();
  trail = new TrailBar();
  music = new Music();
  learn: Learn;
  settings!: SettingsMenu;
  hub!: HubMenu;
  help = new Help();
  report = new ReportView(this.progress);
  classroom = new ClassroomView();
  plan = new Plan();
  pro = new ProSheet(this.plan);
  presenter!: Presenter;
  quiz!: Quiz;
  lesson!: LessonView;
  path!: PathView;
  player!: StoryPlayer;
  shell!: Shell;
  ready = false;
  /** the learning focus the map, timeline, period line and card follow */
  focus: LearnFocus | null = null;
  /** the learner's own map is on */
  private mine = false;
  private inHashChange = false;

  constructor(private root: HTMLElement, stage: HTMLElement, private lowfx: boolean) {
    this.atlas = new Atlas(stage, lowfx);
    this.card = new Card({
      play: e => this.playStory(e),
      read: (w, title) => this.read(w, title),
      open: e => this.openEvent(e),
      present: e => { this.classroom.toggleEvent(e); return this.classroom.has(e); },
      inShow: e => this.classroom.has(e),
      era: id => this.openEra(id),
      place: p => this.openPlace(p),
      lesson: l => this.startLesson(l),
      trail: (tl, idx) => this.trail.start(tl, idx),
      compare: y => {
        const curSnap = this.period.compareYear != null ? phaseAt(this.period.compareYear)?.snap.id : null;
        const targetSnap = phaseAt(y)?.snap.id ?? null;
        this.setCompare(curSnap && curSnap === targetSnap ? null : y);
      },
      compareYear: () => this.period.compareYear,
      eraQuiz: id => this.startEraQuiz(id),
      close: () => this.closeCard(),
      learned: () => { if (this.learn.open) this.learn.render(); this.chronicle.relabel(); },
      journey: j => this.playJourney(j),
      person: p => this.openPerson(p),
      life: l => this.openLife(l),
      year: y => { this.timeline.setPlaying(false); this.timeline.set(y, true); },
    }, this.progress, lowfx);
    this.learn = new Learn(this.progress);
    this.learn.onProgressChange = () => {
      this.chronicle.relabel();
      if (this.card.open) this.card.render();
    };
  }

  async start(): Promise<void> {
    const link = readLink();
    // read before anything rewrites the address
    const showParams = new URLSearchParams(location.hash.slice(1));
    const subjects = linkSubjects(link);
    const year: Year = clampYear(linkYear(link) ?? load<number>('year', -221));
    const intro = new BootIntro(year, lang, this.lowfx);
    this.atlas.onEraProgress = (era, done, total) => intro.setProgress(era, done, total);
    await this.atlas.init(year, lang);
    this.watchContext(this.atlas.view.canvas);
    this.player = new StoryPlayer(this.atlas, {
      onCaption: (text, i, n) => this.caption.say(text, i, n),
      onYear: y => this.timeline.set(y, false, false),
      onState: s => {
        this.caption.state(s);
        if (s !== 'idle') this.root.classList.add('story-on');
        this.atlas.setStoryMode(s !== 'idle');
        this.card.setActive(s === 'idle');
        if (s === 'idle') { this.cine?.classList.remove('on'); this.root.classList.remove('cine-on'); }
      },
      onTitle: (text, sub, dur) => this.showTitle(text, sub, dur),
      speak,
    });
    this.quiz = new Quiz(this.atlas, this.progress);
    this.lesson = new LessonView(this.atlas, this.progress, {
      year: y => { this.timeline.setPlaying(false); this.timeline.set(y, true, false); this.atlas.setYear(y); },
      play: e => void this.playStory(e),
      open: e => this.openEvent(e),
      change: id => {
        if (!id) this.path.refresh();
        this.root.classList.toggle('lesson-on', !!id || this.lesson.open);
        writeLink(id ? { lesson: id, ...this.linkExtras() } : { year: this.timeline.year, ...this.linkExtras() });
        this.refocus();
      },
      moved: () => this.refocus(),
      check: c => this.startChapterCheck(c),
    });
    this.path = new PathView(this.progress, {
      lesson: (l, resume) => this.startLesson(l, resume),
      event: e => this.openEvent(e),
      preview: c => this.previewChapter(c),
      quiz: () => this.toggleQuiz(),
      check: c => this.startChapterCheck(c),
      play: e => { this.openEvent(e); void this.playStory(e); },
      mistakes: () => this.learn.onReviewMistakes(),
      review: due => this.startReview(due),
      report: () => this.report.toggle(true),
      maps: c => this.startChapterMaps(c),
      classroom: c => { if (c) this.classroom.fromChapter(c); this.classroom.toggle(true); },
      myMap: on => { this.refocus(); if (on) { this.closeCard(); void this.atlas.home(); } },
      course: () => this.learn.toggle(true),
      close: () => this.showPath(false),
      changed: () => this.refocus(),
    });
    const surf = load<Surface>('surface', 'paper');
    const params = new URLSearchParams(location.search);
    const surface: Surface = SURFACES.includes(params.get('map') as Surface) ? params.get('map') as Surface : SURFACES.includes(surf) ? surf : 'paper';
    this.atlas.setSurface(surface);
    this.settings = new SettingsMenu(this.atlas.layers, surface);
    this.hub = new HubMenu();
    this.presenter = new Presenter({
      event: e => this.presentEvent(e),
      play: e => void this.playStory(e),
      journey: j => { this.stopStory(); void this.playJourney(j); },
      exit: () => this.endPresent(),
    });
    this.classroom.onPresent = p => this.present(p);
    this.shell = new Shell(this.root, {
      atlas: this.atlas, timeline: this.timeline, period: this.period, hub: this.hub, settings: this.settings, search: this.search,
      trail: this.trail, caption: this.caption, music: this.music, lowfx: this.lowfx, dialogs: [this.learn.el, this.help.el, this.report.el, this.classroom.el, this.presenter.el, this.pro.el],
      // the stack's root is the learning path
      views: [
        { el: this.path.el, close: () => this.showPath(false) },
        { el: this.lesson.el, close: () => this.lesson.stop() },
        { el: this.quiz.el, close: () => this.quiz.toggle(false) },
        { el: this.card.el, close: () => this.closeCard() },
      ],
    }, {
      learn: () => this.showPath(!(this.path.open && this.shell.panel.top === this.path.el)),
      panelChanged: () => { this.refocus(); setTimeout(() => this.armBack(), 0); },
    });
    this.wire();
    if (link.compare != null) {
      const cmpYear = clampYear(link.compare);
      this.atlas.setCompareYear(cmpYear);
      this.period.setCompare(cmpYear);
    }
    this.timeline.set(year, true, false);
    this.atlas.onPin = e => this.openEvent(e);
    this.atlas.onPlace = p => this.openPlace(p);
    this.atlas.onPerson = p => this.openPerson(p);
    this.atlas.onLife = l => this.openLife(l);
    for (const s of subjects) this.navigate(s, 'arrive');
    const linked = subjects.length > 0 || link.year != null || link.compare != null;
    // a link that named nothing we know (#e=gone) or a year out of range: the address shows what is actually open
    const named = location.hash.length > 1 && /(^|[#&])(e|event|era|p|place|person|life|j|journey|lesson|trail)=/.test(location.hash);
    if ((named && !subjects.length) || (link.year != null && clampYear(link.year) !== link.year)) this.syncLink();
    // the learning path is the starting point: it opens on arrival unless a link names a subject or the learner closed it
    if (!linked && load<boolean>('pathOpen', true, v => typeof v === 'boolean')) this.showPath(true, false);
    this.ready = true;
    intro.finish(this.atlas, subjects.length > 0);
    // a shared classroom playlist (#show=…): open it for the teacher to start
    const sp = showParams;
    const show = decodePlaylist(sp.get('show'));
    if (show.length) { this.showPath(false, false); this.classroom.loadShared({ title: sp.get('st') ?? '', items: show }); this.classroom.toggle(true); }
  }

  // ------------------------------------------------------------------------------------------------ classroom

  /** Presentation mode: the map for a projector, one playlist item at a time. */
  present(p: Playlist): void {
    this.timeline.setPlaying(false);
    this.stopStory();
    this.closeCard();
    this.lesson.stop();
    if (this.quiz.open) this.toggleQuiz();
    this.showPath(false, false);
    this.shell.pop(null);
    this.root.classList.add('present-on');
    this.presenter.start(p);
  }

  private presentEvent(e: HistEvent): void {
    this.stopStory();
    this.timeline.set(e.year, true, false);
    this.atlas.setYear(e.year);
    this.atlas.select(e, true);
    this.progress.see(e.id);
  }

  private endPresent(): void {
    this.stopStory();
    this.atlas.select(null, false);
    this.root.classList.remove('present-on');
    writeLink({ year: this.timeline.year, ...this.linkExtras() });
  }

  // ------------------------------------------------------------------------------------------------ navigation

  /** Opens a subject: the one way in for deep links (`arrive`), a changed hash (`hash`) and search hits (`pick`). */
  navigate(s: Subject, how: Arrival = 'pick'): void {
    const view = this.atlas.view;
    switch (s.kind) {
      case 'event':
        this.openEvent(s.e, how !== 'arrive');
        if (how === 'arrive') view.jump({ lon: s.e.lon, lat: s.e.lat - 1.2, dist: 26, tilt: 0.85 });
        return;
      case 'era': return this.openEra(s.era.id, s.year);
      case 'place':
        if (how === 'arrive') { view.jump({ lon: s.p.lon, lat: s.p.lat - 1, dist: 18, tilt: 0.85 }); return this.openPlace(s.p, false); }
        if (how === 'pick') { this.atlas.flyTo({ lon: s.p.lon, lat: s.p.lat - 1, dist: 18, tilt: 0.85 }, 1.6); return this.openPlace(s.p, false); }
        if (s.year != null && s.year !== this.timeline.year) { this.timeline.set(s.year, true, false); this.atlas.setYear(this.timeline.year); }
        return this.openPlace(s.p);
      case 'person': return this.openPerson(s.p);
      case 'life':
        if (how === 'arrive') view.jump({ lon: s.x.lon, lat: s.x.lat - 0.6, dist: 14, tilt: 0.85 });
        return this.openLife(s.x);
      case 'lesson': return this.startLesson(s.l, s.resume);
      case 'trail': return this.trail.start(s.trail, s.stop);
      case 'journey':
        if (how === 'arrive') {
          // a visitor who starts doing something first keeps control: the linked journey then waits for them
          let touched = false;
          const mark = () => { touched = true; };
          window.addEventListener('pointerdown', mark, { once: true, capture: true });
          window.addEventListener('keydown', mark, { once: true, capture: true });
          setTimeout(() => {
            window.removeEventListener('pointerdown', mark, { capture: true });
            window.removeEventListener('keydown', mark, { capture: true });
            if (!touched) void this.playJourney(s.j);
          }, 600);
          return;
        }
        void this.playJourney(s.j);
        return;
      case 'year':
        this.timeline.setPlaying(false);
        if (how === 'pick') { this.timeline.set(s.y, true); return; }
        this.timeline.set(s.y, true, false);
        this.atlas.setYear(this.timeline.year);
        this.closeCard();
    }
  }

  /** Whether a subject is already what is shown (a hash written by the app itself must not reopen it). */
  private isCurrent(s: Subject): boolean {
    switch (s.kind) {
      case 'event': return s.e.id === this.card.event?.id;
      case 'era': return s.era.id === this.card.era?.id && (s.year == null || s.year === this.timeline.year);
      case 'place': return s.p.id === this.card.place?.p.id && s.year == null;
      case 'person': return s.p.id === this.card.person?.id;
      case 'life': return s.x.id === this.card.life?.id;
      case 'lesson': return s.l.id === this.lesson.id;
      case 'year': return false;
      default: return false;
    }
  }

  private onHash(): void {
    this.inHashChange = true;
    try {
      const l = readLink();
      if (l.lang && l.lang !== lang) setLang(l.lang);
      const cmp = l.compare != null ? clampYear(l.compare) : null;
      if (cmp !== this.period.compareYear) this.setCompare(cmp, false);
      // no trail in the link, or one that does not exist: the running trail ends
      if ((!l.trail || !TRAIL.get(l.trail)) && this.trail.active) this.trail.close(false);
      if (l.trail) {
        const trl = TRAIL.get(l.trail);
        if (trl && (this.trail.active?.trail.id !== trl.id || this.trail.active?.index !== (l.trailStop ?? 0))) {
          this.trail.start(trl, l.trailStop ?? 0);
          return;
        }
      }
      const s = hashSubject(l);
      if (s && !this.isCurrent(s)) this.navigate(s, 'hash');
    } finally {
      this.inHashChange = false;
    }
  }

  // ------------------------------------------------------------------------------------------------ learning focus

  /** Re-derives the learning focus and hands it on (only when it changed). */
  refocus(): void {
    if (!this.shell || !this.path || !this.lesson || !this.quiz) return;
    const f = learnFocus({
      path: { open: this.shell.panel.has(this.path.el), chapter: this.path.openChapterId },
      lesson: this.lesson.where,
      check: this.quiz.open && this.quiz.chapter ? this.quiz.chapter.id : null,
    });
    // the learner's own map: every event to know, marked by mastery, while the path is on top
    const mine = !f && this.path.myMap && this.shell.panel.top === this.path.el;
    if (sameFocus(f, this.focus) && mine === this.mine) return;
    this.focus = f;
    this.mine = mine;
    this.root.classList.toggle('my-map', mine);
    // a chapter keeps the living map; a lesson or a check clears the stage for what is being learned
    this.atlas.setFocus(f ? { events: f.events, current: f.current, quiet: f.mode !== 'chapter' }
      : mine ? { events: ALL_KEYS, quiet: true, plain: true } : null);
    this.timeline.setChapter(f?.chapter ?? null);
    this.period.setLearning(f?.chapter ?? null, this.timeline.detail);
    this.card.setTrack(f && f.events.length ? {
      ids: f.events,
      label: (i, m) => (f.mode === 'lesson' || !f.chapter ? t('cardLessonTrack', { i, m }) : t('cardTrack', { n: f.chapter.n, i, m })),
    } : null);
    this.root.classList.toggle('focus-on', !!f);
    if (f) this.root.dataset.focus = f.mode; else delete this.root.dataset.focus;
  }

  /** Shows a chapter on the map: the time of its first event to know, and the camera over all of them. */
  previewChapter(c: Chapter): void {
    this.timeline.setPlaying(false);
    this.timeline.set(EVENT.get(c.keys[0])?.year ?? c.span[0], true);
    const pts = c.keys.map(id => EVENT.get(id)).filter((e): e is HistEvent => !!e && e.lon > 70 && e.lon < 140 && e.lat > 15 && e.lat < 55);
    if (!pts.length) return;
    const lons = pts.map(e => e.lon), lats = pts.map(e => e.lat);
    const [lo0, lo1, la0, la1] = [Math.min(...lons), Math.max(...lons), Math.min(...lats), Math.max(...lats)];
    const span = Math.max(lo1 - lo0, (la1 - la0) * 1.4, 6);
    const dist = Math.min(60, Math.max(24, span * 2.2));
    // the side panel covers the map's left side on desktop: aim a little west so the events sit right of it
    const west = matchMedia('(max-width: 720px)').matches ? 0 : span * 0.2;
    void this.atlas.flyTo({ lon: (lo0 + lo1) / 2 - west, lat: (la0 + la1) / 2 - dist * 0.05, dist, tilt: 0.75 }, 1.6);
  }

  /** Opens a chapter on the path (from the timeline's chapter row or the period popover). */
  openChapter(c: Chapter): void {
    this.shell.pop(null);
    if (!this.path.open || this.shell.panel.top !== this.path.el) this.showPath(true);
    this.path.openChapter(c);
  }

  // ------------------------------------------------------------------------------------------------ wiring

  private wire(): void {
    const tl = this.timeline;
    tl.onYear = (y, final) => {
      // Coalesce into Atlas.frame() so setYear + layoutMarks always execute together before the browser paints.
      this.atlas.queueYear(tl.year);
      if (final) {
        this.saveYear(y);
        if (this.card.open && this.card.place) this.card.showPlace(this.card.place.p, y);
      }
    };
    tl.onEvent = e => this.openEvent(e);
    tl.onEra = id => this.openEra(id);
    tl.onChapter = c => this.openChapter(c);
    tl.onDetail = on => { this.root.classList.toggle('tl-detail-on', on); this.period.setLearning(this.focus?.chapter ?? null, on); };
    this.root.classList.toggle('tl-detail-on', tl.detail);
    this.period.setLearning(null, tl.detail);
    tl.onPlay = on => { if (on) { if (this.quiz.open) this.quiz.toggle(false); this.player.stop(); this.closeCard(); } };
    this.chronicle.onOpen = e => this.openEvent(e);
    this.period.onYear = y => { tl.setPlaying(false); tl.set(y, true); };
    this.period.onCompare = cy => this.setCompare(cy);
    this.period.onSwapCompare = () => this.swapCompare();
    this.period.onHold = p => this.atlas.hold(p);
    this.period.onPolity = p => this.atlas.flyToPolity(p);
    this.period.onEra = id => this.openEra(id);
    this.period.onDetails = () => this.shell.pop(this.period.view.hidden ? 'details' : null);
    this.period.onLearn = c => this.openChapter(c);
    this.period.onEvent = e => { this.shell.pop(null); this.openEvent(e); };
    this.search.onPick = x => { const s = hitSubject(x); if (s) this.navigate(s, 'pick'); };

    this.caption.onPause = () => this.player.toggle();
    this.caption.onSkip = () => this.player.skip();
    this.caption.onStop = () => this.stopStory(true);
    this.caption.onSpeed = v => (this.player.speed = v);
    this.caption.onVoice = on => { this.player.narrate = on; if (!on) speechSynthesis.cancel(); };

    this.learn.onLesson = (l, resume) => this.startLesson(l, resume);
    this.learn.onReviewMistakes = () => {
      this.timeline.setPlaying(false);
      this.stopStory();
      this.closeCard();
      this.lesson.stop();
      this.quiz.startMistakes();
      this.root.classList.add('quiz-on');
    };
    this.atlas.masteryOf = id => level(this.progress.mastery[id]);
    this.report.onEvent = e => this.openEvent(e);
    // free / Pro (a gated build only: VITE_PRO_GATE=1)
    this.quiz.beforeMaps = () => { if (!this.plan.can('mapread')) { this.pro.show('mapread'); return false; } this.plan.useMapRound(); return true; };
    this.report.beforeImage = () => { if (this.plan.can('reportImage')) return true; this.report.toggle(false); this.pro.show('reportImage'); return false; };
    this.progress.onMastery = () => this.atlas.repaintMastery();
    this.learn.onTest = (b, u) => { this.leaveForLesson(); this.lesson.startTest(b, u); };
    this.settings.onChange = (k, on) => this.atlas.setLayer(k, on);
    this.settings.onSurface = s => { this.atlas.setSurface(s); save('surface', s); };
    this.settings.onHelp = () => { this.shell.pop(null); this.help.toggle(true); };
    this.hub.onPlay = j => this.playJourney(j);
    this.hub.onTrail = trl => this.trail.start(trl, 0);
    this.trail.onStop = (_tl, stop) => {
      if (stop.event && EVENT.has(stop.event)) this.openEvent(EVENT.get(stop.event)!);
      else if (stop.place && PLACE.has(stop.place)) {
        this.timeline.set(stop.year, true, false);
        this.atlas.setYear(stop.year);
        this.openPlace(PLACE.get(stop.place)!);
      } else {
        this.timeline.set(stop.year, true);
      }
      this.syncLink();
    };
    this.trail.onClose = () => this.syncLink();
    this.quiz.onClose = () => { this.root.classList.remove('quiz-on'); this.path.refresh(); this.refocus(); };
    this.quiz.onYear = y => { this.timeline.set(y, true, false); this.atlas.setYear(y); };
    // a map-reading question: the headline, phase line, area and timeline would give the year away
    this.quiz.onBlind = on => { this.atlas.setBlind(on); this.root.classList.toggle('map-blind', on); if (on) this.shell.pop(null); };
    this.quiz.onOpenEvent = e => this.openEvent(e);
    // the reader unfolds beside the card and follows it to the next subject
    this.card.attach(this.reader.el);
    this.reader.onToggle = () => this.card.setReading(this.reader.current);
    this.card.onShow = () => {
      if (!this.reader.open) return;
      const w = this.card.wiki;
      if (w) this.reader.show(w.w, w.title, this.reader.readLang); else this.reader.close();
      this.card.setReading(this.reader.current);
    };

    this.period.mount(this.chronicle.el);
    this.timeline.onRender = y => { this.chronicle.update(y); this.period.setYear(y); this.path.setYear(y); };
    onLang(l => this.onLang(l));
    window.addEventListener('keydown', e => this.key(e));
    window.addEventListener('hashchange', () => { if (performance.now() > this.ignoreHashUntil) this.onHash(); });
    window.addEventListener('popstate', () => this.onPop());
    // after any click or key has opened something, arm Back for it
    for (const ev of ['click', 'keyup'] as const) window.addEventListener(ev, () => setTimeout(() => this.armBack(), 0), true);
  }

  // ------------------------------------------------------------------------------------------------ cinematic titles

  private cine?: HTMLElement;
  private cineTimer = 0;
  /** Cinematic title card over the scene (story openings, battles, new dynasties). */
  private showTitle(text: string, sub: string, dur: number): void {
    if (!this.cine) {
      this.cine = document.createElement('div');
      this.cine.className = 'cine';
      this.cine.setAttribute('aria-live', 'polite');
      this.root.append(this.cine);
    }
    const c = this.cine;
    c.replaceChildren(Object.assign(document.createElement('h2'), { textContent: text }));
    if (sub) c.append(Object.assign(document.createElement('p'), { textContent: sub }));
    c.classList.remove('on');
    void c.offsetWidth;
    c.classList.add('on');
    this.root.classList.add('cine-on');
    clearTimeout(this.cineTimer);
    this.cineTimer = window.setTimeout(() => { c.classList.remove('on'); this.root.classList.remove('cine-on'); }, Math.max(1200, dur * 1000));
  }

  // ------------------------------------------------------------------------------------------------ compare & links

  private setCompare(cy: Year | null, saveLink = true): void {
    const cmp = cy != null ? clampYear(cy) : null;
    this.atlas.setCompareYear(cmp);
    this.period.setCompare(cmp);
    if (this.card.open && this.card.era) this.card.render();
    if (saveLink) this.syncLink();
  }

  private swapCompare(): void {
    const cmp = this.period.compareYear;
    if (cmp == null) return;
    const oldYear = this.timeline.year;
    this.timeline.setPlaying(false);
    this.atlas.setCompareYear(oldYear);
    this.period.setCompare(oldYear);
    this.timeline.set(cmp, true);
  }

  private linkExtras(l = lang): { trail?: string; trailStop?: number; compare?: number; lang: Lang } {
    const tr = this.trail.active;
    return {
      trail: tr?.trail.id,
      trailStop: tr ? tr.index : undefined,
      compare: this.period.compareYear ?? undefined,
      lang: l,
    };
  }

  private saveYear(y: Year): void {
    save('year', y);
    if (this.card.place) writeLink({ place: this.card.place.p.id, year: y, ...this.linkExtras() });
    else if (this.card.era && y >= this.card.era.start && y <= this.card.era.end) writeLink({ era: this.card.era.id, year: y, ...this.linkExtras() });
    // an open person, life or lesson stays in the link (as syncLink writes it) while the year moves
    else if (this.card.era || this.card.person || this.card.life || (this.lesson.open && this.lesson.id && !this.lesson.id.startsWith('test:'))) this.syncLink();
    else if (!this.card.event) writeLink({ year: y, ...this.linkExtras() });
  }

  private syncLink(l = lang): void {
    const journey = this.player?.state !== 'idle' ? readLink().journey : undefined;
    const subject = journey ? { journey }
      : this.card.event ? { event: this.card.event.id }
      : this.card.era ? { era: this.card.era.id }
      : this.card.place ? { place: this.card.place.p.id, year: this.timeline.year }
      : this.card.person ? { person: this.card.person.id }
      : this.card.life ? { life: this.card.life.id }
      : this.lesson.open && this.lesson.id && !this.lesson.id.startsWith('test:') ? { lesson: this.lesson.id }
      : { year: this.timeline.year };
    writeLink({ ...subject, ...this.linkExtras(l) });
  }

  // ------------------------------------------------------------------------------------------------ the side panel's views

  private toggleQuiz(): void {
    if (!this.quiz.open) { this.timeline.setPlaying(false); this.stopStory(); this.closeCard(); this.learn.toggle(false); this.lesson.stop(); }
    this.quiz.toggle();
    this.root.classList.toggle('quiz-on', this.quiz.open);
    this.refocus();
  }

  /** Shows the learning path on top of the side panel (leaving a lesson, quiz or card), or closes it. `remember` keeps the
   * choice for the next visit. */
  showPath(on: boolean, remember = true): void {
    if (remember) save('pathOpen', on);
    if (!on) { this.path.toggle(false); return; }
    this.shell.pop(null);
    this.stopStory();
    this.closeCard();
    if (this.quiz.open) this.toggleQuiz();
    this.lesson.stop();
    this.learn.toggle(false);
    this.path.toggle(true);
  }

  /** A learning-path chapter's check, over the path; closing it returns to the path. */
  /** A round of 读图题 on a chapter's maps. */
  startChapterMaps(c: Chapter): void {
    this.timeline.setPlaying(false);
    this.stopStory();
    this.closeCard();
    this.lesson.stop();
    this.quiz.startMapChapter(c);
    this.root.classList.toggle('quiz-on', this.quiz.open);
  }

  /** Today's review from the learning path: the mistakes, then the events falling due. */
  startReview(due: string[]): void {
    this.timeline.setPlaying(false);
    this.stopStory();
    this.closeCard();
    this.lesson.stop();
    this.quiz.startReview(due);
    this.root.classList.add('quiz-on');
  }

  startChapterCheck(c: Chapter): void {
    if (!this.plan.can('chapterCheck', c.n)) { this.pro.show('chapterCheck'); return; }
    this.timeline.setPlaying(false);
    this.stopStory();
    this.closeCard();
    this.learn.toggle(false);
    this.lesson.stop();
    this.quiz.startChapter(c);
    this.root.classList.add('quiz-on');
    this.refocus();
  }

  startEraQuiz(eraId: string): void {
    this.timeline.setPlaying(false);
    this.stopStory();
    this.closeCard();
    this.learn.toggle(false);
    this.lesson.stop();
    this.quiz.startEra(eraId);
    this.root.classList.add('quiz-on');
    this.refocus();
  }

  /** Leaves the course picker for the lesson scene. */
  startLesson(l: Lesson, resume = false): void {
    this.leaveForLesson();
    this.lesson.start(l, resume);
  }

  private leaveForLesson(): void {
    this.learn.toggle(false);
    this.stopStory();
    this.closeCard();
    if (this.quiz.open) this.toggleQuiz();
    this.timeline.setPlaying(false);
  }

  private stopTimelineAndQuiz(): void {
    this.timeline.setPlaying(false);
    if (this.quiz.open) this.quiz.toggle(false);
  }

  openEvent(e: HistEvent, fly = true): void {
    this.stopTimelineAndQuiz();
    if (this.player.event?.id !== e.id) this.stopStory();
    this.timeline.set(e.year, true, false);
    this.atlas.setYear(e.year);
    this.atlas.select(e, fly);
    this.timeline.select(e.id);
    this.chronicle.select(e.id);
    this.card.showEvent(e);
    this.progress.see(e.id);
    this.root.classList.add('card-on');
    writeLink({ event: e.id, ...this.linkExtras() });
  }

  openEra(id: string, targetYear?: Year): void {
    const era = ERAS.find(x => x.id === id) as Era | undefined;
    if (!era) return;
    this.stopTimelineAndQuiz();
    this.stopStory();
    this.atlas.select(null);
    this.timeline.select(null);
    const defaultY = Math.max(era.start, Math.min(era.end, era.start < -10000 ? era.start : era.start + 1));
    const y = targetYear != null && targetYear >= era.start && targetYear <= era.end ? targetYear : defaultY;
    this.timeline.set(y, true, false);
    this.atlas.setYear(y);
    const cap = era.capital ? PLACE.get(era.capital) : undefined;
    if (cap) this.atlas.flyTo({ lon: cap.lon + 2, lat: cap.lat - 3, dist: 50, tilt: 0.6 }, 1.6);
    this.card.showEra(era);
    this.root.classList.add('card-on');
    writeLink({ era: era.id, ...(targetYear != null ? { year: y } : {}), ...this.linkExtras() });
  }

  openPlace(p: Place, fly = true): void {
    this.stopTimelineAndQuiz();
    this.stopStory();
    this.atlas.select(null);
    this.timeline.select(null);
    if (fly) this.atlas.flyTo({ lon: p.lon, lat: p.lat - 0.6, dist: Math.min(this.atlas.view.pose().dist, 22), tilt: 0.85 }, 1.2);
    this.card.showPlace(p, this.timeline.year);
    this.atlas.focus(`place:${p.id}`, [p.lon, p.lat]);
    this.root.classList.add('card-on');
    writeLink({ place: p.id, year: this.timeline.year, ...this.linkExtras() });
  }

  /** A building, custom, food or figure standing on the map: jumps time into its dynasty, flies there and opens its card. */
  openLife(x: LifeItem): void {
    this.stopTimelineAndQuiz();
    this.stopStory();
    this.atlas.select(null);
    this.timeline.select(null);
    const era = ERAS.find(e => e.id === x.era);
    if (era && (this.timeline.year < era.start || this.timeline.year > era.end)) {
      const y = Math.round((era.start + Math.min(era.end, 2020)) / 2);
      this.timeline.set(y, true, false);
      this.atlas.setYear(y);
    }
    this.atlas.flyTo({ lon: x.lon, lat: x.lat - 0.6, dist: Math.min(this.atlas.view.pose().dist, 14), tilt: 0.85 }, 1.2);
    this.card.showLife(x);
    this.atlas.focus(`life:${x.id}`, [x.lon, x.lat]);
    this.root.classList.add('card-on');
    writeLink({ life: x.id, ...this.linkExtras() });
  }

  openPerson(p: Person): void {
    // a figure who stands on the map as one of the dynasty's people has a single card: theirs there
    const li = LIFE.find(x => x.person === p);
    if (li) return this.openLife(li);
    this.stopTimelineAndQuiz();
    this.stopStory();
    this.atlas.select(null);
    this.timeline.select(null);
    this.card.showPerson(p);
    this.atlas.focus(`person:${p.id}`);
    this.root.classList.add('card-on');
    writeLink({ person: p.id, ...this.linkExtras() });
  }

  closeCard(): void {
    this.stopStory();
    this.card.hide();
    this.reader.close();
    this.atlas.select(null);
    this.timeline.select(null);
    this.chronicle.select(null);
    this.root.classList.remove('card-on');
    // back to the lesson underneath, if any
    const id = this.lesson?.open ? this.lesson.id : null;
    writeLink(id && !id.startsWith('test:') ? { lesson: id, ...this.linkExtras() } : { year: this.timeline.year, ...this.linkExtras() });
  }

  // ------------------------------------------------------------------------------------------------ stories

  async playStory(e: HistEvent): Promise<void> {
    this.stopTimelineAndQuiz();
    this.reader.close();
    this.caption.show(true);
    this.root.classList.add('story-on');
    // the card's Play button fades out; keep keyboard focus on the visible story controls
    this.caption.pauseBtn.focus({ preventScroll: true });
    const done = await this.player.play(e);
    if (done) {
      this.progress.watch(e.id);
      this.progress.see(e.id);
      if (this.card.event?.id === e.id) this.card.render();
      this.chronicle.relabel();
      setTimeout(() => {
        if (this.player.state !== 'idle') return;
        const hadFocus = this.caption.el.contains(document.activeElement);
        this.caption.show(false);
        this.root.classList.remove('story-on');
        if (hadFocus) this.card.el.querySelector<HTMLElement>('[data-act=play]')?.focus({ preventScroll: true });
      }, 2500);
    }
  }

  /** Plays a journey (traveller crossing the 3D map stop by stop). */
  async playJourney(j: Journey): Promise<void> {
    this.stopTimelineAndQuiz();
    this.closeCard();
    this.learn.toggle(false);
    this.reader.close();
    this.caption.show(true);
    this.root.classList.add('story-on');
    this.caption.pauseBtn.focus({ preventScroll: true });
    writeLink({ journey: j.id, ...this.linkExtras() });
    const done = await this.player.playSteps(journeyStory(j));
    // finished or stopped (not replaced by another story or a card): the address returns to the year
    if (readLink().journey === j.id && this.player.state === 'idle') writeLink({ year: this.timeline.year, ...this.linkExtras() });
    if (done) setTimeout(() => {
      if (this.player.state === 'idle') {
        this.caption.show(false);
        this.root.classList.remove('story-on');
      }
    }, 2500);
  }

  /** `back`: the user stopped the story themselves, so the map returns to the card event's own year. */
  stopStory(back = false): void {
    back &&= !!this.player && this.player.state !== 'idle' && !!this.player.event && this.player.event === this.card.event;
    this.player?.stop();
    const hadFocus = this.caption.el.contains(document.activeElement);
    this.caption.show(false);
    this.root.classList.remove('story-on');
    if (hadFocus) this.card.el.querySelector<HTMLElement>('[data-act=play]')?.focus({ preventScroll: true });
    // the selected event's model was cleared by the story; restore it (and, when stopped mid-way, the event's year,
    // so the map is not left in an earlier/later period than the card)
    const e = this.card.event;
    if (e) {
      if (back && this.timeline.year !== e.year) { this.timeline.set(e.year, true, false); this.atlas.setYear(e.year); }
      this.atlas.select(e, false);
    }
  }

  /** A lost GPU context (driver reset, too many tabs): say so, and offer a reload if three.js cannot restore it. */
  private watchContext(canvas: HTMLCanvasElement): void {
    let note: HTMLElement | null = null, timer = 0;
    canvas.addEventListener('webglcontextlost', () => {
      note?.remove();
      note = h('div', { class: 'nogl gl-lost', role: 'alert' }, h('p', { text: t('glLost') }));
      this.root.append(note);
      timer = window.setTimeout(() => note?.append(h('button', { type: 'button', class: 'btn primary', text: t('reload'), onclick: () => location.reload() })), 4000);
    });
    canvas.addEventListener('webglcontextrestored', () => {
      clearTimeout(timer);
      note?.remove();
      note = null;
    });
  }

  /** The card's W button: unfolds its article beside the card, or folds it back. */
  read(w: Wiki, title: string): void {
    const cur = this.reader.current;
    if (cur && cur.zh === w.zh && cur.en === w.en) this.reader.close();
    else this.reader.show(w, title, lang);
  }

  // ------------------------------------------------------------------------------------------------ keyboard & language

  /** One step back: popovers and dialogs first, then the story, then the panel's stack one view at a time (a trail
   * before its root). Esc and the browser's (phone's) Back button both take it. */
  private back(): void {
    if (this.shell.popOpen) this.shell.pop(null);
    else if (!this.help.el.hidden) this.help.toggle(false);
    else if (this.report.open) this.report.toggle(false);
    else if (this.classroom.open) this.classroom.toggle(false);
    else if (this.pro.open) this.pro.toggle(false);
    else if (this.learn.open) this.learn.toggle(false);
    else if (this.reader.open && this.shell.panel.top === this.card.el) this.reader.close();
    else if (this.player.state !== 'idle') this.stopStory(true);
    else if (this.trail.active && (!this.shell.panel.open || this.shell.panel.top === this.path.el)) this.trail.close(true);
    else this.shell.panel.pop();
  }

  /** Something is open that Back can close. */
  private get canGoBack(): boolean {
    return this.shell.popOpen || this.shell.panel.open || !this.help.el.hidden || this.report.open || this.classroom.open
      || this.pro.open || this.learn.open || this.player.state !== 'idle' || !!this.trail.active;
  }

  /** While something is open, one extra history entry stands in front of the page, so Back closes it instead of
   * leaving the app; the address keeps following what is open (writeLink replaces the current entry). */
  private backArmed = false;
  private ignoreHashUntil = 0;
  private armBack(): void {
    if (this.backArmed || !this.ready || !this.canGoBack) return;
    history.pushState({ agesBack: true }, '', location.href);
    this.backArmed = true;
  }
  private onPop(): void {
    if (!this.backArmed) return;
    this.backArmed = false;
    // everything was already closed another way: this Back is meant for the page before
    if (!this.canGoBack) { history.back(); return; }
    // the step back may also change the hash: that is us, not a new link
    this.ignoreHashUntil = performance.now() + 400;
    this.back();
    this.syncLink();
    setTimeout(() => this.armBack(), 0);
  }

  private key(e: KeyboardEvent): void {
    this.help.focus.trap(e);
    this.report.focus.trap(e);
    this.classroom.focus.trap(e);
    this.pro.focus.trap(e);
    this.learn.focus.trap(e);
    const tag = (e.target as HTMLElement).tagName;
    const modal = !this.help.el.hidden || this.report.open || this.classroom.open || this.pro.open || this.learn.open;
    // typing goes to the field — except Esc inside a dialog's field, which still closes the dialog
    if ((tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') && !(modal && e.key === 'Escape')) return;
    // presenting: arrows and a clicker's Page Up / Down move through the playlist, P plays the story, Esc leaves
    if (this.presenter.on && !e.altKey && !e.metaKey && !e.ctrlKey) {
      const k = e.key;
      if (k === 'Escape') { if (this.player.state !== 'idle') this.stopStory(); else this.presenter.stop(); }
      else if (k === 'ArrowRight' || k === 'PageDown' || k === 'ArrowDown') this.presenter.step(1);
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') this.presenter.step(-1);
      else if (k === 'p' || k === 'P' || (k === 'Enter' && !(e.target as HTMLElement).closest('button'))) this.presenter.play();
      else if (k === ' ' && this.player.state !== 'idle') this.player.toggle();
      else return;
      e.preventDefault();
      return;
    }
    if (e.key === '/') { this.search.input.focus(); e.preventDefault(); return; }
    if (e.key === 'Escape') { this.back(); return; }
    // a dialog is open: the map, timeline and cards behind it don't take keys
    if (modal) return;
    if ((e.key === '[' || e.key === ']') && !e.altKey && !e.metaKey && !e.ctrlKey && this.trail.active) {
      this.trail.step(e.key === ']' ? 1 : -1);
      e.preventDefault();
      return;
    }
    if ((e.key === 'r' || e.key === 'R') && !e.altKey && !e.metaKey && !e.ctrlKey && this.player.state === 'idle') {
      void this.atlas.home();
      return;
    }
    if (e.key === ' ' && !(e.target as HTMLElement).closest('button')) {
      if (this.player.state !== 'idle') this.player.toggle(); else this.timeline.setPlaying(!this.timeline.playing);
      e.preventDefault();
      return;
    }
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.altKey && !e.metaKey && !e.ctrlKey) {
      if ((e.target as HTMLElement).closest('.tl-track')) return;
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      if (this.lesson.open && !this.card.open && this.player.state === 'idle') this.lesson.step(dir);
      else if (this.card.event) {
        // along the chapter or lesson being learned when the event is on it, else through every event
        const next = this.card.neighbor(dir);
        if (next) this.openEvent(next);
      } else if (this.player.state === 'idle' && !this.quiz.open) {
        if (e.shiftKey) { this.timeline.setPlaying(false); this.timeline.set(addYears(this.timeline.year, dir * 10), true); } else this.timeline.step(dir);
      }
      e.preventDefault();
    }
  }

  private onLang(l: Lang): void {
    this.atlas.setLang(l);
    this.shell.relabel();
    this.timeline.relabel();
    this.search.relabel();
    this.card.render();
    if (this.learn.open) this.learn.render();
    this.settings.render();
    this.hub.render();
    this.help.render();
    this.report.render();
    this.classroom.render();
    this.pro.render();
    this.presenter.render();
    this.quiz.relabel();
    this.lesson.relabel();
    this.path.refresh();
    this.chronicle.relabel();
    this.period.relabel();
    this.trail.relabel();
    this.reader.relabel();
    this.music.relabel();
    this.caption.relabel();
    if (!this.inHashChange) this.syncLink(l);
  }

  // ------------------------------------------------------------------------------------------------ test hooks

  /** Test/automation hook: CSS-pixel position of a map point. */
  screenOf(lon: number, lat: number): { x: number; y: number } {
    const v = this.atlas.view.project(this.atlas.geo.pos(lon, lat, 0));
    const r = this.atlas.view.canvas.getBoundingClientRect();
    return { x: r.left + v.x, y: r.top + v.y };
  }

  /** Test/automation hooks. */
  state() {
    const v = this.atlas.view;
    return {
      ready: this.ready, year: this.timeline.year, lang, event: this.card.event?.id ?? null, era: this.card.era?.id ?? null,
      story: this.player.state, snapshot: this.atlas.snapshot?.id ?? null, frames: v.frames, pose: v.pose(),
      fx: { story: this.atlas.fx.count('story'), event: this.atlas.fx.count('event'), base: this.atlas.fx.count('base'), scenery: this.atlas.fx.count('scenery'), works: this.atlas.fx.count('works') },
      captions: this.caption.el.querySelector('.cap-t')?.textContent ?? '',
      focus: this.focus ? { mode: this.focus.mode, chapter: this.focus.chapter?.id ?? null, events: this.focus.events, current: this.focus.current } : null,
    };
  }
}

