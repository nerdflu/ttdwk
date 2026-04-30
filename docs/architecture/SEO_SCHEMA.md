# SEO Structured Data (JSON-LD) Guidelines

## Overview
This document outlines how ThingsToDoWithKids.com.au handles SEO structured data. We use schema.org vocabularies injected via JSON-LD across our Astro routes to ensure maximum visibility and clear content relationships.


## Page Type to Schema Mapping
| Route/Page Type | Schemas Applied |
| :--- | :--- |
| **Homepage** (`/h`) | `WebSite`, `Organization` |
| **City Hub** (`/[city]/`) | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| **Category Hub** (`/[city]/[category]/`) | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| **Events Hub** (`/[city]/events/`) | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| **Place Detail** (`/[city]/places/[slugU`) | `Place` (or `Park`, `Museum`, `Beach`), `BreadcrumbList` |
| **Event Detail** (`/[city]/events/[slug]`) | `Event`, `BreadcrumbList` |
| **Guide/Idea** (`/[city]/guides/[slug]`) | `Article`, `BreadcrumbList` |

*Note: The `ItemList` schema is only used when items are visibly listed on the page.*

## Schema Safety and Exclusions
We prioritize truthful, visible data. The following rules are strictly enforced:

1. **No Fake Reviews or Ratings**: We do not inject aggregate ratings or reviews into our `Place` or `Event` schema unless they are genuinely collected, verified, and visibly rendered on the page. Fake reviews violate Google's Webmaster Guidelines.
2. **LocalBusiness is Not Default**: We use `Place` or specific location types (e.g., `Park`, `Museum`) instead of `LocalBusiness` for standard locations. `LocalBusiness` implies an entity that serves customers directly at a location (like a store), whereas a beach or a rockpool is purely a `Place`.
3. **No Hidden Content**: We only mark up data that is visible to the user. For instance, if a price is not displayed on the event page, it is not included in the `Event` schema `offers` property.
4. **No SearchAction (Yet)**: We do not include a `SearchAction` on the homepage schema because the site does not yet have a functional internal search engine.

## Pre-launch `noindex` Strategy
While the site is in pre-launch mode and utilizing sample/unverified data, a global `noindex` rule is active. This ensures that our test content (and its associated schema) is not inadvertently crawled and penalized by search engines.


## Testing Schemas
Once the `noindex` restriction is removed for production, you can test individual URLs using the [Google Rich Results Test](https://search.google.com/test/rich-results) tool.

**Important Note:** Valid JSON-LD schema does not guarantee that Google will display rich snippets in search results. Google's algorithm determines whether rich results are shown based on authority, relevance, and overall search context.