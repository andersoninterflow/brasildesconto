# BRASIL DESCONTO – Checklist de Testes

## Testes Funcionais

### Portal (index.html)

- [ ] Home carrega sem erros (F12 → Console)
- [ ] Lista de ofertas renderiza
- [ ] Imagens carregam corretamente
- [ ] Clique em produto abre detalhe
- [ ] Botão "PEGAR DESCONTO" abre nova aba com URL correta

### Busca e Filtros

- [ ] Campo de busca funciona
- [ ] Resultados atualizam em tempo real
- [ ] Filtro por categoria funciona
- [ ] Filtro por faixa de preço funciona
- [ ] Combinar múltiplos filtros funciona
- [ ] "Limpar filtros" reseta tudo

### Página de Produto

- [ ] Carrega corretamente via URL (#/product/:id)
- [ ] Galeria de imagens funciona (previous/next)
- [ ] Preço e descrição visíveis
- [ ] Informações de cupom (se houver)
- [ ] Botão "PEGAR DESCONTO" funciona

### Admin (admin/index.html)

- [ ] Página carrega
- [ ] Listar ofertas funcionam
- [ ] Botão "Criar oferta" abre formulário
- [ ] Validação de campos:
  - [ ] Título obrigatório
  - [ ] Preço obrigatório e > 0
  - [ ] URL válida (affiliateUrl)
  - [ ] Categoria existe
- [ ] Criar nova oferta: salva em localStorage
- [ ] Editar oferta: altera corretamente
- [ ] Remover oferta: solicita confirmação
- [ ] Export JSON: gera arquivo válido
- [ ] Import JSON: carrega arquivo

### Rastreamento de Cliques

- [ ] Clique em "PEGAR DESCONTO" registra em localStorage
- [ ] localStorage salva em format correto: `{ productId: contagem }`
- [ ] Página "Mais Clicados" (se implementada) mostra ranking

---

## Testes Responsivos

### Mobile (< 480px)

- [ ] Layout não quebra
- [ ] Menu responsivo funciona
- [ ] Imagens escalam corretamente
- [ ] Botões clicáveis (min 44x44px)
- [ ] Busca acessível
- [ ] Admin não quebra

### Tablet (480px - 768px)

- [ ] Grid de ofertas reflow para 2 colunas
- [ ] Navegação clara
- [ ] Imagens legíveis

### Desktop (> 768px)

- [ ] Grid de ofertas em 3+ colunas
- [ ] Sidebar de filtros (se aplicável)
- [ ] Layout ótimo

---

## Testes PWA

### Service Worker

- [ ] DevTools → Application → Service Workers → "brasil-desconto" registrado
- [ ] Status: "activated and running"
- [ ] Cache criado: DevTools → Application → Cache → "brasil-desconto-v*"

### Offline

- [ ] DevTools → Network → marcar "Offline"
- [ ] Recarregar página
- [ ] offline.html aparece (ou página anterior cacheada)
- [ ] Mensagem clara: "Você está offline"
- [ ] Ativar rede novamente: funciona

### Installable

- [ ] Chrome Mobile: ícone "Instalar" aparece
- [ ] Android: adicionar à tela inicial → abre app
- [ ] iOS: Share → Add to Home Screen → abre app
- [ ] App instala com ícone oficial
- [ ] Splash screen mostra logo

### Manifest

- [ ] manifest.json válido (JSONLint)
- [ ] Ícones 16/32/192/512 presentes
- [ ] name e short_name corretos
- [ ] display: "standalone"
- [ ] theme_color e background_color

---

## Testes SEO

### Metas

- [ ] `<title>` presente e descritivo
- [ ] `<meta name="description">` presente
- [ ] `<meta name="viewport">` presente
- [ ] `<meta name="robots" content="index, follow">`
- [ ] Canonical link em cada página

### robots.txt

- [ ] Arquivo acessível: `https://seu-site/robots.txt`
- [ ] Conteúdo válido (User-agent, Disallow, Allow)
- [ ] Disallow: `/admin` (opcional, proteger admin)

### sitemap.xml

- [ ] Arquivo acessível: `https://seu-site/sitemap.xml`
- [ ] XML válido
- [ ] URLs corretas

### Schema.org

- [ ] Markup JSON-LD presentes (ofertas)
- [ ] Validar: https://schema.org/validator

### Lighthouse

Rodar no DevTools:

```
Lighthouse → Analyze page load
```

Metas:
- [ ] **Performance**: 90+
- [ ] **Accessibility**: 90+
- [ ] **Best Practices**: 90+
- [ ] **SEO**: 90+
- [ ] **PWA**: 90+

---

## Testes de Segurança

### XSS (Cross-Site Scripting)

- [ ] Tentar inserir `<script>alert('xss')</script>` no admin
- [ ] Verificar se é escapado (não executa)

### SQL Injection (N/A)

- Não aplicável (sem banco de dados)

### HTTPS

- [ ] Todos os recursos carregam via HTTPS
- [ ] Sem mixed content (HTTP + HTTPS)
- [ ] Certificado válido

### CSP (Content Security Policy)

- [ ] Sem erros no Console (DevTools)
- [ ] Scripts inline funcionam
- [ ] Recursos externos carregam

---

## Testes de Performance

### Carregamento

- [ ] Página inicial carrega em < 2s (3G lento)
- [ ] Bundles JS/CSS otimizados
- [ ] Imagens otimizadas (< 200KB cada)

### Memória

- [ ] Sem memory leaks (DevTools → Memory)
- [ ] localStorage não cresce infinitamente

### Velocidade

```bash
# Rodar lighthouse via CLI
npm install -g lighthouse
lighthouse https://seu-site --view
```

---

## Testes de Acessibilidade

### Keyboard Navigation

- [ ] Tab navega por todos os elementos
- [ ] Enter ativa botões
- [ ] Esc fecha modais
- [ ] Focus visível em todos os elementos

### Screen Reader (NVDA/JAWS/VoiceOver)

- [ ] Títulos lidos corretamente
- [ ] Imagens têm alt text
- [ ] Botões têm labels
- [ ] Formulários têm labels

### Contrast

- [ ] Texto: ratio 4.5:1 (WCAG AA)
- [ ] Validar: https://webaim.org/resources/contrastchecker/

### WAVE Accessibility Checker

- [ ] Extensão Firefox/Chrome
- [ ] Sem erros críticos
- [ ] Warnings resolvidos

---

## Testes de Dados

### JSON Válido

```bash
# Validar JSON
cat data/products.json | jq . > /dev/null && echo "Valid"
cat data/categories.json | jq . > /dev/null && echo "Valid"
```

- [ ] `data/products.json` válido
- [ ] `data/categories.json` válido
- [ ] Todos os campos obrigatórios presentes
- [ ] URLs relativas funcionam

### Dados de Exemplo

- [ ] 5+ ofertas de exemplo
- [ ] 3+ categorias
- [ ] Preços diversos
- [ ] Múltiplas imagens

---

## Testes Cross-Browser

### Desktop

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile

- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Firefox Mobile (Android)

---

## Testes em GitHub Pages

- [ ] Deploy bem-sucedido
- [ ] URL acessível: `https://usuario.github.io/brasil-desconto/`
- [ ] Todos os testes acima passam
- [ ] Service Worker funciona no domínio GitHub Pages
- [ ] HTTPS ativo

---

## Checklist Final de Lançamento

- [ ] SPRINT 0: ✅ Bootstrap
- [ ] SPRINT 1: ✅ Dados JSON
- [ ] SPRINT 2: ✅ Portal
- [ ] SPRINT 3: ✅ Admin
- [ ] SPRINT 4: ✅ PWA
- [ ] SPRINT 5: ✅ SEO
- [ ] SPRINT 6: ✅ Deploy

- [ ] Todos os testes funcionais passam
- [ ] Todos os testes responsivos passam
- [ ] PWA instalável
- [ ] Lighthouse 90+ (todas as métricas)
- [ ] Sem erros no Console
- [ ] Sem avisos de segurança
- [ ] Documentação completa
- [ ] README.md atualizado

**Status**: ✅ Pronto para lançamento
