const BASE_URL = "https://thingstodowithkids.com.au";

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Things To Do With Kids",
  "url": BASE_URL
});

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Things To Do With Kids",
  "url": BASE_URL,
  "logo": BASE_URL + "/logo.png" // Placeholder until logo exists
});

export const breadcrumbSchema = (items: { label: string; href?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => {
    const listItem: any = {
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label
    };
    if (item.href) {
      listItem.item = BASE_URL + item.href;
    }
    return listItem;
  })
});

export const collectionPageSchema = (title: string, description: string, urlPath: string) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": title,
  "description": description,
  "url": BASE_URL + urlPath
});

export const itemListSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "url": BASE_URL + item.url
  }))
});

export const eventSchema = (event: any, city: any) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.start_date,
    "endDate": event.end_date || event.start_date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  };

  if (event.summary) {
    schema.description = event.summary;
  }

  if (event.image_url) {
    schema.image = event.image_url;
  }

  if (event.source_url || event.booking_url) {
    schema.url = event.booking_url || event.source_url;
  }

  if (event.venue || event.city) {
    schema.location = {
      "@type": "Place",
      "name": event.venue || city?.title || event.city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.suburb || city?.title,
        "addressRegion": city?.state || "AU",
        "addressCountry": "AU"
      }
    };
    if (event.address) {
      schema.location.address.streetAddress = event.address;
    }
  }

  if (event.price || event.is_free) {
    schema.offers = {
      "@type": "Offer",
      "price": event.is_free ? "0" : (event.price || "0"),
      "priceCurrency": "AUD"
    };
    if (event.booking_url) {
      schema.offers.url = event.booking_url;
    }
  }

  return schema;
};

export const articleSchema = (guide: any, city: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": guide.title,
  "description": guide.summary,
  "author": {
    "@type": "Organization",
    "name": "Things To Do With Kids"
  }
});
