---
version: "2.0"
name: Things To Do With Kids
description: Canonical design system for a warm, modern, mobile-first Australian family discovery guide, visually informed by Sketch’s spacing, typography, rounded structure, soft surfaces, and restraint.
source_inspiration: https://www.sketch.com/
---

# Things To Do With Kids design system

## 1. Brand and product direction

Things To Do With Kids is a discovery guide for families who want ideas, places, adventures, and interesting things for kids to explore across Australia.

It combines:

- the confidence and clarity of a polished search product
- the warmth of an illustrated Australian field guide
- the usefulness of a parent who has actually been there
- the editorial judgement to show fewer, better paths instead of a wall of listings

The interface should feel warm, clever, calm, optimistic, and quietly adventurous. It must not feel childish, corporate, cluttered, overly tourism-led, or like a generic local-business directory.

### Design inheritance from Sketch

Preserve these qualities from the Sketch site:

- generous macro spacing and confident content width
- large, approachable headings with short line lengths
- quiet navigation and precise controls
- rounded image and content frames
- restrained shadows and soft neutral surfaces
- alternating editorial compositions rather than repetitive equal cards
- small, polished moments of movement

Do not inherit:

- Sketch branding, logos, copy, product screenshots, or black product-demo sections
- SaaS feature-grid logic where users need scannable discovery results
- the raw scraped token scale or invalid extracted colour relationships
- sparse layouts that push useful local information too far down the page

## 2. Experience principles

### Useful in ten seconds

A parent should quickly understand where they are browsing, what is available, and what to tap next. Put place, time, age fit, cost, and practical constraints ahead of decorative copy.

### Discovery, not directory

Lead with reasons to explore: this weekend, free adventures, rainy-day options, hidden gems, toddler-friendly outings, or a half-day plan. Do not present the homepage as an alphabetical database.

### Parent-operated, kid-spirited

Design for adult comprehension and one-handed mobile use. Bring in play through colour, illustration, imagery, and language—not oversized novelty controls or childish typography.

### Local context stays attached

Once a visitor enters a city, keep that context in breadcrumbs, titles, navigation, filters, and URLs. Deep pages must never feel geographically anonymous.

### One clear way forward

Each section should have a dominant action. Avoid clusters of equally loud buttons, cards, and badges.

## 3. Foundations

### 3.1 Colour

Use colour semantically. Accent colours are mostly background fields and illustration colours; they are not interchangeable text colours.

```yaml
color:
  text:
    primary: "#27292B"
    secondary: "#606463"
    inverse: "#FFFFFF"
    link: "#38536B"
  surface:
    canvas: "#FFFFFF"
    warm: "#F0E8E1"
    soft: "#F7F4F0"
    dark: "#27292B"
    raised: "#FFFFFF"
  border:
    subtle: "#DED8D1"
    strong: "#BEB7AF"
    focus: "#38536B"
  accent:
    sky: "#94BDDE"
    rose: "#CFA49B"
    lavender: "#BC8DC5"
    pink: "#E287AF"
    clay: "#D6A37E"
    eucalyptus: "#505C51"
    sand: "#E7DCC7"
    sun: "#EBBE72"
  state:
    success: "#35634A"
    warning: "#8A5617"
    error: "#A43B36"
    info: "#38536B"
```

#### Colour rules

- Use `surface.canvas` or `surface.warm` for most page backgrounds.
- Use `text.primary` for headings and essential text.
- Use `surface.dark` with `text.inverse` for the primary CTA.
- Use pastel accents with dark text, never white text by default.
- Use one dominant accent per section and no more than three visible accent families in a viewport.
- Use eucalyptus for nature/outdoor cues, sky for water/general discovery, sun for events, and rose/lavender/pink as flexible editorial accents. These are cues, not rigid taxonomy.
- Add a text label or icon wherever colour communicates state.
- Verify actual rendered contrast; token membership does not guarantee a valid pairing.

### 3.2 Typography

Use the Sketch-inspired neutral grotesk character without turning the site into generic software UI.

