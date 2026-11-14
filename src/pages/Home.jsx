import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import DecadesSection from "../components/DecadesSection";
import SelectorDecada from "../components/ui/SelectorDecada";
import CategoryCard from "../components/CategoryCard";
import DestacadoCard from '../components/DestacadoCard'

const categorias = [
  {
    titulo: "Videojuegos",
    descripcion:
      "Desde los mundos pixelados de los 16 bits hasta la revolución de los gráficos 3D. Redescubre los videojuegos que marcaron una generación.",
    icono: "🎮",
    ruta: "/videojuegos",
    color: "pink",
  },
  {
    titulo: "Música",
    descripcion:
      "El grunge, el pop, el rock alternativo y los grandes éxitos que escuchábamos en casetes, CD y reproductores MP3.",
    icono: "🎵",
    ruta: "/musica",
    color: "blue",
  },
  {
    titulo: "Cine y Series",
    descripcion:
      "Películas inolvidables, series que acompañaron nuestra infancia y personajes que siguen formando parte de nuestros recuerdos.",
    icono: "🎬",
    ruta: "/cultura",
    color: "yellow",
  },
  {
    titulo: "Tecnología",
    descripcion:
      "De los teléfonos Nokia y las computadoras clásicas a las primeras consolas y dispositivos que transformaron nuestra vida.",
    icono: "💻",
    ruta: "/cultura#tecnologia",
    color: "purple",
  },
];

const destacados = [
  {
    categoria: 'VIDEOJUEGOS',
    titulo: 'La revolución de los 16 bits',
    descripcion:
      'Revive las tardes frente al televisor con las consolas que transformaron los videojuegos.',
    imagen:
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&auto=format&fit=crop&q=85',
    ruta: '/videojuegos',
    color: 'pink',
  },
  {
    categoria: 'MÚSICA',
    titulo: 'El sonido de una generación',
    descripcion:
      'De los casetes a los reproductores MP3. Descubre las canciones que marcaron nuestra historia.',
    imagen:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&auto=format&fit=crop&q=85',
    ruta: '/musica',
    color: 'blue',
  },
  {
    categoria: 'CINE',
    titulo: 'Películas inolvidables',
    descripcion:
      'Historias y personajes legendarios que siguen despertando nuestra nostalgia.',
    imagen:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&auto=format&fit=crop&q=85',
    ruta: '/cultura',
    color: 'yellow',
  },
]

export default function Home({ decada, onChangeDecada }) {
  return (
    <>
      <HeroSection />
      <SelectorDecada decada={decada} onChange={onChangeDecada} />
      <DecadesSection decada={decada} onChange={onChangeDecada} />

      <section className="my-20">

        {/* Encabezado */}
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold tracking-widest text-cyan-400">UNIVERSO RETRO</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Explora RetroManía</h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b8a9ca]">
            Sumérgete en las categorías que definieron dos décadas
            inolvidables de entretenimiento, cultura y tecnología.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((categoria) => (
            <CategoryCard
              key={categoria.titulo}
              titulo={categoria.titulo}
              descripcion={categoria.descripcion}
              icono={categoria.icono}
              ruta={categoria.ruta}
              color={categoria.color}
            />
          ))}
        </div>
      </section>

      {/* SECCIÓN: CONTENIDO DESTACADO */}
      <section className="my-20">

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold tracking-widest text-cyan-400">
              DESTACADOS DEL RECUERDO
            </span>

            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Piezas de Nuestra Historia
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-[#b8a9ca]">
              Un pequeño recorrido por los recuerdos que hicieron
              inolvidables los años 90 y 2000.
            </p>
          </div>

          <Link
            to="/videojuegos"
            className="text-sm font-semibold text-pink-400 hover:underline"
          >
            Explorar videojuegos →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {destacados.map((item) => (
            <DestacadoCard
              key={item.titulo}
              imagen={item.imagen}
              categoria={item.categoria}
              titulo={item.titulo}
              descripcion={item.descripcion}
              ruta={item.ruta}
              color={item.color}
            />
          ))}
        </div>

      </section>
    </>
  );
}
