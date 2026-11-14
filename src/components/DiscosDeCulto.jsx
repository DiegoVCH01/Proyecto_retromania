const albumes = {
    '90s': [
        {
            id: 1,
            titulo: 'The Fat of the Land',
            artista: 'The Prodigy',
            anio: 1997,
            genero: 'Electrónica / Big Beat',
            colores: 'from-yellow-500/40 via-purple-700/40 to-cyan-500/30',
        },
        {
            id: 2,
            titulo: 'Sueño Stereo',
            artista: 'Soda Stereo',
            anio: 1995,
            genero: 'Rock en español',
            colores: 'from-pink-500/40 via-purple-700/40 to-blue-500/30',
        },
    ],
    '2000s': [
        {
            id: 3,
            titulo: 'Discovery',
            artista: 'Daft Punk',
            anio: 2001,
            genero: 'Electrónica / House',
            colores: 'from-cyan-500/40 via-blue-700/40 to-purple-500/30',
        },
        {
            id: 4,
            titulo: 'Laundry Service',
            artista: 'Shakira',
            anio: 2001,
            genero: 'Pop latino',
            colores: 'from-pink-500/40 via-orange-600/30 to-purple-700/40',
        },
    ],
}

export default function DiscosDeCulto({ decada }) {
    const discos = albumes[decada] ?? albumes['90s']

    function abrirAlbum(album) {
        const busqueda = encodeURIComponent(
            `${album.titulo} ${album.artista}`
        )

        window.open(
            `https://open.spotify.com/search/${busqueda}`,
            '_blank',
            'noopener,noreferrer'
        )
    }

    return (
        <section className="mb-16">
            <div className="mb-6">
                <span className="text-xs font-semibold tracking-widest text-pink-400">
                    💿 ÁLBUMES LEGENDARIOS
                </span>

                <h2 className="mt-2 text-2xl font-bold text-white">
                    Discos de Culto
                </h2>

                <p className="mt-2 text-sm text-[#b8a9ca]">
                    Álbumes que marcaron la música de los{' '}
                    {decada === '90s' ? 'años 90' : 'años 2000'}.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {discos.map(album => (
                    <article
                        key={album.id}
                        className="group overflow-hidden rounded-2xl border border-white/10 bg-[#261831] p-4 transition hover:-translate-y-1 hover:border-pink-500/40"
                    >
                        {/* Ilustración provisional del álbum */}
                        <div
                            className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${album.colores}`}
                        >
                            <span className="absolute left-3 top-3 rounded-full border border-yellow-400/40 bg-[#160d25]/90 px-3 py-1 text-xs font-bold text-yellow-300">
                                {album.anio}
                            </span>

                            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-[#120d1d] bg-[repeating-radial-gradient(circle,#15101e_0px,#15101e_3px,#392744_4px,#15101e_6px)] shadow-xl">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-cyan-400">
                                    <div className="h-3 w-3 rounded-full bg-[#160d25]" />
                                </div>
                            </div>

                            <span className="absolute bottom-3 left-3 right-3 rounded-md bg-[#160d25]/85 px-3 py-2 text-center text-xs font-bold text-white">
                                {album.titulo}
                            </span>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold text-white">
                                {album.titulo}
                            </h3>

                            <p className="mt-1 text-sm text-[#c1b3ce]">
                                {album.artista}
                            </p>

                            <p className="mt-2 text-xs text-cyan-400">
                                {album.genero}
                            </p>

                            <button
                                type="button"
                                onClick={() => abrirAlbum(album)}
                                className="mt-5 w-full rounded-lg border border-pink-500/30 bg-pink-500/10 px-4 py-2.5 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/20"
                            >
                                ♫ Buscar álbum en Spotify
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
