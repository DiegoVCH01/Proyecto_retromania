import { useState, useEffect } from 'react';

export default function SurveySection({ decadaGlobal }) {
  const [decada, setDecada] = useState(decadaGlobal || '90s');
  const [categoria, setCategoria] = useState('videojuegos');
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (decadaGlobal) setDecada(decadaGlobal);
  }, [decadaGlobal]);

  const calcularRetro = () => {
    let p90 = decada === '90s' ? 75 : 25;
    let p2000 = decada === '2000s' ? 75 : 25;

    if (categoria === 'videojuegos') { p90 += 8; p2000 -= 8; }
    if (categoria === 'tecnologia') { p2000 += 12; p90 -= 12; }
    if (categoria === 'musica') { p90 += 5; p2000 -= 5; }

    const titulos = {
      '90s-videojuegos': 'Arcade Master de 16-bits',
      '90s-musica': 'Nostálgico del Mixtape',
      '90s-cine': 'Cinéfilo de Videoclub (VHS)',
      '90s-tecnologia': 'Hacker de Windows 95',
      '2000s-videojuegos': 'Leyenda del Cybercafé',
      '2000s-musica': 'DJ de la Era MP3 / Ares',
      '2000s-cine': 'Coleccionista de DVDs',
      '2000s-tecnologia': 'Y2K Nativo y Pionero MSN'
    };

    setResultado({
      titulo: titulos[`${decada}-${categoria}`] || 'Nostálgico de pura cepa',
      p90: Math.min(Math.max(p90, 5), 95),
      p2000: Math.min(Math.max(100 - p90, 5), 95)
    });
  };

  return (
    <div className="bg-[#1a112c] border border-white/10 rounded-2xl p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📝</span>
          <div>
            <h2 className="text-lg font-bold text-white">¿Qué tan retro eres?</h2>
            <p className="text-[10px] text-[#b8a9ca] uppercase tracking-wider font-semibold">Encuesta de calibración cultural</p>
          </div>
        </div>
        <span className="bg-black/30 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white">
          Nivel XP: 09
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-yellow-400 font-mono">01.</span> ¿Cuál es tu década favorita definitiva?
        </h3>
        <div className="space-y-3">
          <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            decada === '90s' ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 hover:border-white/30 bg-black/20'
          }`}>
            <div className="flex items-center gap-4">
              <input type="radio" name="decada" className="hidden" checked={decada === '90s'} onChange={() => setDecada('90s')} />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${decada === '90s' ? 'border-pink-500' : 'border-gray-500'}`}>
                {decada === '90s' && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Años 90</h4>
                <p className="text-[#b8a9ca] text-xs">Cartuchos, VHS, Grunge & Tamagotchi</p>
              </div>
            </div>
            <span className="text-xl opacity-50">📼</span>
          </label>

          <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            decada === '2000s' ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 hover:border-white/30 bg-black/20'
          }`}>
            <div className="flex items-center gap-4">
              <input type="radio" name="decada" className="hidden" checked={decada === '2000s'} onChange={() => setDecada('2000s')} />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${decada === '2000s' ? 'border-pink-500' : 'border-gray-500'}`}>
                {decada === '2000s' && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Años 2000</h4>
                <p className="text-[#b8a9ca] text-xs">Y2K, MP3, MSN Messenger & Cibercafés</p>
              </div>
            </div>
            <span className="text-xl opacity-50">💿</span>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-yellow-400 font-mono">02.</span> ¿Qué categoría cultural marcó más tu infancia/juventud?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'videojuegos', icon: '🎮', label: 'Videojuegos' },
            { id: 'musica', icon: '💿', label: 'Música' },
            { id: 'cine', icon: '🎬', label: 'Cine y Series' },
            { id: 'tecnologia', icon: '💻', label: 'Tecnología' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                categoria === cat.id ? 'border-pink-500 bg-pink-500/10 text-white' : 'border-white/10 bg-black/20 text-[#b8a9ca] hover:border-white/30'
              }`}
            >
              <span className="text-2xl mb-2">{cat.icon}</span>
              <span className="text-xs font-semibold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={calcularRetro}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-sm shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all"
      >
        ✨ Calcular mi nivel retro
      </button>

      {resultado && (
        <div className="mt-6 bg-black/30 border border-white/10 p-5 rounded-xl animate-fade-in">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">RESULTADO VERIFICADO</span>
            <span className="text-xl">🕹️</span>
          </div>
          <h4 className="text-cyan-400 font-bold text-lg mb-2">{resultado.p90 > resultado.p2000 ? '92%' : '88%'} {resultado.titulo}</h4>
          <p className="text-xs text-[#b8a9ca] mb-4">¡Eres un auténtico explorador de tu época! Tu ADN digital vibra con tus elecciones retro.</p>
          
          <div className="flex justify-between text-[10px] text-white font-mono mb-1">
            <span>Años 90 ({resultado.p90}%)</span>
            <span>Años 2000 ({resultado.p2000}%)</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full flex overflow-hidden mb-2">
            <div className={`h-full bg-pink-500 transition-all duration-1000`} style={{ width: `${resultado.p90}%` }}></div>
            <div className={`h-full bg-yellow-500 transition-all duration-1000`} style={{ width: `${resultado.p2000}%` }}></div>
          </div>
          <p className="text-[10px] text-gray-500 text-right">🔥 Más de <strong className="text-white">12,450 votos</strong> registrados</p>
        </div>
      )}
    </div>
  );
}