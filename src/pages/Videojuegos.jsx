import GamesSection from '../components/GamesSection';
import SelectorDecada from '../components/ui/SelectorDecada';

export default function Videojuegos({ decada, onChangeDecada }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Encabezado y Badges RAWG */}
      <div className="bg-[#24163b]/50 border border-white/10 rounded-2xl p-6 mb-8 mt-2">

        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Videojuegos <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Legendarios</span>
        </h2>
        <p className="text-sm text-[#b8a9ca]">
          Descubre, busca y revive los mejores videojuegos de la historia. Navega por décadas de historia, descubre joyas inolvidables y explora los títulos que definieron generaciones.
        </p>
      </div>


      {/* Selector Global */}
      <div className="mb-8">
        <SelectorDecada decada={decada} onChange={onChangeDecada} />
      </div>
      
      {/* Pasamos la década global a la sección para que RAWG la use */}
      <GamesSection decada={decada} />
    </div>
  );
}