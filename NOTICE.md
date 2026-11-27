# Notices

长河 Ages is released under the **GNU General Public License v3.0** (see [LICENSE](LICENSE)).

## Our own data

All historical content is our own work, released under GPL-3.0 with the code:

* the territory maps from 403 BCE to 1949 and their administrative layer (郡 / 州 / 府): seats, holdings and sources in
  `src/shared/data/own/`, generated over the public-domain relief by `scripts/build-territories.ts`
  ([docs/data/territories.md](docs/data/territories.md));
* the chronicle: events, settlements with their period names, passes, city lore, the gazetteer, people, journeys, reign
  eras (年号), great works, river labels and dynasty summaries, in `src/shared/data/content/`
  ([docs/data/content.md](docs/data/content.md));
* the curated curriculum events, places, stories, lessons, the early schematic maps and the PRC maps.

Facts are taken from the standard histories, 《资治通鉴》, the treaties and the national textbooks, cited where they
matter. Until 2026-11 the atlas imported data from [jiangshan-map 江山图](https://github.com/DeanChensj/jiangshan-map)
by DeanChensj (GPL-3.0), which inspired the project; none of that data remains, and the import has been removed.

## Public-domain map data

* Modern province, country and lake outlines: [Natural Earth](https://www.naturalearthdata.com/) (public domain),
  built by `scripts/build-basemap.ts`; the country outline follows Natural Earth's China point of view. No maritime
  lines are drawn. 云梦泽 and 巨野泽 are our own sketches.

## Other sources

* Elevation: [AWS Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) (Mapzen), derived from SRTM, GMTED2010,
  ETOPO1 and other public-domain sources.
* Background reading: [Wikipedia](https://www.wikipedia.org/), text under CC BY-SA 4.0, fetched live and attributed in the reader.
* Fonts: Geist / Geist Mono (Copyright 2023 Vercel, with basement.studio), bundled in `src/client/fonts/` under the
  SIL Open Font License 1.1 (licence text alongside the font files).
* Low-poly model kit adapted from the pocket-planet (Terrastra) project.
