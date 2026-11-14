import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Videojuegos from './pages/Videojuegos'
import Musica from './pages/Musica'
import Cultura from './pages/Cultura'
import Comunidad from './pages/Comunidad'
import NotFound from './pages/NotFound'

function App() {
  const [decada, setDecada] = useState('90s')
  return <BrowserRouter>
    <div className="min-h-screen bg-[#1a0f2e] text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home decada={decada} onChangeDecada={setDecada}/>} />
          <Route path="/videojuegos" element={<Videojuegos />} />
          <Route path="/musica" element={<Musica decada={decada} onChangeDecada={setDecada} />} />
          <Route path="/cultura" element={<Cultura decada={decada}  />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
}
export default App
