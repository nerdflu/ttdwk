# Things To Do With Kids (Astro)

An Australian family discovery guide built with Astro.

## Architecture
This is a statically generated Astro site. It reads from local JSON files to build fast, SEO-optimized city hubs. 

To power the content, we use an automated pipeline that imports rows from Google Sheets (exported as CSVs), parses them into generated JSON files, and triggers a static build. 

### Future Pipeline Additions
In the future, a dedicated bot will scan a public events inbox, extract structured event candidates via AI, deduplicate them, and push them into the Google Sheet as "pending" rows. Editors only need to review and switch the status to "published".

## Local Setup
Ensure you have Node.js installed.

1. **Install dependencies:**
   `npm install`
   
2. **Start the dev server:**
   `npm run dev`

## Local Google Sheets sync

To pull down live data from your own Google Sheets into your local workspace:

```bash
cp .env.example .env
# paste published Google Sheets CSV URLs into .env
npm run sync:content
npm run dev
```

### Full local check

If you want to sync the content and verify that the production build works end-to-end:

```bash
npm run sync:build
```

Read more in `docs/GOOGLE_SHEETS_PIPELINE.md`.

## GitHub Actions content sync

We use a manual GitHub Actions workflow to sync content from our Google Sheets database. 

- The workflow pulls Google Sheets CSV URLs from GitHub repository variables.
- It generates and validates the content locally in the runner.
- It runs a test build of the Astro site.
- It automatically commits any updated generated JSON files back to the current branch.
- *Note: Daily automation and production deployments are pending and will follow once manual syncs are thoroughly tested.*

For detailed instructions, see [Google Sheets Pipeline](docs/GOOGLE_SHEETS_PIPELINE.md).
