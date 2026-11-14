
import { Link } from 'react-router-dom'

export default function DestacadoCard({
    imagen,
    categoria,
    titulo,
    descripcion,
    ruta,
    color = 'pink',
}) {
    const colores = {
        pink: 'text-pink-400 border-pink-500/30',
        blue: 'text-cyan-400 border-cyan-400/30',
        yellow: 'text-yellow-400 border-yellow-400/30',
    }

    const estilo = colores[color] ?? colores.pink

    return (
        <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#261831] transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10">
            <div className="relative overflow-hidden">
                <img
                    src={imagen}
                    alt={titulo}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className={`absolute left-4 top-4 rounded-md border bg-[#1a0f2e]/90 px-3 py-1 text-xs font-semibold backdrop-blur ${estilo}`}>
                    {categoria}
                </span>
            </div>

            <div className="flex h-[210px] flex-col p-5">
                <h3 className="mb-3 text-xl font-bold text-white">
                    {titulo}
                </h3>

                <p className="flex-1 text-sm leading-relaxed text-[#b8a9ca]">
                    {descripcion}
                </p>

                <Link
                    to={ruta}
                    className={`mt-4 inline-flex items-center text-sm font-semibold ${estilo.split(' ')[0]} hover:underline`}
                >
                    Descubrir más →
                </Link>
            </div>
        </article>
    )
}
