import { useState } from 'react';

const SurveySection = () => {
  const [decadaFavorita, setDecadaFavorita] = useState('90s');
  const [categorias, setCategorias] = useState({
    musica: true,
    videojuegos: true,
    cine: false,
    tecnologia: false
  });
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    decada: '',
    mensaje: ''
  });

  const handleCategoria = (cat) => {
    setCategorias(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="mt-12">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold">📋 ¿Qué tan retro eres?</h2>
        <p className="text-sm text-[#8888a3]">Dinos qué época marcó tu corazón y cuál era tu mayor obsesión cultural.</p>
      </div>

      {/* Pregunta 1 */}
      <div className="bg-[#24163b] border border-[rgba(255,74,201,0.15)] p-4 mb-4">
        <p className="text-sm font-semibold mb-3">1. ¿Cuál es tu década favorita?</p>
        <div className="grid grid-cols-2 gap-3">
          <label className={`flex items-center gap-2 p-3 border cursor-pointer transition-colors ${
            decadaFavorita === '90s' 
              ? 'border-[#ff4ac9] bg-[rgba(255,74,201,0.08)]' 
              : 'border-white/10 hover:border-white/20'
          }`}>
            <input 
              type="radio" 
              name="decada" 
              checked={decadaFavorita === '90s'}
              onChange={() => setDecadaFavorita('90s')}
              className="accent-[#ff4ac9]"
            />
            <div>
              <span className="font-semibold">Los 90s</span>
              <p className="text-xs text-[#8888a3]">Cartuchos, VHS, Grunge, Windows 95</p>
            </div>
          </label>
          <label className={`flex items-center gap-2 p-3 border cursor-pointer transition-colors ${
            decadaFavorita === '2000s' 
              ? 'border-[#4ad0ff] bg-[rgba(74,208,255,0.08)]' 
              : 'border-white/10 hover:border-white/20'
          }`}>
            <input 
              type="radio" 
              name="decada" 
              checked={decadaFavorita === '2000s'}
              onChange={() => setDecadaFavorita('2000s')}
              className="accent-[#4ad0ff]"
            />
            <div>
              <span className="font-semibold">Los 2000s</span>
              <p className="text-xs text-[#8888a3]">Y2K, MP3, MSN Messenger</p>
            </div>
          </label>
        </div>
      </div>

      {/* Pregunta 2 */}
      <div className="bg-[#24163b] border border-[rgba(255,74,201,0.15)] p-4 mb-4">
        <p className="text-sm font-semibold mb-3">2. ¿Cuál es tu categoría cultural favorita?</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleCategoria('musica')}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              categorias.musica 
                ? 'border-[#ff4ac9] bg-[rgba(255,74,201,0.15)] text-[#ff4ac9]' 
                : 'border-white/10 text-[#8888a3] hover:border-white/20'
            }`}
          >
            🎵 Música
          </button>
          <button 
            onClick={() => handleCategoria('videojuegos')}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              categorias.videojuegos 
                ? 'border-[#ff4ac9] bg-[rgba(255,74,201,0.15)] text-[#ff4ac9]' 
                : 'border-white/10 text-[#8888a3] hover:border-white/20'
            }`}
          >
            🎮 Videojuegos
          </button>
          <button 
            onClick={() => handleCategoria('cine')}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              categorias.cine 
                ? 'border-[#ff4ac9] bg-[rgba(255,74,201,0.15)] text-[#ff4ac9]' 
                : 'border-white/10 text-[#8888a3] hover:border-white/20'
            }`}
          >
            🎬 Cine y Series
          </button>
          <button 
            onClick={() => handleCategoria('tecnologia')}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              categorias.tecnologia 
                ? 'border-[#ff4ac9] bg-[rgba(255,74,201,0.15)] text-[#ff4ac9]' 
                : 'border-white/10 text-[#8888a3] hover:border-white/20'
            }`}
          >
            🔧 Tecnología
          </button>
        </div>
      </div>

      <button className="block mx-auto px-6 py-2 bg-gradient-to-r from-[#ff4ac9] to-[#ff6ed6] text-black font-bold text-sm hover:shadow-[0_0_12px_rgba(255,74,201,0.4)] transition-shadow">
        📤 ENVIAR RESPUESTA →
      </button>

      {/* Buzón Retro */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-[#ff4ac9] mb-3">📬 BUZÓN RETRO</h3>
        <p className="text-sm text-[#b8b8d1] mb-4">¿Tienes anécdotas, fotos de tus consolas antiguas o sugerencias de clásicos para añadir al archivo? ¡Escríbenos!</p>
        
        <div className="bg-[#24163b] border border-[rgba(255,209,102,0.2)] p-4 mb-4">
          <p className="text-sm font-bold text-[#ffd166] mb-1">💡 ¿Sabías que...?</p>
          <p className="text-sm text-[#b8b8d1]">Soplar los cartuchos de Nintendo en realidad oxidaba los contactos con el tiempo... ¡pero todos lo hicimos!</p>
        </div>

        <div className="bg-[#24163b] border border-[rgba(74,208,255,0.2)] p-4 mb-6">
          <p className="text-sm font-bold text-[#4ad0ff] mb-1">👥 Comunidad Activa</p>
          <p className="text-sm text-[#b8b8d1]">Más de 15.000 nostálgicos ya han enviado anécdotas de salones arcade y cibercafés de los 90 y 2000.</p>
        </div>

        {/* Formulario */}
        <h4 className="font-bold mb-3">Enviar recuerdo al buzón</h4>
        <form className="space-y-3">
          <div>
            <label className="block text-xs text-[#8888a3] mb-1">Nombre completo *</label>
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Tu nombre o alias retro"
              className="w-full bg-black/25 border border-white/12 text-white px-3 py-2 text-sm focus:border-[#ff4ac9] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8888a3] mb-1">Correo electrónico *</label>
            <input 
              type="email" 
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="tu.email@retro.com"
              className="w-full bg-black/25 border border-white/12 text-white px-3 py-2 text-sm focus:border-[#ff4ac9] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8888a3] mb-1">Década favorita *</label>
            <select 
              name="decada"
              value={formData.decada}
              onChange={handleInputChange}
              className="w-full bg-black/25 border border-white/12 text-white px-3 py-2 text-sm focus:border-[#ff4ac9] outline-none transition-colors"
            >
              <option value="">Selecciona una época...</option>
              <option value="90s">Los 90s</option>
              <option value="2000s">Los 2000s</option>
              <option value="ambas">Ambas por igual</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#8888a3] mb-1">Mensaje o anécdota nostálgica *</label>
            <textarea 
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Cuéntanos esa tarde jugando con amigos o tu recuerdo favorito..."
              className="w-full bg-black/25 border border-white/12 text-white px-3 py-2 text-sm focus:border-[#ff4ac9] outline-none transition-colors min-h-[80px] resize-y"
            ></textarea>
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-[#4ad0ff] to-[#73dcff] text-black font-bold text-sm mt-2 hover:shadow-[0_0_12px_rgba(74,208,255,0.4)] transition-shadow">
            📮 ENVIAR RECUERDO AL BUZÓN →
          </button>
        </form>
      </div>
    </section>
  );
};

export default SurveySection;
