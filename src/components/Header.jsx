import { useEffect, useRef, useState } from 'react'
import Icon, { Split } from './Icon.jsx'
import { familias, contato } from '../data/maquinas.js'
import { scrollToTarget } from '../lib/motion.js'

const grupoB = [
  { label: 'Assistência e peças', href: '#por-que' },
  { label: 'Sobre', href: '#quem-somos' },
  { label: 'Contato', href: '#orcamento' },
]

export default function Header() {
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const megaRef = useRef(null)
  const btnRef = useRef(null)
  const closeTimer = useRef(null)

  // some ao rolar para baixo, volta ao rolar para cima
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 24)
      if (!mega && !mobile) setHidden(y > 160 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mega, mobile])

  // Esc fecha menus; clique fora fecha o mega menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (mega) btnRef.current?.focus()
        setMega(false)
        setMobile(false)
      }
    }
    const onClick = (e) => {
      if (mega && !megaRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) setMega(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [mega])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const go = (href) => (e) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      setMega(false)
      setMobile(false)
      scrollToTarget(href)
      history.replaceState(null, '', href)
    }
  }
  const openSoon = () => { clearTimeout(closeTimer.current); setMega(true) }
  const closeSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMega(false), 180) }

  return (
    <header className={`hdr${hidden ? ' is-hidden' : ''}${solid || mega ? ' is-solid' : ''}`}>
      <div className="wrap hdr-bar">
        <a className="hdr-brand" href="#topo" onClick={go('#topo')} aria-label="H-Zen, voltar ao início">
          <img src="./img/marca/hzen-logo.svg" alt="" width="110" height="35" />
        </a>

        <nav className="hdr-nav" aria-label="Principal">
          <div className="chips" onMouseLeave={closeSoon}>
            <button
              ref={btnRef}
              className="chip"
              aria-expanded={mega}
              aria-controls="mega"
              onClick={() => setMega((v) => !v)}
              onMouseEnter={openSoon}
            >
              Máquinas <Icon name="chevron" />
            </button>
            <a className="chip" href="#plantas" onClick={go('#plantas')} onMouseEnter={closeSoon}>Plantas completas</a>
          </div>
          <div className="chips">
            {grupoB.map((l) => (
              <a key={l.label} className="chip" href={l.href} onClick={go(l.href)}>{l.label}</a>
            ))}
          </div>
        </nav>

        <div className="hdr-actions">
          <a className="chip hdr-wa" href={`https://wa.me/${contato.whatsapp}?text=${encodeURIComponent('Olá, H-Zen. Vim pelo site e quero falar com a engenharia comercial.')}`} target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp">
            <Icon name="whatsapp" /> <span className="hdr-wa-t">WhatsApp</span>
          </a>
          <Split href="#orcamento" small onClick={go('#orcamento')}>Orçamento</Split>
          <a className="chip is-on hdr-orc-m" href="#orcamento" onClick={go('#orcamento')}>Orçamento</a>
          <button className="chip hdr-menu" aria-label={mobile ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobile} aria-controls="menu-mobile" onClick={() => setMobile((v) => !v)}>
            <span className="hdr-menu-t">{mobile ? 'Fechar' : 'Menu'}</span> <Icon name={mobile ? 'fechar' : 'menu'} />
          </button>
        </div>
      </div>

      <div
        id="mega"
        ref={megaRef}
        className={`mega${mega ? ' is-open' : ''}`}
        onMouseEnter={openSoon}
        onMouseLeave={closeSoon}
        hidden={!mega}
      >
        <div className="wrap mega-in">
          <ul className="mega-list">
            {familias.slice(0, 5).map((f) => (
              <li key={f.id}>
                <a href="#linha" onClick={go('#linha')} className="mega-item">
                  <span className={`mega-img${f.fotoPagina ? ' has-foto' : ''}`}><img src={f.fotoPagina || f.img} alt="" loading="lazy" /></span>
                  <span className="mega-name">{f.nome}</span>
                  <span className="mega-fact">{f.curto}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="mega-feature on-ink" href="#lancamento" onClick={go('#lancamento')}>
            <span className="mega-feature-tag">Lançamento</span>
            <span className="mega-feature-name">HZ-1300Ss</span>
            <span className="mega-feature-fact">6,8 t de força vibratória, 19.200 blocos por dia</span>
            <img src="./img/fotos/hz-1300ss-recorte.webp" alt="" loading="lazy" />
          </a>
        </div>
      </div>

      <div id="menu-mobile" className={`mob${mobile ? ' is-open' : ''}`} hidden={!mobile}>
        <div className="wrap mob-in">
          <ul className="mob-main">
            <li><a href="#linha" onClick={go('#linha')}>Máquinas</a></li>
            <li><a href="#plantas" onClick={go('#plantas')}>Plantas completas</a></li>
            {grupoB.map((l) => (
              <li key={l.label}><a href={l.href} onClick={go(l.href)}>{l.label}</a></li>
            ))}
          </ul>
          <ul className="mob-fam">
            {familias.slice(0, 5).map((f) => (
              <li key={f.id}><a className="chip" href="#linha" onClick={go('#linha')}>{f.nome}</a></li>
            ))}
          </ul>
          <Split href="#orcamento" block onClick={go('#orcamento')}>Solicitar orçamento</Split>
        </div>
      </div>
    </header>
  )
}
