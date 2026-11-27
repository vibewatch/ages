# Our own chronicle content

The last piece imported from jiangshan-map is the chronicle content: dynasty summaries, chronicle events, settlements
and their period names, passes, city lore, the gazetteer of old names, people, journeys, reign eras (年号), great works
and river labels. We replace it list by list with our own, in `src/shared/data/content/` (shapes in `types.ts`);
`content/index.ts` assembles the lists, and every list present replaces the imported one (`src/shared/data/jiangshan.ts`
normalises both the same way). When every list is ours, the import (`scripts/import-jiangshan.ts`,
`src/shared/data/gen/jiangshan.json`) and its credit go.

Rules:

* **Our own words.** Titles, summaries, notes and lore are written by us. Facts (dates, who did what, where a city was,
  reign-era names and years) are not anyone's property, but another work's wording, selection and arrangement are:
  never copy or paraphrase entries from the imported data or other sources line by line.
* The imported lists may be used only to check coverage (did we miss a major event?) and to keep ids that other code
  refers to.
* Coordinates are modern sites, set independently.
* Sources: prefer the standard histories, 《资治通鉴》 and the national textbooks (统编版); when in doubt, leave it out.
