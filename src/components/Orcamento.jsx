import { useEffect, useState } from 'react'
import Icon, { Split } from './Icon.jsx'
import { contato, familias } from '../data/maquinas.js'
import { scrollToTarget } from '../lib/motion.js'

const vazio = { nome: '', empresa: '', cidade: '', whatsapp: '', email: '', interesse: 'Vibroprensas', producao: '', mensagem: '' }
const digitos = (s) => s.replace(/\D/g, '')

// Campo com rótulo e erro. Fica fora do componente para o input não perder o foco a cada tecla.
function F({ id, label, children, erro }) {
  return (
    <div className={`field${erro ? ' has-error' : ''}`}>
      <label htmlFor={`orc-${id}`}>{label}</label>
      {children}
      {erro && <span className="error" id={`orc-${id}-err`}>{erro}</span>}
    </div>
  )
}

/**
 * Formulário de orçamento. Sem backend nesta versão: monta a mensagem e abre o WhatsApp comercial.
 * Para ligar ao CRM, troque o corpo de enviar() por um POST ao endpoint e mantenha a validação.
 */
export function Orcamento({ preset }) {
  const [v, setV] = useState(vazio)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(null)

  useEffect(() => {
    if (preset) setV((x) => ({ ...x, ...preset }))
  }, [preset])

  const set = (k) => (e) => {
    setV((x) => ({ ...x, [k]: e.target.value }))
    if (erros[k]) setErros((x) => ({ ...x, [k]: undefined }))
  }

  const validar = () => {
    const e = {}
    if (!v.nome.trim()) e.nome = 'Escreva seu nome.'
    if (!v.cidade.trim()) e.cidade = 'Escreva a cidade e o estado da fábrica.'
    const d = digitos(v.whatsapp)
    if (d.length < 10 || d.length > 11) e.whatsapp = 'Use DDD e número, como 47 99999-0000.'
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Confira o e-mail, como nome@empresa.com.br.'
    return e
  }

  const enviar = (ev) => {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length) {
      document.getElementById(`orc-${Object.keys(e)[0]}`)?.focus()
      return
    }
    const linhas = [
      'Olá, H-Zen. Quero um orçamento.',
      `Nome: ${v.nome}`,
      v.empresa && `Empresa: ${v.empresa}`,
      `Cidade: ${v.cidade}`,
      `WhatsApp: ${v.whatsapp}`,
      v.email && `E-mail: ${v.email}`,
      `Interesse: ${v.interesse}`,
      v.producao && `Produção desejada: ${v.producao}`,
      v.mensagem && `Mensagem: ${v.mensagem}`,
    ].filter(Boolean)
    const url = `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(linhas.join('\n'))}`
    window.open(url, '_blank', 'noopener')
    setEnviado(url)
  }

  const a11y = (id) => ({ id: `orc-${id}`, 'aria-invalid': erros[id] ? 'true' : undefined, 'aria-describedby': erros[id] ? `orc-${id}-err` : undefined })

  return (
    <section id="orcamento" className="section orc" aria-labelledby="orc-title">
      <div className="wrap orc-grid">
        <div className="orc-side">
          <h2 id="orc-title" className="t-head" data-reveal><span>Conte sua meta de produção</span></h2>
          <p className="muted orc-intro">Responda em um minuto. A engenharia comercial retorna pelo WhatsApp ou por e-mail.</p>
          <ul className="orc-canais" aria-label="Fale direto com a H-Zen">
            <li><span className="t-small muted">WhatsApp</span><a href={`https://wa.me/${contato.whatsapp}`} target="_blank" rel="noopener">{contato.whatsappTexto}</a></li>
            <li><span className="t-small muted">Telefone</span><a href={`tel:${contato.telefoneLink}`}>{contato.telefone}</a></li>
            <li><span className="t-small muted">E-mail</span><a href={`mailto:${contato.email}`}>{contato.email}</a></li>
            <li><span className="t-small muted">Fábrica</span><a href={contato.mapa} target="_blank" rel="noopener">{contato.endereco[0]}, {contato.endereco[1]}</a></li>
          </ul>
        </div>

        <div className="orc-panel">
          {enviado ? (
            <div className="orc-ok" role="status">
              <p className="t-head">Mensagem pronta</p>
              <p>Abrimos o WhatsApp com o seu pedido. Se ele não abriu, use o botão abaixo ou ligue para <a href={`tel:${contato.telefoneLink}`}>{contato.telefone}</a>.</p>
              <div className="btn-row">
                <Split href={enviado} target="_blank" rel="noopener" icon="whatsapp">Abrir o WhatsApp</Split>
                <button className="chip" onClick={() => { setEnviado(null); setV(vazio) }}>Novo pedido</button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={enviar} className="orc-form">
              <div className="field-row">
                <F id="nome" erro={erros.nome} label="Nome"><input {...a11y('nome')} autoComplete="name" value={v.nome} onChange={set('nome')} /></F>
                <F id="empresa" erro={erros.empresa} label="Empresa"><input {...a11y('empresa')} autoComplete="organization" value={v.empresa} onChange={set('empresa')} /></F>
              </div>
              <div className="field-row">
                <F id="cidade" erro={erros.cidade} label="Cidade e estado"><input {...a11y('cidade')} placeholder="Brusque, SC" autoComplete="address-level2" value={v.cidade} onChange={set('cidade')} /></F>
                <F id="whatsapp" erro={erros.whatsapp} label="WhatsApp"><input {...a11y('whatsapp')} type="tel" inputMode="tel" placeholder="47 99999-0000" autoComplete="tel" value={v.whatsapp} onChange={set('whatsapp')} /></F>
              </div>
              <div className="field-row">
                <F id="email" erro={erros.email} label="E-mail (opcional)"><input {...a11y('email')} type="email" placeholder="nome@empresa.com.br" autoComplete="email" value={v.email} onChange={set('email')} /></F>
                <F id="interesse" erro={erros.interesse} label="Interesse">
                  <select {...a11y('interesse')} value={v.interesse} onChange={set('interesse')}>
                    {familias.map((f) => <option key={f.id}>{f.nome}</option>)}
                    <option>Assistência e peças</option>
                  </select>
                </F>
              </div>
              <F id="producao" erro={erros.producao} label="Produção desejada (opcional)">
                <input {...a11y('producao')} placeholder="150.000 blocos 14 × 19 × 39 por mês" value={v.producao} onChange={set('producao')} />
              </F>
              <F id="mensagem" erro={erros.mensagem} label="Mensagem (opcional)">
                <textarea {...a11y('mensagem')} value={v.mensagem} onChange={set('mensagem')} />
              </F>
              <div className="orc-actions">
                <Split type="submit" icon="whatsapp">Enviar pelo WhatsApp</Split>
                <p className="t-small muted">Ou ligue {contato.telefone} · {contato.email}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const [mail, setMail] = useState('')
  const [ok, setOk] = useState(null)
  const go = (href) => (e) => { e.preventDefault(); scrollToTarget(href) }
  const assinar = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { setOk('erro'); return }
    // [programador] ligar ao e-mail marketing. Por enquanto abre o e-mail comercial pedindo o catálogo.
    window.location.href = `mailto:${contato.email}?subject=${encodeURIComponent('Quero receber o catálogo H-Zen')}&body=${encodeURIComponent(`Meu e-mail: ${mail}`)}`
    setOk('ok')
  }
  return (
    <footer className="ftr" aria-labelledby="ftr-title">
      <div className="wrap">
        <div className="ftr-top">
          <a className="circle" href="#topo" onClick={go('#topo')} aria-label="Voltar ao topo"><Icon name="cima" /></a>
          <form className="ftr-news" onSubmit={assinar} noValidate>
            <label htmlFor="news" className="t-lead">Receba o catálogo completo</label>
            <div className={`uline${ok === 'erro' ? ' has-error' : ''}`}>
              <input id="news" type="email" placeholder="nome@empresa.com.br" value={mail} onChange={(e) => { setMail(e.target.value); setOk(null) }}
                aria-describedby={ok ? 'news-msg' : undefined} aria-invalid={ok === 'erro' ? 'true' : undefined} />
              <button className="chip" type="submit">Enviar</button>
            </div>
            {ok && <p id="news-msg" className="t-small" role="status">{ok === 'erro' ? 'Confira o e-mail, como nome@empresa.com.br.' : 'Pronto. Abrimos seu e-mail com o pedido do catálogo.'}</p>}
          </form>
          <nav className="ftr-links" aria-label="Rodapé">
            <ul>
              <li><a href="#linha" onClick={go('#linha')}>Vibroprensas</a></li>
              <li><a href="#linha" onClick={go('#linha')}>Misturadores</a></li>
              <li><a href="#linha" onClick={go('#linha')}>Centrais dosadoras</a></li>
              <li><a href="#linha" onClick={go('#linha')}>Elevadores</a></li>
              <li><a href="#linha" onClick={go('#linha')}>Automações</a></li>
            </ul>
            <ul>
              <li><a href="#plantas" onClick={go('#plantas')}>Plantas completas</a></li>
              <li><a href="#por-que" onClick={go('#por-que')}>Assistência e peças</a></li>
              <li><a href="#quem-somos" onClick={go('#quem-somos')}>Sobre</a></li>
              <li><a href="#orcamento" onClick={go('#orcamento')}>Contato</a></li>
            </ul>
          </nav>
        </div>

        <div className="ftr-cta">
          <h2 id="ftr-title" className="t-head">Vamos dimensionar a sua fábrica?</h2>
          <Split href="#orcamento" onClick={go('#orcamento')}>Solicitar orçamento</Split>
        </div>

        <div className="ftr-info">
          <address>
            <img className="ftr-logo" src="./img/marca/hzen-logo.svg" alt="H-Zen" width="104" height="33" loading="lazy" />
            <strong>H-Zen Máquinas e Equipamentos</strong>
            {contato.endereco.map((l) => <span key={l}>{l}</span>)}
            <a href={contato.mapa} target="_blank" rel="noopener">Ver no mapa</a>
          </address>
          <div>
            <a href={`tel:${contato.telefoneLink}`}>{contato.telefone}</a>
            <a href={`https://wa.me/${contato.whatsapp}`} target="_blank" rel="noopener">{contato.whatsappTexto} · WhatsApp</a>
            <a href={`mailto:${contato.email}`}>{contato.email}</a>
          </div>
          <div>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>

        <p className="ftr-legal t-small muted">© 2026 H-Zen Automação Industrial Ltda. · Equipamentos desenvolvidos e fabricados no Brasil.</p>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false)
  // aparece depois da abertura; some enquanto a pessoa rola para baixo (não cobre títulos) e volta quando ela para ou sobe
  useEffect(() => {
    let last = window.scrollY
    let t = 0
    const on = () => {
      const y = window.scrollY
      const passou = y > window.innerHeight * 0.8
      clearTimeout(t)
      if (!passou) setShow(false)
      else if (y > last) { setShow(false); t = setTimeout(() => setShow(true), 900) }
      else setShow(true)
      last = y
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', on) }
  }, [])
  const msg = encodeURIComponent('Olá, H-Zen. Vim pelo site e quero falar com a engenharia comercial.')
  return (
    <a className={`wa${show ? ' is-on' : ''}`} href={`https://wa.me/${contato.whatsapp}?text=${msg}`} target="_blank" rel="noopener"
       aria-label="Falar com a engenharia pelo WhatsApp" tabIndex={show ? 0 : -1}>
      <Icon name="whatsapp" />
      <span>Falar com a engenharia</span>
    </a>
  )
}
