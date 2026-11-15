const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const obtenerJuegosRAWG = async (decada, busqueda = '') => {
  // Definir rangos de fechas por década
  let dates = '1990-01-01,2009-12-31'; // Por defecto: 90s y 2000s
  if (decada === '90s') dates = '1990-01-01,1999-12-31';
  if (decada === '2000s') dates = '2000-01-01,2009-12-31';

  // Endpoint de RAWG filtrando por fechas, ordenado por rating
  let url = `${BASE_URL}/games?key=${API_KEY}&dates=${dates}&ordering=-rating&page_size=12`;
  if (busqueda) url += `&search=${busqueda}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al conectar con RAWG API');
  const data = await res.json();
  return data.results;
};

// Se usa para obtener la descripción y datos extra para el modal
export const obtenerDetalleJuego = async (id) => {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error('Error al cargar detalles');
  return await res.json();
};
