import { useState } from 'react';

const SurveySection = () => {
  const [decada, setDecada] = useState('90s');
  const [categoria, setCategoria] = useState('musica');

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <div className="card-retro neon-border rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-2">📋 ¿Qué tan retro eres?</h2>
        <p className="text-gray-400 mb-8">Dinos qué época marcó tu corazón y cuál era tu mayor obsesión cultural.</p>

        {/* Pregunta 1 */}
        <div className="mb-6 text-left">
          <p className="font-semibold mb-3">1. ¿Cuál es tu década favorita?</p>
          <div className="grid grid-cols-2 gap-4">
            <label 
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                decada === '90s' ? 'border-retro-pink bg-retro-pink/10' : 'border-white/10'
              }`}
            >
              <input 
                type="radio" 
                name="decada" 
                value="90s"
                checked={decada === '90s'}
                onChange={() => setDecada('90s')}
                className="mr-2 accent-retro-pink"
              />
              <span className="font-semibold">Los 90s</span>
              <p className="text-xs text-gray-400 mt-1">Cartuchos, VHS, Grunge, Windows 95</p>
            </label>
            <label 
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                decada === '2000s' ? 'border-retro-blue bg-retro-blue/10' : 'border-white/10'
              }`}
            >
              <input 
                type="radio" 
                name="decada" 
                value="2000s"
                checked={decada === '2000s'}
                onChange={() => setDecada('2000s')}
                className="mr-2 accent-retro-blue"
              />
              <span className="font-semibold">Los 2000s</span>
              <p className="text-xs text-gray-400 mt-1">Y2K, MP3, MSN Messenger</p>
            </label>
          </div>
        </div>

        {/* Pregunta 2 */}
        <div className="mb-8 text-left">
          <p className="font-semibold mb-3">2. ¿Cuál es tu categoría cultural favorita?</p>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'musica', icono: '🎵', nombre: 'Música' },
              { id: 'juegos', icono: '🎮', nombre: 'Videojuegos' },
              { id: 'cine', icono: '🎬', nombre: 'Cine y Series' },
              { id: 'tech', icono: '💻', nombre: 'Tecnología' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  categoria === cat.id 
                    ? 'bg-retro-pink text-white' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {cat.icono} {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-pink px-8 py-3 rounded-full font-bold text-lg">
          ENVIAR RESPUESTA ➤
        </button>
      </div>
    </section>
  );
};

export default SurveySection;
