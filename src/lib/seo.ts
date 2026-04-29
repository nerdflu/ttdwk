import { getCityBySlug, getCategoryBySlug } from './data';

export const generateCitySeoTitle = (citySlug: string) => {
  const city = getCityBySlug(citySlug);
  return city ? `Things to do with kids ${city.preposition} ${city.title}` : 'Things to do with kids';
};

export const generateCategorySeoTitle = (citySlug: string, categorySlug: string) => {
  const city = getCityBySlug(citySlug);
  const cat = getCategoryBySlug(categorySlug);
  if (!city || !cat || !cat.seo_title_pattern) return 'Things to do with kids';
  return cat.seo_title_pattern.replace('{preposition}', city.preposition).replace('{city}', city.title);
};
