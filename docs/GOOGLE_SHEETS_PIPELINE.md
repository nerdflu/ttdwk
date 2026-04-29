# Google Sheets Import Pipeline

## Overview
ThingsToDoWithKids.com.au operates on a static Astro build architecture, meaning there is no backend server running the database queries at runtime. Instead, Google Sheets serves as our primary admin UI and database.

When content is ready to be published, an automated CI/CD pipeline reads CSV exports from the sheets, validates the models, translates flat columns into structured JSON, and feeds them into the Astro static compiler. 

### Why Google Sheets?
Google Sheets provides an easy, zero-code, multi-player editor interface. It enables easy integrations:
- We can connect external forms (e.g. user submissions).
- We can easily hook up Zapier/Make automations to queue new rows.
- (Future) A bot will scan specific events inboxes, extract event details, and add rows with `status=pending`.

## Content Lifecycle & Status

Every content piece (Places, Events, Ideas, Guides) must have a `status` column. 

- **draft / pending / needs-review**: The data remains in Google Sheets but will be entirely ignored by the import pipeline.
- **approved / published**: The only statuses that will be translated into `src/data/generated/*.json` and built onto the public site.
- **rejected / expired**: Kept for historical reference in the Sheets, but omitted from the site.

## How it works

1. **Source data (CSV):** `src/data/source/*.csv` 
   - During local dev, you can drop CSV files directly into this directory, or download them locally using `.env` URLs.
   - In production, GitHub Actions downloads these via URL.
2. **Import Script:** `npm run import:content`
   - Reads the CSVs and performs hard validation (slug uniqueness, missing fields, orphaned relations).
   - Translates "yes/no/true/false" into actual Booleans.
   - Nests attributes into the `features` array.
3. **Generated JSON:** `src/data/generated/*.json`
   - Clean, perfectly typed JSON payloads mapped directly to our Astro data layer.

## How to Set Up Production Automations

1. Publish your Google Sheets tabs to the web as CSVs.
2. In GitHub, go to **Settings > Secrets and variables > Actions > Variables**.
3. Create the following Repository Variables containing the published CSV URLs:
   - `CITIES_CSV_URL`
   - `CATEGORIES_CSV_URL`
   - `DISCOVERY_TAGS_CSV_URL`
   - `PLACES_CSV_URL`
   - `EVENTS_CSV_URL`
   - `IDEAS_CSV_URL`
   - `GUIDES_CSV_URL`

Whenever you manually run the "Import Content from Google Sheets" Action (or once we turn on the daily schedule), GitHub will download the latest rows, write the JSON, commit them back to `main`, and Astro will statically compile and deploy the fresh site.

## Testing Google Sheets locally

If you have your own published Google Sheet tabs, you can sync them directly into your local development environment.

1. Copy `.env.example` to `.env`.
2. Fill in the variables with your published CSV URLs.
3. Run `npm run download:source-csvs` to pull them down into `src/data/source/`.
4. Run `npm run import:content` to parse the CSVs into `.json` representations.
5. Boot `npm run dev` or `npm run build`.
