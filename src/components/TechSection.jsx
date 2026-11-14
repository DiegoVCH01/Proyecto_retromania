const gadgets = [
  { 
    id: 1, 
    cat: 'CONSOLA PORTÁTIL', 
    name: 'Game Boy Pocket', 
    year: '1996 • 90s', 
    desc: 'Pantalla monocroma con sólo 2 pilas AAA. El compañero inseparable en esos viajes.' 
  },
  { 
    id: 2, 
    cat: 'AUDIO PORTÁTIL', 
    name: 'Sony Walkman Casete', 
    year: '1993 • 90s', 
    desc: 'Con Mega Bass y auto-reverse. Rebobinar cintas usándolo bolígrafo era ritual antes de que la batería se agotara.' 
  },
  { 
    id: 3, 
    cat: 'TELÉFONO MÓVIL', 
    name: 'Nokia 3210', 
    year: '1999 • 90s', 
    desc: 'Indestructible, con carcasas intercambiables y el mejor juego de la historia: Snake II.' 
  },
  { 
    id: 4, 
    cat: 'CONECTIVIDAD DIAL-UP', 
    name: 'Módem 56K Dial-Up', 
    year: '1997 • 90s', 
    desc: 'El sonido que conectaba al mundo: zumbidos, chirridos y esa espera infinita antes de ver una página web cargar.' 
  },
];

const TechSection = () => {
  return (
    <section className="mt-10">
      <div className="flex justify-between items-center border-t border-b border-[rgba(74,208,255,0.3)] py-2 px-3 mb-4 bg-[#24163b]/50">
        <span className="text-[#4ad0ff] text-xs uppercase tracking-wider">🔧 GADGETS & HARDWARE VINTAGE</span>
        <h2 className="text-lg font-bold">La tecnología de nuestros recuerdos</h2>
        <span></span>
      </div>
      
      <p className="text-sm text-[#b8b8d1] mb-4">Los aparatos que definieron nuestra forma de comunicarnos, escuchar música en movimiento y conectarnos por primera vez a la red.</p>
      
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-0.5 bg-[rgba(255,74,201,0.1)] border border-[rgba(255,74,201,0.3)] text-[#ff4ac9] text-xs">90s Tech</span>
        <span className="px-2 py-0.5 bg-[rgba(74,208,255,0.1)] border border-[rgba(74,208,255,0.3)] text-[#4ad0ff] text-xs">2000s Tech</span>
      </div>
      
      {gadgets.map(gadget => (
        <div key={gadget.id} className="bg-[#24163b] border-b border-white/8 p-3 mb-1 hover:bg-[#2b1b45] transition-colors">
          <span className="text-[#8888a3] text-xs uppercase tracking-wider">{gadget.cat}</span>
          <h3 className="font-bold text-white mt-1">{gadget.name}</h3>
          <p className="text-xs text-[#8888a3] mt-1">{gadget.year}</p>
          <p className="text-sm text-[#b8b8d1] mt-1">{gadget.desc}</p>
          <a href="#" className="text-[#4ad0ff] text-xs inline-block mt-1 text-right w-full hover:underline">Descubrir historia →</a>
        </div>
      ))}
    </section>
  );
};

export default TechSection;
