# Roadmap

## Next round: make the existing atlas easier to learn from

The app already has bilingual event/figure/place cards, courses, quizzes, stories, journeys and offline support.
Prioritize connecting those capabilities rather than adding more isolated content or another renderer.
These are proposed features, not implemented functionality.

| Order | Feature | First release scope | Completion criteria |
|---|---|---|---|
| 1 | Sources and historical uncertainty | Add structured references and approximate/disputed-date notes to core curriculum event cards and territorial phase details; distinguish curated, imported and schematic material. Pilot Qin unification, the Tang period and modern boundary snapshots. | References are visible in both UI languages, bundled notes work offline, and coverage checks flag missing metadata. Never imply that a teaching boundary or disputed ancient date is exact. |
| 2 | Compare two periods | Let students choose two existing territorial snapshots and toggle A/B on one fixed camera, with dates, capitals, area change and a short explanation. Extend the existing ghost-border layer; defer split-screen rendering. | A shareable link restores both snapshots; comparisons work on phones and offline without a second WebGL renderer. Area differences are labelled approximate and use compatible data. |
| 3 | Continue learning and review mistakes | Resume the last lesson step; save missed question IDs and offer a short review session using existing explanations and event links. Keep progress local, with versioned export/import and a reset action. | Reload resumes the right lesson/language; retaking a question does not inflate completion; invalid or outdated imports fail safely; no account is required. |

### Suggested delivery

1. **Trust layer:** define the source/uncertainty schema, curate the pilot content, add card/phase presentation and bilingual integrity checks. Broaden coverage only after checking the references.
2. **Comparison pilot:** start with adjacent phases, reuse the existing camera and territory textures, then add arbitrary pairs and deep links. Verify small-screen controls and GPU/resource use before expanding it.
3. **Learning loop:** extend `Progress` with a versioned resume/review record and stable question IDs; add the dashboard entry point, review queue and validated backup/restore.

Each slice should preserve current URLs and progress, support Chinese and English, and include keyboard, phone and offline regression coverage.
Do not make world coverage or account synchronization a prerequisite for this round.
Data-integrity checks do not replace source-by-source historical verification. Before any commercial rollout,
resolve the academic/non-commercial restrictions on imported GIS data documented in `NOTICE.md`.

## Following round: teacher playlists

Build shareable ordered playlists of existing events, journeys and lesson steps, with large-caption presentation mode.
Begin with locally saved playlists and a bounded, versioned share format; classroom accounts, grading and cloud storage are separate projects.

## Phase 2: world history
Start with a small, sourced China/world comparison pilot (for example Silk Road exchanges or maritime exploration),
then validate curriculum coverage and mobile performance before building the full world stage.
The data model already carries a `scope` (`'china' | 'world'`) on events and territory snapshots, and the stage, projection and terrain asset are parameterised (`src/shared/data/stage.ts`). Phase 2 plans:

1. **World stage**: a second stage (equirectangular or globe) with its own terrain asset fetched by `scripts/fetch-terrain.ts`, chosen via a stage switcher. The China stage stays the default for phase 1 content.
2. **World events and snapshots** for 《中外历史纲要（下）》 and 九年级 world history. These include ancient civilisations, the classical empires, the age of exploration, revolutions, industrialisation, the world wars and the Cold War.
3. **Parallel timelines**: China and world lanes side by side on one axis, so students can compare (for example, Zheng He and Columbus).
4. **Cross-links** from Chinese events to world events (the Opium War and the industrial revolution, the Silk Road and Rome).
5. More model builders (pyramids, Parthenon, caravel, steam engine), reusing the model kit.

## Later ideas
* Spaced-repetition scheduling on top of the mistake-review queue.
* Narration with recorded audio instead of Web Speech.
* Optional sync of progress across devices.
