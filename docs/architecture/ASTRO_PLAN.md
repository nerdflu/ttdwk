# Astro Foundation Plan

## Architecture Overview
This branch completely restarts ThingsToDoWithKids.com.au on Astro, removing the old Jekyll foundation.
The goal is a fast, static site built from JSON data, preparing for an automated Google Sheets / bot pipeline.
React/Vue and heavy UI libraries are avoided to keep the core lightweight.

## Route Map
- `/` - Browse all cities / categories
- `/[city]/` - Core city landing hub
- `/[city]/[category]/` - Category filtering within a city context
- `/[city]/events/` - All upcoming events for a city
- `/[city]/events/this-weekend/` - Events happening this weekend
- `/[city]/places/[slug]/` - Place detail page
- `/[city]/events/[slug]/` - Event detail page
- `/[city]/ideas/[slug]/` - Idea/itinerary detail page
- `/[city]/guides/[slug]/` - Curated guide detail page

## SEO Strategy
- Explicit meta titles/descriptions on every page via `seo.ts`.
- Titles adjust based on city prepositions (e.g., "on the Gold Coast", "in Brisbane").
- City and category pages are generated dynamically but checked against empty states.

## Navigation Strategy
- **City-Scoped URLs**: Ensure users always stay inside their selected city environment.
- **Content-Aware Navigation**: City sidebars (`CityNav`) only show categories/events links if data exists.
- Empty states are avoided at the routing layer.

## Future Automation
- Google Sheets will act as the single source of truth/database.
- Scrapers, user submissions, and emails will populate "pending" rows in the sheet.
- After human approval, a GitHub Action will export the sheet to `src/data/` JSON and trigger a build.
- **Note:** The public site will never call Google Sheets at runtime.

## Phase 3: Hardening & Event Logic
- **Local Date Handling**: Event dates are evaluated against the `Australia/Sydney` timezone at build-time.
- **Dynamic Routing**: Event routes (`/events/`, `/events/this-weekend/`, and individual detail pages) are strictly filtered so that expired events are dropped, and empty event hubs are skipped entirely during the static build.
- **Production Safety**: A global `noindex` and `robots.txt` disallow strategy is in place until the site is ready for a public launch to prevent search engines from crawling test data.
