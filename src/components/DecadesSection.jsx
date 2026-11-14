import { useState } from 'react';

const DecadesSection = () => {
  const [decadaActiva, setDecadaActiva] = useState('90s');

  return (
    <section id="decadas" className="mb-20">
      <div className="text-center mb-10">
        <span className="text-[#4ad0ff] text-sm font-medium">🕰️ DOS ÉPOCAS INOLVIDABLES</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">Explora nuestras décadas</h2>
        <p className="text-[#9d92b8] max-w-xl mx-auto mt-2">Cada época tiene su propia esencia. ¿Cuál es la tuya?</p>
      </div>

      {/* Selector de pestañas */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-black/30 p-1 rounded-full border border-white/5">
          <button
            onClick={() => setDecadaActiva('90s')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              decadaActiva === '90s'
                ? 'bg-[#ff4ac9] text-black shadow-lg shadow-[#ff4ac9]/25'
                : 'text-[#9d92b8] hover:text-white'
            }`}
          >
            📼 Los 90s
          </button>
          <button
            onClick={() => setDecadaActiva('2000s')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              decadaActiva === '2000s'
                ? 'bg-[#4ad0ff] text-black shadow-lg shadow-[#4ad0ff]/25'
                : 'text-[#9d92b8] hover:text-white'
            }`}
          >
            💿 Los 2000s
          </button>
        </div>
      </div>

      {/* Contenido 90s */}
      {decadaActiva === '90s' && (
        <div className="card p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">📼</span>
            <div>
              <h3 className="text-xl font-bold text-[#ff4ac9]">Los años 90 — La era dorada</h3>
              <p className="text-sm text-[#9d92b8]">1990 — 1999</p>
            </div>
          </div>
          
          <p className="text-[#e0d6f2] mb-6">
            Una época de innovación pura. Los cartuchos dominaban las consolas, el grunge revolucionaba la música y el internet empezaba a tomar forma con el sonido inconfundible del módem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-black/25 p-4 rounded-lg border border-white/5">
              <span className="text-2xl">🎮</span>
              <h4 className="font-semibold mt-2">Consolas</h4>
              <p className="text-sm text-[#9d92b8]">SNES, PlayStation 1, Nintendo 64</p>
            </div>
            <div className="bg-black/25 p-4 rounded-lg border border-white/5">
              <span className="text-2xl">🎵</span>
              <h4 className="font-semibold mt-2">Música</h4>
              <p className="text-sm text-[#9d92b8]">Grunge, Pop, Eurodance</p>
            </div>
            <div className="bg-black/25 p-4 rounded-lg border border-white/5">
              <span className="text-2xl">📺</span>
              <h4 className="font-semibold mt-2">Cine</h4>
              <p className="text-sm text-[#9d92b8]">Matrix, Jurassic Park, Titanic</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button onClick={() => setDecadaActiva('2000s')} className="btn-secondary">
              Conocer los 2000s →
            </button>
          </div>
        </div>
      )}

      {/* Contenido 2000s */}
      {decadaActiva === '2000s' && (
        <div className="card p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💿</span>
            <div>
              <h3 className="text-xl font-bold text-[#4ad0ff]">Los años 2000 — La revolución digital</h3>
              <p className="text-sm text-[#9d92b8]">2000 — 2009</p>
            </div>
          </div>
          
          <p className="text-[#e0d6f2] mb-6">
            La era de la conectividad. El internet se volvió esencial, el MP3 cambió cómo escuchábamos música y las redes sociales empezaron a conectar al mundo entero.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-black/25 p-4 rounded-lg border border-white/5">
              <span className="text-2xl">🎮</span>
              <h4 className="font-semibold mt-2">Consolas</h4>
              <p className="text-sm text-[#9d92b8]">PS2, Xbox, GameCube</p>
            </div>
            <div className="bg-black/25 p-4 rounded-lg border border-white/5">
              <span className="text-2xl">💻</span>
              <h4 className="font-semibold mt-2">Internet</h4>
              <p className="text-sm text-[#9d92b8]">MSN, Messenger, Dial-up</p>
            </div>
            <div className="bg-black/25 p-4 rounded-lg border border-white/5">
              <span className="text-2xl">📱</span>
              <h4 className="font-semibold mt-2">Móviles</h4>
              <p className="text-sm text-[#9d92b8]">Nokia, Snake, pantallas pequeñas</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button onClick={() => setDecadaActiva('90s')} className="btn-secondary">
              ← Volver a los 90s
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DecadesSection;
