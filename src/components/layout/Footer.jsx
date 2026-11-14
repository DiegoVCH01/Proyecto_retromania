import { Link } from 'react-router-dom'

const enlaces = [
  { to: '/', label: 'Inicio' }, { to: '/videojuegos', label: 'Videojuegos' },
  { to: '/musica', label: 'Música' }, { to: '/cultura', label: 'Cine y Tecnología' },
  { to: '/comunidad', label: 'Comunidad' },
]
export default function Footer() {
  return <footer className="mt-16 border-t border-[#ff4ac9]/25 py-8 text-center text-sm text-[#9d92b8]">
    <p className="font-bold text-[#ff4ac9] text-xl mb-3">RetroManía</p>
    <nav aria-label="Navegación del pie de página" className="flex flex-wrap justify-center gap-4 mb-4">
      {enlaces.map(e => <Link key={e.to} className="hover:text-[#4ad0ff]" to={e.to}>{e.label}</Link>)}
    </nav>
    <p>Revive los mejores años 90 y 2000 · Proyecto académico</p>
  </footer>
}
