/** Absolute deadline: 7 November 2026, 18:30 Lima / 20:30 Santiago. */
export const DEADLINE = Date.parse('2026-11-07T23:30:00Z');
export const REFERENCE_TIME = Date.parse('2026-11-05T19:49:00Z');

/** Derive the countdown from the clock so background tabs cannot cause drift. */
export function getCountdown(now = Date.now()) {
  const remaining = Math.max(0, DEADLINE - now);
  const totalSeconds = Math.ceil(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalSeconds,
    finished: remaining === 0,
    progress: Math.min(1, Math.max(0, 1 - remaining / (DEADLINE - REFERENCE_TIME))),
  };
}
