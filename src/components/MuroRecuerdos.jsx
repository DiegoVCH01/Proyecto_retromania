export default function MuroRecuerdos() {
    const testimonios = [
        {
            id: 1,
            iniciales: 'NG',
            nombre: 'NostalgicGamer92',
            titulo: 'VETERANO DE LOS 90s',
            texto: '"Grabar canciones de la radio en cassettes rezando para que el locutor no hablara en el último segundo. Tardé dos semanas en completar mi cinta de verano del 98 con The Offspring y Cher."',
            zaps: 162,
            tiempo: 'Hace 2 horas',
            icon: '📼',
            color: 'bg-pink-600'
        },
        {
            id: 2,
            iniciales: 'CC',
            nombre: 'CyberCassette',
            titulo: 'Y2K NATIVO',
            texto: '"El zumbido del módem de 56k a las once de la noche a escondidas. Esperar 45 minutos para descargar un trailer en formato QuickTime de 12 megas. Éramos felices y pacientes sin saberlo."',
            zaps: 208,
            tiempo: 'Hace 5 horas',
            icon: '💿',
            color: 'bg-cyan-600'
        },
        {
            id: 3,
            iniciales: 'RP',
            nombre: 'RetroPixelGirl',
            titulo: 'ARCADE CHAMPION',
            texto: '"Poner la moneda de 25 pesetas sobre el cristal de la máquina de Metal Slug para pedir turno. Esas amistades forjadas en el recreativo del barrio marcaron mi pasión por el pixel art."',
            zaps: 315,
            tiempo: 'Ayer',
            icon: '🕹️',
            color: 'bg-yellow-600'
        }
    ];

    return (
        <section className="mb-12">
            {/* Header del Muro */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-white/10 pb-4">
                <div>
                    <span className="text-pink-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div> Testimonios de la comunidad
                    </span>
                    <h2 className="text-2xl font-bold text-white">Muro de Recuerdos Recientes</h2>
                </div>
                <a href="#" className="text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors mt-4 md:mt-0 flex items-center gap-1">
                    Ver todas las anécdotas →
                </a>
            </div>

            {/* Grid de Testimonios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonios.map((testimonio) => (
                    <div key={testimonio.id} className="bg-[#1a112c] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-black ${testimonio.color}`}>
                                    {testimonio.iniciales}
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-bold">{testimonio.nombre}</h4>
                                    <p className="text-[9px] text-gray-400 font-bold tracking-wider uppercase">{testimonio.titulo}</p>
                                </div>
                            </div>
                            <span className="opacity-50">{testimonio.icon}</span>
                        </div>

                        <p className="text-sm text-[#b8a9ca] italic mb-6 leading-relaxed">
                            {testimonio.texto}
                        </p>

                        <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-4">
                            <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                                ♡ {testimonio.zaps} zaps
                            </button>
                            <span>{testimonio.tiempo}</span>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}