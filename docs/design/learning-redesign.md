# Learning-first redesign

**Goal:** make 长河 Ages the easiest way to *learn* Chinese history, for anyone from a curious adult to a student
starting from zero, while keeping the 3D atlas as the stage and keeping exam review as one use among others.

This document records the review of the app as of v0.1 (Nov 2026), the design that answers it, what has been built
(phases A–C), and what is still planned.

## 1. Review: what got in the learner's way

Reviewed on desktop (1440×900) and phone (412×860), in both languages.

| # | Finding | Effect on a learner |
|---|---|---|
| 1 | **No starting point.** The app opened on a random year (last visited, else 221 BCE) on a full relief map; nothing said what to do. | A newcomer has 928 events, 28 periods and 43 journeys and no idea where to begin. Most people pan around and leave. |
| 2 | **Learning was buried.** The course and quiz sat behind an unlabeled *grid* icon (the "Study hall"); the period details behind an unlabeled *list* icon; settings behind *sliders*. | The app's most useful features were the hardest to find. Icons alone do not say "learn here". |
| 3 | **Organised by data type, not by goal.** Course, quiz, journeys, thematic trails, chronicle, period details, compare, lessons and unit tests were separate entry points of equal weight. | Too many choices with no order; the learner has to know the app's model before using it. |
| 4 | **Textbook framing.** Lessons were named and grouped by book (七上, 八下, 高中纲要) and unit. | Meaningful to a Chinese middle-school student; opaque to anyone else, and even students think in dynasties, not volumes. |
| 5 | **Text on the relief.** The headline, reign, area figures, line key and timeline axis were set straight on a saturated relief with only a faint scrim; popovers were translucent. | Low contrast: the reign line and the axis labels were often unreadable; popovers showed the map through their text. |
| 6 | **A barcode timeline.** 928 event ticks plus 173 phase hairlines drew over 11 px dynasty labels. | Powerful for experts, noise for learners; the dynasties (the thing to learn first) were the hardest thing to read. |
| 7 | **Cut-corner flat slabs.** A distinctive look, but no elevation: panels, popovers and the map read as one plane. | Hard to tell what is interactive or on top. |

What already worked and is kept: the full-screen map; the map-driving lessons with 随堂检测, scores, resume and
mistake review; stories and journeys; bilingual content; deep links; offline support.

## 2. Principles

1. **One obvious next step.** Every screen has a single primary action, and it is the next thing to learn.
2. **Tell history as a story in time order.** The backbone is chronological chapters (dynasties), not books.
3. **See it, then check it.** Each chapter shows events on the map (with animations), then asks a few questions.
4. **Words, not only icons.** The main tools carry a label. Icons alone are kept for universal actions (search, settings, close).
5. **Readable over the map.** Anything you read sits on a calm, solid paper card. The map is the stage, not the background for text.
6. **Depth on demand.** The chronicle, the 928-event barcode, the textbook units, compare and layers stay available but never come first.

## 3. Information architecture

```
Top bar      [ 学习 Learn ] [ 本时期 This period ] [ 探索 Explore ] | search · settings · 中/EN
Left panel   Learning path ─┬─ Continue / Start (primary)
                            ├─ 10 chapters (big idea · events to know · map lessons · progress)
                            └─ Practice & review (quiz · mistakes · by textbook)
             ↳ stacks over it: lesson ▸ quiz ▸ event / era / place / person card (Esc steps back down)
Popovers     This period (phase, polities, chronicle, compare) · Explore (journeys, trails, course, quiz) · Settings
Map + HUD    headline card (dynasty · year · reign) · area card · line key card · timeline card
```

* **Learn** is the home. It opens on arrival and stays open across visits until the learner closes it (the choice is remembered). A deep link that names a subject or a year (`#e=`, `#p=`, `#lesson=`, `#y=` …) opens that instead, so shared map links are not covered.
* **This period** (the former 时期详情) answers "what is happening at this moment on the map?".
* **Explore** (the former study hall) holds the free-roaming material: journeys and thematic trails, plus the course and quiz for people who look there.

