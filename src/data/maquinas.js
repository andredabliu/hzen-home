// Dados técnicos das máquinas H-Zen.
// Fonte: Catálogo de Produtos "Slyde 24P" (2026). Fonte única para a Home,
// a calculadora e as futuras páginas de produto. Altere aqui, não nos componentes.

const IMG = './img/produtos/'

/** Artefatos que entram na calculadora (meio-fio fora até o cliente confirmar as medidas). */
export const artefatos = [
  { id: 'paver-10x20', nome: 'Paver 10 × 20', unidade: 'm²' },
  { id: 'paver-16-faces', nome: 'Paver 16 faces', unidade: 'm²' },
  { id: 'lajota-sextavada', nome: 'Lajota sextavada 25 × 25', unidade: 'm²' },
  { id: 'bloco-9', nome: 'Bloco 9 × 19 × 39', unidade: 'blocos' },
  { id: 'bloco-14', nome: 'Bloco 14 × 19 × 39', unidade: 'blocos' },
  { id: 'bloco-19', nome: 'Bloco 19 × 19 × 39', unidade: 'blocos' },
]

/** Vibroprensas, da menor para a maior. Produção por dia em 8 h, sem paradas. */
export const vibroprensas = [
  {
    id: 'hz-3-2', nome: 'HZ-3.2', img: IMG + 'hz-3-2-linha.webp',
    bandeja: '480 × 540 × 20 mm', potencia: '20 kW', ciclo: '14 a 20 s', forca: '1,5 t',
    producao: { 'paver-10x20': 240, 'paver-16-faces': 180, 'lajota-sextavada': 188, 'bloco-9': 7000, 'bloco-14': 4200, 'bloco-19': 2800 },
  },
  {
    id: 'hz-04', nome: 'HZ-04', img: IMG + 'site-VibroHZ04.webp',
    bandeja: '540 × 620 × 25 mm', potencia: '28 kW', ciclo: '12 a 18 s', forca: '3 t',
    producao: { 'paver-10x20': 360, 'paver-16-faces': 270, 'lajota-sextavada': 450, 'bloco-9': 7500, 'bloco-14': 6000, 'bloco-19': 4500 },
  },
  {
    id: 'hz-06', nome: 'HZ-06', img: IMG + 'hz-06.webp',
    bandeja: '620 × 920 × 25 mm', potencia: '37 kW', ciclo: '12 a 18 s', forca: '3 t',
    producao: { 'paver-10x20': 680, 'paver-16-faces': 540, 'lajota-sextavada': 525, 'bloco-9': 12000, 'bloco-14': 7500, 'bloco-19': 6000 },
  },
  {
    id: 'hz-700-sincro', nome: 'HZ-700 Sincro', img: IMG + 'hz-700-sincro.webp',
    bandeja: '620 × 920 × 25 mm', potencia: '37 kW', ciclo: '12 a 18 s', forca: '4,5 t',
    producao: { 'paver-10x20': 720, 'paver-16-faces': 540, 'lajota-sextavada': 563, 'bloco-9': 12800, 'bloco-14': 8000, 'bloco-19': 6400 },
  },
  {
    id: 'hz-1000-sincro', nome: 'HZ-1000 Sincro', img: IMG + 'hz-1000-sincro.webp',
    bandeja: '1200 × 675 × 40 mm', potencia: '40 kW', ciclo: '11 a 18 s', forca: '6 t',
    producao: { 'paver-10x20': 1000, 'paver-16-faces': 680, 'lajota-sextavada': 744, 'bloco-9': 17600, 'bloco-14': 11200, 'bloco-19': 8000 },
  },
  {
    id: 'hz-1300ss', nome: 'HZ-1300Ss', img: IMG + 'hz-1300ss.webp', lancamento: true,
    bandeja: '1300 × 700 × 40 mm', potencia: '40 kW', ciclo: '11 a 18 s', forca: '6,8 t',
    producao: { 'paver-10x20': 1200, 'paver-16-faces': 850, 'lajota-sextavada': 850, 'bloco-9': 19200, 'bloco-14': 12800, 'bloco-19': 9600 },
  },
]

