// We listen to the resize event

function calcViewportHeight() {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("DOMContentLoaded", calcViewportHeight);
window.addEventListener("resize", calcViewportHeight);
