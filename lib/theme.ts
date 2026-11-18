export const themeStorageKey = "portfolio-theme";
export const systemDarkQuery = "(prefers-color-scheme: dark)";

export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

export function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export const themeInitializationScript = `
(() => {
  const root = document.documentElement;
  let preference;
  try {
    preference = localStorage.getItem(${JSON.stringify(themeStorageKey)});
  } catch {}

  const hasSavedPreference = preference === "light" || preference === "dark";
  if (hasSavedPreference) {
    root.dataset.themePreference = preference;
  }

  const isDark = hasSavedPreference
    ? preference === "dark"
    : matchMedia(${JSON.stringify(systemDarkQuery)}).matches;
  root.classList.toggle("dark", isDark);
})();`;
