import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const enlaces = [
  { to: '/', label: 'Inicio' },
  { to: '/videojuegos', label: 'Videojuegos' },
  { to: '/musica', label: 'Música' },
  { to: '/cultura', label: 'Cine y Tecnología' },
  { to: '/comunidad', label: 'Comunidad' },
]

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const clases = ({ isActive }) => `transition-colors hover:text-[#ff4ac9] ${isActive ? 'text-[#ff4ac9] font-bold' : 'text-[#b8b8d1]'}`
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a0f2e]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl md:text-2xl font-bold text-[#ff4ac9]">🎮 RetroManía</Link>
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-5 text-sm">
          {enlaces.map(link => <NavLink key={link.to} to={link.to} className={clases}>{link.label}</NavLink>)}
        </nav>
        <button type="button" aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuAbierto} aria-controls="menu-movil" onClick={() => setMenuAbierto(v => !v)} className="md:hidden text-2xl text-[#4ad0ff]">{menuAbierto ? '✕' : '☰'}</button>
      </div>
      {menuAbierto && <nav id="menu-movil" aria-label="Navegación móvil" className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm">{enlaces.map(link => <NavLink key={link.to} to={link.to} onClick={() => setMenuAbierto(false)} className={clases}>{link.label}</NavLink>)}</nav>}
    </header>
  )
}
