(function () {
  const storageKey = "cdl-theme";
  const validThemes = new Set(["light", "dark"]);

  function safeGetTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      return validThemes.has(saved) ? saved : "";
    } catch (error) {
      return "";
    }
  }

  function safeSetTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Browsers can block storage in strict privacy modes; the page theme still updates.
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function currentTheme() {
    const active = document.documentElement.getAttribute("data-theme");
    return validThemes.has(active) ? active : safeGetTheme() || systemTheme();
  }

  function updateButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      const nextLabel = nextTheme === "dark" ? "Switch to dark mode" : "Switch to light mode";
      const icon = button.querySelector(".theme-icon");
      if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
      button.setAttribute("aria-label", nextLabel);
      button.setAttribute("title", nextLabel);
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
  }

  function setTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    safeSetTheme(nextTheme);
    updateButtons(nextTheme);
  }

  function toggleTheme() {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  }

  function bindThemeButtons() {
    updateButtons(currentTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      if (button.dataset.themeBound === "true") return;
      button.dataset.themeBound = "true";
      button.addEventListener("click", toggleTheme);
    });
  }

  window.CDLTheme = {
    bind: bindThemeButtons,
    get: currentTheme,
    set: setTheme,
    toggle: toggleTheme
  };

  setTheme(safeGetTheme() || "dark");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindThemeButtons);
  } else {
    bindThemeButtons();
  }
})();
