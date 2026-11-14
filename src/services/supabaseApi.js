const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function obtenerTecnologias(decada = "90s") {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Falta configurar Supabase");
  }

  const parametros = new URLSearchParams({
    select: "id,nombre,marca,anio,decada,categoria,descripcion,imagen_url",
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
