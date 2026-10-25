import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value (Topic 67-72: debounce pattern)
 * @param {any} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timer if value or delay changes before timeout fires
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
