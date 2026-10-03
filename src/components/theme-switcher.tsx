"use client";

import { useSyncExternalStore } from "react";
import {
  resolveTheme,
  THEMES,
  THEME_KEY,
  type ThemeId,
} from "@/lib/theme";

const THEME_CHANGE_EVENT = "ep-theme-change";

function applyTheme(theme: ThemeId) {
  if (theme === "paper") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

function getThemeSnapshot() {
  return resolveTheme(document.documentElement.dataset.theme ?? null, null);
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "paper");

  function selectTheme(nextTheme: ThemeId) {
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {}
  }

  return (
    <div
      role="radiogroup"
      aria-label="主题颜色"
      className="mt-4 inline-flex w-full rounded-full border border-line bg-paper p-1"
    >
      {THEMES.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={theme === option.id}
          onClick={() => selectTheme(option.id)}
          className={`flex flex-1 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            theme === option.id
              ? "bg-pine text-on-pine"
              : "text-muted hover:text-pine"
          }`}
        >
          <span
            aria-hidden
            className="size-3 rounded-full border border-black/10"
            style={{
              background: `linear-gradient(135deg, ${option.swatch[0]} 50%, ${option.swatch[1]} 50%)`,
            }}
          />
          {option.name}
        </button>
      ))}
    </div>
  );
}