### The ten chapters (`src/shared/data/chapters.ts`)

| # | Chapter | Years | Map lessons |
|---|---|---|---|
| 1 | 文明的曙光 The dawn of civilisation | to 2070 BCE | g7a-1 |
| 2 | 夏商周 The first states | 2070–221 BCE | g7a-2 |
| 3 | 秦汉 One empire | 221 BCE–220 | g7a-3 |
| 4 | 分裂与交融 Division and blending | 220–589 | g7a-4 |
| 5 | 隋唐 A golden age | 589–907 | g7b-1 |
| 6 | 宋元 Rivals and reunion | 907–1368 | g7b-2 |
| 7 | 明清 The shape of China | 1368–1840 | g7b-3 |
| 8 | 近代 Crisis and reform | 1840–1912 | g8a-1…3 |
| 9 | 革命与抗战 Revolution and war | 1912–1949 | g8a-4…8 |
| 10 | 新中国 The People's Republic | 1949–today | g8b-1…6 |

Each chapter has a one-sentence **big idea**, 5–6 **events to know** (each opens its card; ▶ marks a 3D story) and its
**map lessons**. The chapters reuse the 21 middle-school lessons, which already run in time order. A chapter is done
when all its lessons are passed (≥ 60 %). The high-school lessons and unit tests stay under *Practice › By textbook*.
Integrity is checked by `tests/unit/chapters.test.ts`: chapters are contiguous, bilingual, point at real events, eras
and lessons, and cover every middle-school lesson once.

## 4. Design system v2: "paper cards"

Defined at the end of `src/client/styles.css`. It overrides the older slab rules, so it can be adopted gradually.

| Token | Value | Use |
|---|---|---|
| `--panel` | warm paper at 97 % opacity (ink map: 95 %) | every card, popover and dialog |
| `--r` / `--r-s` / `--r-pill` | 12 / 8 / 999 px | cards / controls / chips and badges |
| `--shadow-1` / `--shadow-2` | soft two-layer shadows | HUD cards / floating panels |
| `--card-line` | 8 % ink hairline (inset outline) | separates a card from a light map |
| `--zhu` | vermilion | the one primary action, selection, "on the map" |
| `--ok` | green | completion (chapter ✓, passed lesson) |

Rules:

* **Elevation.** Map → HUD cards (`shadow-1`) → panel and popovers (`shadow-2`) → dialogs.
* **Tool buttons.** 36 px high with icon + word. On phones only *Learn* keeps its word.
* **Readouts.** The headline, area figures, line key and timeline each sit on their own card; no scrims.
* **Timeline.** 20 px dynasty bands with 12 px names. Minor chronicle ticks show only on hover or focus, and phase hairlines are dimmed.
* **Focus.** A 2 px vermilion focus ring on every control.

## 5. Refactor plan

### Phase A (done in this change)
* `chapters.ts` data plus unit tests; the `PathView` side-panel view (`src/client/ui/path.ts`); auto-open on arrival; Esc and close remembered.
* Labeled toolbar (Learn · This period · Explore); Explore replaces the grid icon; the old class names (`.b-hub`, `.b-details`) are kept, so tests and links still work.
* Design system v2 layer and phone layout (toolbar row, then headline card).
* E2E test `learning path: opens on arrival, previews a chapter and starts its lesson`.

