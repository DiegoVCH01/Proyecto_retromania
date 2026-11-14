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

// Obtener el tráiler de una película
export async function obtenerTrailer(id) {
  const datos = await consultarTMDB(`/movie/${id}/videos`);

  const trailer =
    datos.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ||
    datos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
