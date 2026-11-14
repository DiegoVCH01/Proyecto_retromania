
import { useEffect, useMemo, useState } from 'react'
import { obtenerCanciones } from '../services/musicApi'
import SelectorDecada from '../components/ui/SelectorDecada'
import MusicaCard from '../components/MusicaCard'
import SpotifyPlayer from '../components/SpotifyPlayer'
import DiscosDeCulto from '../components/DiscosDeCulto'

export default function Musica({ decada, onChangeDecada }) {
    const [canciones, setCanciones] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const [busqueda, setBusqueda] = useState('')
    const [genero, setGenero] = useState('Todos')
    const [idioma, setIdioma] = useState('Todos')
    const [cancionSeleccionada, setCancionSeleccionada] = useState(null)

    // Consultar API REST
    useEffect(() => {
        const controller = new AbortController()

        obtenerCanciones(decada, controller.signal)
            .then(datos => {
                if (!controller.signal.aborted) {
                    setCanciones(datos)
                    setError(null)
                    setCargando(false)
                }
            })
            .catch(err => {
                if (!controller.signal.aborted) {
                    setError(err.message)
                    setCargando(false)
                }
            })

        return () => controller.abort()
    }, [decada])

    // Obtener géneros disponibles
    const generos = useMemo(() => [
        'Todos',
        ...new Set(canciones.map(c => c.genero).filter(Boolean)),
    ], [canciones])

    // Filtrar resultados
    const cancionesFiltradas = useMemo(() => {
        return canciones.filter(cancion => {
            const texto = busqueda.toLowerCase().trim()

            const coincideBusqueda =
                cancion.titulo.toLowerCase().includes(texto) ||
                cancion.artista.toLowerCase().includes(texto)

            const coincideGenero =
                genero === 'Todos' || cancion.genero === genero

            const coincideIdioma =
                idioma === 'Todos' || cancion.idioma === idioma

            return coincideBusqueda && coincideGenero && coincideIdioma
        })
    }, [canciones, busqueda, genero, idioma])

    function cambiarDecada(nuevaDecada) {
        setCanciones([])
        setCargando(true)
        setError(null)
        setBusqueda('')
        setGenero('Todos')
        setIdioma('Todos')
        onChangeDecada(nuevaDecada)
        setCancionSeleccionada(null)
    }

    const spotifyIds = {
        // AÑOS 90
        'Smells Like Teen Spirit': '5ghIJDpPoe3CfHMGu71E6T',
        'Rhythm Is a Dancer': '1UeCikYtWMyXYLXBZEhAeB',
        '...Baby One More Time': '3MjUtNVVq3C8Fn0MP3zhXa',
        'De música ligera': '2WD9ggmpZE7Wodh3qVVCgg',
        'La tierra del olvido': '1TPZ028i7BWWS5xW4UN9ss',
        'Livin la Vida Loca': '35z9vaJldOTUSIb5UNrer0',

        // AÑOS 2000
        'In the End': '60a0Rd6pjrkxjPbaKzXjfq',
        'One More Time': '0DiWol3AO6WpXZgp0goxAV',
        'Toxic': '6I9VzXrHxO9rA9A5euc8Ak',
        'Gasolina': '3Vcol42HsvDe66EpmlXhSZ',
        'Color esperanza': '3T07pNAEVr9adeIG9i1ex4',
        'La camisa negra': '40MqFBRXZ5nIG8AIKsI7si',
    }

    function normalizarTitulo(texto = '') {
        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
    }

    function obtenerSpotifyId(titulo) {
        const clave = normalizarTitulo(titulo)

        const entrada = Object.entries(spotifyIds).find(
            ([nombre]) => normalizarTitulo(nombre) === clave
        )

        return entrada?.[1] ?? null
    }


    function escucharCancion(cancion) {
        const spotifyId = obtenerSpotifyId(cancion.titulo)

        if (!spotifyId) {
            const consulta = encodeURIComponent(
                `${cancion.titulo} ${cancion.artista}`
            )

            window.open(
                `https://open.spotify.com/search/${consulta}`,
                '_blank',
                'noopener,noreferrer'
            )
            return
        }

        setCancionSeleccionada({
            id: spotifyId,
            titulo: cancion.titulo,
            artista: cancion.artista,
            anio: cancion.fecha?.slice(0, 4) || 'Sin fecha',
        })
    }


    return (
        <div className="py-8">

            {/* ENCABEZADO */}
            <section className="mb-10">
                <span className="text-xs font-semibold tracking-widest text-cyan-400">
                    ● CANAL DE AUDIO RETRO
                </span>

                <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                    La banda sonora de tu{' '}
                    <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                        época
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl leading-relaxed text-[#b8a9ca]">
                    Revive la música que marcó generaciones en Perú.
                    Desde el rock en español y las baladas hasta el
                    grunge, el pop y la electrónica de los años 90 y 2000.
                </p>
            </section>

            {/* SELECTOR GLOBAL */}
            <SelectorDecada
                decada={decada}
                onChange={cambiarDecada}
            />

            <SpotifyPlayer
                decada={decada}
                cancionSeleccionada={cancionSeleccionada}
            />

            {/* BUSCADOR */}
            <section className="my-10">
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Himnos Inmortales
                        </h2>

                        <p className="mt-1 text-sm text-[#b8a9ca]">
                            Explora canciones de los {decada === '90s' ? 'años 90' : 'años 2000'}.
                        </p>
                    </div>

                    <input
                        type="search"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar canción o artista..."
                        aria-label="Buscar canción o artista"
                        className="w-full rounded-lg border border-white/15 bg-[#261831] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8e809e] focus:border-cyan-400 md:max-w-xs"
                    />
                </div>

                {/* FILTROS */}
                <div className="mb-8 flex flex-col gap-4">

                    <div className="flex flex-wrap gap-2">
                        {generos.map(item => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setGenero(item)}
                                aria-pressed={genero === item}
                                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${genero === item
                                    ? 'border-pink-500 bg-pink-500 text-[#1a1029]'
                                    : 'border-white/10 bg-[#261831] text-[#b8a9ca] hover:border-pink-500/50'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['Todos', 'Español', 'Inglés'].map(item => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setIdioma(item)}
                                aria-pressed={idioma === item}
                                className={`rounded-lg border px-4 py-2 text-sm transition ${idioma === item
                                    ? 'border-cyan-400 bg-cyan-400/15 text-cyan-300'
                                    : 'border-white/10 text-[#b8a9ca] hover:border-cyan-400/50'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ESTADOS */}

                {cargando && (
                    <div role="status" aria-label="Cargando canciones">
                        <p className="mb-5 text-sm text-cyan-400">
                            Consultando MusicBrainz...
                        </p>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }, (_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse overflow-hidden rounded-xl border border-white/10 bg-[#261831]"
                                >
                                    <div className="h-44 bg-white/10" />

                                    <div className="space-y-4 p-5">
                                        <div className="h-3 w-24 rounded bg-pink-400/20" />
                                        <div className="h-5 w-3/4 rounded bg-white/15" />
                                        <div className="h-4 w-1/2 rounded bg-cyan-400/15" />
                                        <div className="mt-4 h-4 w-full rounded bg-white/10" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {error && (
                    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
                        <p>No pudimos cargar las canciones: {error}</p>
                        <button
                            type="button"
                            onClick={() => cambiarDecada(decada)}
                            className="mt-3 underline"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {!cargando && !error && (
                    <>
                        <p className="mb-5 text-sm text-[#b8a9ca]">
                            Mostrando {cancionesFiltradas.length} canciones
                        </p>

                        {cancionesFiltradas.length === 0 ? (
                            <div className="rounded-xl border border-white/10 bg-[#261831] p-8 text-center">
                                <p className="text-white">
                                    No encontramos canciones con esos filtros.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setBusqueda('')
                                        setGenero('Todos')
                                        setIdioma('Todos')
                                    }}
                                    className="mt-4 text-cyan-400 hover:underline"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {cancionesFiltradas.map(cancion => (
                                    <MusicaCard
                                        key={cancion.id}
                                        cancion={cancion}
                                        disponible={Boolean(obtenerSpotifyId(cancion.titulo))}
                                        onEscuchar={escucharCancion}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
            <DiscosDeCulto decada={decada} />
        </div>
    )
}
