// La route API [ex: http://localhost:8000]
const apiUrl = "https://api.rawg.io/api";

// fonction asynchrone
// si Async mettre await dans le traitement
// exemple route => /blog
// options => { Accept: 'application/json' }
/**
 *
 * @param {string} route
 * @param {object} options
 * @returns {promise}
 */
export async function fetchData({ route, options = {} }) {
  // Préparation de l'entête 'headers' avec les clés - valuers necessaire pour
  // l'appel [ Authorization: 'bearer fezjhbfuhzebfuezfezfnejej' ]
  const headers = { Accept: "application/json", ...options.headers };
  // appel methode native fetch [ appels API ]
  const result = await fetch(`${apiUrl}${route}`, { ...options, headers });

  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
