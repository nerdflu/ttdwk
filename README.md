# Things To Do With Kids (Astro)

An Australian family discovery guide built with Astro.

## Architecture
This is a statically generated Astro site. It reads from local JSON files to build fast, SEO-optimized city hubs. 
In the future, a pipeline will sync data from a Google Sheet into these JSON files via GitHub Actions.

## Local Setup
Ensure you have Node.js installed.

1. **Install dependencies:**
   `npm install`
   
2. **Start the dev server:**
   `npm run dev`

3. **Build the production site:**
   `npm run build`

## Features
- Statically built for speed
- TypeScript for data models
- Content-aware city navigation
- No heavy UI libraries (Vanilla CSS, Astro components)
