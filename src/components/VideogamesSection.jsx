const games = [
  { id: 1, year: '1993', decade: '90s', platforms: 'Sega Mega-CD, PC', title: 'Sonic The Hedgehog CD', desc: 'Viajes temporales y una banda sonora inolvidable. El debut de Metal Sonic.', rating: 4.8, reviews: '(3.1k)' },
  { id: 2, year: '1995', decade: '90s', platforms: 'SNES, PS1', title: 'Chrono Trigger', desc: 'Una obra maestra absoluta con múltiples líneas temporales.', rating: 5.0, reviews: '(6.8k)' },
  { id: 3, year: '1996', decade: '90s', platforms: 'Game Boy', title: 'Pokémon Rojo / Azul', desc: 'El fenómeno global que convirtió a 151 criaturas en leyenda.', rating: 4.9, reviews: '(8.2k)' },
  { id: 4, year: '2004', decade: '2000s', platforms: 'PS2, Xbox, PC', title: 'GTA: San Andreas', desc: 'Libertad total en un mundo abierto icónico de los 2000s.', rating: 4.9, reviews: '(8.4k)' },
  { id: 5, year: '2004', decade: '2000s', platforms: 'PS2, Xbox, PC', title: 'Need for Speed: Underground 2', desc: 'Cultura tuning y carreras nocturnas bajo las luces de la ciudad.', rating: 4.9, reviews: '(6.7k)' },
];

const VideogamesSection = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <span className="text-[#ff4ac9] text-sm font-medium">🎮 CLÁSICOS QUE MARCARON</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">Videojuegos Legendarios</h2>
        <p className="text-[#9d92b8] max-w-xl mx-auto mt-2">Los títulos que pasaron de cartuchos y discos a nuestros corazones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map(game => (
          <div key={game.id} className="card p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-[#9d92b8] bg-white/5 px-2 py-1 rounded">{game.year} • {game.platforms}</span>
              <span className="text-[#ffd166] font-bold">★ {game.rating}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{game.title}</h3>
            <p className="text-sm text-[#9d92b8] mb-4">{game.desc}</p>
            <a href="#" className="text-[#4ad0ff] text-sm hover:underline inline-flex items-center gap-1">
              Ver detalles <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideogamesSection;
