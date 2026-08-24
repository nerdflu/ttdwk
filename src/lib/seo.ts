import { getCityBySlug, getCategoryBySlug } from './data';

/**
 * Returns the current month name and year using the Australia/Sydney timezone.
 * Titles are generated at build-time, so this updates on every deploy.
 */
function getCurrentMonthAndYearForAu(): { monthLong: string; year: number } {
  const now = new Date();
  // Use Australian locale and timezone for consistent month names
  const monthLong = now.toLocaleString('en-AU', {
    month: 'long',
    timeZone: 'Australia/Sydney',
  });
  return {
    monthLong,
    year: now.getFullYear(),
  };
}

/**
 * Builds a date suffix for SEO titles.
 * - "monthYear" -> " - October 2026"
 * - "yearParens" -> " (2026)"
 */
function buildDateSuffix(style: 'monthYear' | 'yearParens' = 'monthYear'): string {
  const { monthLong, year } = getCurrentMonthAndYearForAu();
  return style === 'yearParens' ? ` (${year})` : ` - ${monthLong} ${year}`;
}

export const generateCitySeoTitle = (citySlug: string) => {
  const city = getCityBySlug(citySlug);
  const base = city
    ? `Things to do with kids ${city.preposition} ${city.title}`
    : 'Things to do with kids';
  return `${base}${buildDateSuffix('monthYear')}`;
};

export const generateCategorySeoTitle = (citySlug: string, categorySlug: string) => {
  const city = getCityBySlug(citySlug);
  const cat = getCategoryBySlug(categorySlug);
  if (!city || !cat || !cat.seo_title_pattern) return 'Things to do with kids';
  const base = cat.seo_title_pattern
    .replace('{preposition}', city.preposition)
    .replace('{city}', city.title);

  // Use a year-only style for specific categories like "free"; default to month+year
  const dateStyle: 'monthYear' | 'yearParens' =
    (cat as any).seo_date_style === 'yearParens' || cat.slug === 'free'
      ? 'yearParens'
      : 'monthYear';

  return `${base}${buildDateSuffix(dateStyle)}`;
};
