# Content Model

## Entities
- **City**: The main geographic boundary for routing. Also defines the `timezone` used for accurate event expiration and weekend window logic.
- **Category**: Broad filtering bucket (e.g., free, rainy-day). Used to generate SEO landing pages.
- **Discovery Tag**: Mood or logistical filter (e.g., low-energy, pram-friendly).
- **Place**: A permanent location (e.g., park, museum).
- **Event**: A time-bound activity.
- **Idea**: A mini-adventure or suggested itinerary combining places/activities.
- **Guide**: A curated collection of things to do (e.g., "Top 10 Free Things").

## Status Workflow
Every content item has a `status`.
- **draft**, **pending**, **needs-review**, **rejected**, **expired**: Will not be built into the public site.
- **approved**, **published**: The only statuses that trigger route generation and display.

## Future Source of Truth
Eventually, this data will be stored in Google Sheets to allow easy bulk editing and bot integrations. The website will only read the exported JSON.
