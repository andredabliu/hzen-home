import { useMemo, useState } from 'react'
import { Split } from './Icon.jsx'
import { artefatos, vibroprensas, formatar } from '../data/maquinas.js'
import { scrollToTarget } from '../lib/motion.js'

const metaInicial = { 'paver-10x20': 15000, 'paver-16-faces': 10000, 'lajota-sextavada': 10000, 'bloco-9': 250000, 'bloco-14': 150000, 'bloco-19': 120000 }

export default function Calculadora({ onEscolha }) {
  const [art, setArt] = useState('bloco-14')
  const [meta, setMeta] = useState(metaInicial['bloco-14'])
  const [turnos, setTurnos] = useState(1)
  const [dias, setDias] = useState(22)

  const a = artefatos.find((x) => x.id === art)
  const linhas = useMemo(
    () => vibroprensas.map((m) => ({ m, mes: m.producao[art] * turnos * dias })),
    [art, turnos, dias],
  )
  const max = Math.max(...linhas.map((l) => l.mes))
  const indicada = linhas.find((l) => l.mes >= meta)
  const escala = Math.max(max, meta)

  const trocaArt = (id) => { setArt(id); setMeta(metaInicial[id]) }
  const pedir = (e) => {
    e.preventDefault()
    onEscolha?.({
      interesse: 'Vibroprensas',
      producao: `${formatar(meta)} ${a.unidade} de ${a.nome.toLowerCase()} por mês, ${turnos} turno(s), ${dias} dias. Máquina indicada: ${indicada ? indicada.m.nome : 'planta com mais de uma linha'}.`,
    })
    scrollToTarget('#orcamento')
  }

  return (
    <section id="calculadora" className="section calc" aria-labelledby="calc-title">
      <div className="wrap">
        <div className="calc-head" data-reveal>
          <h2 id="calc-title" className="t-head">Quanto sua fábrica pode produzir</h2>
          <p className="muted measure">Escolha o artefato e a meta do mês. A conta usa as tabelas de produção do catálogo H-Zen.</p>
        </div>

        <div className="calc-panel">
          <form className="calc-ctrl" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="calc-legend">O que você quer fabricar</legend>
              <div className="chips">
                {artefatos.map((x) => (
                  <button type="button" key={x.id} className="chip" aria-pressed={art === x.id} onClick={() => trocaArt(x.id)}>
                    {x.nome}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="calc-meta">Meta por mês ({a.unidade})</label>
              <input id="calc-meta" type="number" inputMode="numeric" min="0" step={a.unidade === 'm²' ? 500 : 5000}
                value={meta} onChange={(e) => setMeta(Math.max(0, Number(e.target.value) || 0))} />
              <input aria-label={`Meta por mês em ${a.unidade}, controle deslizante`} className="calc-range" type="range" min="0"
                max={Math.round(escala * 1.1)} step={a.unidade === 'm²' ? 100 : 1000} value={meta}
                onChange={(e) => setMeta(Number(e.target.value))} />
            </div>

            <div className="calc-row">
              <fieldset>
                <legend className="calc-legend">Turnos de 8 horas</legend>
                <div className="chips">
                  {[1, 2, 3].map((t) => (
                    <button type="button" key={t} className="chip" aria-pressed={turnos === t} onClick={() => setTurnos(t)}>{t}</button>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor="calc-dias">Dias no mês</label>
                <input id="calc-dias" type="number" min="1" max="31" value={dias}
                  onChange={(e) => setDias(Math.min(31, Math.max(1, Number(e.target.value) || 1)))} />
              </div>
            </div>
          </form>

          <div className="calc-out">
            <p className="calc-result t-lead" aria-live="polite">
              {indicada ? (
                <>Para <strong className="num">{formatar(meta)} {a.unidade}</strong> de {a.nome.toLowerCase()} por mês, a indicada é a <strong>{indicada.m.nome}</strong>.</>
              ) : (
                <>Nenhuma máquina sozinha chega a <strong className="num">{formatar(meta)} {a.unidade}</strong> por mês. Uma planta com duas linhas resolve: fale com a engenharia.</>
              )}
            </p>
            <p className="t-small muted bars-legend"><span className="lg-goal" aria-hidden="true" /> Sua meta · <span className="lg-rec" aria-hidden="true" /> Máquina indicada</p>
            <ul className="bars" aria-label="Produção por mês de cada vibroprensa">
              {linhas.map(({ m, mes }) => {
                const cls = indicada && indicada.m.id === m.id ? 'is-rec' : mes >= meta ? 'is-ok' : ''
                return (
                  <li key={m.id} className={`bar ${cls}`}>
                    <span className="bar-n">{m.nome}</span>
                    <span className="bar-track">
                      <span className="bar-fill" style={{ width: `${(mes / escala) * 100}%` }} />
                      <span className="bar-goal" style={{ left: `${(meta / escala) * 100}%` }} aria-hidden="true" />
                    </span>
                    <span className="bar-v num">{formatar(mes)} {a.unidade}</span>
                  </li>
                )
              })}
            </ul>
            <div className="calc-cta">
              {indicada && <img src={indicada.m.foto || indicada.m.img} alt={indicada.m.nome} className="calc-img" loading="lazy" />}
              <Split href="#orcamento" onClick={pedir}>Pedir orçamento desta configuração</Split>
            </div>
            <p className="t-small muted">Estimativa com turnos de 8 horas, sem paradas para limpeza ou manutenção. A produção real depende do traço, dos moldes e da operação.</p>
          </div>
        </div>

        <noscript>
          <table className="calc-noscript">
            <caption>Produção diária por vibroprensa (8 horas)</caption>
            <thead><tr><th>Máquina</th>{artefatos.map((x) => <th key={x.id}>{x.nome}</th>)}</tr></thead>
            <tbody>{vibroprensas.map((m) => <tr key={m.id}><th>{m.nome}</th>{artefatos.map((x) => <td key={x.id}>{formatar(m.producao[x.id])} {x.unidade}</td>)}</tr>)}</tbody>
          </table>
        </noscript>
      </div>
    </section>
  )
}
