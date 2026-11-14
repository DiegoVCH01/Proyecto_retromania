const canciones = [
  { id: 1, cat: '90s Grunge', title: 'Smells Like Teen Spirit', artist: 'Nirvana', year: '1991' },
  { id: 2, cat: '90s Eurodance', title: 'Rhythm is a Dancer', artist: 'Snap!', year: '1992' },
  { id: 3, cat: '2000s Nu-Metal', title: 'In the End', artist: 'Linkin Park', year: '2000' },
  { id: 4, cat: '2000s Y2K Pop', title: 'Toxic', artist: 'Britney Spears', year: '2003' },
];

const MusicSection = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <span className="text-[#4ad0ff] text-sm font-medium">🎵 SONIDOS INOLVIDABLES</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">La Banda Sonora de tu Vida</h2>
        <p className="text-[#9d92b8] max-w-xl mx-auto mt-2">Canciones que suenan y de inmediato te transportan al pasado.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {canciones.map(c => (
          <div key={c.id} className="card p-5 text-center">
            <span className="text-xs text-[#ff4ac9] bg-[#ff4ac9]/10 px-2 py-1 rounded-full">{c.cat}</span>
            <h3 className="font-bold mt-3 mb-1">{c.title}</h3>
            <p className="text-sm text-[#9d92b8] mb-4">{c.artist} • {c.year}</p>
            <button className="w-12 h-12 flex items-center justify-center mx-auto rounded-full border border-[#4ad0ff] text-[#4ad0ff] hover:bg-[#4ad0ff]/10 transition-colors">
              ▶
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MusicSection;
