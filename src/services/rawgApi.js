const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const obtenerJuegosRAWG = async (decada, busqueda = '', pagina = 1) => {
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  if (!API_KEY) throw new Error('Falta configurar VITE_RAWG_API_KEY');

  let fechas = decada === '90s' ? '1990-01-01,1999-12-31' : '2000-01-01,2009-12-31';

  let url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${fechas}&ordering=-rating&page_size=12&page=${pagina}`;

  if (busqueda) {
    url += `&search=${busqueda}`;
  }

  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`Error de RAWG API: ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  // Devolvemos tanto los resultados (juegos) como la propiedad "next" para saber si hay más páginas
  return {
    resultados: datos.results,
    hayMasPaginas: datos.next !== null
  };
};

// Se usa para obtener la descripción y datos extra para el modal
export const obtenerDetalleJuego = async (id) => {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error('Error al cargar detalles');
  return await res.json();
};
