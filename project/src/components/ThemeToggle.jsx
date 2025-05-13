import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} style={{ position: "absolute", top: 10, right: 10 }}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};
