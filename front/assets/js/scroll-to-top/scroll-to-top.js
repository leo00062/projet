const main = document.querySelector("main");
const scrollToTopButton = document.querySelector("#scroll-to-top");
const root = document.documentElement;
function posX() {
  const pos = (root.clientWidth - main.clientWidth) / 2;
  scrollToTopButton.style.right = `${pos}px`;
}

function scrollToTop() {
  const scrollToTopButton = document.querySelector("#scroll-to-top");
  const heroHeader = document.querySelector("#hero-header");
  window.addEventListener("scroll", () => {
    if (scrollY >= heroHeader.offsetHeight) {
      scrollToTopButton.style.display = "block";
    } else if (scrollY === 0) {
      scrollToTopButton.style.display = "none";
    }
    scrollToTopButton.addEventListener("click", () => window.scrollTo(0, 0));
  });
}
window.addEventListener("DOMContentLoaded", () => {
  scrollToTop();
  window.addEventListener("resize", posX);
});
posX();
