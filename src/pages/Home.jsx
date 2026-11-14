import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import DecadesSection from '../components/DecadesSection'

const destinos = [
  { to: '/videojuegos', titulo: 'Videojuegos', descripcion: 'Explora los clásicos que marcaron una época.', icono: '🎮' },
  { to: '/musica', titulo: 'Música', descripcion: 'Recuerda los sonidos de los 90 y 2000.', icono: '🎵' },
  { to: '/cultura', titulo: 'Cine y tecnología', descripcion: 'Películas, series y dispositivos inolvidables.', icono: '🎬' },
  { to: '/comunidad', titulo: 'Comunidad', descripcion: 'Responde la encuesta y comparte tu nostalgia.', icono: '💌' },
]
export default function Home() {
  return <>
    <HeroSection />
    <DecadesSection />
    <section className="mb-16"><h2 className="text-3xl font-bold text-center mb-8">Explora RetroManía</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destinos.map(item => <Link key={item.to} to={item.to} className="card p-6 block hover:-translate-y-1 transition-transform">
          <div className="text-3xl mb-3">{item.icono}</div><h3 className="font-bold text-lg">{item.titulo}</h3><p className="text-sm text-[#9d92b8] mt-2">{item.descripcion}</p><span className="text-[#4ad0ff] text-sm mt-4 inline-block">Explorar →</span>
        </Link>)}
      </div>
    </section>
  </>
}
