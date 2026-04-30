# Phase 1: Astro Foundation Review

## What works
- **Routing:** All static generated paths work correctly. Empty category or event pages are actively prevented by only returning paths that contain approved records.
- **Content-Aware Navigation:** The left-hand navigation (`CityContextNav`) uses helper functions from `data.ts` to smartly hide tabs like "Events" or "This weekend" if the underlying data implies they are empty.
- **Data Layers:** Components and Pages strictly use the helper functions in `src/lib/data.ts`. No layout or page touches raw `.json` files, fulfilling the decoupling constraint.
- **Build Step:** `npm run build` compiles correctly, emitting all necessary HTML entries instantly.
- **CityShell Wrappers:** Every city-scoped route is correctly wrapped in the `<CityShell>` layout component to keep the user anchored.
- **Component Extractions:** Navigation structures and SEO logic are pulled into dedicated parts (`Breadcrumbs`, `RelatedLinks`, `BaseLayout` SEO injection).

## Issues Found & Resolved During Review
1. **Missing Components:** `Breadcrumbs.astro`, `RelatedLinks.astro`, and `CityContextNav.astro` components were originally missed. I extracted navigation and created the missing isolated components.
2. **Missing Breadcrumbs:** Breadcrumbs had only been added via hard-coded HTML to some pages, and not the main category or city hubs. Now implemented dynamically on all non-home pages using the actual component.
3. **JSON-LD Schema Missing:** Initial implementation had explicit titles and descriptions, but no structured data. Re-engineered `BaseLayout` to take a `jsonLd` prop, mapping `Place`, `Event`, `WebSite`, `ItemList`, and `CollectionPage` types appropriately across the routes. `BreadcrumbList` has also been embedded automatically via the `Breadcrumbs` component.

## Assumptions Made
- Assumed "This Weekend" event date checks can be stubbed temporarily in `src/lib/dates.ts` since complex date-window checks weren't part of Phase 1 requirements.
- Implemented `CityContextNav.astro` to strictly represent the sidebar nested links, maintaining `CityShell` as the actual frame wrapper.
- Assumed it's acceptable to use a `noindex` prop architecture for future-proofing, even if not actively suppressing any pages just yet.

## Recommended Next Phase
**Phase 2: The Google Sheets / Build Automation Pipeline.**
Before building complex search functions or a heavy aesthetic, implement the GitHub Action runner logic to fetch mock data from Google Sheets, format it matching the `src/data/*.json` schemas, and rewrite the JSON files during the automated CD sequence. Once validated, real visual designs can follow.
