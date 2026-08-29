/**
 * SYNTHEX STATE STORE
 * Manages localStorage synchronization, authentication, shopping cart,
 * product management, project management, and Stripe order tracking.
 */

class SynthexStore {
  constructor() {
    this.STORAGE_KEY = 'SYNTHEX_STATE_V2_STRIPE';
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          products: parsed.products || INITIAL_DATA.products,
          projects: parsed.projects || INITIAL_DATA.projects,
          orders: parsed.orders || INITIAL_DATA.initialOrders,
          users: parsed.users || INITIAL_DATA.initialUsers,
          currentUser: parsed.currentUser || null,
          cart: parsed.cart || [],
          team: INITIAL_DATA.team,
          logs: parsed.logs || this.getInitialLogs()
        };
      } catch (e) {
        console.error("Error reading saved state, resetting to initial", e);
      }
    }
    return {
      products: [...INITIAL_DATA.products],
      projects: [...INITIAL_DATA.projects],
      orders: [...INITIAL_DATA.initialOrders],
      users: [...INITIAL_DATA.initialUsers],
      currentUser: null,
      cart: [],
      team: INITIAL_DATA.team,
      logs: this.getInitialLogs()
    };
  }

  saveState() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (e) {
        console.error("Error in store listener", e);
      }
    }
  }

  getInitialLogs() {
    return [
      { timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), level: "INFO", message: "Synthex Core System initialized successfully." },
      { timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), level: "AUTH", message: "Root security policies loaded. SSL/TLS AES-256 active." },
      { timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), level: "STRIPE", message: "Stripe Webhook Gateway listening for events: payment_intent.succeeded." },
      { timestamp: new Date(Date.now() - 600000).toISOString(), level: "ROBOTICS", message: "ROS2 node /synthex_telemetry connected (12 devices active)." },
      { timestamp: new Date().toISOString(), level: "READY", message: "Server healthy. Stripe API 2024-06-20 active. Ready for checkouts." }
    ];
  }

  addLog(level, message) {
    const newLog = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message
    };
    this.state.logs.unshift(newLog);
    if (this.state.logs.length > 100) this.state.logs.pop();
    this.saveState();
  }

  /* ================== AUTHENTICATION ================== */

  login(email, password) {
    const user = this.state.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, message: "Correo o contraseña incorrectos" };
    }
    this.state.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };
    this.addLog("AUTH", `User ${user.email} logged in with role [${user.role}].`);
    this.saveState();
    return { success: true, user: this.state.currentUser };
  }

  register(name, email, password) {
    const exists = this.state.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: "Este correo electrónico ya está registrado" };
    }
    const newUser = {
      id: "usr-" + Date.now(),
      name,
      email,
      password,
      role: "client",
      createdAt: new Date().toISOString(),
      avatar: "🚀"
    };
    this.state.users.push(newUser);
    this.state.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    };
    this.addLog("AUTH", `New client registered: ${newUser.email}`);
    this.saveState();
    return { success: true, user: this.state.currentUser };
  }

  logout() {
    if (this.state.currentUser) {
      this.addLog("AUTH", `User ${this.state.currentUser.email} logged out.`);
    }
    this.state.currentUser = null;
    this.saveState();
  }

  getCurrentUser() {
    return this.state.currentUser;
  }

  isAdmin() {
    return this.state.currentUser && this.state.currentUser.role === 'admin';
  }

  /* ================== SHOPPING CART ================== */

  addToCart(productId, qty = 1) {
    const product = this.state.products.find(p => p.id === productId);
    if (!product) return false;

    const existingIndex = this.state.cart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      this.state.cart[existingIndex].qty += qty;
    } else {
      this.state.cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        category: product.category,
        qty: qty
      });
    }
    this.saveState();
    return true;
  }

  updateCartQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.state.cart.find(i => i.productId === productId);
    if (item) {
      item.qty = qty;
      this.saveState();
    }
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(i => i.productId !== productId);
    this.saveState();
  }

  clearCart() {
    this.state.cart = [];
    this.saveState();
  }

  getCartTotal() {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getCartCount() {
    return this.state.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  /* ================== PRODUCTS CRUD ================== */

  addProduct(productData) {
    const id = "prod-" + Date.now();
    const newProduct = {
      id,
      name: productData.name,
      category: productData.category || 'programas',
      categoryLabel: productData.categoryLabel || 'Software & Programas',
      price: Number(productData.price) || 0,
      currency: "MXN",
      rating: 5.0,
      reviewsCount: 1,
      badge: productData.badge || "Nuevo",
      tag: (productData.category || 'SOFTWARE').toUpperCase(),
      summary: productData.summary || "",
      description: productData.description || "",
      features: productData.features || ["Soporte técnico directo", "Código fuente incluido", "Actualizaciones de por vida"],
      techStack: productData.techStack || ["Node.js", "Python"],
      stock: Number(productData.stock) || 50,
      icon: productData.icon || "📦",
      version: productData.version || "v1.0.0"
    };
    this.state.products.unshift(newProduct);
    this.addLog("ADMIN", `Product added: [${newProduct.id}] ${newProduct.name}`);
    this.saveState();
    return newProduct;
  }

  updateProduct(id, productData) {
    const idx = this.state.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.state.products[idx] = {
      ...this.state.products[idx],
      ...productData
    };
    this.addLog("ADMIN", `Product updated: [${id}] ${this.state.products[idx].name}`);
    this.saveState();
    return this.state.products[idx];
  }

  deleteProduct(id) {
    const prod = this.state.products.find(p => p.id === id);
    if (prod) {
      this.state.products = this.state.products.filter(p => p.id !== id);
      this.addLog("ADMIN", `Product deleted: [${id}] ${prod.name}`);
      this.saveState();
      return true;
    }
    return false;
  }

  /* ================== PROJECTS CRUD ================== */

  addProject(projData) {
    const id = "proj-" + Date.now();
    const newProject = {
      id,
      title: projData.title,
      category: projData.category || 'robotica',
      categoryLabel: projData.categoryLabel || 'Robótica & Automatización',
      status: projData.status || 'production',
      statusLabel: projData.status === 'production' ? 'En Producción' : projData.status === 'beta' ? 'Fase Beta' : 'Activo / En Línea',
      statusColor: projData.status === 'production' ? '#10B981' : projData.status === 'beta' ? '#F59E0B' : '#00F0FF',
      description: projData.description || "",
      highlights: projData.highlights || ["Arquitectura modular de alta disponibilidad", "Telemetría en tiempo real"],
      tech: projData.tech || ["Python", "C++", "ROS2"],
      githubUrl: projData.githubUrl || "https://github.com/synthex-dev",
      demoUrl: projData.demoUrl || "#projects",
      stars: Number(projData.stars) || 0,
      icon: projData.icon || "🔬",
      year: new Date().getFullYear().toString(),
      featured: projData.featured || false
    };
    this.state.projects.unshift(newProject);
    this.addLog("ADMIN", `Project created: [${newProject.id}] ${newProject.title}`);
    this.saveState();
    return newProject;
  }

  updateProject(id, projData) {
    const idx = this.state.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.state.projects[idx] = {
      ...this.state.projects[idx],
      ...projData
    };
    this.addLog("ADMIN", `Project updated: [${id}] ${this.state.projects[idx].title}`);
    this.saveState();
    return this.state.projects[idx];
  }

  deleteProject(id) {
    const proj = this.state.projects.find(p => p.id === id);
    if (proj) {
      this.state.projects = this.state.projects.filter(p => p.id !== id);
      this.addLog("ADMIN", `Project removed: [${id}] ${proj.title}`);
      this.saveState();
      return true;
    }
    return false;
  }

  /* ================== ORDERS & STRIPE GATEWAY ================== */

  createStripeOrder(customerData, cartItems, paymentMethod = "Stripe Payments") {
    const id = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    const stripePaymentIntentId = "pi_3M" + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 10);
    const total = cartItems.reduce((s, i) => s + (i.price * i.qty), 0);
    
    const newOrder = {
      id,
      stripePaymentIntentId,
      stripeRef: stripePaymentIntentId,
      customerName: customerData.name || "Comprador Anónimo",
      customerEmail: customerData.email || "contacto@cliente.com",
      items: [...cartItems],
      total,
      currency: "MXN",
      status: "PENDING_PAYMENT",
      paymentMethod,
      createdAt: new Date().toISOString(),
      downloadKey: "KEY-" + Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    this.state.orders.unshift(newOrder);
    this.addLog("STRIPE", `Stripe PaymentIntent created: [${newOrder.id}] ID: ${stripePaymentIntentId} Total: $${total} MXN`);
    this.saveState();
    return newOrder;
  }

  confirmStripePayment(orderIdOrRef, method = "Stripe Payments") {
    const order = this.state.orders.find(o => o.id === orderIdOrRef || o.stripePaymentIntentId === orderIdOrRef || o.stripeRef === orderIdOrRef);
    if (!order) return { success: false, message: "Orden o Stripe PaymentIntent ID no encontrado" };

    order.status = "COMPLETED";
    order.paymentMethod = method;
    order.paidAt = new Date().toISOString();
    this.addLog("STRIPE", `Webhook event payment_intent.succeeded! Order [${order.id}] charged $${order.total} MXN via ${method}.`);
    this.saveState();
    return { success: true, order };
  }

  /* ================== STATS / METRICS ================== */

  getMetrics() {
    const completedOrders = this.state.orders.filter(o => o.status === 'COMPLETED');
    const totalRevenue = completedOrders.reduce((s, o) => s + o.total, 0);
    const pendingRevenue = this.state.orders.filter(o => o.status === 'PENDING_PAYMENT').reduce((s, o) => s + o.total, 0);

    return {
      totalSales: completedOrders.length,
      totalOrders: this.state.orders.length,
      totalRevenue,
      pendingRevenue,
      totalProducts: this.state.products.length,
      totalProjects: this.state.projects.length,
      totalUsers: this.state.users.length,
      averageTicket: completedOrders.length ? Math.round(totalRevenue / completedOrders.length) : 0
    };
  }

  resetToDefaults() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.state = this.loadState();
    this.notify();
  }
}

// Global Store Instance
window.store = new SynthexStore();
