"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTimedFlag(duration = 2500) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const show = useCallback(() => {
    setVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setVisible(false), duration);
  }, [duration]);

  return { visible, show };
}
