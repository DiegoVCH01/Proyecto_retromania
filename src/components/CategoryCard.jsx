import { Link } from "react-router-dom";

export default function CategoryCard({
  titulo,
  descripcion,
  icono,
  ruta,
  color = "pink",
}) {
  const estilos = {
    pink: {
      borde: "hover:border-pink-500/60",
      icono: "bg-pink-500/10 text-pink-400",
      enlace: "text-pink-400",
    },
    blue: {
      borde: "hover:border-cyan-400/60",
      icono: "bg-cyan-400/10 text-cyan-400",
      enlace: "text-cyan-400",
    },
    yellow: {
      borde: "hover:border-yellow-400/60",
      icono: "bg-yellow-400/10 text-yellow-400",
      enlace: "text-yellow-400",
    },
    purple: {
      borde: "hover:border-purple-400/60",
      icono: "bg-purple-400/10 text-purple-400",
      enlace: "text-purple-400",
    },
  };

  const estilo = estilos[color] ?? estilos.pink;

  return (
    <Link
      to={ruta}
      className={`
        group flex h-full flex-col rounded-xl
        border border-white/10 bg-[#261831] p-6
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        ${estilo.borde}
      `}
    >
      <div
        className={`
          mb-5 flex h-14 w-14 items-center
          justify-center rounded-xl text-3xl
          ${estilo.icono}
        `}
      >
        {icono}
      </div>

      <h3 className="mb-3 text-xl font-bold text-white">{titulo}</h3>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-[#b8a9ca]">
        {descripcion}
      </p>

      <span
        className={`
          text-sm font-semibold transition-transform
          group-hover:translate-x-1
          ${estilo.enlace}
        `}
      >
        Explorar categoría →
      </span>
    </Link>
  );
}
