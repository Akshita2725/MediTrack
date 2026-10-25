/**
 * Clinical Date & Time Utilities for MediTrack
 * Handles dynamic live clock, relative formatting, and calendar schedules in standard JavaScript.
 */

export function getCurrentDateFormatted() {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function getCurrentTimeFormatted() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function getTodayISODate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function formatClinicalDate(isoString) {
  if (!isoString) return '';
  const [year, month, day] = isoString.split('-').map(Number);
  if (!year || !month || !day) return isoString;
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getWeekScheduleDays(baseDate = new Date()) {
  const days = [];
  // 6 days schedule strip starting around today
  for (let offset = -1; offset <= 4; offset++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    const dayIso = d.toISOString().split('T')[0];
    const isToday = offset === 0;
    days.push({
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate().toString().padStart(2, '0'),
      fullDate: dayIso,
      isToday
    });
  }
  return days;
}
