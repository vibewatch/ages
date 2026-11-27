# What people will pay for — and what an LLM cannot replace

*Written 2026-11-26. Tracking issue: see "Moat and monetization" on GitHub.*

## 1. What an LLM already gives away

A student can ask 豆包, Kimi, DeepSeek or ChatGPT, for free, to summarise an event, write a figure's biography, explain a cause
and effect, make ten multiple-choice questions or outline an essay. The answers are fluent, usually right and instant. Any
part of Ages that is **text about history** — event summaries, key-point lists, person cards, the Wikipedia reader,
generic quizzes — is worth close to nothing on its own, and we must not try to charge for it. It stays free, as the
surface people find and share.

## 2. What an LLM cannot replace (our moat)

| Moat | Why a chat model cannot do it | Where Ages already has it |
|---|---|---|
| **Spatio-temporal truth** (时空观念) | A model cannot draw a correct border for 1127 or show how Tang's frontier moved phase by phase; generated maps are wrong in ways students cannot detect. 时空观念 is the first of the five 核心素养 in the 2022 课标, and 中考/高考 papers carry 历史地图题. | 173 dated territory snapshots on real terrain, place names by period, area curve, ghost borders, compare. |
| **Embodied, spatial memory** | Text is read and forgotten; scrubbing time, watching borders grow and clicking the map to answer build spatial memory (the "memory palace" effect). | Timeline, 3D stories, journeys, find-it-on-the-map questions. |
| **Map-native assessment** | A chat cannot ask "click where 澶渊 is" or "which period is this unlabelled map?" and grade it by distance. | where / locate / order questions; **missing: 读图题** (identify a period or polity from the map). |
| **Verified, textbook-aligned content** | Parents and teachers pay for *correct and on the syllabus*; models hallucinate dates and mix up textbook wording. | 统编版 units, 考点, sources and uncertainty notes; **weak: new path lessons are unreviewed, sources are partial.** |
| **A learning state that persists** | A chat does not know what this child has mastered, what is due for review, or how far they are from the exam. | Path progress, mistakes, spaced review; **weak: local-only, no mastery view, no report.** |
| **The classroom** | A teacher cannot project a chat as a shared, controllable map lesson, or see a class's results. | Lessons and stories work on a projector; **missing: presentation mode, playlists, class results.** |

The rule that follows: **charge for outcomes and for the map, never for the words.** An LLM can sit *inside* the product
(for example explaining a wrong answer), but nothing we charge for may be something a chat window does as well.

## 3. What to strengthen, in order

1. **读图题 — map-reading drills** (done: period, highlighted polity, which came first, what changed between two maps, drawing a border from memory, a round per chapter). Identify the period of an unlabelled map, name a highlighted polity, tell which of
   two maps came first, say what changed between two phases. Exam-relevant, impossible in chat, built from data we have.
2. **Mastery map.** Every key event and phase has a mastery level (seen → practised → mastered → due); the map itself
   lights up as the learner masters it, and "today's review" is one tap. This is what makes a learner come back daily.
3. **Teacher presentation mode and playlists.** Ordered lessons/stories/journeys with large captions for the projector,
   shareable by link. Teachers are both a paying segment and our distribution channel.
4. **Content trust.** Every path-lesson step cites a source; flagged facts are reviewed; a visible "checked against
   统编版" mark. Trust is the main reason to pay rather than ask a chat.
5. **Progress report.** A shareable weekly report (chapters done, mastery, weak areas) — the artefact a parent pays for.
6. **Commercial-clean data.** Done (2026-11-27): all maps and content are our own or public domain (`NOTICE.md`).

## 4. Pricing strategy

**Free forever (acquisition):** the atlas, timeline, all events and stories, journeys, the first chapters of the learning
path with their lessons, the basic quiz. It must stay impressive enough to be shared by teachers and in WeChat groups.

**Ages Pro — learners (paid by parents):** the full 读图题 bank and exam sprint plans, mastery map and spaced review across
devices (account + sync), weekly progress report, all chapter checks. Indicative price: ¥15/month, ¥98/year, or a
¥49 exam-season pack (中考 / 高考 sprint) — season packs fit how Chinese families buy.

**Ages for Teachers:** presentation mode and local playlists free (to seed adoption); paid tier (≈ ¥199/teacher/year)
adds class codes, assignments and class results. **School licence** per school per year, sold once teachers already use
it.

**International / bilingual:** the app is fully bilingual — a rare asset for overseas Chinese families, weekend Chinese
schools and IB/AP students. This market avoids the domestic compliance burden and pays by card (Stripe); indicative
US$4.99/month or US$29/year.

### Constraints that shape the plan

* **GPL-3.0.** The client code is GPL and public. Revenue therefore comes from
  services (account, sync, reports, class results, hosted premium item banks) running on our own server, plus the brand —
  not from hiding client code. Premium item banks should live outside this repository and be served to entitled users.
* **Non-commercial GIS data:** none remains (all maps and content are our own or public domain).
* **China compliance.** Selling to K-9 students touches 双减 rules and the 教育移动互联网应用程序备案; a web service needs
  ICP 备案. Selling through teachers/schools and the international edition first lowers this risk. Get advice before
  launching domestic consumer payments.
* **Static app today.** Accounts, sync and payments need a backend; that is a separate decision (provider, region,
  payment rails) and is not started until the free product proves retention.

## 5. Sequence

1. Build the moat features in the free product (读图题, mastery map, presentation mode, content trust) and measure
   retention.
2. Draw the free/Pro line in the client behind an entitlement check (no payment yet), so the paid experience can be tried.
3. Backend: accounts, sync, payment (international first), then teacher classes.

## 6. Status (2026-11-27)

| Issue | State |
|---|---|
| #3 读图题 | shipped: period / polity / which came first / what changed / 画疆域 (draw the border), a round per chapter |
| #4 Mastery | shipped: levels, Today's review, My map |
| #5 Classroom | shipped: playlists, presentation mode, `#show=` links; classes and results need the backend |
| #6 Content trust | sources on every path-lesson step; flagged facts reviewed; a teacher's review still advised |
| #7 Weekly report | shipped: dialog, image, text |
| #8 Commercial data | done: every map and all content are our own (seat holdings → generated maps; own chronicle) or public domain (Natural Earth); the import and the commercial build switch are gone |
| #9 Free / Pro | entitlement check in the client (`src/shared/lib/plan.ts`), off unless `VITE_PRO_GATE=1`; free: one 读图 round a day, chapter checks 1–3; Pro: unlimited 读图, every chapter check, report image. `?pro=1` tries Pro in a gated build. **Owner decisions needed:** backend and region, payment rails, prices, China compliance. |
