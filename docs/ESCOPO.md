# BRASIL DESCONTO – Escopo do Projeto

## Visão Geral

**Brasil Desconto** é um portal brasileiro de ofertas e cupons, desenvolvido como PWA (Progressive Web App) totalmente hospedado em GitHub Pages (estático).

### Objetivo

Oferecer aos usuários brasileiros um catálogo centralizado de ofertas, cupons e descontos com:
- Interface responsiva (mobile-first)
- Instalação como app nativo (Android, iOS, Windows, macOS, Linux)
- Funcionalidade offline
- Painel admin para gerenciar ofertas (sem backend)

---

## Funcionalidades

### 🔵 Usuário Final (Portal)

1. **Home**
   - Grid/lista de ofertas em destaque
   - Carrossel de categorias

2. **Catálogo**
   - Listagem completa com paginação
   - Filtros: categoria, faixa de preço, status

3. **Busca**
   - Busca por termo (título, descrição)
   - Autocomplete local

4. **Página de Produto**
   - Galeria (até 5 imagens)
   - Preço, descrição, cupom
   - Botão "PEGAR DESCONTO" (abre affiliateUrl em nova aba)
   - Rastreamento local de cliques

5. **Categorias**
   - Listagem por categoria
   - Filtros por categoria

6. **Rastreamento Local**
   - Contagem de cliques por produto (localStorage)
   - Página opcional "Mais Clicados"

### 🟣 Admin (Editor JSON)

1. **CRUD de Ofertas**
   - Criar nova oferta
   - Editar oferta existente
   - Remover oferta
   - Validação obrigatória

2. **Export JSON**
   - Gerar arquivo `products.json` atualizado
   - Usuário copia para repositório e faz push

### 🟤 SEO

- Metas básicas (title, description, canonical)
- robots.txt
- sitemap.xml
- Schema.org (ofertas)

### 🟢 PWA

- Installable (manifest.json)
- Service Worker (cache, offline)
- Ícones múltiplos (16, 32, 192, 512px)

---

## Dados

Armazenamento **100% estático** em JSON:

- `data/products.json` – Ofertas
- `data/categories.json` – Categorias

Atualizações: usuário exporta do admin, faz push no GitHub.

---

## Tecnologia

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (sem frameworks)
- **Hospedagem**: GitHub Pages
- **PWA**: Service Worker, Web App Manifest
- **Dados**: JSON estático

---

## Limites

- Sem backend (apenas GitHub Pages)
- Sem PHP/MySQL/Node.js
- Métricas avançadas preparadas para integração futura (opcional)
- Autenticação admin: não há (edição local segura)

---

## Estrutura de Dados

### `data/products.json`

```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "price": "number",
    "originalPrice": "number",
    "coupon": "string (opcional)",
    "imageUrls": ["string[]"],
    "affiliateUrl": "string (url relativa ou absoluta)",
    "categoryId": "string",
    "active": "boolean",
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601",
    "expiresAt": "ISO-8601 (opcional)"
  }
]
```

### `data/categories.json`

```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string (opcional)",
    "icon": "emoji ou class"
  }
]
```

---

## Timeline

1. **Sprint 0**: Bootstrap (estrutura + docs)
2. **Sprint 1**: Dados JSON
3. **Sprint 2**: Portal
4. **Sprint 3**: Admin
5. **Sprint 4**: PWA
6. **Sprint 5**: SEO
7. **Sprint 6**: Deploy GitHub Pages

---

## Entrega Final

Repositório completo, versionado, publicado em GitHub Pages com URL acessível.
