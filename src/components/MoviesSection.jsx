const peliculas = [
  {
    id: 1,
    genre: 'Ciencia Ficción / Acción',
    title: 'The Matrix',
    desc: 'Un hacker descubre que la realidad que conoce es una simulación controlada por máquinas. Una obra maestra que redefinió el cine de acción y la ciencia ficción.',
    rating: '8.7/10',
    year: '1999'
  },
  {
    id: 2,
    genre: 'Aventura / Ciencia Ficción',
    title: 'Jurassic Park',
    desc: 'Un parque temático con dinosaurios clonados genéticamente entra en caos cuando falla el sistema de seguridad. Revolucionó los efectos especiales y la imaginación de toda una generación.',
    rating: '8.2/10',
    year: '1993'
  },
  {
    id: 3,
    genre: 'Fantasía Épica / Aventura',
    title: 'El Señor de los Anillos',
    desc: 'Un hobbit y ocho compañeros emprenden un viaje épico para destruir el Anillo Único y salvar a la Tierra Media de la oscuridad. Una trilogía que se convirtió en leyenda.',
    rating: '8.8/10',
    year: '2001-2003'
  },
  {
    id: 4,
    genre: 'Ciencia Ficción / Comedia',
    title: 'Volver al Futuro',
    desc: 'Un adolescente viaja accidentalmente al pasado en un coche convertido en máquina del tiempo. Una de las sagas más queridas de todos los tiempos.',
    rating: '8.5/10',
    year: '1985-1990'
  },
  {
    id: 5,
    genre: 'Animación / Aventura',
    title: 'El Viaje de Chihiro',
    desc: 'Una niña entra en un mundo mágico lleno de espíritus y dioses para salvar a sus padres. La obra maestra del Studio Ghibli.',
    rating: '8.6/10',
    year: '2001'
  }
];

const MoviesSection = () => {
  return (
    <section className="mb-20">
      {/* Encabezado de sección */}
      <div className="text-center mb-10">
        <span className="text-[#ffd166] text-sm font-medium">🎬 EN LA GRAN PANTALLA</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">Películas que Hicieron Historia</h2>
        <p className="text-[#9d92b8] max-w-xl mx-auto mt-2">Cine que vimos una y otra vez en VHS y DVD. Historias que nunca olvidaremos.</p>
      </div>

      {/* Tarjetas de películas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="card p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-[#4ad0ff] bg-[#4ad0ff]/10 px-2 py-1 rounded-full">
                {pelicula.genre}
              </span>
              <span className="text-xs text-[#9d92b8]">{pelicula.year}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{pelicula.title}</h3>
            <p className="text-sm text-[#9d92b8] mb-4 leading-relaxed">{pelicula.desc}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-[#ffd166] font-semibold">⭐ {pelicula.rating}</span>
              <a href="#" className="text-[#4ad0ff] text-sm hover:underline inline-flex items-center gap-1">
                Ver tráiler oficial →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoviesSection;
