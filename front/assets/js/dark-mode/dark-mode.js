(function () {
  const root = document.documentElement; // récupère la balise html
  const togglerThemes = document.querySelectorAll("i[data-theme-toggler]");

  function init() {
    const storedTheme = localStorage.getItem("theme"); // récupère l'item avec la clé 'theme'
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches; // true || false
    console.log(systemPrefersDark);
    const theme = storedTheme || (systemPrefersDark ? "dark" : "light");
    root.setAttribute("data-theme", theme);
    togglerThemes.forEach((toggler) => {
      updateToggleButton(toggler, theme);
    });
  }

  function updateToggleButton(toggler, currentTheme) {
    toggler.setAttribute(
      "class",
      currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
    );
  }

  function toggleDarkMode(toggler) {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    root.setAttribute("data-theme", newTheme);
    // console.log(toggler);
    updateToggleButton(toggler, newTheme);
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
    togglerThemes.forEach((toggler) => {
      toggler.style.cursor = "pointer";
      toggler.addEventListener("click", () => toggleDarkMode(toggler));
    });
  });
})();
