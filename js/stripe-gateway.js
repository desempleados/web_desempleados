/**
 * SYNTHEX STRIPE GATEWAY CONNECTOR
 * Integrates Stripe Checkout, Stripe Elements (Cards, Apple Pay, Google Pay),
 * PaymentIntent generation, 3D Secure verification, and simulated webhooks.
 */

const StripeGateway = {
  currentOrder: null,

  /**
   * Start Stripe checkout for the active cart
   */
  startCheckout(customerData, cartItems) {
    if (!cartItems || cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Create the pending order in store with Stripe PaymentIntent ID
    this.currentOrder = window.store.createStripeOrder(customerData, cartItems, "Stripe Payments");
    this.renderModal(this.currentOrder);
  },

  /**
   * Render the Stripe Checkout Modal with Card Elements & 1-Click Pay
   */
  renderModal(order) {
    let modalEl = document.getElementById('stripeModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'stripeModal';
      modalEl.className = 'modal-overlay';
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="modal-card stripe-modal-card">
        <!-- Stripe Modal Header -->
        <div class="stripe-modal-header">
          <div class="stripe-brand-badge">
            <div class="stripe-logo-symbol">
              <svg width="40" height="24" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M59.64 14.28C59.64 8.76 54.48 4.2 48.72 4.2C42.84 4.2 38.64 8.76 38.64 14.28C38.64 20.76 43.8 24.84 49.8 24.84C52.8 24.84 55.08 24.12 56.64 23.16V18.96C55.08 19.8 53.04 20.4 50.4 20.4C46.8 20.4 44.04 18.6 43.68 15.12H59.52C59.52 14.76 59.64 14.28 59.64 14.28ZM43.68 11.76C44.04 8.88 46.2 7.68 48.72 7.68C51.24 7.68 53.4 8.88 53.76 11.76H43.68ZM30.96 4.44C29.04 4.44 27.84 5.4 27.24 6V4.68H22.44V24.6H27.48V14.16C27.48 11.28 29.28 9.24 31.56 9.24C32.16 9.24 32.76 9.36 33.12 9.6V4.68C32.4 4.44 31.68 4.44 30.96 4.44ZM17.16 7.68C17.16 4.92 13.92 4.2 10.68 4.2C6.96 4.2 4.08 5.28 2.52 6.12V10.68C4.32 9.6 7.2 8.64 9.96 8.64C12.12 8.64 12.84 9.36 12.84 10.08C12.84 13.92 0 12.6 0 20.4C0 23.52 2.64 25.08 6.48 25.08C10.08 25.08 12.84 23.88 14.4 22.8V24.6H19.2V7.44C18.6 7.56 17.88 7.68 17.16 7.68ZM12.84 18.72C12.84 19.8 11.4 20.64 9.48 20.64C7.8 20.64 6.72 19.92 6.72 18.72C6.72 15.6 19.56 16.56 19.56 11.28V16.08C18.12 17.16 15.36 18.72 12.84 18.72Z" fill="#635BFF"/>
              </svg>
            </div>
            <div>
              <h3 class="stripe-brand-title">Stripe Checkout</h3>
              <p class="stripe-brand-sub">Pago Seguro Cifrado AES-256 & 3D Secure</p>
            </div>
          </div>
          <button class="modal-close-btn" onclick="StripeGateway.closeModal()">✕</button>
        </div>

        <div class="stripe-modal-body">
          <!-- Order Summary Pill -->
          <div class="stripe-order-summary">
            <div class="stripe-summary-left">
              <span class="stripe-order-id mono">${order.id}</span>
              <span class="stripe-customer-info">${order.customerName} (${order.customerEmail})</span>
            </div>
            <div class="stripe-summary-right">
              <span class="stripe-amount-label">Total a Pagar:</span>
              <span class="stripe-amount-val">$${order.total.toLocaleString()} ${order.currency}</span>
            </div>
          </div>

          <!-- Express Checkout (Apple Pay / Google Pay / Link) -->
          <div class="stripe-express-box">
            <span class="stripe-express-label">PAGO RÁPIDO CON 1 CLIC</span>
            <div class="stripe-express-buttons">
              <button class="btn-express-apple" onclick="StripeGateway.simulateStripePayment('${order.id}', 'Apple Pay')">
                <span>Pay</span>
              </button>
              <button class="btn-express-google" onclick="StripeGateway.simulateStripePayment('${order.id}', 'Google Pay')">
                <span>G Pay</span>
              </button>
              <button class="btn-express-link" onclick="StripeGateway.simulateStripePayment('${order.id}', 'Stripe Link')">
                <span>⚡ Link by Stripe</span>
              </button>
            </div>
          </div>

          <div class="stripe-divider">
            <span>o paga con tarjeta de débito / crédito</span>
          </div>

          <!-- Simulated Stripe Elements Form -->
          <form class="stripe-card-form" onsubmit="StripeGateway.handleCardFormSubmit(event, '${order.id}')">
            <div class="form-group">
              <label class="form-label">Número de Tarjeta</label>
              <div class="stripe-input-wrapper">
                <span class="card-brand-icon">💳</span>
                <input type="text" class="form-input stripe-input mono" id="stripeCardNumber" placeholder="4242 •••• •••• 4242" value="4242 4242 4242 4242" required maxlength="19" />
                <span class="stripe-badge-test">TEST MODE</span>
              </div>
            </div>

            <div class="stripe-form-row">
              <div class="form-group">
                <label class="form-label">Vencimiento</label>
                <input type="text" class="form-input stripe-input mono" id="stripeCardExpiry" placeholder="MM / YY" value="12/28" required maxlength="5" />
              </div>
              <div class="form-group">
                <label class="form-label">CVC / CVV</label>
                <input type="text" class="form-input stripe-input mono" id="stripeCardCvc" placeholder="CVC" value="123" required maxlength="4" />
              </div>
              <div class="form-group">
                <label class="form-label">Código Postal (ZIP)</label>
                <input type="text" class="form-input stripe-input mono" id="stripeCardZip" placeholder="06700" value="06700" required maxlength="6" />
              </div>
            </div>

            <div class="stripe-payment-intent-box">
              <span class="text-muted font-xs">Stripe PaymentIntent ID:</span>
              <span class="mono font-xs text-cyan">${order.stripePaymentIntentId || order.stripeRef}</span>
            </div>

            <div class="stripe-form-actions">
              <button type="submit" class="btn btn-stripe-pay btn-block btn-lg" id="btnStripePay">
                <span>🔒 Pagar $${order.total.toLocaleString()} ${order.currency} con Stripe</span>
              </button>
            </div>
          </form>
        </div>

        <div class="stripe-modal-footer">
          <div class="stripe-security-notice">
            <span>🛡️ Cifrado de extremo a extremo certificado PCI-DSS Nivel 1.</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="StripeGateway.closeModal()">Cancelar</button>
        </div>
      </div>
    `;

    modalEl.classList.add('active');
  },

  /**
   * Handle card submission
   */
  handleCardFormSubmit(e, orderId) {
    e.preventDefault();
    this.simulateStripePayment(orderId, "Tarjeta de Crédito / Débito (Stripe Elements)");
  },

  /**
   * Simulate instant payment confirmation (Stripe Webhook event: payment_intent.succeeded)
   */
  simulateStripePayment(orderId, method = "Stripe Payments") {
    const btn = document.getElementById('btnStripePay');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-inline"></span> Procesando con Stripe API (3D Secure)...`;
    }

    setTimeout(() => {
      const result = window.store.confirmStripePayment(orderId, method);
      if (result.success) {
        window.store.clearCart();
        this.renderReceipt(result.order);
        if (window.showToast) {
          window.showToast(`¡Pago procesado con éxito vía ${method}!`, "success");
        }
      } else {
        alert(result.message);
      }
    }, 1100);
  },

  /**
   * Render Receipt and Download Licenses
   */
  renderReceipt(order) {
    const modalEl = document.getElementById('stripeModal');
    if (!modalEl) return;

    modalEl.innerHTML = `
      <div class="modal-card stripe-receipt-card">
        <div class="receipt-success-icon">🎉</div>
        <h2 class="receipt-title">¡Pago Confirmado por Stripe!</h2>
        <p class="receipt-subtitle">Tu transacción fue aprobada con éxito. Tus recursos y claves de licencia están listos.</p>

        <div class="receipt-box">
          <div class="receipt-row">
            <span>Folio de Orden:</span>
            <strong class="mono">${order.id}</strong>
          </div>
          <div class="receipt-row">
            <span>Stripe PaymentIntent ID:</span>
            <strong class="mono text-cyan">${order.stripePaymentIntentId || order.stripeRef}</strong>
          </div>
          <div class="receipt-row">
            <span>Método de Pago:</span>
            <strong class="text-white">${order.paymentMethod}</strong>
          </div>
          <div class="receipt-row">
            <span>Total Cobrado:</span>
            <strong class="text-green">$${order.total.toLocaleString()} ${order.currency}</strong>
          </div>
          <div class="receipt-row">
            <span>Clave de Licencia Digital:</span>
            <strong class="mono license-key-badge">${order.downloadKey}</strong>
          </div>
        </div>

        <div class="receipt-items-list">
          <h4>Programas y Recursos Desbloqueados:</h4>
          ${order.items.map(i => `
            <div class="receipt-item-row">
              <span>${i.icon || '📦'} ${i.name} (x${i.qty})</span>
              <button class="btn-download-asset" onclick="StripeGateway.downloadDemoAsset('${i.name}')">
                ⬇️ Descargar Código / SDK
              </button>
            </div>
          `).join('')}
        </div>

        <div class="receipt-actions">
          <button class="btn btn-primary" onclick="StripeGateway.closeModal(); window.location.hash='#projects';">
            Explorar Zona de Proyectos
          </button>
          <button class="btn btn-secondary" onclick="StripeGateway.closeModal()">
            Volver a la Tienda
          </button>
        </div>
      </div>
    `;
  },

  downloadDemoAsset(assetName) {
    const dummyContent = `// SYNTHEX DIGITAL LICENSE
// Product: ${assetName}
// Timestamp: ${new Date().toISOString()}
// Gateway: STRIPE PAYMENTS (Certified)
// Status: ACTIVE & LICENSED

console.log("Synthex Core SDK Initialized for: ${assetName}");
export const config = {
  licensed: true,
  gateway: "STRIPE",
  tier: "ENTERPRISE",
  support: "support@synthex.dev"
};
`;
    const blob = new Blob([dummyContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${assetName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_package.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (window.showToast) window.showToast(`Descarga iniciada para ${assetName}`, "info");
  },

  closeModal() {
    const modalEl = document.getElementById('stripeModal');
    if (modalEl) modalEl.classList.remove('active');
  }
};

window.StripeGateway = StripeGateway;
