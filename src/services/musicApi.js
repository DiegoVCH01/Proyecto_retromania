const API_URL = "https://musicbrainz.org/ws/2/recording/";

// Almacena las canciones consultadas por década.
const cacheCanciones = new Map();

const catalogo = {
  "90s": [
    {
      titulo: "Smells Like Teen Spirit",
      artista: "Nirvana",
      anio: 1991,
      genero: "Grunge",
      idioma: "Inglés",
    },
    {
      titulo: "Rhythm Is a Dancer",
      artista: "Snap!",
      anio: 1992,
      genero: "Eurodance",
      idioma: "Inglés",
    },
    {
      titulo: "...Baby One More Time",
      artista: "Britney Spears",
      anio: 1998,
      genero: "Pop",
      idioma: "Inglés",
    },
    {
      titulo: "De música ligera",
      artista: "Soda Stereo",
      anio: 1990,
      genero: "Rock en español",
      idioma: "Español",
    },
    {
      titulo: "La tierra del olvido",
      artista: "Carlos Vives",
      anio: 1995,
      genero: "Pop latino",
      idioma: "Español",
    },
    {
      titulo: "Livin la Vida Loca",
      artista: "Ricky Martin",
      anio: 1999,
      genero: "Pop latino",
      idioma: "Español",
    },
  ],

  "2000s": [
    {
      titulo: "In the End",
      artista: "Linkin Park",
      anio: 2000,
      genero: "Nu metal",
      idioma: "Inglés",
    },
    {
      titulo: "One More Time",
      artista: "Daft Punk",
      anio: 2000,
      genero: "Electrónica",
      idioma: "Inglés",
    },
    {
      titulo: "Toxic",
      artista: "Britney Spears",
      anio: 2003,
      genero: "Pop",
      idioma: "Inglés",
    },
    {
      titulo: "Gasolina",
      artista: "Daddy Yankee",
      anio: 2004,
      genero: "Reguetón",
      idioma: "Español",
    },
    {
      titulo: "Color esperanza",
      artista: "Diego Torres",
      anio: 2001,
      genero: "Pop latino",
      idioma: "Español",
    },
    {
      titulo: "La camisa negra",
      artista: "Juanes",
      anio: 2004,
      genero: "Rock latino",
      idioma: "Español",
    },
  ],
};

function normalizar(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export async function obtenerCanciones(decada = "90s", signal) {
  if (cacheCanciones.has(decada)) {
    return cacheCanciones.get(decada);
  }
  const seleccion = catalogo[decada] ?? catalogo["90s"];

  // Una sola petición con varias búsquedas.
  const consulta = seleccion
    .map((cancion) => {
      const titulo = cancion.titulo.replace(/"/g, "");
      const artista = cancion.artista.replace(/"/g, "");

      return `(recording:"${titulo}" AND artist:"${artista}")`;
    })
    .join(" OR ");

  const parametros = new URLSearchParams({
    query: consulta,
    fmt: "json",
    limit: "100",
  });

  const respuesta = await fetch(`${API_URL}?${parametros}`, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!respuesta.ok) {
    throw new Error(`Error de MusicBrainz: ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  const resultados = datos.recordings ?? [];

  const canciones = seleccion.flatMap((cancion) => {
    const coincidencias = resultados.filter((registro) => {
      const artistas = (registro["artist-credit"] ?? [])
        .map((credito) => credito.name ?? credito.artist?.name ?? "")
        .join(" ");

      return (
        normalizar(registro.title) === normalizar(cancion.titulo) &&
        normalizar(artistas).includes(normalizar(cancion.artista))
      );
    });

    if (coincidencias.length === 0) {
      return [
        {
          id: `catalogo-${normalizar(cancion.titulo)}-${normalizar(cancion.artista)}`,
          titulo: cancion.titulo,
          artista: cancion.artista,
          fecha: String(cancion.anio),
          genero: cancion.genero,
          idioma: cancion.idioma,
        },
      ];
    }

    const registro =
      coincidencias.find((item) => item["first-release-date"]) ??
      coincidencias[0];

    return [
      {
        id: registro.id,
        titulo: registro.title,
        artista: cancion.artista,
        fecha: String(cancion.anio),
        genero: cancion.genero,
        idioma: cancion.idioma,
      },
    ];
  });

  cacheCanciones.set(decada, canciones);

  return canciones;
}
