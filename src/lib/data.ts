import fs from 'fs';
import path from 'path';

function loadData(filename: string) {
  try {
    const generatedPath = path.resolve(process.cwd(), `src/data/generated/${filename}.json`);
    if (fs.existsSync(generatedPath)) {
      return JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));
    }
  } catch (e) {
    console.warn(`Failed to read generated data for ${filename}, falling back to sample.`);
  }

  try {
    const sourcePath = path.resolve(process.cwd(), `src/data/${filename}.json`);
    return JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
  } catch (e) {
    return [];
  }
}

const citiesData = loadData('cities');
const categoriesData = loadData('categories');
const tagsData = loadData('discovery-tags');
const placesData = loadData('places');
const eventsData = loadData('events');
const ideasData = loadData('ideas');
const guidesData = loadData('guides');

export const getCities = () => citiesData;
export const getCityBySlug = (slug: string) => citiesData.find((c: any) => c.slug === slug);
export const getCategories = () => categoriesData;
export const getCategoryBySlug = (slug: string) => categoriesData.find((c: any) => c.slug === slug);
export const getDiscoveryTags = () => tagsData;

// Note: Import script already filters to 'approved' and 'published' for generated JSON.
// We maintain this filter for sample data fallbacks.
export const getApprovedPlaces = () => placesData.filter((p: any) => p.status === 'approved' || p.status === 'published' || !p.status);
export const getApprovedEvents = () => eventsData.filter((e: any) => e.status === 'approved' || e.status === 'published' || !e.status);
export const getApprovedIdeas = () => ideasData.filter((i: any) => i.status === 'approved' || i.status === 'published' || !i.status);
export const getApprovedGuides = () => guidesData.filter((g: any) => g.status === 'approved' || g.status === 'published' || !g.status);

export const getPlacesForCity = (citySlug: string) => getApprovedPlaces().filter((p: any) => p.city === citySlug);
export const getEventsForCity = (citySlug: string) => getApprovedEvents().filter((e: any) => e.city === citySlug);
export const getIdeasForCity = (citySlug: string) => getApprovedIdeas().filter((i: any) => i.city === citySlug);
export const getGuidesForCity = (citySlug: string) => getApprovedGuides().filter((g: any) => g.city === citySlug);

export const getUpcomingEventsForCity = (citySlug: string) => {
  const today = new Date().toISOString().split('T')[0];
  return getEventsForCity(citySlug).filter((e: any) => e.start_date && e.start_date >= today);
};

export const getWeekendEventsForCity = (citySlug: string) => {
  return getUpcomingEventsForCity(citySlug); 
};

export const getAvailableCategoriesForCity = (citySlug: string) => {
  const places = getPlacesForCity(citySlug);
  const events = getEventsForCity(citySlug);
  const ideas = getIdeasForCity(citySlug);
  const guides = getGuidesForCity(citySlug);

  const usedCategorySlugs = new Set<string>();
  [...places, ...events, ...ideas, ...guides].forEach((item: any) => {
    (item.categories || []).forEach((cat: string) => usedCategorySlugs.add(cat));
  });

  return getCategories().filter((cat: any) => usedCategorySlugs.has(cat.slug));
};

export const getCityNavItems = (citySlug: string) => {
  const items = [];
  items.push({ label: 'Things to do', href: `/${citySlug}/` });
  
  if (getUpcomingEventsForCity(citySlug).length > 0) {
    items.push({ label: 'Events', href: `/${citySlug}/events/` });
  }
  if (getWeekendEventsForCity(citySlug).length > 0) {
    items.push({ label: 'This weekend', href: `/${citySlug}/events/this-weekend/` });
  }
  
  const availableCats = getAvailableCategoriesForCity(citySlug);
  availableCats.forEach((cat: any) => {
    items.push({ label: cat.title, href: `/${citySlug}/${cat.slug}/` });
  });

  if (getGuidesForCity(citySlug).length > 0) {
    items.push({ label: 'Guides', href: `/${citySlug}/guides/` });
  }
  
  return items;
};
