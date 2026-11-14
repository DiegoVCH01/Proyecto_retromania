const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p";

async function consultarTMDB(endpoint, parametros = {}) {
  if (!API_KEY) {
    throw new Error("No se encontró la API Key de TMDB");
  }

  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "es-ES",
    ...parametros,
  });

  const respuesta = await fetch(`${API_URL}${endpoint}?${query.toString()}`);

  if (!respuesta.ok) {
    throw new Error(`Error de TMDB: ${respuesta.status}`);
  }

  return respuesta.json();
}

// Obtener películas según la década seleccionada
export async function obtenerPeliculas(decada, pagina = 1) {
  const fechas =
    decada === "90s"
      ? {
          "primary_release_date.gte": "1990-01-01",
          "primary_release_date.lte": "1999-12-31",
        }
      : {
          "primary_release_date.gte": "2000-01-01",
          "primary_release_date.lte": "2009-12-31",
        };

  const datos = await consultarTMDB("/discover/movie", {
    ...fechas,
    sort_by: "popularity.desc",
    include_adult: "false",
    page: String(pagina),
  });

  return datos.results.map((pelicula) => ({
    id: pelicula.id,
    titulo: pelicula.title,
    tituloOriginal: pelicula.original_title,
    sinopsis: pelicula.overview,
    fecha: pelicula.release_date,
    puntuacion: pelicula.vote_average,
    poster: pelicula.poster_path
      ? `${IMAGE_URL}/w500${pelicula.poster_path}`
      : null,
    portada: pelicula.backdrop_path
      ? `${IMAGE_URL}/w1280${pelicula.backdrop_path}`
      : null,
  }));
}

// Obtener todos los tráileres disponibles de una película
export async function obtenerTrailers(id) {
  const idiomas = ["es-ES", "en-US"];

  const respuestas = await Promise.allSettled(
    idiomas.map((language) =>
      consultarTMDB(`/movie/${id}/videos`, { language }),
    ),
  );

  const videos = respuestas.flatMap((resultado) =>
    resultado.status === "fulfilled" ? (resultado.value.results ?? []) : [],
  );

  const candidatos = videos.filter(
    (video) =>
      video.site === "YouTube" &&
      ["Trailer", "Teaser"].includes(video.type) &&
      video.key,
  );

  // Evitar videos duplicados
  const unicos = [
    ...new Map(candidatos.map((video) => [video.key, video])).values(),
  ];

  // Priorizar videos oficiales, en español y tipo tráiler
  const prioridad = (video) => {
    let puntos = 0;

    if (video.official) puntos += 8;
    if (video.iso_639_1 === "es") puntos += 4;
    else if (video.iso_639_1 === "en") puntos += 2;
    if (video.type === "Trailer") puntos += 1;

    return puntos;
  };

  return unicos
    .sort((a, b) => prioridad(b) - prioridad(a))
    .map((video) => ({
      key: video.key,
      nombre: video.name,
      idioma: video.iso_639_1,
      oficial: video.official,
      tipo: video.type,
      url: `https://www.youtube.com/watch?v=${video.key}`,
    }));
}
