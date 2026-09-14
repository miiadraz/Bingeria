"use client";

import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    // Pospremanje: ako se value promijeni prije isteka timera (korisnik
    // dalje tipka), ili komponenta ode s ekrana, stari timer se otkazuje.
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debounced;
}
