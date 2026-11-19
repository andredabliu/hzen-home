# H-Zen · site (Home v1)

Home navegável do novo site da H-Zen Máquinas e Equipamentos. React 18 + Vite 5 + GSAP 3 (ScrollTrigger). Build estático.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve dist/ em http://localhost:4173
```

`dist/` usa caminhos relativos (`base: './'`), então pode ir para qualquer pasta do servidor. Abrir `dist/index.html` direto do disco não funciona (o navegador bloqueia módulos em `file://`); use um servidor.

## Estrutura

```
src/
  styles/tokens.css     design system 0.2: cores, tipo, espaço, forma, movimento (fonte: _referencias/design-system/tokens.css)
  styles/global.css     base e componentes reutilizáveis: .split (botão duplo), .chip, .circle, .field, .two-tone, entradas
  styles/sections.css   uma seção por bloco, na ordem da página
  data/maquinas.js      FONTE ÚNICA dos dados técnicos (catálogo 2026): vibroprensas, produção por artefato, famílias, etapas, contato
  lib/motion.js         GSAP/ScrollTrigger e entradas [data-reveal]
  components/
    Header.jsx          menu em chips, mega menu de Máquinas, menu de celular, some ao rolar para baixo
    Hero.jsx            palavras "Blocos · pavers", giro 360° da HZ-1000 em canvas ligado ao scroll, contador ao vivo
    Sections.jsx        Quem somos, Lançamento HZ-1300Ss, Linha, Planta, Projetos, Por que, Perguntas
    Calculadora.jsx     produção por mês de cada vibroprensa para a meta escolhida; envia a configuração ao formulário
    Orcamento.jsx       formulário de orçamento (abre o WhatsApp com a mensagem), rodapé (WhatsApp fica no cabeçalho)
    Icon.jsx            ícones de traço e o componente <Split> (botão duplo)
public/img/             renders recortados (WebP), quadros do giro (120), projetos, marca
```

## Regras do design system (resumo)

- Cores só por token. Laranja (`--accent`) só em ação e destaque; texto sobre laranja é marinho (branco não passa em contraste).
- Fonte Geist, cinco tamanhos: `--t-small`, `--t-body`, `--t-lead`, `--t-head`, `--t-display`.
- Cantos 4px (controles) e 8px (painéis). Fios de 1px em `--line` para listas e chips. Sem sombra (exceto mega menu), sem degradê (exceto véu sobre foto).
- Títulos com no máximo 2 linhas. Título em dois tons com `.two-tone` (`.tt-a` + `.tt-b`).
- Movimento: entradas com `data-reveal` no pai; tudo respeita `prefers-reduced-motion`.

## Para ligar antes de publicar

1. **Formulário de orçamento** (`Orcamento.jsx`, função `enviar`): hoje abre o WhatsApp `contato.whatsapp`. Trocar por POST ao CRM/e-mail mantendo a validação.
2. **Newsletter do rodapé** (`Footer`, função `assinar`): hoje abre um e-mail. Ligar à ferramenta de e-mail marketing.
3. **Redes sociais**: links genéricos em `Footer`. Trocar pelos perfis da H-Zen.
4. **Links das famílias**: apontam para âncoras da Home. Quando existirem páginas de produto, trocar `href` em `familias` / `Header` / `Sections`.
5. **Analytics e pixel** (Meta, Google): não instalados.

## A confirmar com o cliente

- WhatsApp comercial (usamos 47 99177-4028, do catálogo) e e-mail que recebe os leads.
- Ano de fundação (site antigo: 2008; catálogo: "15 anos"). A Home não cita o número.
- Medidas do meio-fio nas tabelas (fora da calculadora).
- Respostas das perguntas frequentes (instalação, prazo).
- Arquivo 3D (SolidWorks/STEP) para refazer o giro em alta resolução; hoje são 120 quadros de 720 px do vídeo do site antigo.
- Fotos reais da fábrica e de máquinas em clientes (só há duas fotos reais, em baixa).
