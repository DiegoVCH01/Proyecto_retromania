import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { obtenerJuegosRAWG, obtenerDetalleJuego } from '../services/rawgApi';

export default function GamesSection({ decada }) {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [busquedaActiva, setBusquedaActiva] = useState('');

  // Modal
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [detalleJuego, setDetalleJuego] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // Cargar lista de juegos reaccionando a la prop global 'decada'
  useEffect(() => {
    let activo = true;
    const cargarJuegos = async () => {
      setCargando(true);
      setError('');
      try {
        const datos = await obtenerJuegosRAWG(decada, busquedaActiva);
        if (activo) setJuegos(datos);
      } catch (err) {
        if (activo) setError('Asegúrate de configurar VITE_RAWG_API_KEY en tu archivo .env');
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargarJuegos();
    return () => { activo = false; };
  }, [decada, busquedaActiva]);

  const handleBuscar = (e) => {
    if (e.key === 'Enter') {
      setBusquedaActiva(busqueda);
    }
  };

  const abrirFicha = async (juego) => {
    setJuegoSeleccionado(juego);
    setCargandoDetalle(true);
    try {
      const detalle = await obtenerDetalleJuego(juego.id);
      setDetalleJuego(detalle);
    } catch (error) {
      console.error(error);
    } finally {
      setCargandoDetalle(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-12">

      {/* Barra de Búsqueda (Sin los botones de década locales) */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-[#1a0f2e] border border-pink-500/30 p-4 rounded-xl mb-8 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">🔍</span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={handleBuscar}
            placeholder="Buscar juego: Zelda, Sonic, Mario, Doom..."
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-cyan-400 outline-none"
          />
        </div>
      </div>

      {/* Estados de Carga */}
      {cargando && (
        <div className="py-20 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="py-10 text-center text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl">
          <p className="font-bold">⚠️ Error de conexión API</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Grilla de Juegos */}
      {!cargando && !error && (
        <>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <h3 className="text-white font-bold">Títulos de los {decada === '90s' ? 'Años 90' : 'Años 2000'}</h3>
            <span className="ml-auto text-xs text-gray-500">Mostrando {juegos.length} resultados</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {juegos.map((juego) => {
              const year = juego.released ? juego.released.substring(0, 4) : 'N/A';

              return (
                <div key={juego.id} className="group bg-[#1a0f2e] border border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] flex flex-col">

                  <div className="relative h-48 overflow-hidden bg-black">
                    <img
                      src={juego.background_image || 'https://via.placeholder.com/400x250?text=No+Image'}
                      alt={juego.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">{year}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 border border-yellow-500/50 text-yellow-400 text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                      ⭐ {juego.rating}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider line-clamp-1">
                        {juego.platforms?.slice(0, 3).map(p => p.platform.name).join(', ')}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{juego.name}</h3>

                    <p className="text-xs text-[#b8a9ca] mb-6 line-clamp-3 flex-grow">
                      Haz clic en ver ficha completa para descubrir la historia, puntaje en Metacritic y detalles de desarrollo de este clásico atemporal.
                    </p>

                    <button
                      onClick={() => abrirFicha(juego)}
                      className="w-full text-center text-xs font-bold text-cyan-400 border border-cyan-400/30 py-2.5 rounded-lg hover:bg-cyan-400/10 transition-colors"
                    >
                      Ver ficha completa →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Modal Ficha Técnica */}
      {juegoSeleccionado && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setJuegoSeleccionado(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a0f2e] border-2 border-pink-500/50 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.2)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Cabecera Modal */}
            <div className="bg-black/50 border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-pink-400">
                <span className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div><div className="w-2 h-2 rounded-full bg-yellow-500"></div><div className="w-2 h-2 rounded-full bg-green-500"></div></span>
                FICHA TÉCNICA DETALLADA · ARCADE CRT DISPLAY
              </div>
              <button onClick={() => setJuegoSeleccionado(null)} className="text-gray-400 hover:text-white bg-white/5 rounded-full w-8 h-8 flex items-center justify-center">✕</button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="border-4 border-[#2a2a2a] rounded-xl overflow-hidden bg-black shadow-inner relative">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none opacity-50"></div>
                  <img
                    src={juegoSeleccionado.background_image}
                    alt={juegoSeleccionado.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  <img src={juegoSeleccionado.background_image} className="w-24 h-16 object-cover border border-pink-500/50 rounded cursor-pointer opacity-100" alt="thumb1" />
                  <img src={juegoSeleccionado.background_image} className="w-24 h-16 object-cover border border-white/10 rounded cursor-pointer opacity-50 hover:opacity-100" alt="thumb2" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-extrabold text-white">{juegoSeleccionado.name}</h3>
                  {detalleJuego?.metacritic && (
                    <div className="bg-green-500/20 border border-green-500 text-green-400 px-3 py-1 rounded-lg text-center">
                      <span className="block text-[8px] font-bold uppercase">Metascore</span>
                      <span className="text-xl font-black">{detalleJuego.metacritic}</span>
                    </div>
                  )}
                </div>

                {cargandoDetalle ? (
                  <div className="animate-pulse flex flex-col gap-3 mb-6">
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    <div className="h-4 bg-white/10 rounded w-4/6"></div>
                  </div>
                ) : (
                  <p className="text-sm text-[#b8a9ca] mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: detalleJuego?.description || 'Descripción no disponible.' }} />
                )}

                <div className="space-y-3 text-xs border-t border-white/10 pt-4 mt-auto">
                  <div className="flex border-b border-white/5 pb-2">
                    <span className="w-1/3 text-gray-500 font-bold">Desarrollador:</span>
                    <span className="w-2/3 text-white text-right">{detalleJuego?.developers?.map(d => d.name).join(', ') || 'N/A'}</span>
                  </div>
                  <div className="flex border-b border-white/5 pb-2">
                    <span className="w-1/3 text-gray-500 font-bold">Lanzamiento:</span>
                    <span className="w-2/3 text-white text-right">{juegoSeleccionado.released}</span>
                  </div>
                  <div className="flex border-b border-white/5 pb-2">
                    <span className="w-1/3 text-gray-500 font-bold">Plataformas:</span>
                    <span className="w-2/3 text-white text-right">{juegoSeleccionado.platforms?.map(p => p.platform.name).join(', ')}</span>
                  </div>
                  <div className="flex pb-2">
                    <span className="w-1/3 text-gray-500 font-bold">Géneros:</span>
                    <span className="w-2/3 text-white text-right">{juegoSeleccionado.genres?.map(g => g.name).join(', ')}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-pink-500 hover:bg-pink-400 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    ♡ GUARDAR EN COLECCIÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}