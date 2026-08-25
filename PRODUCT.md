# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are local parents and carers in a live Australian city, planning a doable outing for today, this weekend, or this weather. Visiting families and grandparents who do not know the city well come second.

The job: pick a city, then find something that fits the kids, the budget, and the conditions — without wading through a complete directory.

## Product Purpose

Things To Do With Kids is a city-led Australian family discovery guide. It exists so a parent can leave with a concrete outing (an idea, a place, a guide) rather than a pin on a map.

Success is winning organic search for “things to do with kids in [city]” and related category queries (free, rainy days, school holidays, and the rest of the city-category set).

## Positioning

Not a Google Maps clone and not a complete playground or events directory. Not a Facebook events replacement.

The mix of Places, Ideas, and Guides is the durable SEO backbone. An Idea such as “Rockpool hunting before lunch” is the product; a map pin for the rockpools is not. Events are lightweight outbound listings for freshness and usefulness (bigger or noteworthy things: festivals, surf comps, major markets), never mass-generated internal event pages.

## Operating Context

The public product is a statically generated Astro site at https://thingstodowithkids.com.au. Visitors browse a national homepage, choose a city, and stay inside that city for categories, places, ideas, guides, and event lists.

The site is currently behind a coming-soon overlay. While that gate is on, every page is `noindex,nofollow`.

Content is stored as JSON and published only when status is `approved` or `published`. Empty category and event routes are not generated. Event dates are evaluated against the city’s timezone at build time; expired events drop out of the build.

A Google Sheets import pipeline exists in this repo (CSV download → JSON → validate → rebuild). The public site does not call Sheets at runtime. Whether Sheets remains the long-term editorial home is not locked.

## Capabilities and Constraints

Confirmed:

- Live cities today: Gold Coast, Brisbane, Sydney.
- City is the geographic and routing boundary.
- Content types: City, Category, Discovery Tag, Place, Event, Idea, Guide.
- Places do not have individual routes. They surface as rich entries on city/category and curated collection pages, with stable slug-based anchors and explicit external Website/Map links.
- Events never get `/[city]/events/[slug]/` pages. Cards link out to the official source. The site takes no responsibility for cancellations or changed info.
- Categories currently include Free, Indoors, Outdoors, Rainy Days, Hot Days, and School Holidays.
- Copy and UI language is Australian English (`en-AU`).
- Stay coming-soon and noindex until launch is explicitly approved.

Undecided:

- Whether the product is mixed-age (toddler through teen via tags) or should pick a primary age band. Content already has `toddler-friendly` and `teen-friendly` tags; that is not a locked audience decision.
- Long-term editorial source of truth (Sheets vs something else).

## Brand Commitments

- Name: Things To Do With Kids.
- Domain: thingstodowithkids.com.au.
- Australian English throughout.
- Stay curated and inspiring (ideas, hidden gems, weekend plans). Do not become a complete directory of every playground or council class.

## Evidence on Hand

- Published and approved JSON for cities, categories, discovery tags, places, ideas, guides, and events under `src/data/` (and generated copies under `src/data/generated/`).
- SEO title/description patterns per city and category in the content model.
- Schema.org types for WebSite, Organization, CollectionPage, ItemList, Place, Event, and breadcrumbs.
- No logo file (schema still points at a `/logo.png` placeholder).
- No photography, illustrations, or other brand assets in the repo.
- No testimonials, ratings, reviews, press, or case studies. Future work must not fabricate them.

## Product Principles

1. Rank for the family query, then keep the visitor inside one city.
2. Curate the outing; do not catalogue the city.
3. Ideas and guides carry lasting search value; events are freshness, not the corpus.
4. Do not invite the index until launch is explicit.
5. Stay honest: no invented proof, ratings, completeness, or “ultimate guide” claims the content cannot support.
