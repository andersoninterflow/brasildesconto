/* ============================================
   BRASIL DESCONTO - App.js
   Lógica do portal (busca, filtros, renderização)
   ============================================ */

class BrasilDescontoApp {
  constructor() {
    this.products = [];
    this.categories = [];
    this.filteredProducts = [];
    this.currentPage = 'home';
    this.currentProductId = null;
    
    this.init();
  }
  
  async init() {
    await this.loadData();
    this.setupEventListeners();
    this.route();
    window.addEventListener('hashchange', () => this.route());
  }
  
  async loadData() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('data/products.json'),
        fetch('data/categories.json')
      ]);
      
      this.products = await productsRes.json();
      this.categories = await categoriesRes.json();
      this.filteredProducts = [...this.products];
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }
  
  setupEventListeners() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const categoryFilter = document.getElementById('category-filter');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    
    if (searchBtn) searchBtn.addEventListener('click', () => this.handleSearch());
    if (searchInput) searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => this.clearFilters());
    if (categoryFilter) categoryFilter.addEventListener('change', () => this.applyFilters());
    if (priceMinInput) priceMinInput.addEventListener('change', () => this.applyFilters());
    if (priceMaxInput) priceMaxInput.addEventListener('change', () => this.applyFilters());
  }
  
  route() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, query] = hash.split('?');
    
    document.body.innerHTML = '';
    
    if (path === '/' || path === '') {
      this.renderHome();
    } else if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '');
      this.renderProduct(id);
    } else if (path.startsWith('/category/')) {
      const id = path.replace('/category/', '');
      this.renderCategory(id);
    } else if (path === '/search') {
      const params = new URLSearchParams(query);
      const q = params.get('q') || '';
      this.renderSearch(q);
    } else if (path === '/admin') {
      window.location.href = '#/admin/index.html';
    } else {
      this.renderHome();
    }
  }
  
  renderLayout() {
    const container = document.createElement('div');
    container.innerHTML = `
      <header>
        <nav>
          <div class="logo">
            <img src="assets/img/logo-oficial.svg" alt="Brasil Desconto">
            <span>Brasil Desconto</span>
          </div>
          <button class="menu-toggle" id="menu-toggle">☰</button>
          <ul class="nav-links">
            <li><a href="#/">Home</a></li>
            <li><a href="#/">Ofertas</a></li>
            <li><a href="#/admin">Admin</a></li>
          </ul>
        </nav>
      </header>
      <main id="main-content"></main>
      <footer>
        <p>&copy; 2026 Brasil Desconto. Portal de ofertas e cupons brasileiros.</p>
        <p><small>PWA | Offline-ready | 100% estático</small></p>
      </footer>
    `;
    
    document.body.appendChild(container);
    
    document.getElementById('menu-toggle').addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  
  renderHome() {
    this.renderLayout();
    const main = document.getElementById('main-content');
    
    const activeProducts = this.products.filter(p => p.active).slice(0, 10);
    
    main.innerHTML = `
      <section class="hero">
        <h1>Bem-vindo ao Brasil Desconto</h1>
        <p>Encontre as melhores ofertas e cupons do Brasil</p>
      </section>
      
      <section class="categories">
        ${this.categories.map(cat => `
          <div class="category-card" onclick="window.location.hash='#/category/${cat.id}'">
            <div class="category-card-icon">${cat.icon}</div>
            <div class="category-card-name">${cat.name}</div>
          </div>
        `).join('')}
      </section>
      
      <h2>Ofertas em Destaque</h2>
      
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="Buscar ofertas..." />
        <button id="search-btn">🔍 Buscar</button>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label for="category-filter">Categoria:</label>
          <select id="category-filter">
            <option value="">Todas</option>
            ${this.categories.map(cat => `
              <option value="${cat.id}">${cat.name}</option>
            `).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label for="price-min">Preço Mín (R$):</label>
          <input type="number" id="price-min" min="0" step="10" />
        </div>
        <div class="filter-group">
          <label for="price-max">Preço Máx (R$):</label>
          <input type="number" id="price-max" min="0" step="10" />
        </div>
        <button class="clear-filters" id="clear-filters">Limpar Filtros</button>
      </div>
      
      <div class="products-grid">
        ${activeProducts.map(product => this.renderProductCard(product)).join('')}
      </div>
    `;
    
    this.setupEventListeners();
  }
  
  renderProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const categoryName = this.categories.find(c => c.id === product.categoryId)?.name || 'Geral';
    
    return `
      <div class="product-card" onclick="window.location.hash='#/product/${product.id}'">
        <img src="${product.imageUrls?.[0] || 'https://via.placeholder.com/250x200?text=Produto'}" 
             alt="${product.title}" 
             onerror="this.src='https://via.placeholder.com/250x200?text=Sem+Imagem'">
        <div class="product-card-content">
          <div class="product-card-title">${this.truncate(product.title, 60)}</div>
          <div class="product-card-category">${categoryName}</div>
          <div class="product-card-price">
            <span class="price-original">R$ ${product.originalPrice.toFixed(2)}</span>
            <span class="price-current">R$ ${product.price.toFixed(2)}</span>
            ${discount > 0 ? `<span class="price-discount">-${discount}%</span>` : ''}
          </div>
          <button>Ver Oferta</button>
        </div>
      </div>
    `;
  }
  
  renderProduct(productId) {
    this.renderLayout();
    const main = document.getElementById('main-content');
    const product = this.products.find(p => p.id === productId);
    
    if (!product) {
      main.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">❌</div>
          <h2>Produto não encontrado</h2>
          <p><a href="#/">← Voltar para Home</a></p>
        </div>
      `;
      return;
    }
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const categoryName = this.categories.find(c => c.id === product.categoryId)?.name || 'Geral';
    
    main.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <a href="#/">← Voltar</a>
      </div>
      
      <div class="product-detail">
        <div class="product-gallery">
          <div class="product-gallery-main">
            <img id="gallery-main" src="${product.imageUrls?.[0] || 'https://via.placeholder.com/600x400'}" 
                 alt="${product.title}"
                 onerror="this.src='https://via.placeholder.com/600x400?text=Imagem+não+disponível'">
          </div>
          ${product.imageUrls && product.imageUrls.length > 1 ? `
            <div class="product-gallery-thumbs">
              ${product.imageUrls.map((img, idx) => `
                <img src="${img}" 
                     alt="Foto ${idx + 1}"
                     class="gallery-thumb ${idx === 0 ? 'active' : ''}"
                     onclick="document.getElementById('gallery-main').src = '${img}'; document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active')); this.classList.add('active');"
                     onerror="this.src='https://via.placeholder.com/80x80?text=Imagem'">
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        <div class="product-info">
          <h1>${product.title}</h1>
          <span class="product-info-category">${categoryName}</span>
          
          <div class="product-info-price">
            <span class="original">R$ ${product.originalPrice.toFixed(2)}</span>
            <span class="current">R$ ${product.price.toFixed(2)}</span>
            ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
          </div>
          
          ${product.coupon ? `
            <div class="product-info-coupon">
              <strong>Cupom:</strong> ${product.coupon}
            </div>
          ` : ''}
          
          <div class="product-info-description">
            ${product.description}
          </div>
          
          ${product.expiresAt ? `
            <p style="color: #e74c3c; font-weight: 600;">
              ⏰ Oferta válida até ${new Date(product.expiresAt).toLocaleDateString('pt-BR')}
            </p>
          ` : ''}
          
          <button onclick="this.recordClick('${productId}'); window.open('${product.affiliateUrl}', '_blank');">
            🎁 PEGAR DESCONTO
          </button>
        </div>
      </div>
    `;
    
    this.recordClick(productId);
  }
  
  recordClick(productId) {
    const clicks = JSON.parse(localStorage.getItem('productClicks') || '{}');
    clicks[productId] = (clicks[productId] || 0) + 1;
    localStorage.setItem('productClicks', JSON.stringify(clicks));
  }
  
  renderCategory(categoryId) {
    this.renderLayout();
    const main = document.getElementById('main-content');
    const category = this.categories.find(c => c.id === categoryId);
    
    if (!category) {
      main.innerHTML = '<div class="empty-state"><h2>Categoria não encontrada</h2></div>';
      return;
    }
    
    const categoryProducts = this.products.filter(p => p.categoryId === categoryId && p.active);
    
    main.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <a href="#/">← Voltar</a>
      </div>
      
      <h1>${category.icon} ${category.name}</h1>
      <p>${category.description || ''}</p>
      
      ${categoryProducts.length === 0 ? `
        <div class="empty-state">
          <p>Nenhuma oferta disponível nesta categoria.</p>
        </div>
      ` : `
        <div class="products-grid">
          ${categoryProducts.map(product => this.renderProductCard(product)).join('')}
        </div>
      `}
    `;
  }
  
  renderSearch(query) {
    this.renderLayout();
    const main = document.getElementById('main-content');
    
    const searchResults = this.products.filter(p => 
      p.active && (
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    main.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <a href="#/">← Voltar</a>
      </div>
      
      <h1>Resultados para: "${this.escapeHtml(query)}"</h1>
      <p>Encontrados ${searchResults.length} resultado(s)</p>
      
      ${searchResults.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h2>Nenhum resultado encontrado</h2>
          <p>Tente buscar por outro termo</p>
        </div>
      ` : `
        <div class="products-grid">
          ${searchResults.map(product => this.renderProductCard(product)).join('')}
        </div>
      `}
    `;
  }
  
  handleSearch() {
    const input = document.getElementById('search-input');
    const query = input?.value?.trim();
    if (query) {
      window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
    }
  }
  
  applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceMin = parseFloat(document.getElementById('price-min')?.value || 0);
    const priceMax = parseFloat(document.getElementById('price-max')?.value || Infinity);
    const selectedCategory = categoryFilter?.value;
    
    this.filteredProducts = this.products.filter(p => {
      if (!p.active) return false;
      if (selectedCategory && p.categoryId !== selectedCategory) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    });
    
    const main = document.getElementById('main-content');
    const gridContainer = main.querySelector('.products-grid');
    if (gridContainer) {
      gridContainer.innerHTML = this.filteredProducts.map(p => this.renderProductCard(p)).join('');
    }
  }
  
  clearFilters() {
    document.getElementById('category-filter').value = '';
    document.getElementById('price-min').value = '';
    document.getElementById('price-max').value = '';
    this.filteredProducts = [...this.products];
    this.applyFilters();
  }
  
  truncate(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Inicializar app quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new BrasilDescontoApp();
  });
} else {
  new BrasilDescontoApp();
}
