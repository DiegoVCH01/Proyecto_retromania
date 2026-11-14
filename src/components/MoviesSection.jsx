
import { useEffect, useState } from 'react'
import {
  obtenerPeliculas,
  obtenerTrailers,
} from '../services/tmdbApi'
import { createPortal } from 'react-dom'

export default function MoviesSection({ decada = '90s' }) {
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [trailers, setTrailers] = useState([])
  const [indiceTrailer, setIndiceTrailer] = useState(0)
  const [cargandoTrailer, setCargandoTrailer] = useState(false)
  const [errorTrailer, setErrorTrailer] = useState('')
  const [trailersNoDisponibles, setTrailersNoDisponibles] = useState([])


  useEffect(() => {
    let activo = true

    obtenerPeliculas(decada)
      .then(datos => {
        if (activo) {
          setPeliculas(datos)
          setError('')
        }
      })
      .catch(() => {
        if (activo) {
          setError('No se pudieron cargar las películas. Inténtalo nuevamente.')
        }
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [decada])


  async function reproducirTrailer(id) {
    setCargandoTrailer(true)
    setErrorTrailer('')
    setTrailers([])
    setIndiceTrailer(0)

    try {
      const resultados = await obtenerTrailers(id)

      if (resultados.length > 0) {
        setTrailers(resultados)
      } else {
        setTrailersNoDisponibles(prev =>
          prev.includes(id) ? prev : [...prev, id]
        )
      }
    } catch {
      setErrorTrailer(
        'No se pudieron consultar los tráileres. Inténtalo nuevamente.'
      )
    } finally {
      setCargandoTrailer(false)
    }
  }

  function cerrarTrailer() {
    setTrailers([])
    setIndiceTrailer(0)
  }

  const trailerActual = trailers[indiceTrailer]


  const tituloDecada = decada === '90s' ? 'años 90' : 'años 2000'

  return (
    <section className="mb-20">
      <div className="mb-8 border-b border-white/10 pb-6">
        <span className="rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1 text-xs font-bold tracking-wider text-pink-400">
          🎬 VHS, LASERDISC & DVD CLASSICS
        </span>

        <h2 className="mt-4 text-2xl font-bold md:text-4xl">
          Historias que marcaron{' '}
          <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            una generación
          </span>
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8a9ca] md:text-base">
          Revive las noches mágicas de videoclub de barrio
          buscando la carátula perfecta en VHS, el salto
          de fidelidad al formato DVD y los estrenos que
          paralizaban al país cada sobremesa.
        </p>

        <p className="mt-3 text-xs text-cyan-400">
          ● TMDB API · Catálogo de {tituloDecada}
        </p>
      </div>

      {cargando && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-white/10 bg-[#261831] p-3"
            >
              <div className="aspect-[2/3] rounded-xl bg-white/10" />
              <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
              <div className="mt-3 h-3 w-full rounded bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {!cargando && error && (
        <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-5 text-center">
          <p className="text-pink-300">{error}</p>
          <button
            onClick={() => {
              setCargando(true)
              setError('')
              obtenerPeliculas(decada)
                .then(setPeliculas)
                .catch(() => setError('No se pudieron cargar las películas.'))
                .finally(() => setCargando(false))
            }}
            className="mt-3 rounded-lg bg-pink-500 px-5 py-2 text-sm font-bold"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {peliculas.map(pelicula => (
            <article
              key={pelicula.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#261831] transition duration-300 hover:-translate-y-1 hover:border-pink-500/50"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-[#160d25]">
                {pelicula.poster ? (
                  <img
                    src={pelicula.poster}
                    alt={`Póster de ${pelicula.titulo}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#9d92b8]">
                    Póster no disponible
                  </div>
                )}

                <span className="absolute left-3 top-3 rounded-full border border-cyan-400/50 bg-[#160d25]/90 px-3 py-1 text-xs text-cyan-300">
                  {pelicula.fecha?.slice(0, 4) || 'Sin fecha'}
                </span>

                <span className="absolute right-3 top-3 rounded-full bg-[#160d25]/90 px-3 py-1 text-xs font-bold text-yellow-300">
                  ⭐ {pelicula.puntuacion.toFixed(1)}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white">
                  {pelicula.titulo}
                </h3>

                <p className="mt-2 line-clamp-3 min-h-[4rem] text-sm leading-relaxed text-[#b8a9ca]">
                  {pelicula.sinopsis || 'Sinopsis no disponible.'}
                </p>

                <button
                  onClick={() => reproducirTrailer(pelicula.id)}
                  disabled={
                    cargandoTrailer ||
                    trailersNoDisponibles.includes(pelicula.id)
                  }
                  className="mt-4 w-full rounded-xl bg-pink-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cargandoTrailer
                    ? 'Buscando tráiler...'
                    : trailersNoDisponibles.includes(pelicula.id)
                      ? 'Tráiler no disponible'
                      : '▶ Ver tráiler'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {errorTrailer && (
        <p className="mt-4 text-center text-sm text-yellow-300">
          {errorTrailer}
        </p>
      )}


      {trailerActual && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={cerrarTrailer}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Reproductor de tráiler"
            className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-pink-500/30 bg-[#1a0f2e] p-3 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Encabezado */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {trailerActual.nombre}
                </p>

                <p className="text-xs text-[#b8a9ca]">
                  {trailerActual.idioma === 'es'
                    ? 'Español'
                    : trailerActual.idioma === 'en'
                      ? 'Inglés'
                      : trailerActual.idioma.toUpperCase()}
                  {' · '}
                  {trailerActual.oficial ? 'Oficial' : 'No oficial'}
                  {' · '}
                  {indiceTrailer + 1} de {trailers.length}
                </p>
              </div>

              <button
                onClick={cerrarTrailer}
                className="rounded-lg bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-400"
              >
                ✕ Cerrar
              </button>
            </div>

            {/* Reproductor */}
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                key={trailerActual.key}
                src={`https://www.youtube.com/embed/${trailerActual.key}`}
                title={trailerActual.nombre}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Opciones */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

              <a
                href={trailerActual.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-gray-200"
              >
                Ver en YouTube ↗
              </a>

              {trailers.length > 1 && (
                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      setIndiceTrailer(actual =>
                        (actual - 1 + trailers.length) % trailers.length
                      )
                    }
                    className="rounded-lg border border-cyan-400/40 px-4 py-2 text-sm font-bold text-cyan-300 hover:bg-cyan-400/10"
                  >
                    ← Anterior
                  </button>

                  <button
                    onClick={() =>
                      setIndiceTrailer(actual =>
                        (actual + 1) % trailers.length
                      )
                    }
                    className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white hover:bg-pink-400"
                  >
                    Otro tráiler →
                  </button>

                </div>
              )}

            </div>

            <p className="mt-3 text-center text-xs text-[#b8a9ca]">
              Si el video no se reproduce, puedes abrirlo directamente en YouTube.
            </p>

          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
