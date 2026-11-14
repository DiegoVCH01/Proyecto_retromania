export default function SelectorDecada({ decada, onChange }) {
  return <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#24163b] p-4 my-8">
    <span className="text-sm text-[#b8b8d1]">Explora una década:</span>
    {['90s', '2000s'].map(valor => <button type="button" key={valor} aria-pressed={decada === valor} onClick={() => onChange(valor)} className={`rounded-lg border px-4 py-2 text-sm transition-colors ${decada === valor ? 'bg-[#ff4ac9] text-[#160e20] border-[#ff4ac9] font-semibold' : 'border-white/20 text-white hover:border-[#4ad0ff]'}`}>{valor === '90s' ? 'Años 90' : 'Años 2000'}</button>)}
  </div>
}
