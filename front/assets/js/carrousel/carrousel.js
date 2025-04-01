import { fetchData } from "../lib/function.js";

window.addEventListener("DOMContentLoaded", () => {
  fetchData({
    route:
      "/games?key=248a243b268d4e3487d7be640ce8c4d5&dates=2019-09-01,2019-09-30&platforms=18,1,7",
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
  // créer un slide par objet
  games.forEach((game) => {
    const slide = document.createElement("div");
    slide.className = "carrousel-slide";
    const imgGame = document.createElement("img");
    imgGame.src = game.background_image; // imgGame.setAttribute('src', game.image_url)
    imgGame.alt = game.name;
    imgGame.addEventListener("click", () =>
      openLightBox(imgGame.src, game.name)
    );
    slide.appendChild(imgGame);
    const caption = document.createElement("div");
    caption.className = "carrousel-caption";
    caption.textContent = game.name;
    slide.appendChild(caption);
    carrousel.appendChild(slide);
  });

  let currentIndex = 0;
  const totalSlide = games.length;

  function showSlide(index) {
    if (index === 0) {
      carrousel.style.animation = "none";
      carrousel.style.transform = `translateX(-${index * 100}%)`;
    } else {
      carrousel.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  const prevButton = document.querySelector(".prev");
  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? totalSlide - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });

  const nextButton = document.querySelector(".next");
  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex === totalSlide - 1 ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });

  function calcSlide() {
    currentIndex = currentIndex === totalSlide - 1 ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  }

  let inter;
  setTimeout(() => {
    inter = setInterval(calcSlide, 3000);
    carrousel.addEventListener("mouseenter", () => clearInterval(inter));
    carrousel.addEventListener("mouseleave", () => {
      clearInterval(inter);
      inter = setInterval(calcSlide, 3000);
    });
  }, 2000);

  function openLightBox(src, alt) {
    console.log(src);
    const lightbox = document.querySelector("#lightbox");
    const lightboxImg = document.querySelector("#lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    const lightbox = document.querySelector("#lightbox");
    lightbox.style.display = "none";
  });

  const lightbox = document.querySelector("#lightbox");
  lightbox.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      lightbox.style.display = "none";
    }
  });

  window.addEventListener("keydown", (e) => prevOrNext(e));
  function prevOrNext(e) {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
      prevButton.click();
    } else if (
      e.key === "ArrowRight" ||
      e.code === "ArrowRight" ||
      e.keyCode === 39
    ) {
      nextButton.click();
    } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      lightbox.style.display = "none";
    }
  }
}
