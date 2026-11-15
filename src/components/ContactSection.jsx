import { useState } from 'react';
import { enviarRecuerdo } from '../services/supabaseApi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    decadaTesoro: 'Años 2000',
    mensaje: ''
  });

  const [estadoEnvio, setEstadoEnvio] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validar que no falten datos
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      setEstadoEnvio('error_datos');
      setTimeout(() => setEstadoEnvio(''), 3000);
      return;
    }

    setEstadoEnvio('enviando');

    try {
      // 2. Enviar a Supabase
      console.log("Intentando enviar a Supabase:", formData); // Ver qué se envía
      const respuesta = await enviarRecuerdo(formData);
      console.log("Respuesta de Supabase:", respuesta); // Ver éxito

      setEstadoEnvio('exito');

      // Limpiar formulario tras el éxito
      setFormData({
        nombre: '',
        correo: '',
        decadaTesoro: 'Años 2000',
        mensaje: ''
      });

      setTimeout(() => {
        setEstadoEnvio('');
      }, 4000);

    } catch (error) {
      // 3. Capturar error de Supabase
      console.error('ERROR DETALLADO DE SUPABASE:', error); // Mostrar el error real
      setEstadoEnvio('error_bd');
      setTimeout(() => setEstadoEnvio(''), 4000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Formulario Buzón */}
      <div className="bg-[#1a112c] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📬</span>
            <div>
              <h2 className="text-lg font-bold text-white">Buzón Retro: Comparte tu recuerdo</h2>
              <p className="text-[10px] text-[#b8a9ca] uppercase tracking-wider font-semibold">Conserva tu anécdota en la cápsula del tiempo</p>
            </div>
          </div>
          <span className="text-pink-400 text-xs font-semibold flex items-center gap-1">
            🔓 Abierto
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-1">Nombre o Alias Arcade <span className="text-pink-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="PixelVoyager"
                  className={`w-full bg-black/30 border rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-cyan-400 outline-none transition-colors ${estadoEnvio === 'error' && !formData.nombre ? 'border-red-500' : 'border-white/10'}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white mb-1">Correo electrónico <span className="text-pink-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  placeholder="usuario@retromania.net"
                  className={`w-full bg-black/30 border rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-cyan-400 outline-none transition-colors ${estadoEnvio === 'error' && !formData.correo ? 'border-red-500' : 'border-white/10'}`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1">Década que mejor define tu tesoro <span className="text-pink-500">*</span></label>
            <select
              name="decadaTesoro"
              value={formData.decadaTesoro}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white focus:border-cyan-400 outline-none appearance-none"
            >
              <option value="Años 2000">Años 2000 </option>
              <option value="Años 90">Años 90 </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white mb-1">Mensaje o anécdota nostálgica <span className="text-pink-500">*</span></label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              rows="4"
              maxLength={500}
              placeholder="Todavía recuerdo desempacar la PlayStation 2 en la Navidad de 2001..."
              className={`w-full bg-black/30 border rounded-lg py-3 px-3 text-sm text-white focus:border-cyan-400 outline-none resize-none transition-colors ${estadoEnvio === 'error' && !formData.mensaje ? 'border-red-500' : 'border-white/10'}`}
            ></textarea>
            <div className="flex justify-between items-center mt-1">
              <span className={`text-[10px] ${formData.mensaje.length > 450 ? 'text-pink-500' : 'text-yellow-400'}`}>✎ {formData.mensaje.length} caracteres</span>
              <span className="text-[10px] text-gray-500">Máx 500 caracteres</span>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={estadoEnvio === 'enviando'}
            className={`w-full py-3 rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex justify-center items-center gap-2 ${
              estadoEnvio === 'exito' 
                ? 'bg-green-500 text-white shadow-green-500/50'
                : estadoEnvio === 'enviando'
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : estadoEnvio.includes('error')
                ? 'bg-red-500 text-white shadow-red-500/50'
                : 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02]'
            }`}
          >
            {estadoEnvio === 'enviando' && 'Procesando memoria... ⏳'}
            {estadoEnvio === 'exito' && '¡Recuerdo archivado! ✅'}
            {estadoEnvio === '' && '▷ Enviar recuerdo al buzón 🚀'}
            {estadoEnvio === 'error_datos' && 'Faltan datos ⚠️'}
            {estadoEnvio === 'error_bd' && 'Error de base de datos ❌'}
          </button>
        </form>

        {/* Overlay de éxito */}
        {estadoEnvio === 'exito' && (
          <div className="absolute inset-0 z-20 bg-[#1a112c]/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
            <span className="text-5xl mb-4">👾</span>
            <h3 className="text-cyan-400 font-bold text-xl mb-2">¡Cápsula Guardada!</h3>
            <p className="text-sm text-[#b8a9ca] text-center px-8">Tu recuerdo ha sido enviado al servidor central de la nostalgia.</p>
          </div>
        )}
      </div>

      {/* Tarjetas Informativas (Se mantienen igual) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1a112c] border border-white/10 rounded-xl p-5 flex flex-col gap-2">
          <h3 className="text-yellow-400 font-bold text-sm flex items-center gap-2">
            <span className="border border-yellow-400/30 p-1 rounded-md">💡</span> ¿Sabías que...?
          </h3>
          <p className="text-xs text-[#b8a9ca] leading-relaxed">
            Soplar los cartuchos de NES y SNES en realidad no limpiaba los conectores. La humedad condensada del aliento desgastaba el cobre.
          </p>
        </div>

        <div className="bg-[#1a112c] border border-white/10 rounded-xl p-5 flex flex-col justify-center items-center text-center">
          <h3 className="text-4xl font-extrabold text-cyan-400 mb-1">15.000+</h3>
          <p className="text-[10px] font-bold text-white uppercase tracking-widest">RECUERDOS COMPARTIDOS</p>
          <p className="text-xs text-gray-500">en el archivo colectivo</p>
        </div>
      </div>

    </div>
  );
}