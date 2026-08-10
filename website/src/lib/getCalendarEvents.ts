import { CALENDAR_ID } from '../config/calendar';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
  url: string;
}

export async function getCalendarEvents(maxResults = 20): Promise<CalendarEvent[]> {
  const apiKey = import.meta.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    console.warn('[calendar] GOOGLE_CALENDAR_API_KEY not set — skipping event fetch.');
    return [];
  }

  const timeMin = new Date().toISOString();
  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    maxResults: String(maxResults),
    singleEvents: 'true',
    orderBy: 'startTime',
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[calendar] API error ${res.status}: ${await res.text()}`);
      return [];
    }
    const data = await res.json();
    return (data.items ?? []).map((item: any): CalendarEvent => ({
      id: item.id,
      title: item.summary ?? 'Untitled Event',
      description: item.description ?? '',
      start: new Date(item.start?.dateTime ?? item.start?.date),
      end:   new Date(item.end?.dateTime   ?? item.end?.date),
      location: item.location,
      url: item.htmlLink,
    }));
  } catch (err) {
    console.error('[calendar] Fetch failed:', err);
    return [];
  }
}
