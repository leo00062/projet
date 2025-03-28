import { fetchData } from "../lib/function.js";

window.addEventListener("DOMContentLoaded", () => {
  let loading = true;
  let tabGames = [];
  fetchData({
    route:
      "/games?key=248a243b268d4e3487d7be640ce8c4d5&dates=2019-09-01,2019-09-30&platforms=18,1,7",
  })
    .then((data) => {
      return data.results;
    })
    .then((data) => {
      loading = !loading;
      tabGames = [...tabGames, data];
      create(loading, tabGames[0]);
    });
});

function create(loading, tabGames) {
  if (!loading) {
    console.log(tabGames);
    const presentation = document.querySelector("#presentation");
    const container = document.createElement("div");
    container.setAttribute("id", "content-games");
    presentation.appendChild(container);
    tabGames.map((game) => {
      // for (let i = 0; i < tabGames.length; i += 2) {
      // let pair = tabGames.slice(i, i + 2);
      const divArea = document.createElement("div");
      container.appendChild(divArea);
      // pair.map((game) => {
      const card = document.createElement("div");
      card.setAttribute("class", "game-card");
      const imgGame = document.createElement("img");
      imgGame.setAttribute("src", game.background_image);
      imgGame.setAttribute("alt", `Image du jeu ${game.name}`);
      const avatarGame = document.createElement("img");
      avatarGame.setAttribute("src", game.short_screenshots[1].image);
      avatarGame.setAttribute("alt", `Image du jeu ${game.name}`);
      const headerCard = document.createElement("div");
      const nameGame = document.createElement("h3");
      nameGame.textContent = `${
        game.name.length >= 10 ? game.name.substring(0, 10) + "..." : game.name
      }`;
      const dateGame = document.createElement("span");
      dateGame.textContent = `${game.released}`;
      headerCard.append(nameGame, dateGame);
      card.append(headerCard, imgGame, avatarGame);
      divArea.append(card);
      // });
      // console.log(pair);
    });
  } else {
    console.log("loading ...");
  }
}
