# BRASIL DESCONTO – Deploy em GitHub Pages

## Pré-requisitos

- Repositório GitHub criado: `https://github.com/seu-usuario/brasil-desconto`
- Git instalado localmente
- Código completo (todos os sprints)

---

## Passo a Passo

### 1. Clonar o Repositório (ou criar novo)

```bash
# Se já existe
git clone https://github.com/seu-usuario/brasil-desconto.git
cd brasil-desconto

# Se é novo
mkdir brasil-desconto
cd brasil-desconto
git init
git remote add origin https://github.com/seu-usuario/brasil-desconto.git
```

### 2. Copiar Arquivos do Projeto

Certifique-se que todos os arquivos estão presentes:

```
brasil-desconto/
├── index.html
├── offline.html
├── manifest.json
├── service-worker.js
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── app.css
│   │   └── admin.css
│   ├── js/
│   │   ├── app.js
│   │   ├── pwa.js
│   │   └── admin.js
│   └── img/
│       ├── logo-oficial.png
│       └── icons/
│           ├── icon-16.png
│           ├── icon-32.png
│           ├── icon-192.png
│           └── icon-512.png
├── data/
│   ├── products.json
│   └── categories.json
├── admin/
│   └── index.html
└── docs/
    ├── ESCOPO.md
    ├── TECNICO.md
    ├── DEPLOY_GITHUB_PAGES.md
    └── CHECKLIST_TESTES.md
```

### 3. Configurar para GitHub Pages

GitHub Pages requer que os arquivos raiz estejam na pasta `/` ou em `/docs`.

**Opção A: Raiz do repositório (recomendado)**

Arquivos já estão em `/`. Nada a fazer.

**Opção B: Pasta `/docs` (alternativo)**

Se preferir, copie tudo para `/docs`:

```bash
mkdir docs
cp -r assets data admin index.html offline.html manifest.json service-worker.js robots.txt sitemap.xml docs/
```

### 4. Fazer Push para GitHub

```bash
git add .
git commit -m "Deploy Brasil Desconto v1.0"
git push -u origin main
```

### 5. Habilitar GitHub Pages

1. Acesse: **https://github.com/seu-usuario/brasil-desconto/settings**
2. Scroll até **"Pages"** (esquerda)
3. Em **"Build and deployment"**:
   - **Source**: selecione `Deploy from a branch`
   - **Branch**: selecione `main` e pasta `/` (raiz)
4. Clique **Save**

GitHub Pages iniciará o build automático. Aguarde 1-2 minutos.

### 6. Validar Publicação

Você verá uma mensagem verde: *"Your site is live at https://seu-usuario.github.io/brasil-desconto/"*

Abra essa URL no navegador e valide:

- [ ] Home carrega
- [ ] Ofertas renderizam
- [ ] Busca funciona
- [ ] Admin acessível em `/#/admin`
- [ ] Offline funciona (devtools → Offline)
- [ ] PWA instalável

### 7. Configurar Domínio Customizado (Opcional)

Se tiver um domínio próprio:

1. **Configurar DNS**:
   - Apontar seu domínio para GitHub Pages
   - Instruções: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

2. **No Settings → Pages**:
   - Adicionar domínio em **"Custom domain"**
   - GitHub criará arquivo `CNAME` automaticamente

### 8. Configurar HTTPS (Automático)

GitHub Pages fornece HTTPS automaticamente. Ative:

1. Settings → Pages
2. Marque **"Enforce HTTPS"** (pode levar alguns minutos)

---

## Atualizando Ofertas

Para atualizar `data/products.json`:

1. Use o painel admin (`/#/admin`)
2. Edite/crie ofertas
3. Clique **Export JSON**
4. Substitua `data/products.json` no repositório
5. Faça push:

```bash
git add data/products.json
git commit -m "Atualizar ofertas"
git push
```

GitHub Pages atualiza automaticamente em 1-2 minutos.

---

## Troubleshooting

### Página não aparece

- Verificar se branch é `main` e pasta é `/`
- Aguardar 2-3 minutos após push
- Limpar cache do navegador (Ctrl+Shift+Del)

### 404 em subrotas (como `/admin`)

- Usar hash navigation: `/#/admin` em vez de `/admin`
- Criar arquivo `404.html` com redirect (avançado)

### Service Worker não atualiza

- Limpar cache do navegador
- Desregistrar SW: DevTools → Application → Service Workers → Unregister

### Imagens não carregam

- Verificar paths (devem ser relativos: `assets/img/...`)
- Confirmar que imagens estão no repositório

---

## CI/CD (Avançado)

GitHub Actions pode automatizar builds (se adicionar build tools futuramente):

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Monitoramento

### Analytics (Futuro)

Quando pronto para análise avançada, integrar:
- Google Analytics (adicionar script)
- Matomo self-hosted
- Plausible Analytics

Por enquanto, usar `localStorage` para cliques locais.

### Lighthouse

Validar regularmente:

```bash
# Via Google Lighthouse (Chrome)
# DevTools → Lighthouse → Analyze page load
```

Metas:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 90+

---

## Segurança

- ✅ HTTPS obrigatório (GitHub Pages)
- ✅ No login/senha necessário (estático)
- ⚠️ Admin local: proteger computador
- ⚠️ Dados públicos: não incluir sensível

---

## Checklist Final

- [ ] Todos os arquivos no repositório
- [ ] GitHub Pages ativado
- [ ] URL acessível
- [ ] Home carrega
- [ ] Ofertas renderizam
- [ ] Busca/filtros funcionam
- [ ] Admin funciona
- [ ] Offline funciona
- [ ] PWA instalável
- [ ] HTTPS ativo
- [ ] Metas SEO presentes

---

## URLs Importantes

- **Portal**: https://seu-usuario.github.io/brasil-desconto/
- **Admin**: https://seu-usuario.github.io/brasil-desconto/#/admin
- **Repositório**: https://github.com/seu-usuario/brasil-desconto
- **Settings**: https://github.com/seu-usuario/brasil-desconto/settings

---

## Suporte

Documentação oficial: https://docs.github.com/en/pages
