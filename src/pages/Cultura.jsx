import MoviesSection from '../components/MoviesSection'
import TechSection from '../components/TechSection'

export default function Cultura({ decada, onChangeDecada }) {
    return (
        <>
            {/* Selector de década */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#24163b] p-4">
                <div>
                    <h2 className="font-bold text-white">
                        Explora por década
                    </h2>
                    <p className="mt-1 text-xs text-[#b8a9ca]">
                        Descubre el cine y la tecnología de cada época.
                    </p>
                </div>


                <div className="flex gap-2">
                    {[
                        { valor: '90s', icono: '📼', texto: 'Años 90' },
                        { valor: '2000s', icono: '💿', texto: 'Años 2000' },
                    ].map(opcion => (
                        <button
                            key={opcion.valor}
                            onClick={() => onChangeDecada(opcion.valor)}
                            className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${decada === opcion.valor
                                    ? 'border-pink-400 bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                                    : 'border-white/20 bg-[#1a0f2e] text-[#b8a9ca] hover:border-cyan-400 hover:text-white'
                                }`}
                        >
                            <span className="text-lg">{opcion.icono}</span>
                            {opcion.texto}
                        </button>
                    ))}
                </div>

            </div>

            <MoviesSection decada={decada} />
            <TechSection decada={decada} />
        </>
    )
}
