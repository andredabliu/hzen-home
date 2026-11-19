import { useEffect, useRef, useState } from 'react'
import Icon, { Split } from './Icon.jsx'

/** Foto padronizada (Magnific) quando existe; senão o recorte do catálogo.
 *  Telas grandes: quadro vertical 4:5 (foto -v). Celular: foto larga 16:9, inteira. */
function Shot({ item, className = '', alt = '' }) {
  if (item.foto) {
    return (
      <picture className="shot">
        {item.fotoLarga && <source media="(max-width: 899px)" srcSet={item.fotoLarga} />}
        <img src={item.foto} alt={alt} className={`${className} is-foto`} loading="lazy" />
      </picture>
    )
  }
  return <img src={item.img} alt={alt} className={className} loading="lazy" />
}
import { familias, etapas, vibroprensas } from '../data/maquinas.js'
import { scrollToTarget, gsap, reduceMotion } from '../lib/motion.js'

const goTo = (href) => (e) => { e.preventDefault(); scrollToTarget(href) }

/* ---------- Quem somos ---------- */
export function QuemSomos() {
  const numeros = [
    { n: '3.000 m²', t: 'de área construída em Brusque, em expansão' },
    { n: '6', t: 'modelos de vibroprensa, da HZ-3.2 à HZ-1300Ss' },
    { n: '12', t: 'estados com máquinas H-Zen operando' },
    { n: 'NR-10', t: 'em todos os painéis elétricos' },
  ]
  return (
    <section id="quem-somos" className="section quem" aria-labelledby="quem-title">
      <div className="wrap quem-grid">
        <div className="quem-text" data-reveal>
          <h2 id="quem-title" className="t-head two-tone">
            <span className="tt-a">Fabricadas em</span>
            <span className="tt-b">Brusque, SC</span>
          </h2>
          <p className="t-lead quem-lead">A H-Zen desenvolve e fabrica vibroprensas, misturadores, centrais dosadoras e automações para fábricas de blocos, pavers e artefatos de concreto.</p>
          <p className="muted measure">Engenharia própria, componentes de marcas reconhecidas e atendimento de quem conhece o chão de fábrica. Cada equipamento é indicado depois de uma análise técnica do seu processo.</p>
        </div>
        <figure className="quem-photo" data-reveal>
          <img src="./img/patio-fabrica.webp" alt="Vibroprensa H-Zen no pátio, com paletes de blocos de concreto" loading="lazy" width="1024" height="683" />
        </figure>
        <ul className="quem-nums" data-reveal>
          {numeros.map((x) => (
            <li key={x.n}>
              <span className="quem-n num">{x.n}</span>
              <span className="quem-t">{x.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Lançamento HZ-1300Ss: máquina no centro, ambientada, palavras nas laterais ---------- */
function useLancMotion(ref) {
  useEffect(() => {
    if (reduceMotion()) return
    const root = ref.current
    const ctx = gsap.context(() => {
      const st = { trigger: root.querySelector('.lanc-stage'), start: 'top 85%', end: 'top 25%', scrub: 0.6 }
      // no celular as palavras ficam empilhadas: deslocamento menor para não sair do palco
      const d = window.matchMedia('(max-width: 899px)').matches ? 12 : 40
      gsap.from(root.querySelector('.lanc-w.is-l'), { xPercent: -d, opacity: 0, ease: 'none', scrollTrigger: st })
      gsap.from(root.querySelector('.lanc-w.is-r'), { xPercent: d, opacity: 0, ease: 'none', scrollTrigger: st })
      gsap.from(root.querySelector('.lanc-photo'), { scale: 1.12, ease: 'none', scrollTrigger: st })
      // números da ficha contam até o valor quando a ficha entra na tela
      root.querySelectorAll('[data-count]').forEach((el) => {
        const alvo = Number(el.dataset.count)
        const dec = Number(el.dataset.dec || 0)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: alvo, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = obj.v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [ref])
}

export function Lancamento() {
  const ref = useRef(null)
  useLancMotion(ref)
  const m = vibroprensas.find((v) => v.id === 'hz-1300ss')
  const N = ({ v, dec = 0 }) => (
    <span data-count={v} data-dec={dec}>{v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec })}</span>
  )
  const ficha = [
    ['Força vibratória', <><N v={6.8} dec={1} /> t</>],
    ['Vibração da mesa', <><N v={4} /> servomotores</>],
    ['Bandeja', m.bandeja],
    ['Tempo de ciclo', m.ciclo],
    ['Potência', <><N v={40} /> kW</>],
    ['Bloco 9 × 19 × 39', <><N v={19200} /> por dia*</>],
    ['Paver 10 × 20', <><N v={1200} /> m² por dia*</>],
    ['Painel', 'CLP e IHM touch, NR-10'],
  ]
  const detalhes = [
    { img: './img/produtos/detalhe-gaveta.webp', t: 'Gaveta alimentadora' },
    { img: './img/produtos/detalhe-ihm.webp', t: 'IHM touch com receitas' },
    { img: './img/produtos/detalhe-molde.webp', t: 'Molde e contramolde' },
  ]
  return (
    <section id="lancamento" className="section lanc" aria-labelledby="lanc-title" ref={ref}>
      <div className="wrap">
        <div className="lanc-stage has-photo">
          <h2 id="lanc-title" className="lanc-title">
            <span className="lanc-w is-l">Lançamento</span>
            <span className="sr-only">: </span>
            <span className="lanc-w is-r">HZ-1300Ss</span>
          </h2>
          <img className="lanc-photo" src="./img/fotos/hz-1300ss-palco.webp" alt="Vibroprensa HZ-1300Ss em estúdio" loading="lazy" width="2400" height="1340" />
        </div>
        <div className="lanc-body">
          <div className="lanc-copy" data-reveal>
            <p className="t-lead">A mais produtiva da linha. Vibração na mesa por quatro servomotores independentes, com amplitude e frequência controladas pela IHM.</p>
            <p className="muted">A sincronização eletrônica de tecnologia alemã distribui a força por todo o molde, e réguas magnéticas controlam a altura de cada peça.</p>
            <div className="btn-row">
              <Split href="#orcamento" onClick={goTo('#orcamento')}>Orçamento da HZ-1300Ss</Split>
              <Split href="#calculadora" variant="line" onClick={goTo('#calculadora')}>Comparar produção</Split>
            </div>
          </div>
          <dl className="ficha" data-reveal>
            {ficha.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd className="num">{v}</dd></div>
            ))}
          </dl>
        </div>
        <p className="t-small muted lanc-nota">*Produção diária em 8 horas, sem paradas para limpeza ou manutenção.</p>
        <div className="lanc-det" data-reveal>
          {detalhes.map((d) => (
            <figure key={d.t}>
              <div><img src={d.img} alt={d.t} loading="lazy" /></div>
              <figcaption className="t-small">{d.t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function LinhaItem({ f, i, ativo, setAtivo }) {
  return (
    <li className={`linha-item${ativo === i ? ' is-on' : ''}`}>
      <a href="#orcamento" onMouseEnter={() => setAtivo(i)} onFocus={() => setAtivo(i)} onClick={goTo('#orcamento')}>
        <span className="linha-hd">
          <span className="circle"><Icon name={f.icone} /></span>
          <span className="t-lead">{f.nome}</span>
        </span>
        <span className="linha-bd">
          <span className="t-small muted">Família</span>
          <span>{f.texto}</span>
        </span>
        <span className={`linha-img-m${f.foto ? ' has-foto' : ''}`}><Shot item={f} /></span>
      </a>
    </li>
  )
}

/* ---------- Linha de produtos: listas nas laterais, máquina presa no centro ---------- */
export function Linha() {
  const [ativo, setAtivo] = useState(0)
  const esquerda = familias.slice(0, 3)
  const direita = familias.slice(3)
  return (
    <section id="linha" className="section linha" aria-labelledby="linha-title">
      <div className="wrap">
        <div className="linha-head" data-reveal>
          <h2 id="linha-title" className="t-head two-tone">
            <span className="tt-a">Uma linha para</span>
            <span className="tt-b">a fábrica inteira</span>
          </h2>
          <p className="muted measure">Cada família resolve uma etapa da produção.<span className="so-hover"> Passe o mouse para ver a máquina.</span></p>
        </div>
        <div className="linha-grid">
          <ul className="linha-col" data-reveal>{esquerda.map((f, i) => <LinhaItem key={f.id} f={f} i={i} ativo={ativo} setAtivo={setAtivo} />)}</ul>
          <div className="linha-stage" aria-hidden="true">
            {familias.map((f, i) => (
              <Shot key={f.id} item={f} className={ativo === i ? 'is-on' : ''} />
            ))}
            <span className="linha-stage-name t-small">{familias[ativo].nome}</span>
          </div>
          <ul className="linha-col" data-reveal>{direita.map((f, i) => <LinhaItem key={f.id} f={f} i={i + 3} ativo={ativo} setAtivo={setAtivo} />)}</ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- A planta: etapas numeradas, imagem presa ao lado ---------- */
export function Planta() {
  const [ativo, setAtivo] = useState(0)
  const ref = useRef(null)
  // a etapa que passa pelo meio da tela vira a ativa
  useEffect(() => {
    const steps = ref.current.querySelectorAll('[data-step]')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setAtivo(Number(e.target.dataset.step)) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    steps.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return (
    <section id="planta" className="section planta" aria-labelledby="planta-title" ref={ref}>
      <div className="wrap planta-grid">
        <div className="planta-side">
          <div className="planta-sticky">
            <h2 id="planta-title" className="t-head">Da areia ao palete</h2>
            <p className="muted planta-intro">Uma fábrica de artefatos é uma sequência. A H-Zen fabrica a máquina de cada etapa e faz elas conversarem.</p>
            <div className="planta-stage" aria-hidden="true">
              {etapas.map((e, i) => (
                <Shot key={e.id} item={e} className={ativo === i ? 'is-on' : ''} />
              ))}
              <span className="t-small planta-stage-name">{etapas[ativo].maquina}</span>
            </div>
          </div>
        </div>
        <ol className="planta-steps">
          {etapas.map((e, i) => (
            <li key={e.id} className={ativo === i ? 'is-on' : ''} data-step={i}>
              <span className="planta-n circle num">{i + 1}</span>
              <div>
                <h3 className="t-head planta-verb">{e.verbo}</h3>
                <p className="t-lead">{e.texto}</p>
                <p className="t-small muted">{e.maquina}</p>
                <Shot item={e} className="planta-img-m" alt={e.maquina} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Plantas completas ---------- */
export function Projetos() {
  const cards = [
    { img: './img/projetos/planta-044.webp', t: 'Planta completa', d: 'Dosagem, mistura, prensagem e paletização no mesmo projeto.', c: 'is-big' },
    { img: './img/projetos/finger-car-planta.webp', t: 'Câmaras de cura', d: 'Finger Car e elevadores levando as bandejas até a cura.' },
    { img: './img/projetos/planta-046.webp', t: 'Linha de paletização', d: 'Bandejas descarregadas, artefatos organizados e palete montado.' },
  ]
  return (
    <section id="plantas" className="section proj" aria-labelledby="proj-title">
      <div className="wrap">
        <div className="proj-head" data-reveal>
          <h2 id="proj-title" className="t-head">Plantas completas, do layout à partida</h2>
          <div className="proj-head-r">
            <p className="muted">Projetamos a planta junto com você: o espaço, o fluxo de material e a automação de cada etapa.</p>
            <Split href="#orcamento" variant="dark" onClick={goTo('#orcamento')}>Fale com a engenharia</Split>
          </div>
        </div>
        <div className="proj-grid" data-reveal>
          {cards.map((c) => (
            <a key={c.t} className={`qcard ${c.c || ''}`} href="#orcamento" onClick={goTo('#orcamento')}>
              <img src={c.img} alt={`Render de projeto H-Zen: ${c.t.toLowerCase()}`} loading="lazy" />
              <span className="qcard-t">{c.t}</span>
              <span className="qcard-d">{c.d}</span>
              <span className="qcard-a circle" aria-hidden="true"><Icon name="seta" /></span>
            </a>
          ))}
        </div>
        <div className="only-narrow">
          <Split href="#orcamento" variant="dark" onClick={goTo('#orcamento')}>Fale com a engenharia</Split>
        </div>
      </div>
    </section>
  )
}

/* ---------- Por que a H-Zen ---------- */
export function PorQue() {
  const itens = [
    ['Venda consultiva', 'Antes', 'Análise técnica do processo e da viabilidade antes de indicar a máquina.'],
    ['Engenharia própria', 'Projeto', 'Máquinas e plantas desenhadas e fabricadas em Brusque, com automação e engenharia de precisão.'],
    ['Assistência e peças', 'Depois', 'Assistência técnica responsiva e fornecimento rápido de peças, porque máquina parada é prejuízo.'],
    ['Presença nacional', 'Onde', 'Equipamentos operando em 12 estados, de norte a sul do país.'],
  ]
  return (
    <section id="por-que" className="section porque" aria-labelledby="porque-title">
      <div className="wrap">
        <div className="porque-panel on-ink">
          <h2 id="porque-title" className="t-display two-tone porque-title" data-reveal>
            <span className="tt-a">Por que</span>
            <span className="tt-b">a H-Zen</span>
          </h2>
          <ul className="porque-list" data-reveal>
            {itens.map(([t, k, d]) => (
              <li key={t}>
                <span className="t-lead">{t}</span>
                <span className="porque-bd"><span className="t-small muted">{k}</span><span>{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- Perguntas ---------- */
export function Faq() {
  const qs = [
    ['A H-Zen instala a máquina e treina a equipe?', 'A instalação, a orientação técnica na aplicação e o acompanhamento fazem parte do atendimento H-Zen. O escopo de cada projeto vai detalhado no orçamento.'],
    ['Tem peça de reposição?', 'Sim. Mantemos fornecimento rápido de peças de reposição e assistência técnica para reduzir o tempo de máquina parada.'],
    ['Vocês atendem fora de Santa Catarina?', 'Sim. Temos equipamentos operando em 12 estados, de norte a sul do país.'],
    ['Posso começar com uma máquina e ampliar depois?', 'Sim. As centrais têm capacidade personalizável e as vibroprensas se integram a elevadores e automações quando a fábrica cresce.'],
    ['As máquinas atendem à NR-10?', 'Sim. Os painéis elétricos são projetados conforme a NR-10, e o modo manual opera em velocidade reduzida para setup e troca de molde.'],
    ['Qual o prazo de entrega?', 'Depende do modelo e da configuração. O prazo vai informado no orçamento.'],
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="perguntas" className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-side" data-reveal>
          <h2 id="faq-title" className="t-head">Perguntas de quem vai investir</h2>
          <p className="muted">Não achou a sua? A engenharia comercial responde pelo WhatsApp.</p>
          <Split href="#orcamento" variant="dark" onClick={goTo('#orcamento')}>Perguntar à engenharia</Split>
        </div>
        <ul className="faq-list">
          {qs.map(([q, a], i) => (
            <li key={q} className={open === i ? 'is-open' : ''}>
              <h3>
                <button aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="t-lead">{q}</span>
                  <span className="circle"><Icon name={open === i ? 'menos' : 'mais'} /></span>
                </button>
              </h3>
              <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a" hidden={open !== i}>
                <p>{a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
