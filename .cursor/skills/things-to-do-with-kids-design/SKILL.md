---
name: things-to-do-with-kids-design
description: Design, critique, or implement the Things To Do With Kids website and its UI system. Use for TTDWK pages, components, navigation, search, city pages, event discovery, place/activity lists, family guides, responsive behaviour, content presentation, or visual QA. Preserve the Sketch-inspired spacing, typography, soft colour, rounded structure, and polished product feel while adapting them to a warm, useful, mobile-first Australian family discovery guide.
---

# Things To Do With Kids design

## Core directive

Create a warm, modern Australian discovery guide that helps a parent quickly answer: “What could we actually do with the kids?”

Use Sketch’s current marketing site as inspiration for spatial confidence, large friendly type, soft surfaces, precise controls, rounded geometry, and restraint. Do not copy Sketch’s brand, product-marketing layouts, or monochrome palette literally. Translate its visual quality into a content-rich local discovery product.

The result must feel:

- useful before decorative
- adventurous without becoming outdoorsy cliché
- playful without looking childish
- editorial without becoming precious
- premium without becoming sparse or impractical
- distinctly Australian without visual stereotypes

## Required reference

Read the project-root `DESIGN.md` before designing, reviewing, or implementing any TTDWK interface. Treat it as the source of truth for tokens, page patterns, content rules, responsive behaviour, and accessibility.

This repo is Astro (not Jekyll). `PRODUCT.md` wins on product truth, routes, and launch constraints. `DESIGN.md` wins on visual system. If they conflict, keep PRODUCT.md and flag the gap — do not invent a third pattern.

Known overrides vs the generated design spec:

- Places never get individual detail pages. Their slugs remain stable identifiers and in-page anchors.
- Events never get detail pages. Event cards link out.
- The public site stays coming-soon and `noindex` until launch is explicit.
- Do not fabricate testimonials, ratings, or first-hand claims.

If other existing code conflicts with the visual reference:

1. Preserve working functionality and user-authored content.
2. Prefer `DESIGN.md` over scraped Sketch values for visual decisions.
3. Replace visual inconsistency progressively rather than rebuilding unrelated code.

## Product truth

TTDWK is a mobile-first discovery guide for families across Australia. It is not a business directory, a tourism brochure, a childish activity blog, or a feed of interchangeable cards.

Primary users are time-poor parents and carers. Children influence the decision, but adults operate the interface. Prioritise quick scanning, trustworthy practical details, geographic context, and a clear next action.

The desired reaction is: “Oh cool, I hadn’t thought of that. Let’s go do something.”

## Non-negotiable information architecture

