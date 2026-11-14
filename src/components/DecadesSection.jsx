const decadas = [
  {
    id: '90s',
    periodo: '1990 – 1999',
    titulo: 'Los Rebeldes 90s',
    descripcion:
      'La era dorada del pixel art, los gráficos de 16 bits, rebobinar cintas VHS con bolígrafo, guitarras grunge distorsionadas y los primeros salones recreativos repletos de neón y monedas.',
    imagen:
      'https://upload.wikimedia.org/wikipedia/commons/5/5b/Kohakus_World_Basement_4K.jpg',
    detalles: [
      '🎮 Consolas de 16 bits',
      '📼 VHS y Blockbuster',
      '🎸 Grunge y Eurodance',
    ],
    boton: 'Sumergirse en los 90s',
    color: 'pink',
  },
  {
    id: '2000s',
    periodo: '2000 – 2009',
    titulo: 'La Era Y2K',
    descripcion:
      'Diseño plateado futurista, plásticos translúcidos, la revolución de PlayStation 2, reproductores MP3, tonos polifónicos para móviles y tardes enteras chateando con zumbidos en MSN Messenger.',
    imagen:
      'https://upload.wikimedia.org/wikipedia/commons/5/51/Imac_G3_2000_rev_side_lineup.jpg',
    detalles: [
      '🎮 PS2 y Cyber-Arcade',
      '🎵 MP3 y Napster',
      '💬 MSN Messenger',
    ],
    boton: 'Sumergirse en la Era Y2K',
    color: 'blue',
  },
]

export default function DecadesSection({
  decada,
  onChangeDecada,
}) {
  return (
    <section
      id="decadas"
      className="my-16 scroll-mt-24"
    >
      {/* Encabezado de la sección */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest text-cyan-400">
          LÍNEA TEMPORAL
        </span>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Las Dos Grandes Épocas
        </h2>

        <p className="mt-2 text-sm text-[#b8a9ca]">
          Desde la magia pixelada en cartuchos hasta el
          despertar de la revolución digital.
          Descubre los recuerdos que marcaron generaciones.
        </p>
      </div>

      {/* Tarjetas de décadas */}
      <div className="grid gap-6 md:grid-cols-2">
        {decadas.map((item) => {
          const activa = decada === item.id
          const esNoventas = item.color === 'pink'

          return (
            <article
              key={item.id}
              className={`
                overflow-hidden rounded-xl border
                bg-[#261831] p-5 md:p-6
                transition-all duration-300
                ${activa
                  ? esNoventas
                    ? 'border-pink-500/70 shadow-lg shadow-pink-500/10'
                    : 'border-cyan-400/70 shadow-lg shadow-cyan-400/10'
                  : 'border-white/10'
                }
              `}
            >
              {/* Etiquetas superiores */}
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`
                    rounded-full border px-3 py-1 text-xs
                    ${esNoventas
                      ? 'border-pink-500/50 text-pink-400'
                      : 'border-cyan-400/50 text-cyan-400'
                    }
                  `}
                >
                  {item.periodo}
                </span>

                <span className="text-xl">
                  {esNoventas ? '📼' : '💿'}
                </span>
              </div>

              {/* Imagen externa */}
              <div className="mb-5 overflow-hidden rounded-lg">
                <img
                  src={item.imagen}
                  alt={`Ambiente representativo de ${item.titulo}`}
                  loading="lazy"
                  className="h-52 w-full object-cover object-center
                             transition-transform duration-500
                             hover:scale-105"
                />
              </div>

              {/* Información */}
              <h3 className="mb-3 text-2xl font-bold text-white">
                {item.titulo}
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[#c9bdd7] md:min-h-28">
                {item.descripcion}
              </p>

              {/* Características */}
              <div className="mb-6 flex flex-wrap gap-2">
                {item.detalles.map((detalle) => (
                  <span
                    key={detalle}
                    className="rounded-md bg-white/5 px-3 py-2
                               text-xs text-[#c9bdd7]"
                  >
                    {detalle}
                  </span>
                ))}
              </div>

              {/* Botón de selección */}
              <button
                type="button"
                onClick={() => onChangeDecada(item.id)}
                aria-pressed={activa}
                className={`
                  w-full rounded-lg border px-4 py-3
                  text-sm font-semibold transition-all
                  ${esNoventas
                    ? 'border-pink-500 text-pink-400 hover:bg-pink-500/10'
                    : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                  }
                `}
              >
                {item.boton} →
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
