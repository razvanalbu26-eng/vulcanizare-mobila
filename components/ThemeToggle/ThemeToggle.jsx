"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className }) {
  // lazy init: prima vizită => dark
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  // sincronizează "external system" (DOM + localStorage)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      aria-label="Schimbă tema"
      title="Schimbă tema"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
