/**
 * SYNTHEX MAIN APPLICATION CONTROLLER
 * Handles View Rendering, Routing, User Interactions, Modals, and Cart.
 */

// Toast notification helper
window.showToast = function(msg, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-slide-in`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-msg">${msg}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

class SynthexApp {
  constructor() {
    this.currentView = 'home';
    this.shopFilter = 'all';
    this.projectFilter = 'all';
    this.adminTab = 'terminal';
    this.terminalInstance = null;
    this.searchQuery = '';
  }

  init() {
    this.bindGlobalEvents();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Subscribe to store updates
    window.store.subscribe((state) => {
      this.updateNavbar();
      this.updateCartBadge();
      if (this.currentView === 'shop') this.renderShop();
      if (this.currentView === 'projects') this.renderProjects();
      if (this.currentView === 'admin') this.renderAdmin();
      if (this.currentView === 'login') this.renderLogin();
    });

    this.updateNavbar();
    this.updateCartBadge();
  }

  bindGlobalEvents() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });
    }

    const cartBtn = document.getElementById('navCartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');

    if (cartBtn) cartBtn.addEventListener('click', () => this.openCart());
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => this.closeCart());
    if (cartOverlay) cartOverlay.addEventListener('click', () => this.closeCart());
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const validViews = ['home', 'shop', 'projects', 'about', 'login', 'admin'];
    this.currentView = validViews.includes(hash) ? hash : 'home';

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${this.currentView}`);
    });

    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('mobile-open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderCurrentView();
  }

  renderCurrentView() {
    const main = document.getElementById('mainContent');
    if (!main) return;

    switch (this.currentView) {
      case 'home':
        this.renderHome();
        break;
      case 'shop':
        this.renderShop();
        break;
      case 'projects':
        this.renderProjects();
        break;
      case 'about':
        this.renderAbout();
        break;
      case 'login':
        this.renderLogin();
        break;
      case 'admin':
        this.renderAdmin();
        break;
    }
  }

  /* ================== NAVBAR & CART UI ================== */

  updateNavbar() {
    const user = window.store.getCurrentUser();
    const authBtn = document.getElementById('navAuthBtn');
    const adminLink = document.getElementById('navAdminLink');

    if (adminLink) {
      adminLink.style.display = (user && user.role === 'admin') ? 'inline-flex' : 'none';
    }

    if (authBtn) {
      if (user) {
        authBtn.innerHTML = `
          <div class="user-pill">
            <span class="user-avatar">${user.avatar || '👤'}</span>
            <span class="user-name">${user.name.split(' ')[0]}</span>
            <span class="user-role-badge ${user.role}">${user.role.toUpperCase()}</span>
          </div>
        `;
        authBtn.onclick = () => {
          if (user.role === 'admin') {
            window.location.hash = '#admin';
          } else {
            window.location.hash = '#login';
          }
        };
      } else {
        authBtn.innerHTML = `<span>Acceder / Login</span> <span class="nav-btn-icon">→</span>`;
        authBtn.onclick = () => { window.location.hash = '#login'; };
      }
    }
  }

  updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const count = window.store.getCartCount();
    if (badge) {
      badge.innerText = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    this.renderCartDrawerContent();
  }

  openCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    this.renderCartDrawerContent();
  }

  closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  renderCartDrawerContent() {
    const list = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalVal');
    const footerEl = document.getElementById('cartDrawerFooter');
    if (!list) return;

    const cart = window.store.state.cart;
    const total = window.store.getCartTotal();

    if (cart.length === 0) {
      list.innerHTML = `
        <div class="empty-cart-state">
          <span class="empty-cart-icon">🛒</span>
          <p>Tu carrito está vacío</p>
          <button class="btn btn-secondary btn-sm" onclick="SynthexAppInstance.closeCart(); window.location.hash='#shop';">
            Explorar Tienda
          </button>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';
    if (totalEl) totalEl.innerText = `$${total.toLocaleString()} MXN`;

    list.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toLocaleString()} MXN</div>
        </div>
        <div class="cart-qty-ctrls">
          <button class="qty-btn" onclick="window.store.updateCartQty('${item.productId}', ${item.qty - 1})">-</button>
          <span class="qty-val mono">${item.qty}</span>
          <button class="qty-btn" onclick="window.store.updateCartQty('${item.productId}', ${item.qty + 1})">+</button>
        </div>
        <button class="btn-remove-item" onclick="window.store.removeFromCart('${item.productId}')">✕</button>
      </div>
    `).join('');
  }

  checkoutCartWithStripe() {
    const cart = window.store.state.cart;
    if (cart.length === 0) {
      window.showToast("Agrega al menos un producto al carrito", "error");
      return;
    }
    const user = window.store.getCurrentUser();
    const customerData = user ? {
      name: user.name,
      email: user.email
    } : {
      name: "Cliente Invitado",
      email: "cliente.stripe@synthex.dev"
    };

    this.closeCart();
    window.StripeGateway.startCheckout(customerData, cart);
  }

  /* ================== VIEW: HOME ================== */

  renderHome() {
    const main = document.getElementById('mainContent');
    const products = window.store.state.products.slice(0, 4);
    const projects = window.store.state.projects.slice(0, 3);

    main.innerHTML = `
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="hero-glow-sphere top-left"></div>
        <div class="hero-glow-sphere bottom-right"></div>
        
        <div class="container hero-container">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>INGENIERÍA EN ROBÓTICA, BOTS & AUTOMATIZACIÓN</span>
            <span class="badge-tag">v4.2 PRO</span>
          </div>

          <h1 class="hero-title">
            Arquitectura de Software, <br/>
            <span class="gradient-text">Bots de Alto Rendimiento</span> <br/>
            & Robótica Avanzada
          </h1>

          <p class="hero-subtitle">
            Desarrollamos soluciones integrales de automatización, firmwares de control cinemático, bots inteligentes y herramientas de software de precisión con integración de pagos instantáneos por <strong>Stripe (Tarjetas, Apple Pay, Google Pay)</strong>.
          </p>

          <div class="hero-actions">
            <a href="#shop" class="btn btn-primary btn-lg">
              <span>Explorar Zona de Venta</span>
              <span class="btn-arrow">→</span>
            </a>
            <a href="#projects" class="btn btn-secondary btn-lg">
              <span>Ver Repositorio de Proyectos</span>
              <span class="btn-arrow">⚡</span>
            </a>
          </div>

          <!-- STATS BENTO ROW -->
          <div class="hero-stats-grid">
            <div class="stat-card">
              <div class="stat-num text-cyan">+1.5M</div>
              <div class="stat-label">Tareas Automatizadas / Mes</div>
            </div>
            <div class="stat-card">
              <div class="stat-num text-green">100%</div>
              <div class="stat-label">Pagos Seguros vía Stripe</div>
            </div>
            <div class="stat-card">
              <div class="stat-num text-purple">6-DOF</div>
              <div class="stat-label">Precisión en Robótica Cinemática</div>
            </div>
            <div class="stat-card">
              <div class="stat-num text-yellow">99.98%</div>
              <div class="stat-label">Uptime en Servidores & Bots</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURED PRODUCTS (TIENDA SHOWCASE) -->
      <section class="section-container">
        <div class="container">
          <div class="section-header">
            <div>
              <div class="section-pretitle">ZONA DE VENTA DESTACADA</div>
              <h2 class="section-title">Software, Bots & Hardware en Venta</h2>
            </div>
            <a href="#shop" class="btn-link">Ver todo el catálogo (${window.store.state.products.length} productos) →</a>
          </div>

          <div class="grid-4-col">
            ${products.map(p => this.renderProductCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- FEATURED PROJECTS (REPOSITORIO SHOWCASE) -->
      <section class="section-container bg-surface-dark">
        <div class="container">
          <div class="section-header">
            <div>
              <div class="section-pretitle">ALMACENAMIENTO & PORTAFOLIO</div>
              <h2 class="section-title">Proyectos de Ingeniería en Ejecución</h2>
            </div>
            <a href="#projects" class="btn-link">Explorar todos los proyectos →</a>
          </div>

          <div class="grid-3-col">
            ${projects.map(p => this.renderProjectCard(p)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /* ================== VIEW: SHOP (ZONA DE VENTA) ================== */

  renderShop() {
    const main = document.getElementById('mainContent');
    const categories = [
      { id: 'all', label: 'Todos los Productos' },
      { id: 'bots', label: 'Bots de Mensajería & Trading' },
      { id: 'robotica', label: 'Robótica & Hardware IoT' },
      { id: 'automatizacion', label: 'Automatización RPA & Scraping' },
      { id: 'programas', label: 'Programas & Software Dev' }
    ];

    let filtered = window.store.state.products;
    if (this.shopFilter !== 'all') {
      filtered = filtered.filter(p => p.category === this.shopFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.techStack.some(t => t.toLowerCase().includes(q)));
    }

    main.innerHTML = `
      <section class="page-header-section">
        <div class="container">
          <div class="page-header-badge">MARKETPLACE & SOFTWARE STORE</div>
          <h1 class="page-header-title">Zona de Venta</h1>
          <p class="page-header-desc">
            Adquiere programas listos para producción, bots automatizados y firmwares de robótica con entrega inmediata y pago seguro con <strong>Stripe</strong>.
          </p>
        </div>
      </section>

      <section class="section-container">
        <div class="container">
          <!-- SEARCH & FILTER BAR -->
          <div class="shop-filter-bar">
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input type="text" class="input-search" id="shopSearchInput" placeholder="Buscar por bot, tecnología (Python, ROS2, Node), robótica..." value="${this.searchQuery}" />
            </div>

            <div class="category-tabs">
              ${categories.map(c => `
                <button class="filter-tab ${this.shopFilter === c.id ? 'active' : ''}" onclick="SynthexAppInstance.setShopFilter('${c.id}')">
                  ${c.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- PRODUCTS GRID -->
          <div class="shop-results-info">
            <span>Mostrando <strong>${filtered.length}</strong> productos</span>
            <span class="stripe-accept-badge">💳 Aceptamos Stripe • Tarjetas, Apple Pay & Google Pay</span>
          </div>

          <div class="grid-4-col">
            ${filtered.length > 0 ? filtered.map(p => this.renderProductCard(p)).join('') : `
              <div class="no-results-state col-span-full">
                <span class="no-results-icon">🔎</span>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos o selecciona otra categoría.</p>
                <button class="btn btn-secondary" onclick="SynthexAppInstance.setShopFilter('all')">Ver todo</button>
              </div>
            `}
          </div>
        </div>
      </section>
    `;

    const searchInp = document.getElementById('shopSearchInput');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderShop();
      });
    }
  }

  setShopFilter(cat) {
    this.shopFilter = cat;
    this.renderShop();
  }

  renderProductCard(p) {
    return `
      <div class="product-card" id="card-${p.id}">
        <div class="product-card-top">
          <div class="product-icon-wrap">${p.icon}</div>
          <div class="product-badges">
            <span class="badge-tag">${p.tag}</span>
            ${p.badge ? `<span class="badge-highlight">${p.badge}</span>` : ''}
          </div>
        </div>

        <h3 class="product-title" onclick="SynthexAppInstance.openProductModal('${p.id}')">${p.name}</h3>
        <p class="product-summary">${p.summary}</p>

        <div class="product-tech-pills">
          ${p.techStack.slice(0, 3).map(t => `<span class="tech-pill">${t}</span>`).join('')}
          ${p.techStack.length > 3 ? `<span class="tech-pill text-muted">+${p.techStack.length - 3}</span>` : ''}
        </div>

        <div class="product-card-footer">
          <div class="product-price-box">
            <span class="product-price-label">Precio</span>
            <span class="product-price-val">$${p.price.toLocaleString()} <small>${p.currency}</small></span>
          </div>

          <div class="product-actions-btn-group">
            <button class="btn-icon-cart" title="Añadir al Carrito" onclick="SynthexAppInstance.handleAddToCart('${p.id}')">
              🛒
            </button>
            <button class="btn btn-primary btn-sm btn-stripe-buy" onclick="SynthexAppInstance.quickBuyStripe('${p.id}')">
              <span>Pagar con Stripe</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  handleAddToCart(id) {
    const ok = window.store.addToCart(id, 1);
    if (ok) {
      window.showToast("Producto añadido al carrito", "success");
      this.updateCartBadge();
      this.openCart();
    }
  }

  quickBuyStripe(id) {
    const prod = window.store.state.products.find(p => p.id === id);
    if (!prod) return;
    const user = window.store.getCurrentUser();
    const customerData = user ? { name: user.name, email: user.email } : { name: "Cliente Invitado", email: "cliente.quick@synthex.dev" };
    
    window.StripeGateway.startCheckout(customerData, [{
      productId: prod.id,
      name: prod.name,
      price: prod.price,
      icon: prod.icon,
      category: prod.category,
      qty: 1
    }]);
  }

  openProductModal(id) {
    const p = window.store.state.products.find(item => item.id === id);
    if (!p) return;

    let modal = document.getElementById('productDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'productDetailModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card product-modal-card">
        <div class="modal-header">
          <div class="flex-row items-center gap-3">
            <span class="product-modal-icon">${p.icon}</span>
            <div>
              <span class="badge-tag">${p.categoryLabel} • ${p.version}</span>
              <h2 class="modal-title">${p.name}</h2>
            </div>
          </div>
          <button class="modal-close-btn" onclick="document.getElementById('productDetailModal').classList.remove('active')">✕</button>
        </div>

        <div class="modal-body product-modal-body">
          <p class="modal-desc-lead">${p.description}</p>

          <div class="features-list-box">
            <h4>Características y Capacidades Incluidas:</h4>
            <ul>
              ${p.features.map(f => `<li><span class="check-icon">✓</span> ${f}</li>`).join('')}
            </ul>
          </div>

          <div class="tech-specs-box">
            <h4>Stack Tecnológico & Requisitos:</h4>
            <div class="tech-pills-row">
              ${p.techStack.map(t => `<span class="tech-badge-large">${t}</span>`).join('')}
            </div>
          </div>

          <div class="modal-purchase-strip">
            <div class="modal-price-box">
              <span class="price-lbl">Precio Total:</span>
              <span class="price-num text-green">$${p.price.toLocaleString()} ${p.currency}</span>
              <span class="stock-lbl">Stock disponible: ${p.stock} unidades</span>
            </div>
            <div class="modal-actions-btns">
              <button class="btn btn-secondary" onclick="SynthexAppInstance.handleAddToCart('${p.id}'); document.getElementById('productDetailModal').classList.remove('active');">
                🛒 Añadir al Carrito
              </button>
              <button class="btn btn-stripe-pay" onclick="document.getElementById('productDetailModal').classList.remove('active'); SynthexAppInstance.quickBuyStripe('${p.id}');">
                💳 Pagar Ahora con Stripe
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  /* ================== VIEW: PROJECTS ================== */

  renderProjects() {
    const main = document.getElementById('mainContent');
    const categories = [
      { id: 'all', label: 'Todos los Proyectos' },
      { id: 'robotica', label: 'Robótica & Hardware' },
      { id: 'automatizacion', label: 'Automatizaciones & Bots' },
      { id: 'programas', label: 'Software & Infraestructura' }
    ];

    let filtered = window.store.state.projects;
    if (this.projectFilter !== 'all') {
      filtered = filtered.filter(p => p.category === this.projectFilter);
    }

    main.innerHTML = `
      <section class="page-header-section">
        <div class="container">
          <div class="page-header-badge">REPOSITORIO & ALMACENAMIENTO</div>
          <h1 class="page-header-title">Zona de Proyectos</h1>
          <p class="page-header-desc">
            Galería y almacenamiento técnico de proyectos desarrollados por nuestro equipo. Consulta especificaciones de hardware, arquitecturas de software, telemetría y repositorios de código.
          </p>
        </div>
      </section>

      <section class="section-container">
        <div class="container">
          <div class="projects-filter-bar">
            <div class="category-tabs">
              ${categories.map(c => `
                <button class="filter-tab ${this.projectFilter === c.id ? 'active' : ''}" onclick="SynthexAppInstance.setProjectFilter('${c.id}')">
                  ${c.label}
                </button>
              `).join('')}
            </div>
            <div class="projects-stats-badge">
              <span>📊 ${window.store.state.projects.length} Proyectos Registrados</span>
            </div>
          </div>

          <div class="grid-3-col">
            ${filtered.map(p => this.renderProjectCard(p)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  setProjectFilter(cat) {
    this.projectFilter = cat;
    this.renderProjects();
  }

  renderProjectCard(p) {
    return `
      <div class="project-card">
        <div class="project-card-header">
          <div class="project-icon-badge">${p.icon}</div>
          <div class="project-status-pill" style="color: ${p.statusColor}; border-color: ${p.statusColor}44; background: ${p.statusColor}11;">
            <span class="pulse-dot" style="background: ${p.statusColor}"></span>
            <span>${p.statusLabel}</span>
          </div>
        </div>

        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>

        <div class="project-highlights-box">
          <span class="highlights-title">Aspectos Técnicos Destacados:</span>
          <ul>
            ${p.highlights.slice(0, 3).map(h => `<li>• ${h}</li>`).join('')}
          </ul>
        </div>

        <div class="project-tech-tags">
          ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>

        <div class="project-card-footer">
          <div class="project-meta">
            <span class="project-stars">⭐ ${p.stars}</span>
            <span class="project-year">Año ${p.year}</span>
          </div>
          <div class="project-actions">
            <a href="${p.githubUrl}" target="_blank" class="btn-project-link">
              <span>GitHub Repo</span> ↗
            </a>
          </div>
        </div>
      </div>
    `;
  }

  /* ================== VIEW: ABOUT ================== */

  renderAbout() {
    const main = document.getElementById('mainContent');
    const team = window.store.state.team;

    main.innerHTML = `
      <section class="page-header-section">
        <div class="container">
          <div class="page-header-badge">NUESTRA HISTORIA & EQUIPO</div>
          <h1 class="page-header-title">Acerca de Nosotros</h1>
          <p class="page-header-desc">
            Somos un colectivo de ingeniería en software, robótica y automatización enfocado en crear herramientas que resuelven problemas reales con código robusto y hardware de precisión.
          </p>
        </div>
      </section>

      <section class="section-container">
        <div class="container">
          <div class="about-story-grid">
            <div class="story-text-column">
              <div class="section-pretitle">GÉNESIS & VISIÓN</div>
              <h2 class="section-title">De las salas de desarrollo a la ingeniería aplicada</h2>
              <p class="story-paragraph">
                Nuestra iniciativa nació de la colaboración continua entre desarrolladores e ingenieros apasionados por la robótica, los bots de alta velocidad y la optimización de procesos. 
              </p>
              <p class="story-paragraph">
                Frente a la necesidad de contar con soluciones listas para producción —desde firmwares de control cinemático hasta agentes autónomos y pasarelas de pago globales como <strong>Stripe</strong>—, decidimos consolidar nuestro trabajo en una plataforma centralizada que combina una <strong>zona de venta directa</strong> con un <strong>almacenamiento de proyectos abiertos</strong>.
              </p>

              <div class="manifesto-box">
                <h4>Nuestros Pilares de Desarrollo:</h4>
                <div class="manifesto-item">
                  <span class="manifesto-icon">🎯</span>
                  <div>
                    <strong>Precisión Matemática y Código Limpio:</strong>
                    <span>Cada bot y firmware está optimizado para consumir el mínimo de recursos y garantizar un tiempo de respuesta inferior a 50 ms.</span>
                  </div>
                </div>
                <div class="manifesto-item">
                  <span class="manifesto-icon">🦾</span>
                  <div>
                    <strong>Hardware y Robótica de Código Abierto:</strong>
                    <span>Compartimos esquemáticos, modelos 3D y códigos cinemáticos para potenciar la comunidad de robótica.</span>
                  </div>
                </div>
                <div class="manifesto-item">
                  <span class="manifesto-icon">💳</span>
                  <div>
                    <strong>Pagos Globales y Seguros con Stripe:</strong>
                    <span>Integración directa con Stripe Elements, Apple Pay, Google Pay y cifrado de nivel bancario.</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-interactive-card">
              <div class="terminal-mini-box">
                <div class="mini-header">
                  <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                  <span class="mini-title">synthex-manifesto.sh</span>
                </div>
                <pre class="mini-code"><code>#!/bin/bash
# Synthex Engineering Core
echo "==> Loading Autonomous Modules..."
ros2 run roboarm_kinematics core &
node /bots/nexus_discord.js --cluster=4 &
python3 -m rpa.spider_scrape --stealth &
echo "==> Stripe Gateway Online. 100% Ready."</code></pre>
              </div>

              <div class="stats-counter-strip">
                <div>
                  <strong>+3</strong>
                  <span>Fundadores Dev</span>
                </div>
                <div>
                  <strong>18+</strong>
                  <span>Módulos de Código</span>
                </div>
                <div>
                  <strong>24/7</strong>
                  <span>Monitoreo Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-container bg-surface-dark">
        <div class="container">
          <div class="section-header text-center">
            <div class="section-pretitle">EQUIPO PRINCIPAL</div>
            <h2 class="section-title">Desarrolladores & Arquitectos</h2>
          </div>

          <div class="grid-3-col">
            ${team.map(m => `
              <div class="team-card">
                <div class="team-avatar-wrap">
                  <span class="team-avatar-icon">${m.avatar}</span>
                  <span class="team-role-tag" style="background:${m.badgeColor}22; color:${m.badgeColor}; border: 1px solid ${m.badgeColor}66;">
                    ${m.discordBadge}
                  </span>
                </div>

                <h3 class="team-name">${m.name}</h3>
                <div class="team-handle">${m.handle}</div>
                <div class="team-role-title">${m.role}</div>

                <p class="team-bio">${m.bio}</p>

                <div class="team-skills-tags">
                  ${m.skills.map(s => `<span class="tech-pill">${s}</span>`).join('')}
                </div>

                <div class="team-social-links">
                  <a href="${m.github}" target="_blank" class="team-link">GitHub</a>
                  <a href="${m.discord}" target="_blank" class="team-link text-purple">Discord</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  /* ================== VIEW: LOGIN / PROFILE ================== */

  renderLogin() {
    const main = document.getElementById('mainContent');
    const user = window.store.getCurrentUser();

    if (user) {
      const userOrders = window.store.state.orders.filter(o => o.customerEmail === user.email || user.role === 'admin');

      main.innerHTML = `
        <section class="page-header-section">
          <div class="container">
            <div class="page-header-badge">CUENTA & PERFIL</div>
            <h1 class="page-header-title">Panel de Usuario</h1>
          </div>
        </section>

        <section class="section-container">
          <div class="container max-w-4xl">
            <div class="profile-card">
              <div class="profile-header">
                <div class="profile-avatar">${user.avatar || '👤'}</div>
                <div class="profile-info">
                  <h2 class="profile-name">${user.name}</h2>
                  <p class="profile-email">${user.email}</p>
                  <span class="user-role-badge ${user.role}">ROL: ${user.role.toUpperCase()}</span>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="window.store.logout(); window.showToast('Sesión cerrada');">
                  Cerrar Sesión
                </button>
              </div>

              ${user.role === 'admin' ? `
                <div class="admin-quick-jump">
                  <span>👑 Tienes privilegios de Administrador del Sistema.</span>
                  <a href="#admin" class="btn btn-primary btn-sm">Abrir Panel de Administradores con Consola →</a>
                </div>
              ` : ''}

              <div class="profile-orders-section">
                <h3>Tus Compras y Licencias Digitales:</h3>
                ${userOrders.length > 0 ? `
                  <div class="orders-table-wrap">
                    <table class="data-table">
                      <thead>
                        <tr>
                          <th>Folio</th>
                          <th>Stripe Intent ID</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Estado</th>
                          <th>Licencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${userOrders.map(o => `
                          <tr>
                            <td class="mono font-xs">${o.id}</td>
                            <td class="mono text-cyan">${o.stripePaymentIntentId || o.stripeRef}</td>
                            <td>${o.items.map(i => i.name).join(', ')}</td>
                            <td>$${o.total} ${o.currency}</td>
                            <td><span class="status-badge ${o.status}">${o.status}</span></td>
                            <td class="mono font-xs text-green">${o.downloadKey}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                ` : `
                  <p class="text-muted">Aún no tienes órdenes registradas. ¡Visita la <a href="#shop" class="text-cyan">Zona de Venta</a> para adquirir bots y software!</p>
                `}
              </div>
            </div>
          </div>
        </section>
      `;
      return;
    }

    main.innerHTML = `
      <section class="section-container">
        <div class="container max-w-xl">
          <div class="auth-card">
            <div class="auth-tabs">
              <button class="auth-tab-btn active" id="tabLoginBtn" onclick="SynthexAppInstance.switchAuthTab('login')">Iniciar Sesión</button>
              <button class="auth-tab-btn" id="tabRegisterBtn" onclick="SynthexAppInstance.switchAuthTab('register')">Crear Cuenta</button>
            </div>

            <form class="auth-form" id="loginForm" onsubmit="SynthexAppInstance.handleLoginSubmit(event)">
              <div class="form-group">
                <label class="form-label">Correo Electrónico</label>
                <input type="email" class="form-input" id="loginEmail" placeholder="ejemplo@correo.com" required value="admin@synthex.dev" />
              </div>

              <div class="form-group">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-input" id="loginPassword" placeholder="••••••••" required value="admin" />
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg">
                <span>Ingresar al Sistema</span> →
              </button>

              <div class="quick-demo-accounts">
                <span class="demo-title">⚡ Acceso Rápido con Cuentas Demo:</span>
                <div class="demo-btn-group">
                  <button type="button" class="btn-demo-acc" onclick="SynthexAppInstance.quickFillAuth('admin@synthex.dev', 'admin')">
                    👑 Admin (admin@synthex.dev)
                  </button>
                  <button type="button" class="btn-demo-acc" onclick="SynthexAppInstance.quickFillAuth('cliente@demo.com', 'user123')">
                    👤 Cliente (cliente@demo.com)
                  </button>
                </div>
              </div>
            </form>

            <form class="auth-form hidden" id="registerForm" onsubmit="SynthexAppInstance.handleRegisterSubmit(event)">
              <div class="form-group">
                <label class="form-label">Nombre Completo</label>
                <input type="text" class="form-input" id="regName" placeholder="Tu Nombre o Empresa" required />
              </div>

              <div class="form-group">
                <label class="form-label">Correo Electrónico</label>
                <input type="email" class="form-input" id="regEmail" placeholder="tu@correo.com" required />
              </div>

              <div class="form-group">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-input" id="regPassword" placeholder="Mínimo 6 caracteres" minlength="6" required />
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg">
                <span>Registrarse</span> →
              </button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');

    if (tab === 'login') {
      loginForm.classList.remove('hidden');
      regForm.classList.add('hidden');
      tabLogin.classList.add('active');
      tabReg.classList.remove('active');
    } else {
      loginForm.classList.add('hidden');
      regForm.classList.remove('hidden');
      tabLogin.classList.remove('active');
      tabReg.classList.add('active');
    }
  }

  quickFillAuth(email, pass) {
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = pass;
    window.showToast(`Credenciales cargadas para ${email}`, "info");
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;

    const res = window.store.login(email, pass);
    if (res.success) {
      window.showToast(`¡Bienvenido, ${res.user.name}!`, "success");
      if (res.user.role === 'admin') {
        window.location.hash = '#admin';
      } else {
        window.location.hash = '#shop';
      }
    } else {
      window.showToast(res.message, "error");
    }
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;

    const res = window.store.register(name, email, pass);
    if (res.success) {
      window.showToast(`¡Cuenta creada con éxito! Bienvenido, ${res.user.name}`, "success");
      window.location.hash = '#shop';
    } else {
      window.showToast(res.message, "error");
    }
  }

  /* ================== VIEW: ADMIN DASHBOARD & CONSOLE ================== */

  renderAdmin() {
    const main = document.getElementById('mainContent');
    const user = window.store.getCurrentUser();

    if (!user || user.role !== 'admin') {
      main.innerHTML = `
        <section class="section-container">
          <div class="container max-w-xl text-center">
            <div class="admin-lock-card">
              <span class="lock-icon">🔒</span>
              <h2>Acceso Restringido al Panel de Administrador</h2>
              <p class="text-muted">Debes iniciar sesión con una cuenta de rol Administrador para gestionar proyectos, ventas y acceder a la consola interactiva.</p>
              <div class="mt-4">
                <button class="btn btn-primary" onclick="SynthexAppInstance.quickFillAuthAndLogin()">
                  ⚡ Iniciar Sesión con Cuenta Admin Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      `;
      return;
    }

    const metrics = window.store.getMetrics();
    const products = window.store.state.products;
    const projects = window.store.state.projects;
    const orders = window.store.state.orders;
    const users = window.store.state.users;

    main.innerHTML = `
      <section class="admin-header-section">
        <div class="container">
          <div class="admin-header-top">
            <div>
              <div class="badge-tag">ADMINISTRACIÓN CENTRAL</div>
              <h1 class="admin-title">Panel de Control & Consola Interactiva</h1>
            </div>
            <div class="admin-user-pill">
              <span class="user-avatar">👑</span>
              <span>${user.name}</span>
              <button class="btn-logout-mini" onclick="window.store.logout();">Salir</button>
            </div>
          </div>

          <!-- ADMIN METRICS ROW -->
          <div class="admin-metrics-grid">
            <div class="admin-metric-card">
              <span class="metric-label">Ingresos Totales (Stripe)</span>
              <span class="metric-val text-green">$${metrics.totalRevenue.toLocaleString()} MXN</span>
              <span class="metric-sub">${metrics.totalSales} pagos confirmados</span>
            </div>
            <div class="admin-metric-card">
              <span class="metric-label">Pendiente por Cobrar</span>
              <span class="metric-val text-yellow">$${metrics.pendingRevenue.toLocaleString()} MXN</span>
              <span class="metric-sub">PaymentIntents en proceso</span>
            </div>
            <div class="admin-metric-card">
              <span class="metric-label">Proyectos en Almacén</span>
              <span class="metric-val text-cyan">${metrics.totalProjects}</span>
              <span class="metric-sub">Robótica, Bots & Software</span>
            </div>
            <div class="admin-metric-card">
              <span class="metric-label">Productos en Tienda</span>
              <span class="metric-val text-purple">${metrics.totalProducts}</span>
              <span class="metric-sub">Catálogo activo</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section-container admin-body-section">
        <div class="container">
          <div class="admin-nav-tabs">
            <button class="admin-tab-btn ${this.adminTab === 'terminal' ? 'active' : ''}" onclick="SynthexAppInstance.setAdminTab('terminal')">
              💻 Consola Terminal Interactiva
            </button>
            <button class="admin-tab-btn ${this.adminTab === 'projects' ? 'active' : ''}" onclick="SynthexAppInstance.setAdminTab('projects')">
              📁 Gestión de Proyectos (${projects.length})
            </button>
            <button class="admin-tab-btn ${this.adminTab === 'sales' ? 'active' : ''}" onclick="SynthexAppInstance.setAdminTab('sales')">
              💰 Ventas & Catálogo (${orders.length} órdenes)
            </button>
            <button class="admin-tab-btn ${this.adminTab === 'users' ? 'active' : ''}" onclick="SynthexAppInstance.setAdminTab('users')">
              👥 Usuarios Registrados (${users.length})
            </button>
          </div>

          <!-- TAB CONTENT: TERMINAL -->
          <div class="admin-tab-pane ${this.adminTab === 'terminal' ? 'active' : ''}" id="paneTerminal">
            <div class="terminal-container-wrap">
              <div id="adminTerminalContainer"></div>
            </div>
          </div>

          <!-- TAB CONTENT: PROJECTS MANAGEMENT -->
          <div class="admin-tab-pane ${this.adminTab === 'projects' ? 'active' : ''}" id="paneProjects">
            <div class="admin-pane-header">
              <h3>Almacén y Repositorio de Proyectos</h3>
              <button class="btn btn-primary btn-sm" onclick="SynthexAppInstance.openNewProjectModal()">
                + Nuevo Proyecto
              </button>
            </div>

            <div class="admin-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Icono / ID</th>
                    <th>Título del Proyecto</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th>Estrellas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${projects.map(p => `
                    <tr>
                      <td class="mono font-xs">${p.icon} ${p.id}</td>
                      <td><strong>${p.title}</strong></td>
                      <td>${p.categoryLabel}</td>
                      <td>
                        <span class="status-badge" style="background:${p.statusColor}22; color:${p.statusColor}; border:1px solid ${p.statusColor}44">
                          ${p.statusLabel}
                        </span>
                      </td>
                      <td>⭐ ${p.stars}</td>
                      <td>
                        <button class="btn-action-delete" onclick="SynthexAppInstance.deleteProjectPrompt('${p.id}')">Eliminar</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB CONTENT: SALES & STORE MANAGEMENT -->
          <div class="admin-tab-pane ${this.adminTab === 'sales' ? 'active' : ''}" id="paneSales">
            <div class="admin-pane-header">
              <h3>Historial de Ventas & Transacciones Stripe</h3>
            </div>

            <div class="admin-table-wrap mb-8">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Stripe PaymentIntent</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td class="mono font-xs">${o.id}</td>
                      <td class="mono text-cyan">${o.stripePaymentIntentId || o.stripeRef}</td>
                      <td>${o.customerName} <br/><small class="text-muted">${o.customerEmail}</small></td>
                      <td>${o.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</td>
                      <td><strong class="text-green">$${o.total} ${o.currency}</strong></td>
                      <td><span class="status-badge ${o.status}">${o.status}</span></td>
                      <td>
                        ${o.status === 'PENDING_PAYMENT' ? `
                          <button class="btn-action-verify" onclick="window.store.confirmStripePayment('${o.id}'); window.showToast('Pago Stripe verificado');">
                            Aprobar Pago
                          </button>
                        ` : `
                          <span class="text-green text-xs">✓ Confirmado Stripe</span>
                        `}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="admin-pane-header mt-8">
              <h3>Catálogo de Productos en Venta</h3>
              <button class="btn btn-primary btn-sm" onclick="SynthexAppInstance.openNewProductModal()">
                + Nuevo Producto
              </button>
            </div>

            <div class="admin-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Icono / ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map(pr => `
                    <tr>
                      <td class="mono font-xs">${pr.icon} ${pr.id}</td>
                      <td><strong>${pr.name}</strong></td>
                      <td>${pr.categoryLabel}</td>
                      <td class="text-green">$${pr.price} ${pr.currency}</td>
                      <td>${pr.stock} un.</td>
                      <td>
                        <button class="btn-action-delete" onclick="SynthexAppInstance.deleteProductPrompt('${pr.id}')">Eliminar</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB CONTENT: USERS -->
          <div class="admin-tab-pane ${this.adminTab === 'users' ? 'active' : ''}" id="paneUsers">
            <div class="admin-pane-header">
              <h3>Cuentas de Usuarios</h3>
            </div>
            <div class="admin-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Fecha Registro</th>
                  </tr>
                </thead>
                <tbody>
                  ${users.map(u => `
                    <tr>
                      <td class="mono font-xs">${u.id}</td>
                      <td>${u.avatar} ${u.name}</td>
                      <td>${u.email}</td>
                      <td><span class="user-role-badge ${u.role}">${u.role.toUpperCase()}</span></td>
                      <td class="mono font-xs">${u.createdAt.substring(0, 10)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    `;

    if (this.adminTab === 'terminal') {
      setTimeout(() => {
        this.terminalInstance = new SynthexTerminal('adminTerminalContainer');
        this.terminalInstance.init();
      }, 50);
    }
  }

  setAdminTab(tab) {
    this.adminTab = tab;
    this.renderAdmin();
  }

  quickFillAuthAndLogin() {
    window.store.login('admin@synthex.dev', 'admin');
    window.showToast("Sesión iniciada como Administrador", "success");
    this.renderAdmin();
  }

  deleteProjectPrompt(id) {
    if (confirm(`¿Estás seguro de eliminar el proyecto [${id}]?`)) {
      window.store.deleteProject(id);
      window.showToast("Proyecto eliminado", "info");
      this.renderAdmin();
    }
  }

  deleteProductPrompt(id) {
    if (confirm(`¿Estás seguro de eliminar el producto [${id}]?`)) {
      window.store.deleteProduct(id);
      window.showToast("Producto eliminado", "info");
      this.renderAdmin();
    }
  }

  openNewProjectModal() {
    let modal = document.getElementById('adminActionModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'adminActionModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3>Crear Nuevo Proyecto en Almacén</h3>
          <button class="modal-close-btn" onclick="document.getElementById('adminActionModal').classList.remove('active')">✕</button>
        </div>
        <form class="modal-body form-grid" onsubmit="SynthexAppInstance.handleCreateProject(event)">
          <div class="form-group">
            <label class="form-label">Título del Proyecto</label>
            <input type="text" id="newProjTitle" class="form-input" placeholder="ej. Brazo Robótico SCARA v2" required />
          </div>
          <div class="form-group">
            <label class="form-label">Categoría</label>
            <select id="newProjCategory" class="form-input">
              <option value="robotica">Robótica & Hardware</option>
              <option value="automatizacion">Automatización & Bots</option>
              <option value="programas">Software & Herramientas</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Estado</label>
            <select id="newProjStatus" class="form-input">
              <option value="production">En Producción</option>
              <option value="beta">Fase Beta</option>
              <option value="active">Activo / En Línea</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Icono Emoji</label>
            <input type="text" id="newProjIcon" class="form-input" value="🦾" />
          </div>
          <div class="form-group col-span-full">
            <label class="form-label">Descripción Técnica</label>
            <textarea id="newProjDesc" class="form-input" rows="3" placeholder="Detalla la arquitectura y funcionamiento..." required></textarea>
          </div>
          <div class="form-group col-span-full">
            <label class="form-label">Tecnologías (separadas por coma)</label>
            <input type="text" id="newProjTech" class="form-input" placeholder="C++, ROS2, ESP32, Python" value="C++, ROS2, Python" />
          </div>
          <div class="modal-footer col-span-full">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('adminActionModal').classList.remove('active')">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Proyecto</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
  }

  handleCreateProject(e) {
    e.preventDefault();
    const title = document.getElementById('newProjTitle').value.trim();
    const category = document.getElementById('newProjCategory').value;
    const status = document.getElementById('newProjStatus').value;
    const icon = document.getElementById('newProjIcon').value || '🔬';
    const description = document.getElementById('newProjDesc').value.trim();
    const tech = document.getElementById('newProjTech').value.split(',').map(t => t.trim()).filter(Boolean);

    window.store.addProject({
      title,
      category,
      status,
      icon,
      description,
      tech,
      stars: Math.floor(10 + Math.random() * 50)
    });

    document.getElementById('adminActionModal').classList.remove('active');
    window.showToast("Proyecto añadido exitosamente", "success");
    this.renderAdmin();
  }

  openNewProductModal() {
    let modal = document.getElementById('adminActionModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'adminActionModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3>Publicar Nuevo Producto en Tienda</h3>
          <button class="modal-close-btn" onclick="document.getElementById('adminActionModal').classList.remove('active')">✕</button>
        </div>
        <form class="modal-body form-grid" onsubmit="SynthexAppInstance.handleCreateProduct(event)">
          <div class="form-group">
            <label class="form-label">Nombre del Producto / Bot</label>
            <input type="text" id="newProdName" class="form-input" placeholder="ej. Telegram Trading Sentinel Bot" required />
          </div>
          <div class="form-group">
            <label class="form-label">Precio (MXN)</label>
            <input type="number" id="newProdPrice" class="form-input" placeholder="599" required />
          </div>
          <div class="form-group">
            <label class="form-label">Categoría</label>
            <select id="newProdCategory" class="form-input">
              <option value="bots">Bots & Mensajería</option>
              <option value="robotica">Robótica & Hardware</option>
              <option value="automatizacion">Automatización RPA</option>
              <option value="programas">Software & Herramientas</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Stock Inicial</label>
            <input type="number" id="newProdStock" class="form-input" value="50" required />
          </div>
          <div class="form-group col-span-full">
            <label class="form-label">Resumen Breve</label>
            <input type="text" id="newProdSummary" class="form-input" placeholder="Descripción de una línea..." required />
          </div>
          <div class="form-group col-span-full">
            <label class="form-label">Descripción Detallada</label>
            <textarea id="newProdDesc" class="form-input" rows="3" placeholder="Explicación completa de características..." required></textarea>
          </div>
          <div class="modal-footer col-span-full">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('adminActionModal').classList.remove('active')">Cancelar</button>
            <button type="submit" class="btn btn-primary">Publicar Producto</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
  }

  handleCreateProduct(e) {
    e.preventDefault();
    const name = document.getElementById('newProdName').value.trim();
    const price = Number(document.getElementById('newProdPrice').value) || 0;
    const category = document.getElementById('newProdCategory').value;
    const stock = Number(document.getElementById('newProdStock').value) || 10;
    const summary = document.getElementById('newProdSummary').value.trim();
    const description = document.getElementById('newProdDesc').value.trim();

    window.store.addProduct({
      name,
      price,
      category,
      stock,
      summary,
      description,
      icon: category === 'bots' ? '🤖' : category === 'robotica' ? '🦾' : '⚡'
    });

    document.getElementById('adminActionModal').classList.remove('active');
    window.showToast("Producto publicado exitosamente", "success");
    this.renderAdmin();
  }
}

// Global initialization
window.SynthexAppInstance = new SynthexApp();
document.addEventListener('DOMContentLoaded', () => {
  window.SynthexAppInstance.init();
});
