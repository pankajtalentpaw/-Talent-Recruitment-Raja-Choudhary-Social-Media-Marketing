"use client";

import { useCallback, useEffect, useState } from "react";
import { GATE_SESSION_KEY } from "@/constants/app";
import { hasSessionFlag, setSessionFlag } from "@/utils/sessionStorage";
import { loadSettings } from "@/utils/storage";

type GateMode = "hidden" | "url" | "code";

export function usePrivateGate() {
  const [mode, setMode] = useState<GateMode>("hidden");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const settings = loadSettings();

    if (settings.privateMode === "url") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access") || params.get("token");
      if (token !== settings.privateToken) {
        setMode("url");
      }
      return;
    }

    if (
      settings.privateMode === "code" &&
      !hasSessionFlag(GATE_SESSION_KEY)
    ) {
      setMode("code");
    }
  }, []);

  useEffect(() => {
    if (mode === "hidden") {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode]);

  const checkCode = useCallback((value: string) => {
    const settings = loadSettings();
    if (value.trim() === settings.privateToken) {
      setSessionFlag(GATE_SESSION_KEY);
      setHasError(false);
      setMode("hidden");
      return;
    }
    setHasError(true);
  }, []);

  return { mode, hasError, checkCode };
}
