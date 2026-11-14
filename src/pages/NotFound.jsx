import { Link } from 'react-router-dom'
export default function NotFound() {return <section className="min-h-[55vh] flex flex-col items-center justify-center text-center gap-4"><h1 className="text-6xl font-bold text-[#ff4ac9]">404</h1><p>Esta página no existe en RetroManía.</p><Link to="/" className="btn-primary">Volver al inicio</Link></section>}
