import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Calculadora from './components/Calculadora.jsx'
import { QuemSomos, Lancamento, Linha, Planta, Projetos, PorQue, Faq } from './components/Sections.jsx'
import { Orcamento, Footer, WhatsAppFloat } from './components/Orcamento.jsx'
import { startReveals, ScrollTrigger } from './lib/motion.js'

export default function App() {
  const [preset, setPreset] = useState(null)

  useEffect(() => {
    const stop = startReveals()
    // recalcula as posições quando as imagens terminam de carregar
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { stop(); window.removeEventListener('load', refresh) }
  }, [])

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <QuemSomos />
        <Lancamento />
        <Linha />
        <Calculadora onEscolha={setPreset} />
        <Planta />
        <Projetos />
        <PorQue />
        <Faq />
        <Orcamento preset={preset} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
