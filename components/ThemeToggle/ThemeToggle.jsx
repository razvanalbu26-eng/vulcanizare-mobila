"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState("dark");

  // init theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initial = prefersLight ? "light" : "dark";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
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
