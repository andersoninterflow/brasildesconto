# Brasil Desconto 🎁

Portal brasileiro de ofertas e cupons – desenvolvido como **PWA** hospedado em **GitHub Pages**.

## 🚀 Visão Geral

**Brasil Desconto** é um catálogo centralizado de ofertas, cupons e descontos para o Brasil, com:

✅ Interface responsiva (mobile-first)  
✅ Installável como app nativo (Android, iOS, Windows, macOS, Linux)  
✅ Funciona offline (Service Worker + Fallback)  
✅ Painel admin para gerenciar ofertas (sem backend)  
✅ 100% estático (GitHub Pages)  
✅ SEO otimizado  

---

## 🎯 Funcionalidades

### Usuário Final

- 📱 Home com ofertas em destaque
- 🔍 Busca completa + filtros (categoria, preço)
- 🏷️ Categorias de ofertas
- 📄 Página de produto com galeria
- 💾 Rastreamento local de cliques (localStorage)
- 📊 "Mais Clicados" (opcional)

### Admin

- ✏️ Editor CRUD de ofertas (navegador)
- 📥 Exportar JSON atualizado
- ✓ Validação de dados

### PWA

- 📲 Installável em qualquer dispositivo
- 🔌 Funciona offline
- 🎨 Ícones customizados (16, 32, 192, 512px)
- 🔔 Web App Manifest

### SEO

- 🤖 robots.txt e sitemap.xml
- 📝 Metas básicas (title, description)
- 🔗 Canonical URLs
- 📊 Schema.org (Offer markup)

---

## 📋 Stack

- **Frontend**: HTML5, CSS3, JavaScript vanilla (sem frameworks)
- **Hosting**: GitHub Pages
- **PWA**: Service Worker, Web App Manifest
- **Dados**: JSON estático
- **Sem backend**: Editável localmente, exportável

---

## 📁 Estrutura

```
brasil-desconto/
├── index.html                 # Portal principal
├── offline.html              # Fallback offline
├── manifest.json             # PWA manifest
├── service-worker.js         # Cache + offline
├── robots.txt & sitemap.xml  # SEO
│
├── assets/
│   ├── css/
│   │   ├── app.css          # Estilos portal
│   │   └── admin.css        # Estilos admin
│   ├── js/
│   │   ├── app.js           # Lógica portal
│   │   ├── pwa.js           # SW registration
│   │   └── admin.js         # CRUD admin
│   └── img/
│       ├── logo-oficial.svg  # Logo oficial
│       └── icons/            # PWA icons (16-512px)
│
├── data/
│   ├── products.json        # Ofertas (exportado do admin)
│   └── categories.json      # Categorias
│
├── admin/
│   └── index.html           # Painel admin
│
└── docs/
    ├── ESCOPO.md            # Escopo do projeto
    ├── TECNICO.md           # Especificação técnica
    ├── DEPLOY_GITHUB_PAGES.md # Deploy step-by-step
    └── CHECKLIST_TESTES.md  # Testes e validação
```

---

## 🚀 Deploy Rápido

1. **Clonar/copiar para seu repositório GitHub**
   ```bash
   git clone https://github.com/seu-usuario/brasil-desconto.git
   cd brasil-desconto
   ```

2. **Fazer push**
   ```bash
   git add .
   git commit -m "Deploy Brasil Desconto"
   git push -u origin main
   ```

3. **Ativar GitHub Pages**
   - Acesse: Settings → Pages
   - Selecione: `main` branch, pasta `/`
   - Aguarde 1-2 minutos

4. **Acessar**
   - 🌐 https://seu-usuario.github.io/brasil-desconto/
   - 🎛️ Admin: https://seu-usuario.github.io/brasil-desconto/#/admin

Ver [DEPLOY_GITHUB_PAGES.md](docs/DEPLOY_GITHUB_PAGES.md) para detalhes completos.

---

## 📖 Documentação

- **[ESCOPO.md](docs/ESCOPO.md)** – Escopo do projeto e funcionalidades
- **[TECNICO.md](docs/TECNICO.md)** – Arquitetura e especificação técnica
- **[DEPLOY_GITHUB_PAGES.md](docs/DEPLOY_GITHUB_PAGES.md)** – Deploy passo a passo
- **[CHECKLIST_TESTES.md](docs/CHECKLIST_TESTES.md)** – Testes e validação

---

## 🔧 Atualizar Ofertas

1. Acesse: `https://seu-site/#/admin`
2. Crie/edite/remova ofertas
3. Clique **Export JSON**
4. Substitua `data/products.json`
5. Faça push:
   ```bash
   git add data/products.json
   git commit -m "Atualizar ofertas"
   git push
   ```
6. Aguarde 1-2 min (GitHub Pages atualiza automaticamente)

---

## 🛡️ Segurança

- ✅ HTTPS automático (GitHub Pages)
- ✅ Sem PHP/MySQL (estático)
- ⚠️ Admin sem login (usuário responsável)
- ⚠️ Não incluir dados sensíveis

---

## 📱 PWA

### Instalar em Android/iOS

1. Abra no navegador: `https://seu-site/`
2. Clique em **"Instalar"** (ícone menu)
3. App aparece na tela inicial

### Offline

1. Abra a app
2. Desative Wi-Fi/dados
3. App continua funcionando (cache)

---

## 🧪 Validação

Rodar checklist completo em [CHECKLIST_TESTES.md](docs/CHECKLIST_TESTES.md):

```
✅ Testes funcionais
✅ Responsividade
✅ PWA
✅ SEO
✅ Acessibilidade
✅ Performance
✅ Segurança
```

---

## 📊 Rastreamento

Cliques registrados em `localStorage`:

```javascript
// Visualizar cliques no console
JSON.parse(localStorage.getItem('productClicks'))
```

---

## 🌍 URLs Principais

| Página | URL |
|--------|-----|
| Home | `https://seu-site/` |
| Admin | `https://seu-site/#/admin` |
| Busca | `https://seu-site/#/search?q=termo` |
| Produto | `https://seu-site/#/product/:id` |
| Offline | `https://seu-site/offline.html` |

---

## 📝 Exemplo de Dados

### `data/categories.json`

```json
[
  { "id": "eletronicos", "name": "Eletrônicos", "icon": "📱" },
  { "id": "alimentos", "name": "Alimentos", "icon": "🍔" },
  { "id": "fashion", "name": "Moda", "icon": "👕" }
]
```

### `data/products.json`

```json
[
  {
    "id": "prod-001",
    "title": "iPhone 15",
    "description": "Smartphone Apple última geração",
    "price": 4999.00,
    "originalPrice": 5999.00,
    "coupon": "BRASIL2026",
    "imageUrls": ["https://example.com/img1.jpg"],
    "affiliateUrl": "https://affiliate.link/iphone15",
    "categoryId": "eletronicos",
    "active": true,
    "createdAt": "2026-02-01T00:00:00Z",
    "updatedAt": "2026-02-01T00:00:00Z"
  }
]
```

---

## 🤝 Contribuindo

Este projeto é público. Faça fork, edite, e abra PR! 

---

## 📄 Licença

MIT

---

## 🙋 Suporte

Dúvidas? Consulte [TECNICO.md](docs/TECNICO.md) ou abra uma issue.

---

**Desenvolvido com ❤️ para o Brasil** 🇧🇷
