import { useState, useEffect } from 'react';
import { obtenerRecuerdos } from '../services/supabaseApi';

export default function MuroRecuerdos() {
    const [testimonios, setTestimonios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // useEffect para buscar los datos reales en cuanto cargue el componente
    useEffect(() => {
        const cargarMuro = async () => {
            try {
                setCargando(true);
                const datos = await obtenerRecuerdos();

                // Mapeamos los datos de Supabase para que coincidan con la estructura visual
                const datosFormateados = datos.map((item, index) => {
                    // Seleccionar un color al azar o en secuencia para el avatar
                    const colores = ['bg-pink-600', 'bg-cyan-600', 'bg-yellow-600', 'bg-purple-600'];
                    const colorElegido = colores[index % colores.length];

                    // Decidir un icono basado en la década elegida
                    const icono = item.decada && item.decada.includes('90') ? '📼' : '💿';

                    // Calcular hace cuánto tiempo se creó de manera sencilla
                    const fecha = new Date(item.created_at);
                    const ahora = new Date();
                    const horasDiferencia = Math.floor((ahora - fecha) / (1000 * 60 * 60));
                    let tiempoTexto = 'Hace poco';
                    if (horasDiferencia > 24) {
                        tiempoTexto = `Hace ${Math.floor(horasDiferencia / 24)} días`;
                    } else if (horasDiferencia > 0) {
                        tiempoTexto = `Hace ${horasDiferencia} horas`;
                    }

                    return {
                        id: item.id,
                        // Toma la primera letra del alias para el círculo del avatar
                        iniciales: item.alias ? item.alias.substring(0, 2).toUpperCase() : '👾',
                        nombre: item.alias || 'Anónimo Retro',
                        titulo: item.decada ? `EXPLORADOR ${item.decada.toUpperCase()}` : 'VIAJERO DEL TIEMPO',
                        texto: `"${item.mensaje}"`,
                        zaps: Math.floor(Math.random() * 200) + 10, // Simulamos los 'likes/zaps' por ahora
                        tiempo: tiempoTexto,
                        icon: icono,
                        color: colorElegido
                    };
                });

                setTestimonios(datosFormateados);
            } catch (err) {
                console.error("Error al cargar testimonios:", err);
                setError("No pudimos conectar con el servidor central de nostalgia.");
            } finally {
                setCargando(false);
            }
        };

        cargarMuro();
    }, []);

    return (
        <section className="mb-12">
            {/* Header del Muro */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-white/10 pb-4">
                <div>
                    <span className="text-pink-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></div> Testimonios de la comunidad en Vivo
                    </span>
                    <h2 className="text-2xl font-bold text-white">Muro de Recuerdos Recientes</h2>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors mt-4 md:mt-0 flex items-center gap-1 bg-cyan-400/10 px-3 py-1.5 rounded-lg"
                >
                    ↻ Actualizar Muro
                </button>
            </div>

            {/* Estados de Carga y Error */}
            {cargando && (
                <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center text-sm">
                    {error}
                </div>
            )}

            {!cargando && !error && testimonios.length === 0 && (
                <div className="bg-[#1a112c] border border-white/10 p-8 rounded-xl text-center text-gray-400 text-sm italic">
                    El muro está vacío. ¡Sé el primero en compartir una anécdota!
                </div>
            )}

            {/* Grid de Testimonios Dinámico */}
            {!cargando && !error && testimonios.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonios.map((testimonio) => (
                        <div key={testimonio.id} className="bg-[#1a112c] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-pink-500/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all">

                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-black ${testimonio.color}`}>
                                        {testimonio.iniciales}
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-bold truncate max-w-[120px]" title={testimonio.nombre}>{testimonio.nombre}</h4>
                                        <p className="text-[9px] text-gray-400 font-bold tracking-wider uppercase">{testimonio.titulo}</p>
                                    </div>
                                </div>
                                <span className="opacity-50 text-xl">{testimonio.icon}</span>
                            </div>

                            <p className="text-sm text-[#b8a9ca] italic mb-6 leading-relaxed line-clamp-4">
                                {testimonio.texto}
                            </p>

                            <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-4 mt-auto">
                                <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                                    ♡ {testimonio.zaps} zaps
                                </button>
                                <span>{testimonio.tiempo}</span>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}