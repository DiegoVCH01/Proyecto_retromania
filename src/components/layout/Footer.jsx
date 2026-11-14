import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-pink-500/20 bg-[#160d24]">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">

        {/* Identidad de RetroManía */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-2xl">🕹️</span>
            <span className="text-2xl font-extrabold">
              <span className="text-pink-400">Retro</span>
              <span className="text-cyan-400">Manía</span>
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#b8a9ca]">
            Un viaje por los recuerdos que marcaron generaciones.
            Revive los mejores momentos de los años 90 y 2000
            a través de los videojuegos, la música, el cine
            y la tecnología.
          </p>

          <span className="mt-5 inline-block rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-400">
            ✦ Revive los mejores años
          </span>
        </div>

        {/* Explora el pasado */}
        <div className="md:justify-self-center">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
            Explora el pasado
          </h3>

          <p className="max-w-xs text-sm leading-relaxed text-[#b8a9ca]">
            🎮 Videojuegos legendarios
            <br />
            🎵 Música inolvidable
            <br />
            🎬 Cine y series clásicas
            <br />
            💻 Tecnología retro
          </p>
        </div>

        {/* Información del proyecto */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
            Sobre el proyecto
          </h3>

          <p className="text-sm leading-relaxed text-[#b8a9ca]">
            RetroManía es un proyecto académico desarrollado
            para el curso de JavaScript Avanzado, utilizando
            React, Vite, Tailwind CSS y React Router.
          </p>

          <div className="mt-5 space-y-2">
            <p className="text-xs text-[#b8a9ca]">
              <span className="text-cyan-400">Tecnologías:</span>
              {' '}React · Tailwind CSS · JavaScript
            </p>

            <a
              href="https://github.com/DiegoVCH01/Proyecto_retromania"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-pink-400 transition-colors hover:text-pink-300 hover:underline"
            >
              Ver repositorio en GitHub ↗
            </a>
          </div>
        </div>

      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-[#9d92b8] md:flex-row">

          <p>
            © {new Date().getFullYear()} RetroManía.
            Proyecto académico.
          </p>

          <p>
            Hecho con <span className="text-pink-400">♥</span> y nostalgia
            por los 90 y 2000.
          </p>

        </div>
      </div>

    </footer>
  )
}
