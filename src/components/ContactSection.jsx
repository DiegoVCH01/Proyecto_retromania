const ContactSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna izquierda — Información */}
        <div>
          <span className="text-xs text-retro-pink bg-retro-pink/10 px-2 py-1 rounded">📮 BUZÓN RETRO</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">Comparte tu nostalgia</h2>
          <p className="text-gray-400 mb-8">¿Tienes anécdotas, fotos de tus consolas antiguas o sugerencias de clásicos para añadir al archivo? ¡Escríbenos!</p>

          <div className="space-y-4">
            <div className="card-retro neon-border p-4 rounded-lg">
              <h4 className="font-bold text-retro-yellow mb-2">💡 ¿Sabías que...?</h4>
              <p className="text-sm text-gray-400">Soplar los cartuchos de Nintendo en realidad oxidaba los contactos con el tiempo. ¡pero todos lo hicimos!</p>
            </div>

            <div className="card-retro neon-border-blue p-4 rounded-lg">
              <h4 className="font-bold text-retro-blue mb-2">👥 Comunidad Activa</h4>
              <p className="text-sm text-gray-400">Más de 15.000 nostálgicos ya han enviado anécdotas de salones arcade y cibercafés de los 90 y 2000.</p>
            </div>
          </div>
        </div>

        {/* Columna derecha — Formulario */}
        <div className="card-retro neon-border rounded-xl p-6">
          <h3 className="text-lg font-bold mb-6">Enviar recuerdo al buzón ✉️</h3>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre completo *</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre o alias retro"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-retro-pink"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Correo electrónico *</label>
                <input 
                  type="email" 
                  placeholder="tu_email@retro.com"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-retro-pink"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Década favorita *</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-retro-pink"
                required
              >
                <option value="">Selecciona una época...</option>
                <option>Años 90 (SNES, VHS, Grunge, Windows 95)</option>
                <option>Años 2000 (PS2, MSN, MP3, Y2K)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Mensaje o anécdota nostálgica *</label>
              <textarea 
                placeholder="Cuéntanos esa tarde jugando con amigos o tu recuerdo favorito..."
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-retro-pink resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full btn-blue py-2.5 rounded font-bold"
            >
              ENVIAR RECUERDO AL BUZÓN ➤
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
