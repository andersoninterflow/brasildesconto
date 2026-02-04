/* ============================================
   BRASIL DESCONTO - Admin.js
   Editor CRUD de ofertas
   ============================================ */

class AdminApp {
  constructor() {
    this.products = [];
    this.categories = [];
    this.editingId = null;
    this.init();
  }
  
  async init() {
    await this.loadData();
    this.render();
    this.setupEventListeners();
  }
  
  async loadData() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('../data/products.json'),
        fetch('../data/categories.json')
      ]);
      
      this.products = await productsRes.json();
      this.categories = await categoriesRes.json();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.showAlert('Erro ao carregar dados', 'danger');
    }
  }
  
  render() {
    const container = document.getElementById('admin-container');
    container.innerHTML = `
      <header>
        <h1>🎛️ Painel Admin - Brasil Desconto</h1>
        <p>Gerencie suas ofertas</p>
      </header>
      
      <main>
        <div id="alerts-container"></div>
        
        <div class="stats">
          <div class="stat-card">
            <h3>Total de Ofertas</h3>
            <div class="stat-value">${this.products.length}</div>
          </div>
          <div class="stat-card">
            <h3>Ativas</h3>
            <div class="stat-value">${this.products.filter(p => p.active).length}</div>
          </div>
          <div class="stat-card">
            <h3>Categorias</h3>
            <div class="stat-value">${this.categories.length}</div>
          </div>
        </div>
        
        <div style="margin: 2rem 0;">
          <button class="btn-primary" onclick="adminApp.openEditModal()">
            ➕ Criar Nova Oferta
          </button>
        </div>
        
        <h2>Minhas Ofertas</h2>
        
        ${this.products.length === 0 ? `
          <div class="alert alert-info">
            <span>ℹ️</span>
            <p>Nenhuma oferta criada. <button class="btn-secondary" onclick="adminApp.openEditModal()">Criar primeira oferta</button></p>
          </div>
        ` : `
          <div class="products-list">
            ${this.products.map(product => this.renderProductItem(product)).join('')}
          </div>
        `}
        
        <div class="export-box">
          <h3>📥 Exportar Dados</h3>
          <p>Clique para baixar o arquivo JSON com todas as suas ofertas. Substitua o arquivo <code>data/products.json</code> no repositório GitHub.</p>
          <button class="btn-success" onclick="adminApp.exportJSON()">
            📥 Exportar products.json
          </button>
        </div>
        
        <div class="export-box">
          <h3>📤 Importar Dados</h3>
          <p>Substitua as ofertas com um arquivo JSON exportado anteriormente.</p>
          <input type="file" id="import-file" accept=".json" style="display: block; margin-bottom: 1rem;">
          <button class="btn-secondary" onclick="adminApp.importJSON()">
            📤 Importar products.json
          </button>
        </div>
      </main>
      
      <footer>
        <p>&copy; 2026 Brasil Desconto</p>
      </footer>
      
      <div id="edit-modal" class="modal">
        <div class="modal-content">
          <button class="modal-close" onclick="adminApp.closeEditModal()">✕</button>
          <form id="product-form" onsubmit="adminApp.handleFormSubmit(event)">
            <h2 id="form-title">Criar Oferta</h2>
            
            <div class="form-group">
              <label for="product-title">Título *</label>
              <input type="text" id="product-title" required maxlength="200">
            </div>
            
            <div class="form-group">
              <label for="product-description">Descrição *</label>
              <textarea id="product-description" required></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="product-category">Categoria *</label>
                <select id="product-category" required>
                  <option value="">Selecionar...</option>
                  ${this.categories.map(cat => `
                    <option value="${cat.id}">${cat.name}</option>
                  `).join('')}
                </select>
              </div>
              
              <div class="form-group">
                <label for="product-active">Status</label>
                <select id="product-active">
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="product-price">Preço (R$) *</label>
                <input type="number" id="product-price" step="0.01" min="0" required>
              </div>
              
              <div class="form-group">
                <label for="product-original-price">Preço Original (R$) *</label>
                <input type="number" id="product-original-price" step="0.01" min="0" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="product-coupon">Cupom (opcional)</label>
              <input type="text" id="product-coupon" placeholder="Ex: BRASIL15" maxlength="50">
            </div>
            
            <div class="form-group">
              <label for="product-affiliate-url">Link da Oferta (URL) *</label>
              <input type="url" id="product-affiliate-url" required placeholder="https://example.com/...">
            </div>
            
            <div class="form-group">
              <label for="product-image-urls">URLs de Imagens (separadas por vírgula)</label>
              <textarea id="product-image-urls" placeholder="https://example.com/img1.jpg,https://example.com/img2.jpg"></textarea>
            </div>
            
            <div class="form-group">
              <label for="product-expires">Data de Expiração (opcional)</label>
              <input type="date" id="product-expires">
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-success">💾 Salvar</button>
              <button type="button" class="btn-secondary" onclick="adminApp.closeEditModal()">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  
  renderProductItem(product) {
    const category = this.categories.find(c => c.id === product.categoryId);
    const image = product.imageUrls?.[0] || 'https://via.placeholder.com/80x80?text=Sem+Imagem';
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return `
      <div class="product-item">
        <img src="${image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/80x80?text=Imagem'">
        
        <div class="product-item-info">
          <h3>${this.truncate(product.title, 50)}</h3>
          <p>🏷️ ${category?.name || 'Sem categoria'}</p>
          <p>💰 R$ ${product.price.toFixed(2)} <small>(era R$ ${product.originalPrice.toFixed(2)})</small></p>
          <p>📊 Cliques: ${this.getClickCount(product.id)}</p>
          <p>${product.active ? '✅ Ativo' : '❌ Inativo'}</p>
        </div>
        
        <div class="product-item-actions">
          <button class="btn-secondary btn-small" onclick="adminApp.openEditModal('${product.id}')">
            ✏️ Editar
          </button>
          <button class="btn-danger btn-small" onclick="adminApp.deleteProduct('${product.id}')">
            🗑️ Remover
          </button>
        </div>
      </div>
    `;
  }
  
  setupEventListeners() {
    // Event listeners já configurados via onclick
  }
  
  openEditModal(productId = null) {
    this.editingId = productId;
    const modal = document.getElementById('edit-modal');
    const form = document.getElementById('product-form');
    
    if (productId) {
      const product = this.products.find(p => p.id === productId);
      document.getElementById('form-title').textContent = 'Editar Oferta';
      document.getElementById('product-title').value = product.title;
      document.getElementById('product-description').value = product.description;
      document.getElementById('product-category').value = product.categoryId;
      document.getElementById('product-active').value = product.active;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-original-price').value = product.originalPrice;
      document.getElementById('product-coupon').value = product.coupon || '';
      document.getElementById('product-affiliate-url').value = product.affiliateUrl;
      document.getElementById('product-image-urls').value = (product.imageUrls || []).join(',');
      document.getElementById('product-expires').value = product.expiresAt ? 
        product.expiresAt.split('T')[0] : '';
    } else {
      document.getElementById('form-title').textContent = 'Criar Oferta';
      form.reset();
    }
    
    modal.classList.add('active');
  }
  
  closeEditModal() {
    document.getElementById('edit-modal').classList.remove('active');
    this.editingId = null;
  }
  
  handleFormSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('product-title').value.trim();
    const description = document.getElementById('product-description').value.trim();
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const originalPrice = parseFloat(document.getElementById('product-original-price').value);
    const coupon = document.getElementById('product-coupon').value.trim();
    const affiliateUrl = document.getElementById('product-affiliate-url').value.trim();
    const imageUrls = document.getElementById('product-image-urls').value
      .split(',')
      .map(url => url.trim())
      .filter(url => url);
    const active = document.getElementById('product-active').value === 'true';
    const expiresAt = document.getElementById('product-expires').value;
    
    // Validação
    if (!title || title.length < 5) {
      this.showAlert('Título deve ter pelo menos 5 caracteres', 'danger');
      return;
    }
    
    if (!description || description.length < 10) {
      this.showAlert('Descrição deve ter pelo menos 10 caracteres', 'danger');
      return;
    }
    
    if (price <= 0 || originalPrice <= 0) {
      this.showAlert('Preços devem ser maiores que zero', 'danger');
      return;
    }
    
    if (price > originalPrice) {
      this.showAlert('Preço com desconto deve ser menor que o preço original', 'danger');
      return;
    }
    
    if (!category) {
      this.showAlert('Selecione uma categoria', 'danger');
      return;
    }
    
    if (!affiliateUrl.startsWith('http')) {
      this.showAlert('URL da oferta inválida', 'danger');
      return;
    }
    
    if (this.editingId) {
      // Editar existente
      const product = this.products.find(p => p.id === this.editingId);
      product.title = title;
      product.description = description;
      product.categoryId = category;
      product.price = price;
      product.originalPrice = originalPrice;
      product.coupon = coupon;
      product.affiliateUrl = affiliateUrl;
      product.imageUrls = imageUrls;
      product.active = active;
      product.expiresAt = expiresAt ? new Date(expiresAt).toISOString() : product.expiresAt;
      product.updatedAt = new Date().toISOString();
      
      this.showAlert('Oferta atualizada!', 'success');
    } else {
      // Criar novo
      const newProduct = {
        id: 'prod-' + Date.now(),
        title,
        description,
        categoryId: category,
        price,
        originalPrice,
        coupon,
        affiliateUrl,
        imageUrls: imageUrls.length > 0 ? imageUrls : ['https://via.placeholder.com/250x200?text=Produto'],
        active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined
      };
      
      this.products.push(newProduct);
      this.showAlert('Oferta criada com sucesso!', 'success');
    }
    
    this.closeEditModal();
    this.render();
    this.setupEventListeners();
  }
  
  deleteProduct(productId) {
    if (confirm('Tem certeza que deseja remover esta oferta?')) {
      this.products = this.products.filter(p => p.id !== productId);
      this.showAlert('Oferta removida!', 'success');
      this.render();
      this.setupEventListeners();
    }
  }
  
  exportJSON() {
    const json = JSON.stringify(this.products, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    
    this.showAlert('JSON exportado! Substitua data/products.json no repositório.', 'success');
  }
  
  importJSON() {
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];
    
    if (!file) {
      this.showAlert('Selecione um arquivo JSON', 'danger');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        
        if (!Array.isArray(imported)) {
          throw new Error('Arquivo deve ser um array');
        }
        
        this.products = imported;
        fileInput.value = '';
        this.showAlert('Dados importados com sucesso!', 'success');
        this.render();
        this.setupEventListeners();
      } catch (error) {
        this.showAlert(`Erro ao importar: ${error.message}`, 'danger');
      }
    };
    
    reader.readAsText(file);
  }
  
  showAlert(message, type = 'info') {
    const container = document.getElementById('alerts-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <span>${type === 'success' ? '✅' : type === 'danger' ? '❌' : 'ℹ️'}</span>
      <p>${message}</p>
    `;
    
    container.appendChild(alert);
    
    setTimeout(() => alert.remove(), 5000);
  }
  
  getClickCount(productId) {
    try {
      const clicks = JSON.parse(localStorage.getItem('productClicks') || '{}');
      return clicks[productId] || 0;
    } catch {
      return 0;
    }
  }
  
  truncate(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
}

let adminApp;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    adminApp = new AdminApp();
  });
} else {
  adminApp = new AdminApp();
}