```yaml
font:
  family:
    primary: "Inter Variable, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  weight:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
  tracking:
    tight: "-0.035em"
    normal: "-0.01em"
    label: "0.04em"
  size:
    caption: "0.8125rem"
    small: "0.875rem"
    ui: "0.9375rem"
    body: "1rem"
    body-large: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)"
    h4: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    h3: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    h2: "clamp(2rem, 1.45rem + 2.2vw, 3.5rem)"
    h1: "clamp(2.75rem, 1.8rem + 4vw, 4.75rem)"
  line-height:
    display: 0.98
    heading: 1.08
    body: 1.55
    compact: 1.3
```

#### Typography rules

- Keep homepage and city-page display headings to roughly 8–12 words and 10–16 characters per visual line where possible.
- Keep body copy to a comfortable 55–72 characters per line.
- Use sentence case. Avoid title case across navigation and headings.
- Use `semibold` for controls and compact metadata; do not make whole cards bold.
- Use uppercase only for very short date, category, or eyebrow labels.
- Never shrink below `caption`; wrap or restructure instead.

### 3.3 Spacing and grid

Use a deliberate 4/8-based scale. The scraped fractional values from the source site are not production tokens.

```yaml
space:
  0: "0"
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
  7: "2.5rem"
  8: "3rem"
  9: "4rem"
  10: "5rem"
  11: "6rem"
  12: "8rem"
layout:
  max: "80rem"
  reading: "45rem"
  narrow: "36rem"
  gutter-mobile: "1rem"
  gutter-tablet: "1.5rem"
  gutter-desktop: "2rem"
  section-mobile: "4rem"
  section-desktop: "clamp(6rem, 8vw, 8rem)"
```

#### Grid rules

- Mobile: four conceptual columns, 16px outer gutter, single-column results.
- Tablet: eight columns, 24px outer gutter.
- Desktop: twelve columns, 32px outer gutter, maximum content width 1280px.
- Use asymmetry for editorial sections and guides. Use stable aligned rows for comparison-heavy place and event results.
- Do not default to three equal cards. Mix a strong lead item with smaller supporting paths, or use a deliberate list.
- Macro spacing separates ideas; micro spacing groups related facts. Do not use huge landing-page gaps inside result lists.

### 3.4 Shape, border, depth, and motion

```yaml
radius:
  small: "0.75rem"
  medium: "1.125rem"
  large: "1.5rem"
  xlarge: "2rem"
  pill: "999px"
shadow:
  keyline: "0 0 0 1px rgba(39, 41, 43, 0.08)"
  soft: "0 8px 24px rgba(39, 41, 43, 0.07)"
  lift: "0 16px 48px rgba(39, 41, 43, 0.10)"
motion:
  fast: "140ms"
  standard: "220ms"
  slow: "420ms"
  ease-out: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-spring: "cubic-bezier(0.16, 1, 0.3, 1)"
```

- Use `radius.medium` for controls, `radius.large` for cards, and `radius.xlarge` for major image frames.
- Prefer `shadow.keyline` on dense lists and `shadow.soft` on a few raised discovery cards.
- Never stack border, strong shadow, tinted background, and decorative outline on one component.
- Hover may lift a card by 2–3px using transform. Active controls should compress slightly.
- Use transform and opacity for motion. Respect `prefers-reduced-motion`.
- Avoid scroll-jacking, auto-advancing carousels, parallax, and ambient animation competing with results.

## 4. Imagery and illustration

- Prefer real, location-specific photography with natural Australian light and believable family use.
- Avoid generic stock families looking at camera, oversaturated tourism imagery, and visibly AI-generated local landmarks.
- Default card image ratio is 4:3. Lead editorial imagery may use 3:2 or a controlled portrait crop.
- Preserve the subject’s identity and do not apply one universal colour grade to every location.
- Use soft Australian illustration and map-like marks as navigation or atmosphere, not as a substitute for place photography.
- Keep decorative illustrations away from essential date, price, address, and action areas.
- Provide a designed no-image state using a quiet accent field, category label, and simple line motif; never show a broken placeholder.

