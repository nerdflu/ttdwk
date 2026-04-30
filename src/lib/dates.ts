export const getTodayString = (timezone: string = "Australia/Sydney"): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(now);
};

export const parseLocalDate = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

export const isEventUpcoming = (event: any, timezone?: string, todayStr?: string): boolean => {
  const referenceStr = todayStr || getTodayString(timezone);
  const endStr = event.end_date || event.start_date;
  return endStr >= referenceStr;
};

export const isEventExpired = (event: any, timezone?: string, todayStr?: string): boolean => {
  return !isEventUpcoming(event, timezone, todayStr);
};

export const getThisWeekendWindow = (timezone?: string, todayStr?: string) => {
  const referenceStr = todayStr || getTodayString(timezone);
  const referenceDate = parseLocalDate(referenceStr);
  const dayOfWeek = referenceDate.getDay();
  
  const friday = new Date(referenceDate);
  if (dayOfWeek === 0) {
    friday.setDate(friday.getDate() - 2);
  } else if (dayOfWeek === 6) {
    friday.setDate(friday.getDate() - 1);
  } else if (dayOfWeek === 5) {
    // already friday
  } else {
    // Next upcoming weekend
    friday.setDate(friday.getDate() + (5 - dayOfWeek));
  }
  
  const sunday = new Date(friday);
  sunday.setDate(sunday.getDate() + 2);
  
  const formatDate = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd;
  };
  
  return { start: formatDate(friday), end: formatDate(sunday) };
};

export const isEventHappeningThisWeekend = (event: any, timezone?: string, todayStr?: string): boolean => {
  if (!event.start_date) return false;
  const window = getThisWeekendWindow(timezone, todayStr);
  const eventStart = event.start_date;
  const eventEnd = event.end_date || event.start_date;
  
  return eventStart <= window.end && eventEnd >= window.start;
};

export const sortEventsByStartDate = (events: any[]) => {
  return [...events].sort((a, b) => {
    const aStart = a.start_date || "";
    const bStart = b.start_date || "";
    if (aStart < bStart) return -1;
    if (aStart > bStart) return 1;
    return 0;
  });
};
