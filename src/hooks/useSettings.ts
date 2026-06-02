"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SETTINGS } from "@/constants/app";
import type { AppSettings } from "@/types";
import { loadSettings, saveSettings } from "@/utils/storage";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const updateSettings = useCallback((nextSettings: AppSettings) => {
    saveSettings(nextSettings);
    setSettings(nextSettings);
  }, []);

  return { settings, updateSettings };
}
