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
    slide.appendChild(imgGame);
  });
}
