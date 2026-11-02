// Giving window for a fundraising campaign. Dates are YYYY-MM-DD and inclusive, in
// Meadville's time zone: the window opens at midnight on startDate and closes at the
// midnight that ends endDate. Pages re-check the window in the browser, since a
// static build only knows the date it ran.

export type CampaignStatus = 'upcoming' | 'active' | 'closed';

export interface CampaignWindow {
  start: number; // ms timestamp
  end: number;   // ms timestamp, exclusive
}

const HOUR = 3_600_000;

const nyHour = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  hourCycle: 'h23',
});

// Midnight at the start of `date` in New York, as a timestamp
function easternMidnight(y: number, m: number, d: number): number {
  const guess = Date.UTC(y, m - 1, d, 5); // midnight EST (UTC-5)
  // During daylight time (UTC-4) New York reads 1 a.m. at the guess; step back that hour
  return guess - Number(nyHour.format(guess)) * HOUR;
}

function parts(date: string): [number, number, number] {
  const [y, m, d] = date.split('-').map(Number);
  return [y, m, d];
}

export function campaignWindow(campaign: { startDate?: string | null; endDate?: string | null }): CampaignWindow | null {
  if (!campaign.startDate || !campaign.endDate) return null;
  const [ey, em, ed] = parts(campaign.endDate);
  return {
    start: easternMidnight(...parts(campaign.startDate)),
    end: easternMidnight(ey, em, ed + 1),
  };
}

export function campaignStatus(win: CampaignWindow | null, now = Date.now()): CampaignStatus {
  if (!win) return 'active';
  return now < win.start ? 'upcoming' : now >= win.end ? 'closed' : 'active';
}

// "Dec 31, 2026": built from the date string itself so no time zone can shift the day
export function formatCampaignDate(date: string, month: 'short' | 'long' = 'short'): string {
  const [y, m, d] = parts(date);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month,
    day: 'numeric',
    year: 'numeric',
  });
}
