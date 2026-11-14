import { useEffect, useRef, useState } from 'react'

// Evita cargar varias veces el script de Spotify.
let spotifyApiPromise

function cargarSpotifyAPI() {
    if (!spotifyApiPromise) {
        spotifyApiPromise = new Promise((resolve, reject) => {
            window.onSpotifyIframeApiReady = resolve

            const script = document.createElement('script')
            script.src = 'https://open.spotify.com/embed/iframe-api/v1'
            script.async = true

            script.onerror = () => {
                spotifyApiPromise = null
                reject(new Error('No se pudo cargar Spotify'))
            }

            document.body.appendChild(script)
        })
    }

    return spotifyApiPromise
}

const cancionesSpotify = {
    '90s': {
        titulo: 'Smells Like Teen Spirit',
        artista: 'Nirvana',
        anio: '1991',
        id: '5ghIJDpPoe3CfHMGu71E6T',
    },
    '2000s': {
        titulo: 'One More Time',
        artista: 'Daft Punk',
        anio: '2000',
        id: '0DiWol3AO6WpXZgp0goxAV',
    },
}

export default function SpotifyPlayer({ decada, cancionSeleccionada, }) {
    const contenedorRef = useRef(null)
    const controladorRef = useRef(null)

    const [reproduciendo, setReproduciendo] = useState(false)
    const [listo, setListo] = useState(false)
    const [error, setError] = useState('')

    const cancion =
        cancionSeleccionada ??
        cancionesSpotify[decada] ??
        cancionesSpotify['90s']

    const cancionIdRef = useRef(cancion.id)

    // Spotify controla únicamente un nodo creado fuera del árbol de React.
    // Así evitamos conflictos de DOM al cambiar la década o desmontar el componente.
    useEffect(() => {
        let activo = true
        let controlador = null
        const contenedor = contenedorRef.current

        cargarSpotifyAPI()
            .then(api => {
                if (!activo || !contenedor) return

                const nodoSpotify = document.createElement('div')
                contenedor.appendChild(nodoSpotify)
                const idInicial = cancionIdRef.current

                api.createController(
                    nodoSpotify,
                    {
                        width: '100%',
                        height: 152,
                        uri: `spotify:track:${idInicial}`,
                    },
                    embed => {
                        if (!activo) {
                            embed.destroy()
                            return
                        }

                        controlador = embed
                        controladorRef.current = embed

                        embed.addListener('ready', () => {
                            if (activo) setListo(true)
                        })

                        embed.addListener('playback_update', evento => {
                            if (!activo) return
                            const { isPaused, isBuffering } = evento.data
                            setReproduciendo(!isPaused && !isBuffering)
                        })

                        // El usuario pudo cambiar de década mientras cargaba Spotify.
                        if (cancionIdRef.current !== idInicial) {
                            embed.loadEntity(`spotify:track:${cancionIdRef.current}`)
                        }
                    }
                )
            })
            .catch(() => {
                if (activo) setError('No se pudo cargar el reproductor de Spotify.')
            })

        return () => {
            activo = false
            if (controlador) controlador.destroy()
            if (controladorRef.current === controlador) controladorRef.current = null
            // El contenedor pertenece a React; sus hijos, únicamente a Spotify.
            contenedor?.replaceChildren()
        }
    }, [])


    useEffect(() => {
        cancionIdRef.current = cancion.id
        controladorRef.current?.loadEntity(
            `spotify:track:${cancion.id}`
        )
    }, [cancion.id])


    function alternarReproduccion() {
        controladorRef.current?.togglePlay()
    }

    return (
        <section className="mb-12 overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-br from-[#2b193b] via-[#21152f] to-[#142639] p-5 shadow-xl md:p-8">

            {/* CABECERA */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <span className="text-xs font-bold tracking-widest text-green-400">
                        ● SPOTIFY · RETRO AUDIO
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-white">
                        Reproductor Retro
                    </h2>

                    <p className="mt-1 text-sm text-[#b8a9ca]">
                        La música que marcó una generación
                    </p>
                </div>

                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    {decada === '90s' ? 'Años 90' : 'Años 2000'}
                </span>
            </div>


            {/* VINILO, INFORMACIÓN Y SPOTIFY */}
            <div className="grid items-center gap-6 lg:grid-cols-[220px_minmax(0,1fr)_minmax(320px,1fr)]">

                {/* DISCO DE VINILO */}
                <div className="relative mx-auto flex h-48 w-48 items-center justify-center md:h-52 md:w-52">

                    <div
                        className="relative h-full w-full rounded-full border-4 border-[#382142] shadow-[0_0_35px_rgba(236,72,153,0.2)] animate-[spin_3s_linear_infinite]"
                        style={{
                            animationPlayState: reproduciendo ? 'running' : 'paused',
                            background: `
                            repeating-radial-gradient(
                            circle,
                            #17101f 0px,
                            #17101f 3px,
                            #31223a 4px,
                            #17101f 6px
                            )
                        `,
                        }}
                    >
                        {/* Etiqueta central */}
                        <div className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                                <div className="h-3 w-3 rounded-full bg-[#120b1c]" />
                            </div>

                        </div>

                        {/* Reflejo */}
                        <div className="absolute left-9 top-5 h-12 w-3 -rotate-45 rounded-full bg-white/10 blur-sm" />
                    </div>

                    {/* Luz indicadora */}
                    <span
                        className={`absolute bottom-1 right-0 h-3 w-3 rounded-full ${reproduciendo
                            ? 'bg-green-400 shadow-[0_0_12px_#4ade80]'
                            : 'bg-gray-500'
                            }`}
                    />
                </div>

                {/* DATOS DE LA CANCIÓN */}
                <div className="text-center md:text-left">

                    <span className="rounded-md border border-pink-500/40 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
                        RETRO HIT · {cancion.anio}
                    </span>


                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <h3 className="text-2xl font-bold text-white md:text-3xl">
                            {cancion.titulo}
                        </h3>

                        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-400">
                            {cancion.artista}
                        </span>
                    </div>


                    <p className="mt-3 text-sm text-[#b8a9ca]">
                        {reproduciendo
                            ? '● Reproduciendo desde Spotify'
                            : '○ Reproducción detenida'}
                    </p>

                    <button
                        type="button"
                        onClick={alternarReproduccion}
                        disabled={!listo}
                        className="mt-6 rounded-full bg-pink-500 px-7 py-3 font-bold text-white transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {reproduciendo ? 'Ⅱ Pausar' : '▶ Reproducir'}
                    </button>

                </div>

                {/* REPRODUCTOR OFICIAL */}
                <div className="rounded-xl border border-white/10 bg-[#180f27] p-3">
                    {!listo && !error && (
                        <p className="mb-3 text-sm text-[#b8a9ca]">
                            Cargando reproductor...
                        </p>
                    )}

                    {error && (
                        <p className="mb-3 text-sm text-red-300" role="alert">
                            {error}
                        </p>
                    )}

                    <div ref={contenedorRef} className="min-h-[152px]" />

                    <p className="mt-4 text-xs text-[#a99ab9]">
                        Reproductor oficial de Spotify. La disponibilidad de audio
                        y los controles dependen de Spotify.
                    </p>

                </div>

            </div>


        </section>
    )
}
