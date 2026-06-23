// GOLAB — Cart Manager
// LocalStorage-based persistent shopping cart

const CART_KEY = 'golab_cart';

const Cart = {
  // Get full cart from storage
  get() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  },

  // Save cart to storage
  save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    Cart.updateUI();
    Cart.dispatchEvent();
  },

  // Add item or increase quantity
  add(productId, qty = 1) {
    const items = Cart.get();
    const product = GOLAB_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        color: product.color,
        qty
      });
    }
    Cart.save(items);
    Cart.showToast(`${product.name} agregado al carrito`);
  },

  // Remove item by id
  remove(productId) {
    const items = Cart.get().filter(i => i.id !== productId);
    Cart.save(items);
  },

  // Update quantity
  updateQty(productId, qty) {
    const items = Cart.get();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) {
      Cart.remove(productId);
      return;
    }
    item.qty = qty;
    Cart.save(items);
  },

  // Clear all items
  clear() {
    localStorage.removeItem(CART_KEY);
    Cart.updateUI();
    Cart.dispatchEvent();
  },

  // Count total items
  count() {
    return Cart.get().reduce((sum, i) => sum + i.qty, 0);
  },

  // Calculate subtotal
  subtotal() {
    return Cart.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  // Calculate shipping (free over 150 Bs.)
  shipping() {
    const sub = Cart.subtotal();
    return sub >= 150 ? 0 : 15;
  },

  // Total
  total() {
    return Cart.subtotal() + Cart.shipping();
  },

  // Update badge counter in nav
  updateUI() {
    const count = Cart.count();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Dispatch custom event so pages can react
  dispatchEvent() {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: Cart.count() } }));
  },

  // Build WhatsApp checkout message
  buildWhatsAppMessage(customerData) {
    const items = Cart.get();
    if (!items.length) return null;

    const lines = items.map(i =>
      `  • ${i.name} x${i.qty} — ${i.currency} ${(i.price * i.qty).toFixed(2)}`
    ).join('\n');

    const message = `🌿 *Nuevo Pedido GOLAB* 🌿
━━━━━━━━━━━━━━━━━━

👤 *Datos del Cliente:*
  Nombre: ${customerData.nombre} ${customerData.apellido}
  Correo: ${customerData.correo}
  Teléfono: ${customerData.telefono}
  Dirección: ${customerData.direccion}

🛒 *Productos:*
${lines}

━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* Bs. ${Cart.subtotal().toFixed(2)}
🚚 *Envío:* ${Cart.shipping() === 0 ? 'GRATIS' : 'Bs. ' + Cart.shipping().toFixed(2)}
✅ *TOTAL: Bs. ${Cart.total().toFixed(2)}*
━━━━━━━━━━━━━━━━━━

Por favor confirmar disponibilidad y método de pago. ¡Gracias! 🙏`;

    return encodeURIComponent(message);
  },

  // Show toast notification
  showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.golab-toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `golab-toast golab-toast--${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('golab-toast--visible'));
    setTimeout(() => {
      toast.classList.remove('golab-toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Render cart items in carrito.html
  renderCartPage() {
    const container = document.getElementById('cart-items');
    const summaryEl = document.getElementById('cart-summary');
    const emptyEl = document.getElementById('cart-empty');
    const fullCartEl = document.getElementById('cart-full');
    if (!container) return;

    const items = Cart.get();

    if (!items.length) {
      if (emptyEl) emptyEl.style.display = 'flex';
      if (fullCartEl) fullCartEl.style.display = 'none';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (fullCartEl) fullCartEl.style.display = 'block';

    container.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__image" style="background:${item.color}20; border: 1px solid ${item.color}40;">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
          <div class="cart-item__dot" style="background:${item.color}"></div>
        </div>
        <div class="cart-item__info">
          <h3 class="cart-item__name">${item.name}</h3>
          <p class="cart-item__unit">${item.currency} ${item.price.toFixed(2)} / unidad</p>
        </div>
        <div class="cart-item__controls">
          <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty - 1})">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty + 1})">+</button>
        </div>
        <div class="cart-item__subtotal">
          <strong>${item.currency} ${(item.price * item.qty).toFixed(2)}</strong>
        </div>
        <button class="cart-item__remove" onclick="Cart.remove(${item.id})" title="Eliminar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    if (summaryEl) {
      const shipping = Cart.shipping();
      summaryEl.innerHTML = `
        <div class="summary-row">
          <span>Subtotal (${Cart.count()} productos)</span>
          <span>Bs. ${Cart.subtotal().toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Envío</span>
          <span class="${shipping === 0 ? 'free-shipping' : ''}">${shipping === 0 ? 'GRATIS ✓' : 'Bs. ' + shipping.toFixed(2)}</span>
        </div>
        ${shipping > 0 ? `<p class="shipping-note">Envío gratis en pedidos mayores a Bs. 150</p>` : ''}
        <div class="summary-total">
          <span>Total</span>
          <span>Bs. ${Cart.total().toFixed(2)}</span>
        </div>
      `;
    }
  }
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateUI();
  if (document.getElementById('cart-items')) {
    Cart.renderCartPage();
    window.addEventListener('cartUpdated', () => Cart.renderCartPage());
  }
});
