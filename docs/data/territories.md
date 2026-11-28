# Our own territory maps

The atlas's territory maps are generated from our own data (they replaced imported boundary polygons). The goals:

* **Ours to use.** The data and the maps are our own work, free of non-commercial terms.
* **Checkable.** A border is the consequence of a recorded holding with a source, not a line someone drew. The period
  panel lists what changed in each phase and where the record comes from.
* **Easy to correct.** A fix is one line in a holdings table; the maps are regenerated.

Status: every period from 403 BCE to 1949 is ours: 17 eras, 198 phases and about 4 900 seats (`src/shared/data/own/`).
The builds no longer ship the imported phases (`pruneShapes` in `scripts/commercial-data.ts`). Still to do (GitHub
issue #11): a historian's review of the `est` dates.

## Method

1. **Seats** (`src/shared/data/own/<era>.ts`): capitals, commandery and county seats, walled cities, garrisons and the
   centres of neighbouring peoples, each at its modern site (`modern` names it, for checking). The site of an ancient
   city is a fact; we take it from the geography treatises (《汉书·地理志》 and later 地理志) and modern site studies.
2. **Holdings**: for each seat, who held it from which year, with a source key (`sj.qin` → 《史记·秦本纪》). `est` marks
   a date we infer where the sources are silent or disagree. `null` means nobody's / not mapped.
3. **Phases**: the maps to draw, each with the year whose holdings it shows.
4. **Generation** (`scripts/build-territories.ts`, method in `scripts/territory/gen.ts`): on a 0.1° grid of the
   public-domain relief (`public/data/terrain/east-asia.webp`: SRTM / GMTED / ETOPO1), every land cell goes to the seat
   that reaches it most cheaply. Travel cost grows with slope and high ground and with crossing a great river, and the
   sea is not crossed. Each seat has a reach (`r`, km), beyond which land stays unclaimed, and capitals have a head
   start (`b`). Borders therefore follow ridges, rivers and deserts. Small specks and enclosed holes are cleaned up, and
   outlines are traced, simplified and smoothed. The output is `public/data/atlas/own.json` (same format as the
   imported `shapes.json`), `src/shared/data/gen/own.json` (phases with their change counts, sources, polities; bundled)
   and `public/data/atlas/own-changes.json` (each phase's changed holdings and the seats' names, fetched when a reader
   unfolds the list).

```
npm run data:territories            # regenerate maps and areas
node scripts/build-territories.ts --preview   # also writes .territory-preview/<phase>.png
```

The administrative layer (政区) comes from the same allocation: each seat's own share of its polity's land is drawn as
the unit it is the seat of (狄道（陇西郡） → 陇西郡; 扬州 → 扬州), with its kind (郡, 王国, 州, 府, 军, 路, 省 …) read from the
name. Units are approximate catchments of their seats, not surveyed boundaries.

An era with our own maps replaces the imported dynasty named by `replaces` (`src/shared/data/own.ts`,
`corpus.ts`).

## Rules for adding data

* Never trace or copy another map's polygons (Tan Qixiang's atlas, CHGIS, jiangshan-map). Other maps may be *compared
  with* to find mistakes, but the remedy is a seat or holding with its source.
* Every holding change cites a source key, or `est`.
* Put seats where the city was, not where a border should go. To move a border, add the seat that held that land.
* Neighbouring peoples get one or a few large-reach seats; they are context, not the subject.

## Accuracy

Generated borders show the rough extent of control at teaching scale. Between two seats, the exact line is an
inference from terrain. The app says so in the period panel's source note.
