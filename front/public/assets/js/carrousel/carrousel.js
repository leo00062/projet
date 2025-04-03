import { fetchData } from "../lib/function.js";

window.addEventListener("DOMContentLoaded", () => {
  fetchData({
    route: "/games",
    options: {
      params: {
        key: "248a243b268d4e3487d7be640ce8c4d5",
        dates: "2019-09-01,2019-09-30",
        platforms: "18,1,7",
      },
    },
  })
    .then((data) => data.results)
    .then((games) => {
      if (games && games.length > 0) {
        createCarrousel(games);
      } else {
        console.error("Aucun carrousel trouvé...");
      }
    });
});

function createCarrousel(games) {
  const carrousel = document.querySelector(".carrousel");

  // Créer un slide par jeu
  games.forEach((game) => {
    const slide = document.createElement("div");
    slide.className = "carrousel-slide";
    const imgGame = document.createElement("img");
    imgGame.src = game.background_image;
    imgGame.alt = game.name;
    imgGame.addEventListener("click", () =>
      openLightBox(imgGame.src, game.name)
    );
    slide.appendChild(imgGame);
    const caption = document.createElement("div");
    caption.className = "carrousel-caption";
    caption.textContent = game.name;
    slide.appendChild(caption);
    carrousel?.appendChild(slide);
  });

  // Cloner la dernière slide et l'insérer au début
  const slides = carrousel.children; // HTMLCollection dynamique
  const lastSlideClone = slides[games.length - 1].cloneNode(true);
  carrousel.insertBefore(lastSlideClone, slides[0]);

  // Cloner la première slide et l'ajouter à la fin
  const firstSlideClone = slides[1].cloneNode(true);
  carrousel.appendChild(firstSlideClone);

  // On démarre à l'index 1, qui correspond à la première slide réelle
  let currentIndex = 1;
  const totalSlides = games.length; // nombre de slides réelles

  // Position initiale (sans transition pour le réglage)
  carrousel.style.transition = "none";
  showSlide(currentIndex);
  setTimeout(() => {
    carrousel.style.transition = "transform 0.5s ease-in-out";
  }, 50);

  function showSlide(index) {
    carrousel.style.transform = `translateX(-${index * 100}%)`;
  }

  const prevButton = document.querySelector(".prev");
  prevButton.addEventListener("click", () => {
    currentIndex--;
    showSlide(currentIndex);
    // Si on arrive sur la slide clone du dernier, on repositionne instantanément sur la vraie dernière slide
    if (currentIndex === 0) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = totalSlides;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  const nextButton = document.querySelector(".next");
  nextButton.addEventListener("click", () => {
    currentIndex++;
    showSlide(currentIndex);
    // Si on arrive sur la slide clone de la première, repositionnement sur la vraie première slide
    if (currentIndex === totalSlides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = 1;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  // Mise à jour du setInterval avec la même logique que pour le bouton next
  function calcSlide() {
    currentIndex++;
    showSlide(currentIndex);
    if (currentIndex === totalSlides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = 1;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  }

  const closeLightBox = () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
    lightboxIsOpen = false;
    startInterval();
  };

  let inter;
  let lightboxIsOpen = false;

  function startInterval() {
    inter = setInterval(calcSlide, 3000);
  }

  setTimeout(() => {
    startInterval();
    const carrouselContainer = document.querySelector("#carrousel-container");
    carrouselContainer.addEventListener("mouseenter", () =>
      clearInterval(inter)
    );
    carrouselContainer.addEventListener("mouseleave", () => {
      clearInterval(inter);
      if (!lightboxIsOpen) startInterval();
    });
  }, 2000);

  const lightbox = document.querySelector("#lightbox");
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closeLightBox();
    }
  });

  window.addEventListener("keydown", (e) => prevOrNext(e));
  function prevOrNext(e) {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
      clearInterval(inter);
      startInterval();
      prevButton.click();
    } else if (
      e.key === "ArrowRight" ||
      e.code === "ArrowRight" ||
      e.keyCode === 39
    ) {
      clearInterval(inter);
      startInterval();
      nextButton.click();
    } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      closeLightBox();
    }
  }
  // Lightbox et gestion des évènements clavier restent inchangés
  function openLightBox(src, alt) {
    lightboxIsOpen = true;
    const lightbox = document.querySelector("#lightbox");
    const lightboxImg = document.querySelector("#lightbox-img");
    clearInterval(inter);
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    const lightbox = document.querySelector("#lightbox");
    closeLightBox();
  });
}
