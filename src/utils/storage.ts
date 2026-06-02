import {
  DEFAULT_SETTINGS,
  SETTINGS_STORE_KEY,
} from "@/constants/app";
import type { AppSettings } from "@/types";

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(localStorage.getItem(SETTINGS_STORE_KEY) || "{}"),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(SETTINGS_STORE_KEY, JSON.stringify(settings));
}