## 5. Information architecture

### Primary navigation

- Browse cities
- Events
- Guides
- Suggest a place or idea

Search and the current city switcher should be available from the header or immediately below it. On mobile, keep the menu short and let search remain directly accessible.

### Link behaviour

| Link type | Behaviour |
| --- | --- |
| City, category, guide, filter, search, event index | Same tab |
| Internal event detail from an event index | Same tab |
| Venue website, booking provider, map, council, official source | New tab with `target="_blank" rel="noopener noreferrer"` |
| Place name on a list | Plain heading or in-page anchor, not an external whole-card link |
| Homepage event promotion | Link to `This weekend` or `All upcoming events`, never an individual event |

### URL and context rules

- Use city-scoped paths such as `/gold-coast/events/` and `/brisbane/things-to-do/`.
- Show a visible breadcrumb or context link such as `Gold Coast / Rainy-day ideas`.
- Place entries do not need individual detail routes. Use stable list anchors only when sharing is useful.
- Do not create a dead-end page merely to capture a keyword.

## 6. Canonical page patterns

### 6.1 National homepage

Primary task: choose a city or open a high-intent discovery path.

Recommended sequence:

1. quiet header with logo, primary navigation, search, and city chooser
2. strong hero promise plus location/activity search
3. city quick links or recently selected city
4. two high-value event collections: `This weekend` and `All upcoming events`
5. curated discovery paths such as free, outdoors, rainy day, or mini-adventures
6. selected city guides or featured regions
7. contribution prompt and compact footer

Do not place individual event cards or a large undifferentiated place feed on the national homepage.

### 6.2 City homepage

Primary task: decide what kind of outing to browse in the selected city.

Must include:

- city name and compact city switcher
- city-specific search
- high-intent shortcuts: this weekend, free, rainy day, toddlers, outdoors
- editorially selected categories or guides
- clear links to the city event index and all place/activity lists
- city-scoped breadcrumb/navigation on every downstream route

### 6.3 Place/activity list

Primary task: compare useful options without opening a page for every place.

Use a rich vertical list, not a grid of title links. Each `place-row` should include:

- 4:3 thumbnail or designed no-image state
- place/activity name as a heading
- locality and category
- a concise 2–4 sentence editorial description synthesising the important source notes
- the most decision-relevant facts: price signal, age fit, hours/status when reliable
- no more than four visible parent-useful attributes; reveal additional facts progressively
- explicit actions such as `Website ↗`, `Map ↗`, or `Check current details ↗`

Useful attributes include: Free, Rainy day, Pram friendly, Toilets, Shade, Parking, Toddler friendly, Hidden gem.

On mobile, place image and content stack. Keep the title, locality, description, and primary practical facts visible without expansion. Secondary facilities may sit in an accessible disclosure.

### 6.4 Event index

Primary task: compare upcoming events by date and suitability.

- Group or filter by `This weekend`, `Today`, date range, region, free/paid, and age fit.
- Make the date block the strongest metadata after the event name.
- Show locality, time, price, booking status, and age fit where known.
- Distinguish booking-required and free events with text, not colour alone.
- Expired events must not appear among current results.
- A persistent filter summary must make active filters easy to clear.

### 6.5 Event detail

Primary task: confirm whether the event is suitable and act.

Show near the top:

- event name
- complete date and time, including recurrence or multiple sessions
- venue and locality
- price and booking requirement
- age fit
- verified booking/official link
- last-checked or source context when freshness matters

Keep related links city-scoped. Offer other events this weekend or all upcoming events rather than a generic site-wide feed.

### 6.6 Editorial guide

Primary task: turn a theme into a realistic outing plan.

- Use a narrow reading column with occasional full-width maps, lists, or images.
- Give the guide a clear city/region, audience, season, and practical promise.
- Break long guides into navigable sections.
- Link to relevant place anchors or event collections; do not duplicate full records inconsistently.
- Preserve editorial voice and avoid SEO-first introductions.

