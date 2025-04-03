const toggleNavTablet = () => {
  let navTablet = document.querySelector("nav > #nav");
  let iconMenu = document.querySelector("nav > #toggle-nav");
  navTablet.classList.toggle("tablet");
  console.log(iconMenu);
  iconMenu.setAttribute(
    "class",
    navTablet.classList.contains("tablet") ? "fas fa-xmark" : "fas fa-bars"
  );
};

const closeMenu = () => {
  let navTablet = document.querySelector("nav > #nav");
  let iconMenu = document.querySelector("nav > #toggle-nav");
  navTablet.classList.remove("tablet");
  iconMenu.setAttribute(
    "class",
    navTablet.classList.contains("tablet") ? "fas fa-xmark" : "fas fa-bars"
  );
};

function initMobileMenu() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    let toggleNav = document.querySelector("#toggle-nav");
    toggleNav.style.cursor = "pointer";
    toggleNav.addEventListener("click", toggleNavTablet);
    let main = document.querySelector("main");
    main.addEventListener("click", closeMenu);
    let navLinks = document.querySelectorAll("nav > #nav > ul > li > a");
    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", closeMenu);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  window.addEventListener("resize", initMobileMenu);
  window.addEventListener("scroll", closeMenu);
  window.addEventListener("resize", closeMenu);
});
