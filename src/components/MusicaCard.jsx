export default function MusicaCard({ cancion, onEscuchar, disponible }) {
    const anio = cancion.fecha
        ? cancion.fecha.substring(0, 4)
        : 'Sin fecha'

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#261831] transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10">

            {/* Área visual retro */}
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#422047] via-[#241633] to-[#12374b]">

                <div className="absolute h-32 w-32 rounded-full border-[18px] border-[#130e23] bg-[#211630] shadow-xl shadow-pink-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400">
                            <div className="m-auto mt-4 h-4 w-4 rounded-full bg-[#1a1029]" />
                        </div>
                    </div>
                </div>

                <span className="absolute left-3 top-3 rounded-full border border-pink-500/40 bg-[#1a1029]/90 px-3 py-1 text-xs text-pink-300">
                    {anio}
                </span>

                <span className="absolute bottom-3 right-3 rounded-md bg-[#1a1029]/80 px-2 py-1 text-xs text-cyan-300">
                    RETRO AUDIO
                </span>
            </div>

            {/* Información */}
            <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-pink-400">
                    {cancion.genero}
                </span>

                <h3 className="mb-2 text-lg font-bold text-white">
                    {cancion.titulo}
                </h3>

                <p className="mb-4 text-sm text-cyan-400">
                    {cancion.artista}
                </p>

                <button
                    type="button"
                    onClick={() => onEscuchar(cancion)}
                    className="mb-4 w-full rounded-lg border border-cyan-400/40
                    bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold
                    text-cyan-300 transition hover:bg-cyan-400/20"
                >
                    {disponible ? '▶ Escuchar en RetroManía' : '♫ Buscar en Spotify'}
                </button>

                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-[#b8a9ca]">
                        {cancion.idioma}
                    </span>

                    <span className="text-xs text-[#b8a9ca]">
                        {anio}
                    </span>
                </div>
            </div>
        </article>
    )
}
