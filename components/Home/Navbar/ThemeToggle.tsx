"use client";

import { isDarkMode, subscribeToTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function serverIsDarkMode() {
  return false;
}

function toggleTheme() {
  document.documentElement.dataset.theme = isDarkMode() ? "light" : "dark";
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToTheme, isDarkMode, serverIsDarkMode);

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
