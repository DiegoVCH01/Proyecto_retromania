const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function obtenerTecnologias(decada = "90s") {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Falta configurar Supabase");
  }

  const parametros = new URLSearchParams({
    select: "id,nombre,marca,anio,decada,categoria,descripcion,imagen_url,historia,caracteristicas,impacto",
    decada: `eq.${decada}`,
    order: "anio.asc",
  });

  const respuesta = await fetch(
    `${SUPABASE_URL}/rest/v1/tecnologias?${parametros}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Accept: "application/json",
      },
    },
  );

  if (!respuesta.ok) {
    throw new Error(`Error de Supabase: ${respuesta.status}`);
  }

  return respuesta.json();
}

export const enviarRecuerdo = async (datosRecuerdo) => {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Falta configurar Supabase");
  }

  const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/recuerdos`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation' // Para que Supabase devuelva el dato insertado
    },
    body: JSON.stringify({
      alias: datosRecuerdo.nombre,
      correo: datosRecuerdo.correo,
      decada: datosRecuerdo.decadaTesoro,
      mensaje: datosRecuerdo.mensaje,
      estado: 'pendiente'
    })
  });

  if (!respuesta.ok) {
    const errorBody = await respuesta.text();
    console.error("Detalle del error devuelto por Supabase:", errorBody);
    throw new Error(`Error de Supabase: ${respuesta.status}`);
  }

  return respuesta.json();
};

// Función para obtener los recuerdos más recientes de la base de datos
export const obtenerRecuerdos = async () => {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Falta configurar Supabase");
  }

  const respuesta = await fetch(
    `${SUPABASE_URL}/rest/v1/recuerdos?select=*&order=created_at.desc&limit=6`,
    {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Accept': 'application/json'
      }
    }
  );

  if (!respuesta.ok) {
    throw new Error(`Error al obtener recuerdos: ${respuesta.status}`);
  }

  return respuesta.json();
};