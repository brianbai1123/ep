export const THEME_KEY = "ep:theme";

export const THEMES = [
  { id: "paper", name: "宣纸", swatch: ["#f3efe6", "#1c3d36"] },
  { id: "celadon", name: "青瓷", swatch: ["#e5ede9", "#1d4a5c"] },
  { id: "night", name: "夜读", swatch: ["#161412", "#8fc7b0"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

function isTheme(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function resolveTheme(
  queryTheme: string | null,
  storedTheme: string | null,
): ThemeId {
  if (isTheme(queryTheme)) return queryTheme;
  if (isTheme(storedTheme)) return storedTheme;
  return "paper";
}

export const THEME_BOOTSTRAP_SCRIPT = `(() => {
  const themes = ${JSON.stringify(THEMES.map(({ id }) => id))};
  const valid = (theme) => themes.includes(theme);
  const query = new URLSearchParams(location.search).get("theme");
  let stored = null;

  try {
    stored = localStorage.getItem(${JSON.stringify(THEME_KEY)});
  } catch {}

  const theme = valid(query) ? query : valid(stored) ? stored : "paper";

  if (valid(query)) {
    try {
      localStorage.setItem(${JSON.stringify(THEME_KEY)}, query);
    } catch {}
  }

  if (theme === "paper") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
})();`;
