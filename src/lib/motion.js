import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Rola até um elemento ou âncora (rolagem nativa). */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' })
}

/** Entradas: cada [data-reveal] anima os filhos em sequência ao entrar na tela, uma vez. */
export function startReveals(root = document) {
  document.documentElement.classList.add('js')
  const els = root.querySelectorAll('[data-reveal]')
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return () => {}
  }
  // revela o que está na tela ou já passou por ela (rolagem que pula trechos, links de âncora)
  let pending = [...els]
  let raf = 0
  const check = () => {
    raf = 0
    const limit = window.innerHeight * 1.08
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('is-in'); return false }
      return true
    })
    if (!pending.length) stop()
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
  const stop = () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  check()
  return stop
}

export { gsap, ScrollTrigger }
