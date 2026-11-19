// Ícones de traço fino, todos no mesmo desenho (viewBox 24, traço 1.4).
const paths = {
  seta: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  baixar: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  cima: <path d="M12 20V5M6 11l6-6 6 6" />,
  mais: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  fechar: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  play: <path d="M9 7v10l8-5z" />,
  whatsapp: (
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Zm-3.2 5c.3 0 .5 0 .7.5l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.2-.2.3 0 .6a6.6 6.6 0 0 0 3.2 2.8c.3.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.2.4.4 0 .5-.2 1.4-1.2 1.8-.8.3-1.8.3-3.5-.5a8.8 8.8 0 0 1-3.6-3.6c-.6-1.1-.7-2.2-.3-3 .3-.6.8-.9 1-.9Z" />
  ),
  // famílias
  prensa: <path d="M5 21V5h14v16M5 9h14M8 13h8M8 17h8M3 21h18M10 5V3h4v2" />,
  misturador: (
    <>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 6V3M9 13h6M12 10v6M7 20l-1 1.5M17 20l1 1.5" />
    </>
  ),
  central: <path d="M3 6h18l-3 7H6zM6 13v5M18 13v5M3 18h18M9 6V4M15 6V4" />,
  elevador: <path d="M6 3v18M18 3v18M6 7h12M6 12h12M6 17h12M10 10l2-2 2 2" />,
  automacao: (
    <>
      <path d="M12 3v5M7 8h10v4H7zM9 12v4M15 12v4M6 16h12v3H6z" />
      <circle cx="12" cy="3.5" r="1" />
    </>
  ),
  planta: <path d="M3 20h18M4 20V10l5 3V10l5 3V7l6 3v10M8 17h2M13 17h2" />,
}

export default function Icon({ name, size, title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  )
}

/** Botão duplo do design system: ação + quadrado com seta. */
export function Split({ href = '#orcamento', children, variant, small, block, icon = 'seta', onClick, type, ...rest }) {
  const cls = ['split', variant && `is-${variant}`, small && 'is-small', block && 'is-block'].filter(Boolean).join(' ')
  const inner = (
    <>
      <span className="split-l">{children}</span>
      <span className="split-a" aria-hidden="true">
        <Icon name={icon} />
      </span>
    </>
  )
  if (type) {
    return (
      <button className={cls} type={type} onClick={onClick} {...rest}>
        {inner}
      </button>
    )
  }
  return (
    <a className={cls} href={href} onClick={onClick} {...rest}>
      {inner}
    </a>
  )
}
