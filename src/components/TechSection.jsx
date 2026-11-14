
import { useEffect, useState } from 'react'
import { obtenerTecnologias } from '../services/supabaseApi'
import { createPortal } from 'react-dom'

export default function TechSection({ decada = '90s' }) {
  const [dispositivos, setDispositivos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)

  useEffect(() => {
    let activo = true

    async function cargarTecnologias() {
      setCargando(true)
      setError('')

      try {
        const datos = await obtenerTecnologias(decada)

        if (activo) {
          setDispositivos(datos)
        }
      } catch (err) {
        if (activo) {
          setError('No se pudieron cargar los dispositivos.')
          console.error(err)
        }
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarTecnologias()

    return () => {
      activo = false
    }
  }, [decada])

  return (
    <section className="mt-16 mb-12">

      <div className="mb-6 border-b border-white/10 pb-6">
        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
          🔧 ARCADE HARDWARE & NOSTALGIA
        </span>

        <h2 className="mt-4 text-2xl font-bold md:text-4xl">
          La tecnología de nuestros recuerdos
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8a9ca]">
          Los dispositivos que marcaron nuestra forma de comunicarnos,
          jugar, escuchar música y conectarnos a Internet.
        </p>
      </div>

      
      {/* Estados */}
      {cargando && (
        <p className="py-12 text-center text-cyan-300">
          Cargando dispositivos retro...
        </p>
      )}

      {error && (
        <p className="py-8 text-center text-red-400">
          {error}
        </p>
      )}

      {!cargando && !error && dispositivos.length === 0 && (
        <p className="py-8 text-center text-[#b8a9ca]">
          No hay dispositivos registrados para esta década.
        </p>
      )}

      {/* Catálogo */}
      {!cargando && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dispositivos.map(gadget => (
            <article
              key={gadget.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#261831] transition hover:-translate-y-1 hover:border-cyan-400/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#160d25]">
                <img
                  src={gadget.imagen_url}
                  alt={gadget.nombre}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />

                <span className="absolute left-3 top-3 rounded-full bg-[#160d25]/90 px-3 py-1 text-xs text-cyan-300">
                  {gadget.anio} · {gadget.decada}
                </span>

                <span className="absolute right-3 top-3 rounded-full bg-[#160d25]/90 px-3 py-1 text-xs text-[#e2c9f3]">
                  {gadget.categoria}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white">
                  {gadget.nombre}
                </h3>

                <p className="mt-1 text-sm text-cyan-400">
                  {gadget.marca}
                </p>

                <p className="mt-3 min-h-16 text-sm leading-relaxed text-[#b8a9ca]">
                  {gadget.descripcion}
                </p>

                <button
                  onClick={() => setSeleccionado(gadget)}
                  className="mt-4 w-full rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-[#160d25]"
                >
                  ◉ Descubrir historia
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {seleccionado && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSeleccionado(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Información de ${seleccionado.nombre}`}
            className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-400/30 bg-[#1a0f2e] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">
                HISTORIA RETRO · {seleccionado.anio}
              </span>

              <button
                onClick={() => setSeleccionado(null)}
                className="rounded-lg px-3 py-1 text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>


            <h3 className="mt-4 text-2xl font-bold">
              {seleccionado.nombre}
            </h3>

            <p className="mt-1 text-cyan-400">
              {seleccionado.marca} · {seleccionado.anio}
            </p>

            <img
              src={seleccionado.imagen_url}
              alt={seleccionado.nombre}
              className="mt-5 w-full max-h-64 rounded-xl object-contain bg-[#160d25]"
            />

            {/* Historia */}
            <div className="mt-6">
              <h4 className="mb-2 font-bold text-pink-400">
                📖 Historia y origen
              </h4>
              <p className="text-sm leading-relaxed text-[#c5b6d5]">
                {seleccionado.historia || seleccionado.descripcion}
              </p>
            </div>

            {/* Características */}
            <div className="mt-6 rounded-xl border border-white/10 bg-[#261831] p-4">
              <h4 className="mb-3 font-bold text-cyan-300">
                ⚙️ Características principales
              </h4>

              <ul className="space-y-2">
                {(seleccionado.caracteristicas || []).map((caracteristica, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm text-[#c5b6d5]"
                  >
                    <span className="text-cyan-400">✦</span>
                    {caracteristica}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impacto */}
            <div className="mt-6">
              <h4 className="mb-2 font-bold text-pink-400">
                🌎 Impacto en su generación
              </h4>

              <p className="text-sm leading-relaxed text-[#c5b6d5]">
                {seleccionado.impacto || 'Información próximamente disponible.'}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300">
                {seleccionado.categoria}
              </span>

              <span className="rounded-full border border-pink-400/30 px-3 py-1 text-xs text-pink-300">
                {seleccionado.decada}
              </span>
            </div>

            <button
              onClick={() => setSeleccionado(null)}
              className="mt-6 w-full rounded-xl bg-pink-500 py-3 font-bold text-white hover:bg-pink-400"
            >
              Cerrar historia
            </button>

          </div>
        </div>,
        document.body
      )}

    </section>
  )
}
