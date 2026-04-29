import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const SOURCE_DIR = path.resolve(process.cwd(), 'src/data/source');
const OUT_DIR = path.resolve(process.cwd(), 'src/data/generated');

// Ensure output dir exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helpers
const parseBool = (val: string): boolean => {
  if (!val) return false;
  const lower = val.toLowerCase().trim();
  return ['true', 'yes', 'y', '1'].includes(lower);
};

const parseArray = (val: string): string[] => {
  if (!val) return [];
  return val.split(',').map(s => s.trim()).filter(Boolean);
};

const cleanObj = (obj: any) => {
  const cleaned: any = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== '' && v !== null && v !== undefined && (Array.isArray(v) ? v.length > 0 : true)) {
      cleaned[k] = v;
    }
  }
  return cleaned;
};

const readCsv = (filename: string) => {
  const filePath = path.join(SOURCE_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content, { columns: true, skip_empty_lines: true, trim: true, relax_column_count: true });
};

// Data stores for validation
let cities: any[] = [];
let categories: any[] = [];
let tags: any[] = [];

let errors: string[] = [];
let stats = { read: 0, imported: 0, skipped: 0, errors: 0 };

const logError = (type: string, identifier: string, msg: string) => {
  errors.push(`[${type}] ${identifier}: ${msg}`);
  stats.errors++;
};

const validStatuses = ['draft', 'pending', 'needs-review', 'approved', 'published', 'rejected', 'expired'];
const visibleStatuses = ['approved', 'published'];

const checkRequired = (row: any, type: string, fields: string[]) => {
  for (const field of fields) {
    if (!row[field]) logError(type, row.slug || row.title || 'Unknown', `Missing required field: ${field}`);
  }
};

const processDataset = (filename: string, typeName: string, requiredFields: string[], processor: (row: any) => any) => {
  console.log(`Processing ${typeName}...`);
  const rawData = readCsv(filename);
  const processed: any[] = [];
  const seenSlugs = new Set();

  for (const row of rawData) {
    stats.read++;
    
    // Status check
    if (row.status !== undefined) {
      if (!validStatuses.includes(row.status)) {
        logError(typeName, row.slug || row.title, `Invalid status: ${row.status}`);
        stats.skipped++;
        continue;
      }
      if (!visibleStatuses.includes(row.status)) {
        stats.skipped++;
        continue; // Skip writing non-visible items to generated JSON
      }
    }

    checkRequired(row, typeName, requiredFields);

    if (row.slug) {
      if (seenSlugs.has(row.slug)) {
        logError(typeName, row.slug, `Duplicate slug found: ${row.slug}`);
      }
      seenSlugs.add(row.slug);
    }

    // Referential checks
    if (row.city && cities.length > 0 && !cities.find(c => c.slug === row.city)) {
      logError(typeName, row.slug, `Referenced city not found: ${row.city}`);
    }
    
    const cats = parseArray(row.categories || '');
    cats.forEach(c => {
      if (categories.length > 0 && !categories.find(cat => cat.slug === c)) {
        logError(typeName, row.slug, `Referenced category not found: ${c}`);
      }
    });

    const dTags = parseArray(row.discovery_tags || '');
    dTags.forEach(t => {
      if (tags.length > 0 && !tags.find(tag => tag.slug === t)) {
        logError(typeName, row.slug, `Referenced discovery tag not found: ${t}`);
      }
    });

    try {
      const cleanData = cleanObj(processor(row));
      processed.push(cleanData);
      stats.imported++;
    } catch (e: any) {
      logError(typeName, row.slug, `Processing error: ${e.message}`);
      stats.skipped++;
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, filename.replace('.csv', '.json')), JSON.stringify(processed, null, 2));
  return processed;
};

const run = () => {
  cities = processDataset('cities.csv', 'City', ['title', 'slug'], r => ({
    ...r,
    nearby_regions: parseArray(r.nearby_regions)
  }));

  categories = processDataset('categories.csv', 'Category', ['title', 'slug'], r => r);
  tags = processDataset('discovery-tags.csv', 'DiscoveryTag', ['title', 'slug'], r => r);

  processDataset('places.csv', 'Place', ['title', 'slug', 'city'], r => {
    const featuresList = ['rainy_day', 'pram_friendly', 'toilets', 'shade', 'parking_easy', 'cafe', 'dog_friendly', 'wheelchair_accessible'];
    const features = featuresList.filter(f => parseBool(r[f]));
    
    const obj = { ...r };
    featuresList.forEach(f => delete obj[f]);
    
    return {
      ...obj,
      categories: parseArray(r.categories),
      discovery_tags: parseArray(r.discovery_tags),
      features,
      editorial_pick: parseBool(r.editorial_pick),
      local_gem: parseBool(r.local_gem),
      mainstream: parseBool(r.mainstream)
    };
  });

  processDataset('events.csv', 'Event', ['title', 'slug', 'city', 'start_date'], r => ({
    ...r,
    categories: parseArray(r.categories),
    discovery_tags: parseArray(r.discovery_tags),
    is_free: parseBool(r.is_free),
    booking_required: parseBool(r.booking_required)
  }));

  processDataset('ideas.csv', 'Idea', ['title', 'slug', 'city'], r => ({
    ...r,
    categories: parseArray(r.categories),
    discovery_tags: parseArray(r.discovery_tags),
    related_place_slugs: parseArray(r.related_place_slugs)
  }));

  processDataset('guides.csv', 'Guide', ['title', 'slug', 'city'], r => ({
    ...r,
    categories: parseArray(r.categories),
    discovery_tags: parseArray(r.discovery_tags),
    related_place_slugs: parseArray(r.related_place_slugs),
    related_event_slugs: parseArray(r.related_event_slugs),
    related_idea_slugs: parseArray(r.related_idea_slugs)
  }));

  console.log('\n=== Import Summary ===');
  console.log(`Rows Read:     ${stats.read}`);
  console.log(`Rows Imported: ${stats.imported}`);
  console.log(`Rows Skipped:  ${stats.skipped}`);
  console.log(`Errors:        ${stats.errors}`);

  if (errors.length > 0) {
    console.log('\n=== Validation Errors ===');
    errors.forEach(e => console.error(e));
    process.exit(1);
  }
};

run();
