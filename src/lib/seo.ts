import { getCityBySlug, getCategoryBySlug } from './data';

/**
 * Returns the current month name and year using the Australia/Sydney timezone.
 * Titles are generated at build-time, so this updates on every deploy.
 */
function getCurrentMonthAndYearForAu(): { monthLong: string; year: number } {
  const now = new Date();
  const monthLong = now.toLocaleString('en-AU', {
    month: 'long',
    timeZone: 'Australia/Sydney',
  });
  return {
    monthLong,
    year: Number(now.toLocaleString('en-AU', {
      year: 'numeric',
      timeZone: 'Australia/Sydney',
    })),
  };
}

/**
 * Builds a date suffix for SEO titles.
 * - "monthYear" -> " | October 2026"
 * - "year" -> " | 2026"
 */
function buildDateSuffix(style: 'monthYear' | 'year' = 'monthYear'): string {
  const { monthLong, year } = getCurrentMonthAndYearForAu();
  return style === 'year' ? ` | ${year}` : ` | ${monthLong} ${year}`;
}

export const generateCityHeading = (citySlug: string) => {
  const city = getCityBySlug(citySlug);
  return city
    ? `Things to do with kids ${city.preposition} ${city.title}`
    : 'Things to do with kids';
};

export const generateCitySeoTitle = (citySlug: string) => {
  return `${generateCityHeading(citySlug)}${buildDateSuffix('monthYear')}`;
};

export const generateCategoryHeading = (citySlug: string, categorySlug: string) => {
  const city = getCityBySlug(citySlug);
  const cat = getCategoryBySlug(categorySlug);
  if (!city || !cat || !cat.seo_title_pattern) return 'Things to do with kids';
  return cat.seo_title_pattern
    .replace('{preposition}', city.preposition)
    .replace('{city}', city.title);
};

export const generateCategorySeoTitle = (citySlug: string, categorySlug: string) => {
  return `${generateCategoryHeading(citySlug, categorySlug)}${buildDateSuffix('year')}`;
};

export const generateEventsSeoTitle = (citySlug: string) => {
  const city = getCityBySlug(citySlug);
  const location = city ? `${city.preposition} ${city.title}` : '';
  return `Kids' events${location ? ` ${location}` : ''}${buildDateSuffix('monthYear')}`;
};

export const generateWeekendTitle = (citySlug: string) => {
  const city = getCityBySlug(citySlug);
  return city
    ? `Things to do with kids ${city.preposition} ${city.title} this weekend`
    : 'Things to do with kids this weekend';
};

export const generatePlaceSeoTitle = (placeTitle: string, cityName: string) =>
  `${placeTitle} with Kids | ${cityName} Family Guide`;

export const generatePlaceHeading = (placeTitle: string) =>
  `${placeTitle} with kids`;

export const generateIdeaSeoTitle = (
  ideaTitle: string,
  citySlug: string,
) => {
  const city = getCityBySlug(citySlug);
  return city
    ? `${ideaTitle} with kids ${city.preposition} ${city.title}`
    : `${ideaTitle} with kids`;
};

export const generateGuideSeoTitle = (guideTitle: string) =>
  `${guideTitle} | Family Guide`;