### 6.7 Search and filtered results

- Reflect the query and city in the heading.
- Keep filters close to results and show the result count.
- On mobile, use a bottom sheet or full-screen filter panel with an obvious Apply and Clear action.
- Never show an empty page with only `No results`. Suggest removing a filter, choosing a nearby region, or browsing a relevant collection.

## 7. Components

### Header

- Desktop: low-noise horizontal navigation with search and city context.
- Mobile: logo, search action, and menu action in the first row; city context directly below when active.
- Sticky behaviour is allowed only if the header remains compact and does not consume excessive mobile height.
- Current section must be perceivable without colour alone.

### Search

- Use a visible label or descriptive accessible name.
- Accept natural activity terms and locations.
- Suggested searches should be specific: `free playgrounds`, `rainy day`, `this weekend`, `ages 2–5`.
- Provide recent or popular suggestions only when they help; do not clutter the idle state.

### Collection card

Use for discovery paths such as `This weekend`, `Free adventures`, or `Rainy-day ideas`.

- One clear title, one short supporting line, and one destination.
- Whole-card internal link is allowed.
- Pair an accent field with a relevant image or simple illustration.
- Do not attach a badge cloud or multiple competing actions.

### Place row

- Use the anatomy defined in the place/activity list pattern.
- Do not make the whole row clickable.
- External links must show an external-link icon or `↗` and open in a new tab.
- If no current website exists, omit the action rather than rendering a disabled button.

### Event card/row

- Lead with human-readable date, not database format.
- Support single-day, multi-day, recurring, sold-out, cancelled, and booking-required states.
- Internal detail links stay in the same tab; external booking actions open a new tab.

### Chips and badges

- Chips are interactive filters or shortcuts. Badges are read-only facts. Do not style them identically.
- Minimum chip height: 40px, with a 44px touch target.
- Badge text should usually be 1–3 words.
- Allow wrapping; never create a tiny horizontal badge scroller for essential information.

### Buttons and links

- Primary button: dark fill, inverse text, pill or medium radius.
- Secondary button: warm/white surface with keyline.
- Tertiary action: descriptive text link with a clear hover/focus treatment.
- Use verb-led labels for actions: `View this weekend`, `Open map ↗`, `Suggest a place`.
- Use nouns for navigation: `Events`, `Guides`, `Gold Coast`.
- All states must include default, hover, focus-visible, active, disabled, and loading where applicable.

### Forms

- Keep labels visible above fields.
- Group related fields and explain why time-sensitive information is needed.
- Validate inline without removing the user’s input.
- Use plain-language error messages and a clear success confirmation.
- Submission forms should ask only for information required to evaluate or publish the idea.

## 8. Responsive behaviour

### Mobile: 320–767px

- One-column flow with 16px gutters.
- Results stack vertically; place images sit above content.
- Keep search and city context early.
- Use horizontal scrolling only for optional shortcut chips, with visible overflow cues.
- Avoid fixed bottom actions unless they represent the page’s single primary action.

### Tablet: 768–1023px

- Use 24px gutters and an eight-column grid.
- Place rows may use a 3/5 image-content split.
- Discovery collections may use an asymmetric two-column composition.

### Desktop: 1024px+

- Use 32px gutters, a twelve-column grid, and maximum width 1280px.
- Keep reading content narrow while allowing lists and editorial media to use more width.
- Do not stretch text or result rows edge to edge.
- Hover effects may supplement, never replace, visible actions.

## 9. Content design

### Voice

Write like a knowledgeable local parent: clear, warm, observant, and honest about practical limitations.

Use Australian English: `favourite`, `centre`, `organise`.

### Good copy

- `A shady creekside playground with a fenced toddler area, picnic tables and an easy path from the car park.`
- `Good for a slow morning with younger kids. The rocks become slippery after rain.`
- `What’s on for kids this weekend`
- `See all upcoming events`

### Avoid

- `Fun for the whole family`
- `There’s something for everyone`
- `Create unforgettable memories`
- `Embark on an adventure`
- vague superlatives, forced whimsy, keyword stuffing, and invented first-hand claims

