import SurveySection from '../components/SurveySection';
import ContactSection from '../components/ContactSection';
import MuroRecuerdos from '../components/MuroRecuerdos';
import SelectorDecada from '../components/ui/SelectorDecada';

export default function Comunidad({ decada, onChangeDecada }) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">

      {/* Hero Section */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="mb-6 rounded-full border border-yellow-500/30 px-4 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
          <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase">
            Sala Comunitaria en Vivo
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Comparte tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">nostalgia</span>
        </h1>

        <p className="text-[#b8a9ca] max-w-2xl text-sm md:text-base leading-relaxed">
          El punto de encuentro para amantes de los 90s y 2000s. Participa en la encuesta
          comunitaria, calcula tu nivel de nostalgia y envíanos tus anécdotas y fotos de tesoros retro.
        </p>
      </div>

      <SelectorDecada decada={decada} onChange={onChangeDecada} />

      {/* Grid unificador de los componentes separados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 mt-8">
        <SurveySection decadaGlobal={decada} />
        <ContactSection />
      </div>

      <MuroRecuerdos />

    </div>
  );
}