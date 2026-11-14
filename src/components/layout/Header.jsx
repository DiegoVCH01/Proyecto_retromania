
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/videojuegos', label: 'Videojuegos' },
  { to: '/musica', label: 'Música' },
  { to: '/cultura', label: 'Cine y Tecnología' },
  { to: '/comunidad', label: 'Comunidad' },
]

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const estiloEnlace = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors duration-200
    ${isActive
      ? 'text-pink-400'
      : 'text-[#c3b5d1] hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-pink-500/20 bg-[#1a1029]/95 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuAbierto(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-500/40 bg-pink-500/10 text-2xl">
            🕹️
          </div>

          <div>
            <span className="block text-xl font-extrabold leading-tight tracking-tight">
              <span className="text-pink-400">Retro</span>
              <span className="text-cyan-400">Manía</span>
            </span>

            <span className="block text-[9px] font-semibold tracking-[0.22em] text-yellow-400">
              REVIVE LOS MEJORES AÑOS
            </span>
          </div>
        </Link>

        {/* Navbar escritorio */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 lg:flex"
        >
          {enlaces.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === '/'}
              className={estiloEnlace}
            >
              {({ isActive }) => (
                <>
                  {enlace.label}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-pink-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Etiqueta decorativa */}
        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-2 xl:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          <span className="text-[10px] font-semibold tracking-widest text-cyan-400">
            MODO NOSTALGIA
          </span>
        </div>

        {/* Botón móvil */}
        <button
          type="button"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-2xl text-cyan-400 transition-colors hover:bg-white/10 lg:hidden"
        >
          {menuAbierto ? '✕' : '☰'}
        </button>

      </div>

      {/* Menú responsive */}
      {menuAbierto && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="border-t border-white/10 bg-[#211330] px-4 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.to}
                to={enlace.to}
                end={enlace.to === '/'}
                onClick={() => setMenuAbierto(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                    ? 'bg-pink-500/15 text-pink-400'
                    : 'text-[#c3b5d1] hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {enlace.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}

    </header>
  )
}