### Facts and freshness

- Treat event dates, prices, hours, closures, bookings, and facilities as factual data.
- Show `Check current details ↗` when a fact is likely to change.
- Do not disguise uncertainty with confident prose.
- Ensure old events expire automatically or are visibly archived outside current discovery.

## 10. Accessibility, SEO, and performance

### Accessibility

- Meet WCAG 2.2 AA.
- Use semantic heading order and one clear page `h1`.
- Provide a skip link and landmark navigation.
- Ensure all functions work with keyboard and touch.
- Use a visible focus ring of at least 2px with sufficient contrast and offset.
- Maintain 44×44px minimum touch targets.
- Provide useful image alt text; use empty alt for decorative imagery.
- Announce async search/filter result changes appropriately.
- Respect reduced motion and increased text size.

### SEO and structured content

- Preserve city/category hierarchy in titles, headings, breadcrumbs, and internal links.
- Render place lists as semantic lists containing `article` elements.
- Use structured data only when the visible content genuinely supports it.
- Avoid thin individual place pages and near-duplicate city/category pages.
- Keep important content in rendered HTML rather than client-only interaction.

### Performance

- Target Core Web Vitals in the green range on mid-tier mobile devices.
- Optimise responsive images and prefer AVIF/WebP with intrinsic dimensions.
- Lazy-load below-the-fold media, not the likely LCP image.
- Avoid large video heroes, scroll-linked animation, and unnecessary client JavaScript.
- Keep filters progressively enhanced so core content remains navigable.

## 11. States and edge cases

Every data-led component must account for:

- loading
- empty results
- partial or missing metadata
- stale or unverified facts
- unusually long place/event names
- multi-day or recurring events
- cancelled, postponed, sold-out, or expired events
- missing or low-quality imagery
- one result and hundreds of results
- location denied or unavailable
- offline/slow network behaviour where relevant

Skeletons should resemble the final layout and avoid animated shimmer when reduced motion is requested. Never use a spinner for an entire browse page if useful cached/static content can remain visible.

## 12. Anti-patterns

Do not ship:

- a homepage dominated by individual listings
- an equal-weight three-column card grid repeated section after section
- individual place pages
- whole-card external links
- childish rainbow styling, novelty fonts, or cartoon UI chrome
- too many rounded containers nested inside one another
- low-contrast pastel text
- dense metadata before the place/event promise
- hidden core content inside accordions
- sticky UI that leaves little mobile viewport
- generic stock family photography
- fabricated or stale practical details
- navigation that loses the current city
- excessive SaaS-style animation, glassmorphism, or dark product-demo sections

## 13. Release checklist

### Product and content

- [ ] The page’s city/region context is explicit.
- [ ] The primary user task is obvious within ten seconds.
- [ ] Homepage event links lead to collections, not individual events.
- [ ] Place information is complete on the list page; no individual place route is required.
- [ ] External actions open a new tab and are clearly labelled.
- [ ] Event facts are current and expired events are excluded from current results.

### Visual system

- [ ] Tokens are semantic and no scraped fractional spacing remains.
- [ ] Heading line lengths are controlled.
- [ ] One accent dominates each section.
- [ ] Result layouts are designed for comparison, not decorative card repetition.
- [ ] Mobile and desktop compositions both feel intentional.

### Interaction and accessibility

- [ ] Keyboard, touch, focus, loading, empty, error, and long-content states work.
- [ ] Touch targets are at least 44×44px.
- [ ] Contrast passes WCAG 2.2 AA.
- [ ] Reduced-motion behaviour is present.
- [ ] Filters expose active state and a clear reset.

### Technical quality

- [ ] City-scoped URLs and internal links are preserved.
- [ ] Repeated Jekyll/Liquid markup is componentised.
- [ ] Important content renders without unnecessary client JavaScript.
- [ ] Responsive images have intrinsic dimensions and sensible loading priority.
- [ ] No broken, duplicate, or dead-end discovery paths remain.
