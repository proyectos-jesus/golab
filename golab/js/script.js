// GOLAB — Main Script
// Scroll animations, nav, UI interactions

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav Toggle ──────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav-menu--open');
      navToggle.classList.toggle('nav-toggle--open');
      document.body.style.overflow = navMenu.classList.contains('nav-menu--open') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-menu--open');
        navToggle.classList.remove('nav-toggle--open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Sticky Nav ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Scroll Reveal ───────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Hero Parallax ───────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      const heroImg = hero.querySelector('.hero__visual');
      if (heroImg) heroImg.style.transform = `translateY(${offset * 0.18}px)`;
    }, { passive: true });
  }

  // ── FAQ Accordion ───────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');
      document.querySelectorAll('.faq-item--open').forEach(open => {
        open.classList.remove('faq-item--open');
        open.querySelector('.faq-content').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('faq-item--open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ── Testimonials Slider ─────────────────────────────
  const slider = document.querySelector('.testimonials-track');
  if (slider) {
    let idx = 0;
    const cards = slider.querySelectorAll('.testimonial-card');
    const total = cards.length;
    const dots = document.querySelectorAll('.testimonial-dot');

    const goTo = (n) => {
      idx = (n + total) % total;
      slider.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    document.getElementById('test-prev')?.addEventListener('click', () => goTo(idx - 1));
    document.getElementById('test-next')?.addEventListener('click', () => goTo(idx + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Auto-advance
    let autoplay = setInterval(() => goTo(idx + 1), 5000);
    slider.closest('.testimonials-slider')?.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.closest('.testimonials-slider')?.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(idx + 1), 5000);
    });
  }

  // ── Home Product Cards ──────────────────────────────
  const featuredGrid = document.getElementById('featured-products');
  if (featuredGrid && typeof GOLAB_PRODUCTS !== 'undefined' && !featuredGrid.dataset.rendered) {
    featuredGrid.dataset.rendered = 'true';
    featuredGrid.innerHTML = GOLAB_PRODUCTS.map(p => `
      <article class="product-card" data-reveal style="--accent:${p.color}">
        <a href="pages/producto.html?id=${p.id}" class="product-card__link">
          <div class="product-card__image" style="background:${p.color}15;">
            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.classList.add('product-card__image--placeholder')">
            ${p.tag ? `<span class="product-card__badge" style="background:${p.color}">${p.tag}</span>` : ''}
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">${p.name}</h3>
            <p class="product-card__tagline">${p.tagline}</p>
            <div class="product-card__footer">
              <span class="product-card__price">${p.currency} ${p.price.toFixed(2)}</span>
              <button class="btn-add-cart" onclick="event.preventDefault();Cart.add(${p.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 01-8 0"></path>
                </svg>
                Agregar
              </button>
            </div>
          </div>
        </a>
      </article>
    `).join('');

    // Cards are injected after the page-load scroll-reveal observer already ran,
    // so they'd never get observed and would stay invisible (opacity:0) forever
    // while still being clickable. Reveal them immediately instead.
    featuredGrid.querySelectorAll('[data-reveal]').forEach(el => {
      requestAnimationFrame(() => el.classList.add('revealed'));
    });
  }

  // ── Smooth scroll for anchor links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Counter animation ───────────────────────────────
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString();
          if (current >= target) clearInterval(timer);
        }, 16);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  // ── Catalog Search & Filter ─────────────────────────
  const searchInput = document.getElementById('catalog-search');
  const filterBtns = document.querySelectorAll('[data-filter]');
  const catalogGrid = document.getElementById('catalog-grid');

  if (catalogGrid && typeof GOLAB_PRODUCTS !== 'undefined') {
    let activeFilter = 'all';
    let searchQuery = '';

    const render = () => {
      const filtered = GOLAB_PRODUCTS.filter(p => {
        const matchCat = activeFilter === 'all' || p.category === activeFilter;
        const matchSearch = p.name.toLowerCase().includes(searchQuery) ||
          p.tagline.toLowerCase().includes(searchQuery) ||
          p.shortDescription.toLowerCase().includes(searchQuery);
        return matchCat && matchSearch;
      });

      catalogGrid.innerHTML = filtered.length ? filtered.map(p => `
        <article class="product-card" data-reveal style="--accent:${p.color}">
          <a href="producto.html?id=${p.id}" class="product-card__link">
            <div class="product-card__image" style="background:${p.color}15;">
              <img src="../${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.classList.add('product-card__image--placeholder')">
              ${p.tag ? `<span class="product-card__badge" style="background:${p.color}">${p.tag}</span>` : ''}
            </div>
            <div class="product-card__body">
              <h3 class="product-card__name">${p.name}</h3>
              <p class="product-card__tagline">${p.tagline}</p>
              <div class="product-card__stars">
                ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}
                <span>(${p.reviews})</span>
              </div>
              <div class="product-card__footer">
                <span class="product-card__price">${p.currency} ${p.price.toFixed(2)}</span>
                <button class="btn-add-cart" onclick="event.preventDefault();Cart.add(${p.id})">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Agregar
                </button>
              </div>
            </div>
          </a>
        </article>
      `).join('') : `<div class="catalog-empty">
        <p>No se encontraron productos con ese criterio.</p>
        <button onclick="location.reload()">Ver todos</button>
      </div>`;

      // Re-observe for reveal
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
        setTimeout(() => el.classList.add('revealed'), 100);
      });
    };

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase();
        render();
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        render();
      });
    });

    render();
  }

  // ── Product Detail Page ──────────────────────────────
  const productDetail = document.getElementById('product-detail');
  if (productDetail && typeof GOLAB_PRODUCTS !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = GOLAB_PRODUCTS.find(p => p.id === id);

    if (!product) {
      productDetail.innerHTML = '<p style="padding:4rem;text-align:center">Producto no encontrado. <a href="catalogo.html">Ver catálogo</a></p>';
      return;
    }

    // Update page meta
    document.title = `${product.name} — GOLAB`;

    productDetail.innerHTML = `
      <div class="pd-gallery">
        <div class="pd-main-image" style="background:${product.color}10;">
          <img src="../${product.image}" alt="${product.name}" id="pd-img-main" onerror="this.style.display='none'">
        </div>
      </div>
      <div class="pd-info">
        ${product.tag ? `<span class="pd-badge" style="color:${product.color};border-color:${product.color}40">${product.tag}</span>` : ''}
        <h1 class="pd-name">${product.name}</h1>
        <p class="pd-tagline">${product.tagline}</p>
        <div class="pd-stars">
          ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}
          <span>${product.rating} (${product.reviews} reseñas)</span>
        </div>
        <p class="pd-price" id="pd-price">${product.currency} <strong>${product.price.toFixed(2)}</strong></p>
        <p class="pd-desc">${product.shortDescription}</p>

        <div class="pd-meta">
          <span>📦 ${product.netContent}</span>
          <span>🕐 ${product.servingSize}</span>
        </div>

        <div class="pd-qty-row">
          <button class="qty-btn" id="pd-dec">−</button>
          <input type="number" id="pd-qty" value="1" min="1" max="${product.stock}">
          <button class="qty-btn" id="pd-inc">+</button>
        </div>

        <div class="pd-actions">
          <button class="btn btn--primary btn--lg" id="pd-add-cart" style="--btn-accent:${product.color}">
            Agregar al Carrito
          </button>
          <a href="../carrito.html" class="btn btn--outline btn--lg">Ver Carrito</a>
        </div>

        <div class="pd-tabs">
          <div class="pd-tab-nav">
            <button class="pd-tab active" data-tab="benefits">Beneficios</button>
            <button class="pd-tab" data-tab="ingredients">Ingredientes</button>
            <button class="pd-tab" data-tab="description">Descripción</button>
          </div>
          <div class="pd-tab-content active" id="tab-benefits">
            <ul class="benefits-list">
              ${product.benefits.map(b => `<li><span style="color:${product.color}">✓</span> ${b}</li>`).join('')}
            </ul>
          </div>
          <div class="pd-tab-content" id="tab-ingredients">
            <ul class="ingredients-list">
              ${product.ingredients.map(i => `<li>• ${i}</li>`).join('')}
            </ul>
          </div>
          <div class="pd-tab-content" id="tab-description">
            <p>${product.description.replace(/\n/g, '</p><p>')}</p>
          </div>
        </div>
      </div>
    `;

    // Qty controls
    const qtyInput = document.getElementById('pd-qty');
    document.getElementById('pd-dec')?.addEventListener('click', () => {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    });
    document.getElementById('pd-inc')?.addEventListener('click', () => {
      qtyInput.value = Math.min(product.stock, parseInt(qtyInput.value) + 1);
    });

    // Add to cart
    document.getElementById('pd-add-cart')?.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value) || 1;
      Cart.add(product.id, qty);
    });

    // Tabs
    document.querySelectorAll('.pd-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.pd-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab)?.classList.add('active');
      });
    });
  }

  // ── Checkout Form ───────────────────────────────────
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    // Render order summary
    const orderSummary = document.getElementById('order-summary');
    if (orderSummary && typeof Cart !== 'undefined') {
      const items = Cart.get();
      if (!items.length) {
        orderSummary.innerHTML = '<p>Tu carrito está vacío. <a href="catalogo.html">Ver productos</a></p>';
      } else {
        orderSummary.innerHTML = `
          ${items.map(i => `
            <div class="order-item">
              <span class="order-item__name">${i.name} ×${i.qty}</span>
              <span class="order-item__price">${i.currency} ${(i.price * i.qty).toFixed(2)}</span>
            </div>
          `).join('')}
          <div class="order-divider"></div>
          <div class="order-item">
            <span>Subtotal</span><span>Bs. ${Cart.subtotal().toFixed(2)}</span>
          </div>
          <div class="order-item">
            <span>Envío</span><span>${Cart.shipping() === 0 ? 'GRATIS' : 'Bs. '+Cart.shipping().toFixed(2)}</span>
          </div>
          <div class="order-item order-item--total">
            <span>Total</span><span>Bs. ${Cart.total().toFixed(2)}</span>
          </div>
        `;
      }
    }

    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        nombre: document.getElementById('ch-nombre').value.trim(),
        apellido: document.getElementById('ch-apellido').value.trim(),
        correo: document.getElementById('ch-correo').value.trim(),
        telefono: document.getElementById('ch-telefono').value.trim(),
        direccion: document.getElementById('ch-direccion').value.trim()
      };

      const msg = Cart.buildWhatsAppMessage(data);
      if (!msg) { alert('Tu carrito está vacío.'); return; }

      const phone = '59163738105';
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');

      // Show success
      checkoutForm.innerHTML = `
        <div class="checkout-success">
          <div class="success-icon">✓</div>
          <h2>¡Pedido enviado!</h2>
          <p>Te redirigimos a WhatsApp para confirmar tu pedido con el equipo GOLAB.</p>
          <a href="catalogo.html" class="btn btn--primary">Seguir comprando</a>
        </div>
      `;
      Cart.clear();
    });
  }

  // ── Blog cards ──────────────────────────────────────
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid && typeof GOLAB_BLOG !== 'undefined') {
    blogGrid.innerHTML = GOLAB_BLOG.map(post => `
      <article class="blog-card" data-reveal>
        <div class="blog-card__image" style="background: linear-gradient(135deg, #4A7C5920, #C9A84C20);">
          <span class="blog-card__category">${post.category}</span>
        </div>
        <div class="blog-card__body">
          <div class="blog-card__meta">
            <span>${post.date}</span>
            <span>• ${post.readTime} de lectura</span>
          </div>
          <h3 class="blog-card__title">${post.title}</h3>
          <p class="blog-card__excerpt">${post.excerpt}</p>
          <a href="#" class="blog-card__link">Leer artículo →</a>
        </div>
      </article>
    `).join('');

    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
      setTimeout(() => el.classList.add('revealed'), 100);
    });
  }

});