### Phase B: see it, know it, learn it, check it (done)
Each open chapter now reads top to bottom as a learning sequence:
* **See it.** A "Watch the opening story" button plays the chapter's first event to know that has a 3D story (every chapter has one; checked by a unit test).
* **Know it.** Each event to know shows a one-line **why it matters** (`WHY` in `chapters.ts`, 58 bilingual lines). The same line appears as a *Why it matters* box on the event's card, wherever the card is opened from.
* **Learn it.** The chapter's map lessons, with best scores.
* **Check it.** A 5-question **chapter check** (`makeQuiz` with `range` and `prefer`: the chapter's years, its events to know first), stored as `scores['chapter:<id>']`. A chapter is done when its check is passed (≥ 60 %) or all its lessons are. When every lesson is passed, the main button becomes "take the check".
* **Spaced review.** A missed question answered right leaves the queue and comes back after 1, 3, then 7 days. After that it counts as learned, and a miss resets it (`Progress.spaced`, `promoteDue`). The path shows "N questions are due for review" under the main button. The schedule is included in progress backups.

### Phase C: focus and depth (done)
A second review (Nov 2026, desktop, phone and Chinese) found that the remaining problems were less about the look than
about what the learner is asked to look at. What changed:

* **Deeper imperial chapters.** The textbook gives 2070 BCE – 1840 (≈ 800 events) six lessons and 1840 – today
  fourteen. Chapters 2–7 now have their own short lessons (`src/shared/data/lessons/ch<n>.ts`, ids `ch<n>-<k>`, 2–4 per
  chapter, 5–9 steps, ≤ 10 min), in time order, together teaching every event to know. The textbook lessons stay in
  *Practice › By textbook*. Rules: `tests/unit/path-lessons.test.ts` (shared lesson rules in `tests/unit/lesson-rules.ts`).
* **Learning focus** (`src/client/app/focus.ts`). Derived, never stored, from the path's open chapter, the running
  lesson and the chapter check, and handed to everything that shows history:
  * *map* (`Atlas.setFocus`): the chapter's events to know (or the lesson's events, in teaching order) get numbered pins
    that match the numbers in the panel; other pins fade; the current step's event pulses. In a lesson or a check the
    dynasty's figures and buildings step aside; a check numbers nothing, so the map gives no answers away. Opening a
    chapter frames all its events.
  * *timeline*: a row of the ten chapters above the dynasties (simple mode); while learning, the track zooms to the
    chapter (*All history* widens it again) and playback runs through the chapter. Narrow dynasty bands fall back to a
    short name ("W. Han" → "Han"), so every major dynasty is labelled.
  * *the line under the map*: "Chapter 5 · Tang dynasty" in the simple mode; the territorial phase title only in the
    detailed mode. The simple mode also drops the neighbours' area ranking from the HUD.
  * *card*: opened from a chapter or lesson, ← → step through its events ("Chapter 5 · 2/6") instead of all 928.
* **Lessons you do, not only read.** Every three steps a quick, unscored recall question about a step just read; the
  step's story is its main action; the header reads "Chapter 5 · lesson 2"; after a chapter's last lesson the next step
  is its chapter check.
* **Plain words first.** *This period* opens with the chapter (title, big idea, events to know, *Learn this chapter*),
  then the borders right now; map sources, the world at the time and compare sit in a fold at the foot. The event card
  folds its textbook, world and sources sections.
* **Explore** holds journeys and thematic trails only; the course and the quiz live on the path.
* **Shell split.** `main.ts` is the boot (≈ 60 lines). `app/app.ts` holds the flows with one `navigate(subject)` entry for
  deep links, hash changes and search; `app/router.ts` turns links and hits into subjects; `app/shell.ts` builds the
  toolbar, HUD and popovers and fits the panel. `Panel` is an explicit stack rooted at the path: views register how they
  close and Esc calls `pop()`; the stack order still follows the views' `hidden` (views open themselves).
* Timeline modes (Simple / Detailed) from the earlier plan are done.

Still open: migrating the old slab component CSS to the v2 tokens and deleting the overrides; a content review of the
new chapter lessons by a history teacher.

### Phase D: beyond the textbook
* An optional **world lane** on the timeline (phase 2 roadmap) shown as context inside chapters ("meanwhile in Rome…").
* **Glossary chips** (分封制, 郡县制, 科举…) with a one-line definition, linked from chapter ideas and cards.
* **Teacher playlists** (roadmap) built on chapters: a playlist is an ordered list of chapter keys and lesson steps.

## 6. Measuring success
* Share of first visits that start chapter 1 (target: more than 40 %) and that finish a lesson.
* Median time to first meaningful action (opening a chapter, an event or a story): under 10 s.
* Returning learners who use **Continue**.
* Mistake-review completion rate.
