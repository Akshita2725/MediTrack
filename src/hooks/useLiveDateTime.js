import { useState, useEffect } from 'react';

export function useLiveDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update every second to keep the clock live and accurate
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const timeFormatted = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const isoDate = now.toISOString().split('T')[0];
  const fullString = `${dateFormatted} • ${timeFormatted}`;

  return {
    dateFormatted,
    timeFormatted,
    isoDate,
    fullString
  };
}
