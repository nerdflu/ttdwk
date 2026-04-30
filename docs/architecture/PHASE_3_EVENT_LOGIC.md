# Phase 3: Event Logic & Production Safety

## Event Date Rules
Event dates are evaluated using a strict string-based comparison format (`YYYY-MM-DD`). Because the site is statically compiled, "today" is calculated at build time. To ensure accuracy, "today" is strictly derived using the citys specific `timezone` field (e.g., `Australia/Brisbane`), falling back to `Australia/Sydney` if omitted, regardless of the GitHub Actions runner timezone.

### Definitions
- **Upcoming Event**: An event is considered upcoming if its `end_date` (or `start_date` if `end_date` is omitted) is greater than or equal to today's date string.
- **Expired Event**: An event whose end date has passed.
- **This Weekend**: The logic identifies the current weekend (Friday through Sunday). If the build occurs on Monday through Thursday, it calculates the upcoming Friday-Sunday window. If the build occurs during the weekend, the current weekend window is used.


## Route Generation Behaviour
- `/[city]/events/`: Only generated if a city has at least one *upcoming* event.
- `/[city]/events/this-weekend/`: Only generated if a city has at least one event overlapping the *this weekend* window.
- `/[city]/events/[slug]/`: Expired events are completely excluded from the build. Detail pages will only generate for upcoming events.

## Pre-launch Indexing & Production Safety
Since the site uses sample or unverified data during Phase 3, production safety is paramount.
1. **Global `noindex`**: The `BaseLayout` reads from `siteConfig.comingSoon`. While this is `true`, a `<meta name="robots" content="noindex,nofollow" />` tag is injected into every single generated page.
2. **`robots.txt`**: Completely disallows crawling (`Disallow: /`) for all user-agents.
3. **Coming Soon Overlay**: The `ComingSoonGate` component acts as a visual block for real users, ensuring they do not see the test content.

## Known Limitations
- Since "today" is resolved at build time, the site **must** be rebuilt daily for events to naturally expire and disappear from the front-end. If the site is not rebuilt, yesterday's events will remain visible. A daily CRON schedule in GitHub Actions is highly recommended once real content begins flowing.