/** Famílias da linha de produtos (lista da Home e mega menu). */
export const familias = [
  { id: 'vibroprensas', nome: 'Vibroprensas', icone: 'prensa', img: IMG + 'hz-1000-sincro.webp',
    texto: 'Da HZ-3.2 à HZ-1300Ss, de 7.000 a 19.200 blocos por dia.', curto: '6 modelos, até 19.200 blocos/dia' },
  { id: 'misturadores', nome: 'Misturadores', icone: 'misturador', img: IMG + 'misturador-planetario.webp',
    texto: 'Planetário, eixo simples e duplo eixo, de 400 a 2.400 kg por ciclo.', curto: 'Planetário, eixo simples e duplo' },
  { id: 'centrais', nome: 'Centrais dosadoras', icone: 'central', img: IMG + 'central-balanca.webp',
    texto: 'Pesagem na esteira, temporizada, por desconto ou individual, com receitas na IHM.', curto: 'Quatro sistemas de pesagem' },
  { id: 'elevadores', nome: 'Elevadores', icone: 'elevador', img: IMG + 'elevador-gaiolas.webp',
    texto: 'Empilhador, para gaiolas e acumulador para Finger Car.', curto: 'Carga e descarga de bandejas' },
  { id: 'automacoes', nome: 'Automações', icone: 'automacao', img: IMG + 'garra.webp',
    texto: 'Finger Car, Cubber e Garra para transporte, cura e paletização.', curto: 'Finger Car, Cubber e Garra' },
  { id: 'plantas', nome: 'Plantas completas', icone: 'planta', img: IMG + 'cubber.webp',
    texto: 'Layout, máquinas e automação projetados juntos, do silo ao palete.', curto: 'Do layout à partida' },
]

/** Etapas de uma planta de artefatos. A ordem é real. */
export const etapas = [
  { id: 'dosar', verbo: 'Dosar', maquina: 'Central dosadora', img: IMG + 'central-balanca.webp',
    texto: 'A central pesa areia, pó de pedra e cimento por receita, com células de carga e CLP.' },
  { id: 'misturar', verbo: 'Misturar', maquina: 'Misturador planetário', img: IMG + 'misturador-planetario.webp',
    texto: 'O misturador deixa o traço homogêneo, com chapas de desgaste em aço extra duro.' },
  { id: 'prensar', verbo: 'Prensar', maquina: 'Vibroprensa HZ-1000 Sincro', img: IMG + 'hz-1000-sincro.webp',
    texto: 'A vibroprensa molda blocos, pavers e lajotas em ciclos de 11 a 20 segundos.' },
  { id: 'curar', verbo: 'Transportar e curar', maquina: 'Elevador para Finger Car', img: IMG + 'elevador-finger-car.webp',
    texto: 'Elevadores e Finger Car levam as bandejas às câmaras de cura sem trincar o artefato fresco.' },
  { id: 'paletizar', verbo: 'Paletizar', maquina: 'Garra', img: IMG + 'garra.webp',
    texto: 'Cubber e Garra montam o palete e devolvem as bandejas vazias à máquina.' },
]

/** Contato comercial. [confirmar] WhatsApp oficial com o cliente. */
export const contato = {
  whatsapp: '5547991774028',
  whatsappTexto: '(47) 99177-4028',
  telefone: '(47) 3350-7695',
  telefoneLink: '+554733507695',
  email: 'vendas@hzen.ind.br',
  endereco: ['Rua Joaquim Zucco, 777', 'Nova Brasília, Brusque, SC', 'CEP 88352-195'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Joaquim+Zucco+777+Brusque+SC',
}

export const formatar = (n) => Math.round(n).toLocaleString('pt-BR')
