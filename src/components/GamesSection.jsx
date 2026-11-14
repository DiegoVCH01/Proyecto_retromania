const GamesSection = () => {
  const juegos = [
    {
      id: 1,
      nombre: 'Super Mario World',
      plataforma: 'SNES, GBA',
      año: '1990 - 90s',
      calificacion: '5.0 (4.8k)',
      descripcion: 'El salto maestro a los 16 bits que introdujo a Yoshi, capas mágicas y decenas de caminos secretos en Dinosaur Land.',
      imagen: 'https://images.unsplash.com/photo-1587084169190-2b00f96ce682?w=400&h=250&fit=crop',
      etiqueta: '90s'
    },
    {
      id: 2,
      nombre: 'Sonic The Hedgehog CD',
      plataforma: 'Sega Mega-CD, PC',
      año: '1993 - 90s',
      calificacion: '4.8 (3.1k)',
      descripcion: 'Viajes temporales (Pasado, Presente, Futuro), banda sonora electrizante en audio CD y el debut de Metal Sonic.',
      imagen: 'https://images.unsplash.com/photo-1614294149010-25f0d6f0f5e6?w=400&h=250&fit=crop',
      etiqueta: '90s'
    },
    {
      id: 3,
      nombre: 'Chrono Trigger',
      plataforma: 'SNES, PS1',
      año: '1995 - 90s',
      calificacion: '5.0 (6.8k)',
      descripcion: 'El equipo de ensueño de Sakaguchi Akira Toriyama: múltiples líneas temporales, viajes dimensionales y narrativa inolvidable.',
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop',
      etiqueta: '90s Épico'
    },
    {
      id: 4,
      nombre: 'Pokémon Rojo / Azul',
      plataforma: 'Game Boy',
      año: '1996 - 90s',
      calificacion: '4.9 (8.2k)',
      descripcion: 'El fenómeno que convirtió el cable Link en el accesorio escolar definitivo para intercambiar y atrapar a los 151.',
      imagen: 'https://images.unsplash.com/photo-1613771401354-f6f6d566a5e7?w=400&h=250&fit=crop',
      etiqueta: '90s Aventura RPG'
    },
    {
      id: 5,
      nombre: 'Grand Theft Auto: San Andreas',
      plataforma: 'PS2, Xbox, PC',
      año: '2004 - 2000s',
      calificacion: '4.9 (8.4k)',
      descripcion: 'El sandbox más ambicioso de la era de 128 bits: control de hip-hop memorable y libertad absoluta sobre ruedas.',
      imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=250&fit=crop',
      etiqueta: '2000s Mundo Abierto'
    },
    {
      id: 6,
      nombre: 'Need for Speed: Underground 2',
      plataforma: 'PS2, Xbox, PC',
      año: '2004 - 2000s',
      calificacion: '4.9 (6.7k)',
      descripcion: 'El túnel de la cultura tuning: túneles bajo la ciudad, tubos nitro y "Riders on the Storm" retumbando de noche.',
      imagen: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=250&fit=crop',
      etiqueta: '2000s Tuning / Carreras'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-xs text-retro-blue bg-retro-blue/10 px-2 py-1 rounded">🎮 RAWG API READY</span>
          <h2 className="text-2xl font-bold mt-2">Videojuegos legendarios</h2>
          <p className="text-sm text-gray-400 mt-1">Mostrando joyas de los años 90 • Catálogo interactivo listo para consulta con RAWG API mediante fetch en React.</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Buscar título ej: Sonic, Chrono, Mario..." 
            className="bg-retro-card border border-retro-pink/30 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:border-retro-pink"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6 text-xs">
        <button className="bg-retro-pink/20 text-retro-pink px-3 py-1 rounded-full font-semibold">Todas las plataformas</button>
        <button className="bg-white/5 px-3 py-1 rounded-full hover:bg-white/10">SNES</button>
        <button className="bg-white/5 px-3 py-1 rounded-full hover:bg-white/10">PlayStation 1 & 2</button>
        <button className="bg-white/5 px-3 py-1 rounded-full hover:bg-white/10">Nintendo 64</button>
        <span className="ml-auto text-gray-400">Estado React: Normal · Carga · Vacio</span>
      </div>

      {/* Tarjetas de juegos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {juegos.map((juego) => (
          <div key={juego.id} className="card-retro neon-border rounded-xl overflow-hidden hover:border-retro-pink/60 transition-colors">
            {/* Imagen */}
            <div className="relative h-40 overflow-hidden">
              <img 
                src={juego.imagen} 
                alt={juego.nombre}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-retro-pink/80 text-white text-xs px-2 py-0.5 rounded font-semibold">
                {juego.etiqueta}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">{juego.año} · {juego.plataforma}</span>
                <span className="text-xs text-retro-yellow">⭐ {juego.calificacion}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{juego.nombre}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">{juego.descripcion}</p>
              <button className="w-full text-center text-sm text-retro-blue border border-retro-blue/40 py-2 rounded hover:bg-retro-blue/10 transition-colors">
                Ver ficha completa ➜
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GamesSection;
