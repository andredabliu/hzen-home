import { useEffect, useRef, useState } from 'react'
import { Split } from './Icon.jsx'
import { gsap, ScrollTrigger, reduceMotion, scrollToTarget } from '../lib/motion.js'
import { formatar } from '../data/maquinas.js'

const TOTAL = 120 // quadros do giro 360° da HZ-1000 PRO (vídeo do site atual, 15 fps)
const frameSrc = (i) => `./img/giro/f${String(i + 1).padStart(3, '0')}.webp`
const BLOCOS_POR_SEGUNDO = 19200 / (8 * 3600) // HZ-1300Ss, bloco 9×19×39, 8 h

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [blocos, setBlocos] = useState(0)

  // contador ao vivo: blocos que uma HZ-1300Ss produziria desde que a página abriu
  useEffect(() => {
    const t0 = performance.now()
    const id = setInterval(() => setBlocos(Math.floor(((performance.now() - t0) / 1000) * BLOCOS_POR_SEGUNDO)), 500)
    return () => clearInterval(id)
  }, [])

  // giro controlado pelo scroll, desenhado em canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imgs = new Array(TOTAL)
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#E6E4E0'
    let current = 0

    const draw = (i) => {
      const img = imgs[i]
      if (!img || !img.complete || !img.naturalWidth) return
      const { width: w, height: h } = canvas
      // fundo do render (branco) multiplicado sobre a cor do concreto: some na página
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'multiply'
      const s = Math.min(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * s
      const dh = img.naturalHeight * s
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(r.width * dpr)
      canvas.height = Math.round(r.height * dpr)
      draw(current)
    }
    const load = (i) => {
      if (imgs[i]) return imgs[i]
      const im = new Image()
      im.decoding = 'async'
      im.src = frameSrc(i)
      im.onload = () => { if (i === current) draw(i) }
      imgs[i] = im
      return im
    }

    load(0)
    resize()
    window.addEventListener('resize', resize)

    if (reduceMotion()) {
      return () => window.removeEventListener('resize', resize)
    }

    // carrega o resto depois da primeira pintura
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300))
    idle(() => { for (let i = 1; i < TOTAL; i++) load(i) })

    const mm = gsap.matchMedia()
    mm.add({ wide: '(min-width: 900px)', narrow: '(max-width: 899px)' }, (c) => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: c.conditions.wide ? '+=100%' : '+=70%',
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const i = Math.min(TOTAL - 1, Math.round(self.progress * (TOTAL - 1)))
          if (i !== current) { current = i; if (!imgs[i]) load(i); draw(i) }
        },
      })
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: c.conditions.wide ? '+=100%' : '+=70%', scrub: 0.6 } })
      tl.to(leftRef.current, { xPercent: -10, ease: 'none' }, 0).to(rightRef.current, { xPercent: 10, ease: 'none' }, 0)
      return () => { st.kill(); tl.kill() }
    })

    return () => {
      window.removeEventListener('resize', resize)
      mm.revert()
    }
  }, [])

  return (
    <section id="topo" className="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="wrap hero-in">
        <h1 id="hero-title" className="hero-stage">
          <span className="hero-word is-left" ref={leftRef}>Blocos</span>
          <span className="sr-only"> e </span>
          <span className="hero-machine">
            <canvas ref={canvasRef} role="img" aria-label="Vibroprensa HZ-1000 PRO girando com o scroll" />
          </span>
          <span className="hero-word is-right" ref={rightRef}>pavers</span>
          <span className="sr-only"> de concreto: vibroprensas H-Zen</span>
        </h1>

        <div className="hero-foot">
          <div className="hero-copy" data-reveal>
            <p className="t-lead">Vibroprensas e plantas completas<br />para artefatos de concreto</p>
            <p className="muted hero-p">Fabricação própria em Brusque (SC), do projeto da planta à assistência técnica.</p>
            <div className="btn-row">
              <Split href="#orcamento" onClick={(e) => { e.preventDefault(); scrollToTarget('#orcamento') }}>Solicitar orçamento</Split>
              <Split href="#linha" variant="line" onClick={(e) => { e.preventDefault(); scrollToTarget('#linha') }}>Ver as máquinas</Split>
            </div>
          </div>
          <p className="hero-counter" aria-live="off">
            <span className="hero-counter-n num">{formatar(blocos)}</span>
            <span className="hero-counter-t">blocos 9 × 19 × 39 que uma HZ-1300Ss teria produzido desde que você abriu esta página</span>
          </p>
        </div>
      </div>
    </section>
  )
}
