const FEATURE_LABELS: Record<string, string> = {
  pram_friendly: 'Pram friendly',
  toilets: 'Toilets',
  shade: 'Shade',
  parking_easy: 'Easy parking',
  cafe: 'Cafe nearby',
  dog_friendly: 'Dog friendly',
  wheelchair_accessible: 'Wheelchair accessible',
  rainy_day: 'Rainy day',
};

const TAG_LABELS: Record<string, string> = {
  'mini-adventure': 'Mini adventure',
  'hidden-gem': 'Hidden gem',
  'burn-energy': 'Burn energy',
  'calm-day': 'Calm day',
  'something-different': 'Something different',
  'worth-the-drive': 'Worth the drive',
  'quick-outing': 'Quick outing',
  'low-cost': 'Low cost',
  'toddler-friendly': 'Toddler friendly',
  'teen-friendly': 'Teen friendly',
};

const FEATURE_KEYS = Object.keys(FEATURE_LABELS);

function featureLabel(slug: string): string {
  return FEATURE_LABELS[slug] || slug.replace(/[_-]/g, ' ');
}

function uniquePush(list: string[], value?: string) {
  if (value && !list.includes(value)) list.push(value);
}

function collectFeatures(place: any): string[] {
  const slugs = [...(place.features || [])];
  for (const key of FEATURE_KEYS) {
    if (place[key] === true || place[key] === 'yes') slugs.push(key);
  }
  return slugs;
}

export function placeFacts(place: any, limit = 4): string[] {
  const facts: string[] = [];
  uniquePush(facts, place.price);
  uniquePush(facts, place.age);
  uniquePush(facts, place.hours);
  if (place.local_gem) uniquePush(facts, 'Hidden gem');
  for (const feature of collectFeatures(place)) {
    uniquePush(facts, featureLabel(feature));
  }
  for (const tag of place.discovery_tags || []) {
    uniquePush(facts, TAG_LABELS[tag]);
  }
  return facts.slice(0, limit);
}

export function placeCopy(place: any): string {
  return [place.summary, place.good_to_know].filter(Boolean).join(' ');
}

export function ideaFacts(idea: any, limit = 4): string[] {
  const facts: string[] = [];
  uniquePush(facts, idea.estimated_duration);
  uniquePush(facts, idea.estimated_cost);
  for (const tag of idea.discovery_tags || []) {
    uniquePush(facts, TAG_LABELS[tag]);
  }
  return facts.slice(0, limit);
}

export function formatEventDate(startDate?: string): string {
  if (!startDate) return '';
  const date = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return startDate;
  return new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function countLabel(places: number, ideas: number, events: number): string {
  const parts: string[] = [];
  if (places) parts.push(`${places} ${places === 1 ? 'place' : 'places'}`);
  if (ideas) parts.push(`${ideas} ${ideas === 1 ? 'idea' : 'ideas'}`);
  if (events) parts.push(`${events} ${events === 1 ? 'event' : 'events'}`);
  if (!parts.length) return 'Nothing listed yet';
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts[0]}, ${parts[1]} and ${parts[2]}`;
}
