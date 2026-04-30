# Google Sheets Import Pipeline

## Overview
ThingsToDoWithKids.com.au operates on a static Astro build architecture, meaning there is no backend server running the database queries at runtime. Instead, Google Sheets serves as our primary admin UI and database.

**Warning: The public site does not fetch Google Sheets at runtime.** The static HTML is compiled during the build step, ensuring peak speed and removing external dependencies for users.

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

## How to Publish Tabs as CSV
For the pipeline to work, Google Sheets must be told to expose its tabs publically as CSV format:
1. Open your Google Sheet.
2. Go to **File > Share > Publish to web**.
3. Choose the specific tab (e.g., "Places") rather than "Entire Document".
4. Choose **Comma-separated values (.csv)** from the format dropdown.
5. Click Publish. Copy the URL.
6. Repeat for all required tabs.

## Testing a Change from Google Sheets locally

If you have made a change in Google Sheets and want to preview it:

1. Add your CSV URLs to `.env`:
   ```env
   CITIES_CSV_URL=https://docs.google...
   CATEGORIES_CSV_URL=https://docs.google...
   ...
   ```
2. Run the local sync command:
   ```bash
   npm run sync:content
   ```
3. Boot the local dev server to see the changes:
   ```bash
   npm run dev
   ```

## How to Set Up Production Automations

1. In GitHub, go to **Settings > Secrets and variables > Actions > Variables**.
2. Create the Repository Variables containing the published CSV URLs:
   - `CITIES_CSV_URL`
   - `CATEGORIES_CSV_URL`
   - `DISCOVERY_TAGS_CSV_URL`
   - `PLACES_CSV_URL`
   - `EVENTS_CSV_URL`
   - `IDEAS_CSV_URL`
   - `GUIDES_CSV_URL`

Whenever you manually run the "Import Content from Google Sheets" Action, GitHub will run the full import, commit the generated `.json` files, and trigger the Astro deployment automatically.

## Publishing Content via GitHub Actions

1. **Add Repository Variables**: 
   In GitHub, go to **Settings > Secrets and variables > Actions > Variables**. Add the published CSV URLs as variables:
   - `CITIES_CSV_URL`
   - `CATEGORIES_CSV_URL`
   - `DISCOVERY_TAGS_CSV_URL`
   - `PLACES_CSV_URL`
   - `EVENTS_CSV_URL`
   - `IDEAS_CSV_URL`
   - `GUIDES_CSV_URL`

2. **Run the workflow manually**:
   Go to the **Actions** tab in your GitHub repository. Select **Import Content from Google Sheets** from the left sidebar, click **Run workflow**, ensure you are on the `main` branch, and click the **Run workflow** button.

3. **What files change**:
   If there are new updates from the Google Sheets, the workflow will automatically commit changes to the JSON files within the `src/data/generated/` folder.

4. **Automatic Deployment**:
   Once the "Import Content" action finishes successfully, it automatically triggers a second workflow called **Deploy to GitHub Pages**. This second workflow builds the static Astro site with the new content and pushes it to production. You do not need to trigger the deploy manually.

5. **Confirming the build worked**:
   You can watch both actions run sequentially in the Actions tab. Once the Deploy action gets a green checkmark, the changes are live on the public URL.
