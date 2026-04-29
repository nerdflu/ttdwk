import citiesData from '../data/cities.json';
import categoriesData from '../data/categories.json';
import tagsData from '../data/discovery-tags.json';
import placesData from '../data/places.json';
import eventsData from '../data/events.json';
import ideasData from '../data/ideas.json';
import guidesData from '../data/guides.json';

export const getCities = () => citiesData;
export const getCityBySlug = (slug: string) => citiesData.find(c => c.slug === slug);
export const getCategories = () => categoriesData;
export const getCategoryBySlug = (slug: string) => categoriesData.find(c => c.slug === slug);
export const getDiscoveryTags = () => tagsData;

export const getApprovedPlaces = () => placesData.filter(p => p.status === 'approved' || p.status === 'published');
export const getApprovedEvents = () => eventsData.filter(e => e.status === 'approved' || e.status === 'published');
export const getApprovedIdeas = () => ideasData.filter(i => i.status === 'approved' || i.status === 'published');
export const getApprovedGuides = () => guidesData.filter(g => g.status === 'approved' || g.status === 'published');

export const getPlacesForCity = (citySlug: string) => getApprovedPlaces().filter(p => p.city === citySlug);
export const getEventsForCity = (citySlug: string) => getApprovedEvents().filter(e => e.city === citySlug);
export const getIdeasForCity = (citySlug: string) => getApprovedIdeas().filter(i => i.city === citySlug);
export const getGuidesForCity = (citySlug: string) => getApprovedGuides().filter(g => g.city === citySlug);

// Simplified for now, just checking if start_date >= today
export const getUpcomingEventsForCity = (citySlug: string) => {
  const today = new Date().toISOString().split('T')[0];
  return getEventsForCity(citySlug).filter(e => e.start_date && e.start_date >= today);
};

// Simplified: just return upcoming for now, or events specifically marked for this weekend
export const getWeekendEventsForCity = (citySlug: string) => {
  return getUpcomingEventsForCity(citySlug); // Expand logic later using dates.ts
};

export const getAvailableCategoriesForCity = (citySlug: string) => {
  const places = getPlacesForCity(citySlug);
  const events = getEventsForCity(citySlug);
  const ideas = getIdeasForCity(citySlug);
  const guides = getGuidesForCity(citySlug);

  const usedCategorySlugs = new Set<string>();
  [...places, ...events, ...ideas, ...guides].forEach(item => {
    (item.categories || []).forEach((cat: string) => usedCategorySlugs.add(cat));
  });

  return getCategories().filter(cat => usedCategorySlugs.has(cat.slug));
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
  availableCats.forEach(cat => {
    items.push({ label: cat.title, href: `/${citySlug}/${cat.slug}/` });
  });

  if (getGuidesForCity(citySlug).length > 0) {
    items.push({ label: 'Guides', href: `/${citySlug}/guides/` }); // Assuming guides overview, or just show if there are guides
  }
  
  return items;
};
