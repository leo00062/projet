// La route API [ex: http://localhost:8000]
const apiUrl = "https://api.rawg.io/api";

// fonction asynchrone
// si Async mettre await dans le traitement
// exemple route => /blog
// options => { Accept: 'application/json' }
/**
 *
 * @param {string} route
 * @param {object} options - Peut inclure une propriété "params" pour les query params
 * @returns {promise}
 */
export async function fetchData({ route, api = apiUrl, options = {} }) {
  // Préparation de l'entête 'headers' avec les clés - valuers necessaire pour
  // l'appel [ Authorization: 'bearer fezjhbfuhzebfuezfezfnejej' ]
  const headers = { Accept: "application/json", ...options.headers };
  console.log(headers);
  // appel methode native fetch [ appels API ]
  let queryString = "";
  if (options.params) {
    queryString = "?" + new URLSearchParams(options.params).toString();
    delete options.params;
  }
  const result = await fetch(`${api}${route}${queryString}`, {
    ...options,
    headers,
  });

  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
