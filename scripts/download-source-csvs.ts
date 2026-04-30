import fs from 'fs';
import path from 'path';

// Naive .env parser for standalone script without extra dependencies
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    });
  }
} catch (e) {
  // Ignore
}

const fileMap: Record<string, string | undefined> = {
  'cities.csv': process.env.CITIES_CSV_URL,
  'categories.csv': process.env.CATEGORIES_CSV_URL,
  'discovery-tags.csv': process.env.DISCOVERY_TAGS_CSV_URL,
  'places.csv': process.env.PLACES_CSV_URL,
  'events.csv': process.env.EVENTS_CSV_URL,
  'ideas.csv': process.env.IDEAS_CSV_URL,
  'guides.csv': process.env.GUIDES_CSV_URL,
};

async function downloadFile(url: string, dest: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  fs.writeFileSync(dest, text);
}

async function main() {
  const outDir = path.resolve(process.cwd(), 'src/data/source');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let downloadedCount = 0;
  
  let errorCount = 0;

  console.log('--- Starting CSV Download ---');

  for (const [filename, url] of Object.entries(fileMap)) {
    if (!url) {
      console.error(`[ERROR] ${filename}: URL missing in environment.`);
      errorCount++;
      continue;
    }
    
    process.stdout.write(`Downloading ${filename}... `);
    try {
      await downloadFile(url, path.join(outDir, filename));
      process.stdout.write('DONE\n');
      downloadedCount++;
    } catch (e: any) {
      process.stdout.write('FAILED\n');
      console.error(`  [ERROR] Could not download ${filename}: ${e.message}`);
      errorCount++;
    }
  }

  console.log('\n--- Download Summary ---');
  console.log(`Downloaded: ${downloadedCount}`);
  
  console.log(`Errors:     ${errorCount}`);

  if (errorCount > 0) {
    console.error('\nDownload failed with errors.');
    process.exit(1);
  }
}

main().catch(e => {
  console.error('Fatal execution error:', e);
  process.exit(1);
});
