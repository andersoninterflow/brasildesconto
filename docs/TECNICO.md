# BRASIL DESCONTO – Especificação Técnica

## Arquitetura

```
┌─────────────────────────────────────────┐
│       GitHub Pages (Hospedagem)          │
│  ├── index.html (Portal)                │
│  ├── admin/index.html (Editor)          │
│  ├── offline.html (Fallback)            │
│  ├── manifest.json (PWA)                │
│  ├── service-worker.js (Cache/Offline)  │
│  └── data/*.json (Estático)             │
└─────────────────────────────────────────┘
```

## Fluxo de Dados

1. **Usuário acessa** `index.html`
2. **Service Worker** registra e cacheia
3. **JavaScript** carrega `data/products.json`
4. **DOM** renderiza ofertas
5. **Cliques** salvos em `localStorage`

---

## Stack Tecnológico

### Frontend

- **HTML5**: Semântica, acessibilidade
- **CSS3**: Grid/Flexbox, mobile-first, PWA styling
- **JavaScript (Vanilla)**:
  - Fetch API para carregar JSON
  - localStorage para persistência
  - Service Worker API
  - Web App Manifest API

### Não usar

- ❌ React, Vue, Angular (sem frameworks)
- ❌ Build tools (Webpack, Babel, etc.)
- ❌ CSS preprocessors (Sass, Less)

---

## Estrutura de Arquivos

### Root Files

```
index.html              # Portal principal
offline.html          # Fallback offline
manifest.json         # PWA manifest
service-worker.js     # Service Worker
robots.txt            # SEO
sitemap.xml           # SEO
```

### assets/

```
css/
  app.css             # Estilos do portal
  admin.css           # Estilos do admin

js/
  app.js              # Lógica portal (busca, filtros, renderização)
  pwa.js              # SW registration
  admin.js            # CRUD admin

img/
  logo-oficial.png    # Logo 1:1 (mínimo 256x256)
  icons/
    icon-16.png       # Favicon
    icon-32.png       # Atalho desktop
    icon-192.png      # Android
    icon-512.png      # Splash screens
```

### data/

```
products.json         # Ofertas (exportado do admin)
categories.json       # Categorias
```

### admin/

```
index.html            # Página admin
```

### docs/

```
ESCOPO.md             # Escopo (este documento)
TECNICO.md            # Especificação técnica
DEPLOY_GITHUB_PAGES.md # Deploy step-by-step
CHECKLIST_TESTES.md   # Testes e validação
```

---

## API de Dados (Frontend)

### Carregando JSON

```javascript
// Carregar categorias
fetch('data/categories.json')
  .then(r => r.json())
  .then(categories => { /* usar */ });

// Carregar ofertas
fetch('data/products.json')
  .then(r => r.json())
  .then(products => { /* usar */ });
```

### localStorage (Rastreamento)

```javascript
// Registrar clique
const clicks = JSON.parse(localStorage.getItem('productClicks') || '{}');
clicks[productId] = (clicks[productId] || 0) + 1;
localStorage.setItem('productClicks', JSON.stringify(clicks));

// Buscar cliques
const clickCount = (JSON.parse(localStorage.getItem('productClicks') || '{}'))[productId] || 0;
```

---

## Service Worker (PWA)

Estratégia: **Cache First** com fallback para `offline.html`

```javascript
// Arquivos para pré-cachear
const CACHE_NAME = 'brasil-desconto-v1';
const urlsToCache = [
  '/',
  'index.html',
  'offline.html',
  'assets/css/app.css',
  'assets/js/app.js',
  'manifest.json'
  // NÃO cachear data/*.json (sempre fresh)
];
```

---

## Rotas (SPA sem backend)

Usar **hash navigation** (`#`) para compatibilidade com GitHub Pages:

```
/                    → Home (index.html#/)
/#/product/:id       → Detalhe produto
/#/category/:id      → Produtos por categoria
/#/search?q=termo    → Busca
/#/admin             → Painel admin (password local?)
```

---

## Validação de Dados

### Produto (obrigatório)

- `id`: string não-vazio
- `title`: string 5-200 caracteres
- `price`: número > 0
- `affiliateUrl`: URL válida
- `categoryId`: existe em categories.json
- `active`: boolean

### Categoria (obrigatório)

- `id`: string não-vazio
- `name`: string 2-50 caracteres

---

## Performance

- JS mínimo (sem compressão necessária em GitHub Pages)
- CSS inline para páginas críticas
- Imagens otimizadas (max 200KB cada)
- Service Worker para cache
- Lazy loading de imagens (loading="lazy")

---

## Segurança

- ✅ HTTPS automático (GitHub Pages)
- ✅ CSP headers (configurado via `.nojekyll`)
- ✅ No XSS (sem eval, sanitizar inputs no admin)
- ⚠️ Admin sem autenticação (usuário responsável por segurança local)

---

## Acessibilidade (WCAG 2.1 AA)

- Semântica HTML5 (header, nav, main, footer)
- ARIA labels onde necessário
- Contrast ratio 4.5:1 (texto)
- Focus states visíveis
- Alt text em imagens

---

## SEO

### Metas Globais

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="...">
<meta name="keywords" content="ofertas, cupons, desconto, Brasil">
<meta name="language" content="pt-BR">
<meta name="robots" content="index, follow">
```

### Canonical

Cada página deve ter:
```html
<link rel="canonical" href="https://seu-site.github.io/">
```

### Estruturado (Schema.org)

```json
{
  "@context": "https://schema.org/",
  "@type": "Offer",
  "name": "...",
  "price": "...",
  "url": "..."
}
```

---

## Testes

Validar:
- [ ] JSON válido (JSONLint)
- [ ] HTML válido (W3C)
- [ ] CSS valido
- [ ] Service Worker registrado
- [ ] Offline funciona
- [ ] Responsive (320px, 768px, 1024px+)
- [ ] Acessibilidade (Axe, WAVE)
- [ ] SEO (Lighthouse, PageSpeed)
- [ ] PWA (Installable)

---

## Deploy

1. Push para `main` branch
2. Ativar GitHub Pages (Settings → Pages → main branch)
3. URL: `https://username.github.io/brasil-desconto/`

Ver [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md) para detalhes.