- Keep browsing city-scoped once a user enters a city or region.
- Every deep page must show its city context and an obvious route back to the city home.
- The primary navigation must support `Browse cities`, `Events`, `Guides`, and `Suggest a place or idea`.
- The main homepage must lead to discovery collections such as `This weekend` and `All upcoming events`; it must not promote individual event-detail links.
- Places and ongoing activities live as rich entries on city/category and curated collection pages. Each place entry contains its useful details and explicit external Website/Map links.
- A place entry may use a stable in-page anchor for sharing; useful list-page information must remain visible even when a detail page exists.
- Events never get internal detail pages. Event cards link out to the official source.
- External venue, booking, map, council, and official-information links must open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`. Internal discovery links must stay in the same tab.
- Do not wrap an entire place card in an external link. Keep browsing intact and make external actions explicit.

## Working method

### 1. Establish the user task

Identify whether the page helps someone:

- choose a city or region
- find something for today or this weekend
- browse places by need, age, weather, cost, or category
- compare upcoming events
- use an editorial guide to form a plan
- submit a useful local idea

Make the primary task visually dominant. Do not give every link equal weight.

### 2. Choose the correct page pattern

Use the canonical patterns in `DESIGN.md`:

- national homepage
- city homepage
- place/activity list
- event index
- editorial guide
- search/filter results
- submission form

Do not improvise a generic marketing landing page when a discovery or list pattern exists.

### 3. Build hierarchy before decoration

Establish, in order:

1. city or geographic context
2. page promise and primary action
3. filters or collection shortcuts
4. useful results
5. supporting editorial content
6. secondary navigation and footer

Use large headings and generous section spacing, but keep result-level information compact enough to compare on a phone.

### 4. Use components by job

- Use collection cards to open a discovery path.
- Use rich list rows for places and activities.
- Use date-led cards or rows for events.
- Use editorial cards for guides.
- Use chips only for filters, attributes, or short shortcuts.
- Use buttons for actions, not ordinary navigation disguised as a button.
- Use accordions only for genuinely secondary detail; do not hide the core reason to visit.

### 5. Write real content

Use specific, parent-useful language. A place description should explain what it is, why it is worth considering, what type of child or day it suits, and any important practical limitation.

Prefer:

- `A shady creekside playground with a fenced toddler area and picnic tables.`
- `Best for ages 3–8. Parking fills quickly after 9am on weekends.`

Avoid:

- `Fun for the whole family.`
- `Make unforgettable memories.`
- generic tourism copy, fake enthusiasm, and SEO filler

Never fabricate price, opening hours, accessibility, age suitability, facilities, dates, or booking requirements.

### 6. Validate the mobile experience first

At 320–430px widths, confirm that:

- the city context remains visible
- search and the primary discovery action appear early
- filters are usable without covering the results
- list items scan cleanly without tiny metadata
- badges wrap rather than shrink
- external actions are obvious and at least 44×44px
- no essential information relies on hover
- long names, multi-day dates, and missing images do not break layout

Then expand the system deliberately for tablet and desktop; do not merely stretch the mobile column.

## Visual judgement

- Preserve whitespace around major ideas, not around every minor item.
- Use the warm neutral canvas as the default and pastel accents as fields, illustrations, or category cues.
- Use dark ink for primary text and primary actions.
- Use one dominant accent per section. Avoid rainbow card grids.
- Let photography or illustration provide character; keep UI chrome quiet.
- Prefer one strong composition over repeated equal cards.
- Use rounded rectangles and pills selectively. Not every text fragment needs a container.
- Use depth sparingly: a soft keyline or shallow ambient shadow is usually enough.
- Keep motion subtle, purposeful, and optional. This is a fast utility, not a portfolio demo.

## Accessibility and implementation

- Meet WCAG 2.2 AA.
- Use semantic landmarks, headings, lists, buttons, links, and form labels.
- Ensure keyboard access and a visible `:focus-visible` state for every control.
- Maintain a 44×44px minimum touch target.
- Never use colour alone to communicate category, state, price, or availability.
- Respect `prefers-reduced-motion` and avoid auto-advancing carousels.
- Keep normal text contrast at 4.5:1 or better and large text/UI boundaries at 3:1 or better.
- Reserve layout space for images to prevent cumulative layout shift.
- Prefer CSS custom properties mapped to semantic tokens. Do not scatter extracted hex values or one-off spacing through templates.
- In Astro work, preserve data-driven content and reusable components; do not hard-code repeated place or event markup into pages.

## Never ship

- a generic three-column directory grid as the dominant experience
- homepage links straight to individual events
- an individual place detail page
- childlike rainbow colours, bubbly novelty type, cartoon overload, or school-worksheet styling
- dense badge clouds that compete with the place name
- generic stock photos of smiling families
- text over busy imagery without a reliable contrast treatment
- search, filter, or navigation controls that disappear on mobile
- whole-card external links that unexpectedly take users away
- invented local facts or stale event dates presented as current
- decorative motion that delays browsing or causes layout shift
- duplicate page headings, unclear city context, or dead-end detail pages

## Delivery requirements

When producing design guidance or code:

- state the selected page pattern and primary user task
- use tokens and component names from `DESIGN.md`
- include mobile, tablet, desktop, empty, loading, error, and long-content behaviour where relevant
- preserve internal versus external link behaviour
- include accessible interaction states
- keep content realistic enough to expose layout problems
- finish with a short QA check against the non-negotiable information architecture
