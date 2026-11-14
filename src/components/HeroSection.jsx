const HeroSection = () => {
  return (
    <header className="text-center py-16 md:py-24 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#ff4ac9]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4ad0ff]/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <span className="inline-block px-4 py-1.5 text-sm border border-[#ff4ac9]/40 text-[#ff4ac9] rounded-full mb-6">
          ✨ Reviviendo la magia de los 90 y 2000
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">RetroMania</span>
        </h1>
        <p className="text-lg md:text-xl text-[#9d92b8] max-w-2xl mx-auto mb-8">
          Un viaje nostálgico por los videojuegos, la música, el cine y la tecnología que definieron nuestra generación.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#decadas" className="btn-primary">
            🚀 Explorar épocas
          </a>
          <a href="#encuesta" className="btn-secondary">
            📋 Participar
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
