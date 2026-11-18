"use client";

import { isDarkMode, subscribeToTheme, systemDarkQuery, themeStorageKey } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const root = document.documentElement;
  const systemPreference = window.matchMedia(systemDarkQuery);
  const syncSystemTheme = () => {
    if (!root.dataset.themePreference) {
      root.classList.toggle("dark", systemPreference.matches);
    }
  };

  const unsubscribe = subscribeToTheme(onChange);
  systemPreference.addEventListener("change", syncSystemTheme);
  syncSystemTheme();

  return () => {
    unsubscribe();
    systemPreference.removeEventListener("change", syncSystemTheme);
  };
}

function serverIsDarkMode() {
  return false;
}

function toggleTheme() {
  const isDark = !isDarkMode();
  const preference = isDark ? "dark" : "light";

  document.documentElement.dataset.themePreference = preference;
  document.documentElement.classList.toggle("dark", isDark);

  try {
    localStorage.setItem(themeStorageKey, preference);
  } catch {
    // The choice still applies for this visit when storage is unavailable.
  }
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, isDarkMode, serverIsDarkMode);

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  );
}
