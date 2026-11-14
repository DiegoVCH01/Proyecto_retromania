
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-retro.jpg'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-pink-500/20 bg-[#241630] px-6 py-12 shadow-xl md:px-10 lg:py-16">

      {/* Efectos de fondo */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

        {/* Contenido del Hero */}
        <div className="text-center lg:text-left">

          <span className="mb-6 inline-block rounded-full border border-yellow-500/50 px-4 py-2 text-xs font-semibold tracking-widest text-yellow-400">
            ✦ CÁPSULA DEL TIEMPO DIGITAL
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            ¿Listo para viajar
            <span className="block bg-gradient-to-r from-pink-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              en el tiempo?
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-[#c9bdd7] lg:mx-0">
            Rebobina la cinta y enciende el módem dial-up.
            Redescubre la magia de los videojuegos de 16 y 128 bits,
            las cintas VHS, el grunge, el auge del eurodance,
            el primer MP3 y las tardes en MSN Messenger.
          </p>

          {/* Botones */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

            <a
              href="#decadas"
              className="rounded-lg bg-pink-500 px-6 py-3 text-center font-semibold text-[#1a0f2e] transition hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-500/25"
            >
              🎮 Explorar recuerdos
            </a>

            <Link
              to="/comunidad"
              className="rounded-lg border border-cyan-400 px-6 py-3 text-center font-semibold text-cyan-400 transition hover:bg-cyan-400/10"
            >
              ♧ Conoce la comunidad
            </Link>

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-white/10 pt-5 text-xs text-[#a99ab9] lg:justify-start">
            <span>▣ Monitor CRT 4:3</span>
            <span>▣ Cartuchos & Discos</span>
            <span>⌁ Conexión 56k</span>
          </div>

        </div>

        {/* Imagen del Hero */}
        <div className="mx-auto w-full max-w-lg">
          <div className="rounded-xl border border-pink-500/40 bg-[#2b1c3b] p-3 shadow-lg shadow-pink-500/10">

            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />

              <span className="ml-auto text-[10px] text-[#b8a9ca]">
                AV-1 · 64bit STEREO
              </span>
            </div>

            <img
              src={heroImg}
              alt="Ambiente retro con luces de neón"
              className="aspect-[4/3] w-full rounded-lg object-cover object-[50%_48%]"
            />

            <div className="mt-3 flex justify-between text-[10px] text-[#b8a9ca]">
              <span>POWER · RESET</span>
              <span>VOL 84%</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
