const systemDarkQuery = "(prefers-color-scheme: dark)";

export function isDarkMode() {
  const theme = document.documentElement.dataset.theme;
  return theme ? theme === "dark" : window.matchMedia(systemDarkQuery).matches;
}

export function subscribeToTheme(onChange: () => void) {
  const root = document.documentElement;
  const browserTheme = window.matchMedia(systemDarkQuery);
  const followBrowserTheme = () => {
    delete root.dataset.theme;
    onChange();
  };

  const observer = new MutationObserver(onChange);
  observer.observe(root, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  browserTheme.addEventListener("change", followBrowserTheme);

  return () => {
    observer.disconnect();
    browserTheme.removeEventListener("change", followBrowserTheme);
  };
}
