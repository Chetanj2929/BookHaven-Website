/**
 * BookHaven — Django REST API Integration Layer
 * ================================================
 * This file patches the existing script.js functions with real API calls.
 * Loaded AFTER script.js so overrides take effect cleanly.
 *
 * Django backend must be running at: http://127.0.0.1:8000
 */

(function () {
  'use strict';

  // ─── Config ─────────────────────────────────────────────────────────────────
  const API_BASE = 'http://127.0.0.1:8000/api';
  window.wishlist = [];

  // ─── Token helpers ──────────────────────────────────────────────────────────
  function getToken() { return localStorage.getItem('bh_access_token'); }
  function setTokens(access, refresh) {
    localStorage.setItem('bh_access_token', access);
    localStorage.setItem('bh_refresh_token', refresh);
  }
  function clearTokens() {
    localStorage.removeItem('bh_access_token');
    localStorage.removeItem('bh_refresh_token');
  }

  // ─── HTTP helpers ───────────────────────────────────────────────────────────
  async function apiRequest(method, path, body = null, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const opts = { method, headers, credentials: 'include' };
    if (body) opts.body = JSON.stringify(body);

    try {
      const res = await fetch(`${API_BASE}${path}`, opts);
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      console.warn('[BookHaven API] Network error:', err.message);
      return { ok: false, status: 0, data: { detail: 'Could not connect to server.' } };
    }
  }

  // Extract first error message from DRF error response
  function extractError(data) {
    if (!data) return 'Something went wrong.';
    if (typeof data === 'string') return data;
    const vals = Object.values(data);
    if (vals.length === 0) return 'Something went wrong.';
    const first = vals[0];
    return Array.isArray(first) ? first[0] : String(first);
  }

  // ─── Auth overrides ─────────────────────────────────────────────────────────

  // Override: handleLogin
  window.handleLogin = async function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    if (!email || !password) return showNotification('Please fill in all fields', 'error');

    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Signing in…'; }

    const { ok, data } = await apiRequest('POST', '/auth/login/', { email, password });

    if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }

    if (ok) {
      setTokens(data.access, data.refresh);
      currentUser = data.user;
      currentUser.name = data.user.display_name || data.user.name || email.split('@')[0];
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateUIForLoggedInUser();
      closeLogin();
      showNotification(data.message || `Welcome back! 👋`, 'success');
      await syncCartFromServer();
      await syncWishlistFromServer();
    } else {
      showNotification(extractError(data), 'error');
    }
  };

  // Override: handleSignup
  window.handleSignup = async function (e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (!name || !email || !password || !confirm) return showNotification('Please fill in all fields', 'error');
    if (password !== confirm) return showNotification('Passwords do not match!', 'error');
    if (password.length < 8) return showNotification('Password must be at least 8 characters', 'error');

    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Creating account…'; }

    const { ok, data } = await apiRequest('POST', '/auth/register/', { name, email, password, confirm_password: confirm });

    if (btn) { btn.disabled = false; btn.textContent = 'Create Account'; }

    if (ok) {
      setTokens(data.access, data.refresh);
      currentUser = data.user;
      currentUser.name = data.user.display_name || name;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateUIForLoggedInUser();
      closeLogin();
      showNotification(data.message || `Welcome, ${name}! 🎉`, 'success');
    } else {
      showNotification(extractError(data), 'error');
    }
  };

  // Override: handleGoogleAuth
  window.handleGoogleAuth = async function () {
    showNotification('Connecting to Google…', 'info');
    // Simulate Google response (no real OAuth in this demo)
    const { ok, data } = await apiRequest('POST', '/auth/google/', {
      email: 'googleuser@gmail.com',
      name: 'Google User',
    });
    if (ok) {
      setTokens(data.access, data.refresh);
      currentUser = data.user;
      currentUser.name = data.user.display_name || 'Google User';
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateUIForLoggedInUser();
      closeLogin();
      showNotification(data.message || 'Welcome! 🎉', 'success');
      await syncCartFromServer();
      await syncWishlistFromServer();
    } else {
      showNotification(extractError(data), 'error');
    }
  };

  // Override: handleLogout
  window.handleLogout = async function () {
    const confirmed = confirm('Are you sure you want to logout?');
    if (!confirmed) return;
    
    const refresh = localStorage.getItem('bh_refresh_token');
    if (refresh) {
      await apiRequest('POST', '/auth/logout/', { refresh }, true);
    }
    
    // Clear all auth state
    clearTokens();
    localStorage.removeItem('currentUser');
    
    showNotification('Logged out successfully! 👋', 'success');
    
    // Reload the page to cleanly reset all script.js local state (cart, UI, etc.)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Override: handleSettingsSave
  window.handleSettingsSave = async function () {
    const name = document.getElementById('settings-name').value;
    const phone = document.getElementById('settings-phone').value;
    const address = document.getElementById('settings-address').value;
    
    // Call the PUT /api/auth/me/ endpoint to update backend data
    const { ok, data } = await apiRequest('PUT', '/auth/me/', { name, phone, address }, true);
    
    if (ok) {
      // Update local storage and UI
      currentUser = { ...currentUser, ...data };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      const modal = document.getElementById('settings-modal');
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
      
      showNotification('Settings updated! ✅', 'success');
      
      // We must reload the page so the rest of the UI (which relies on local updateUIForLoggedInUser) updates correctly
      setTimeout(() => window.location.reload(), 1000);
    } else {
      showNotification(extractError(data), 'error');
    }
  };

  // ─── Books override ─────────────────────────────────────────────────────────

  async function fetchAndRenderBooks(filter = 'all') {
    const container = document.getElementById('books-container');
    if (!container) return;

    let url = '/books/';
    if (filter === 'eBook') {
      url += '?category=eBook';
    } else if (filter !== 'all') {
      url += `?category=${encodeURIComponent(filter)}`;
    }

    container.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-secondary)">📚 Loading books…</div>';

    const { ok, data } = await apiRequest('GET', url);
    // DRF can return { results: [...] } (paginated) or a plain array
    const bookList = ok ? (Array.isArray(data) ? data : (data.results || [])) : [];
    if (ok && bookList.length > 0) {
      // Patch global `books` array so existing script.js functions still work
      window.books = bookList.map(mapApiBook);
      container.innerHTML = window.books.map(book => buildBookCard(book)).join('');
      attachCardEvents(container);
    } else {
      // Empty result from API or Network error — fall through to static data
      // Fallback: use static data already rendered by script.js
      generateBooks(filter);
    }
  }

  // Map Django API fields to the shape script.js expects
  function mapApiBook(b) {
    return {
      id: b.id,
      title: b.title,
      author: b.author,
      price: b.price,
      category: b.category,
      image: b.image_url,
      rating: b.user_rating || b.rating,
      reviews: b.total_reviews || b.reviews_count,
      ebook: b.is_ebook,
      badge: b.badge,
    };
  }

  // Patch filter pills to use API
  document.addEventListener('DOMContentLoaded', async () => {
    // Load books first, then trending (trending needs window.books to be set)
    await fetchAndRenderBooks('all');
    await fetchAndRenderTrending();

    // Patch filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.dataset.category || 'all';
        fetchAndRenderBooks(cat);
      });
    });

    // Offers from API
    fetchAndRenderOffers();

    // eBooks section from API
    fetchAndRenderEbooks();

    // Restore session from localStorage token
    restoreSession();
  });

  async function fetchAndRenderTrending() {
    const container = document.getElementById('trending-container');
    if (!container) return;
    const { ok, data } = await apiRequest('GET', '/books/trending/');
    if (!ok || !Array.isArray(data) || data.length === 0) return;

    window.trendingBooks = data.map(t => ({
      rank: t.rank,
      bookId: t.book.id,
      weeklyChange: t.weekly_change,
      hot: t.is_hot,
    }));

    // Ensure all trending books exist in window.books (which is now always an array)
    if (!Array.isArray(window.books)) window.books = [];
    data.forEach(t => {
      const apiBook = mapApiBook(t.book);
      if (!window.books.some(b => b.id === apiBook.id)) {
        window.books.push(apiBook);
      }
    });

    renderTrending();
  }

  async function fetchAndRenderOffers() {
    const container = document.getElementById('offers-container');
    if (!container) return;
    const { ok, data } = await apiRequest('GET', '/books/offers/');
    if (!ok) return;
    const list = data.results || data;
    if (!Array.isArray(list) || list.length === 0) return;

    window.offers = list.map(o => ({
      gradient: o.gradient_class,
      discount: o.discount,
      title: o.title,
      desc: o.description,
      code: o.code,
      expiry: o.expiry_label,
      hours: o.hours_remaining,
    }));

    renderOffers();
  }

  async function fetchAndRenderEbooks() {
    const container = document.getElementById('ebooks-container');
    if (!container) return;
    const { ok, data } = await apiRequest('GET', '/books/ebooks/');
    if (!ok) return;
    const list = data.results || data;
    if (!Array.isArray(list)) return;
    container.innerHTML = list.map(book => buildBookCard(mapApiBook(book))).join('');
    attachCardEvents(container);
  }

  // ─── Wishlist overrides ─────────────────────────────────────────────────────

  async function syncWishlistFromServer() {
    if (!getToken()) return;
    const { ok, data } = await apiRequest('GET', '/orders/wishlist/', null, true);
    if (ok && data.items) {
      window.wishlist = data.items;
      updateWishlistUI();
    }
  }

  function updateWishlistUI() {
    // Update the heart buttons on book cards
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const bid = Number(btn.dataset.wishlistBook);
      const isWishlisted = window.wishlist.some(w => w.book === bid);
      btn.style.color = isWishlisted ? '#ef4444' : 'inherit';
      btn.innerHTML = isWishlisted ? '❤️' : '🤍';
    });
    // Re-render modal if open
    if (window.renderWishlistItems) window.renderWishlistItems();
  }

  window.toggleWishlist = async function (bookId) {
    if (!getToken()) {
      showNotification('Please login to use the wishlist 🔐', 'info');
      openLogin();
      return;
    }
    const { ok, data } = await apiRequest('POST', '/orders/wishlist/toggle/', { book_id: bookId }, true);
    if (ok) {
      window.wishlist = data.wishlist.items;
      updateWishlistUI();
      showNotification(data.message, 'success');
    } else {
      showNotification(extractError(data), 'error');
    }
  };

  // ─── Cart overrides ─────────────────────────────────────────────────────────

  async function syncCartFromServer() {
    if (!getToken()) return;
    const { ok, data } = await apiRequest('GET', '/orders/cart/', null, true);
    if (!ok) return;
    // Convert server cart to local cart format
    cart = (data.items || []).map(item => ({
      _cartItemId: item.id,
      id: item.book.id,
      title: item.book.title,
      author: item.book.author,
      price: item.unit_price,
      format: item.format,
      quantity: item.quantity,
    }));
    updateCartCount();
  }

  // Override: addToCart
  window.addToCart = async function (bookId, format = 'physical') {
    if (!currentUser || !getToken()) {
      // Not logged in — fall back to script.js local cart behavior
      // Find book in window.books and add to the local cart array directly
      const book = (window.books || []).find(b => b.id === bookId);
      if (!book) return;
      const existing = cart.find(c => c.id === bookId && c.format === format);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ id: book.id, title: book.title, author: book.author,
          price: format === 'ebook' ? Math.round(book.price * 0.6) : book.price,
          format, quantity: 1 });
      }
      updateCartCount();
      showNotification(`${book.title} added to cart! 🛒`, 'success');
      return;
    }
    // Logged in — sync with server
    const { ok, data } = await apiRequest('POST', '/orders/cart/add/', { book_id: bookId, format, quantity: 1 }, true);
    if (ok) {
      cart = (data.items || []).map(item => ({
        _cartItemId: item.id,
        id: item.book.id,
        title: item.book.title,
        author: item.book.author,
        price: item.unit_price,
        format: item.format,
        quantity: item.quantity,
      }));
      updateCartCount();
      const bookName = cart.find(c => c.id === bookId)?.title || 'Book';
      showNotification(`${bookName} added to cart! 🛒`, 'success');
    } else {
      showNotification(extractError(data), 'error');
    }
  };

  // Intercept clicks before script.js's delegated or direct listeners
  document.addEventListener('click', (e) => {
    // 1. Intercept Add to Cart
    if (e.target.matches('[data-add-to-cart]')) {
      e.stopPropagation(); // Prevent script.js from handling this click
      const card = e.target.closest('.book-card');
      if (!card) return;
      const id = Number(card.getAttribute('data-id'));
      
      const selectedFmtBtn = card.querySelector('.format-btn.selected');
      const fmt = selectedFmtBtn ? selectedFmtBtn.dataset.fmt : 'physical';
      
      window.addToCart(id, fmt);
      
      // Re-trigger the pulsing animation from script.js
      e.target.classList.remove('pulsing');
      void e.target.offsetWidth;
      e.target.classList.add('pulsing');
      e.target.addEventListener('animationend', () => e.target.classList.remove('pulsing'), { once: true });
    }
    // 2. Intercept Logout
    else if (e.target.closest('#logout-btn') || e.target.closest('.logout')) {
      e.preventDefault();
      e.stopPropagation();
      window.handleLogout();
    }
  }, true); // Use capture phase to intercept BEFORE script.js's bubbling listener

  // Intercept submits before script.js's direct listeners
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'settings-form') {
      e.preventDefault();
      e.stopPropagation();
      window.handleSettingsSave();
    }
  }, true);

  // Override: executePaymentLogic
  let apiPendingOrderBooks = [];
  window.afterPaymentSuccess = function() {
    closePaymentModal();
    setTimeout(() => openReviewModal(apiPendingOrderBooks), 400);
  };

  window.executePaymentLogic = async function (method) {
    if (!currentUser || !getToken()) {
      showNotification('Please login to checkout 🔐', 'info');
      closePaymentModal();
      openLogin();
      return;
    }

    const { ok, data } = await apiRequest('POST', '/orders/checkout/', {
      coupon_code: '', // Can be extended to support coupons from UI later
      payment_method: method,
      delivery_address: currentUser.address || '',
    }, true);

    if (!ok) {
      showNotification(extractError(data), 'error');
      closePaymentModal();
      return;
    }

    const order = data.order;
    const total = order.total;
    const txnId = order.tracking_id;
    const purchasedBooks = order.items.map(item => ({
       id: item.book,
       title: item.title,
       author: item.author,
       format: item.format
    }));

    // Find eBook items in this purchase
    const ebookItems = purchasedBooks.filter(b => b.format === 'ebook');
    const ebookDownloadsHtml = ebookItems.length > 0 ? `
      <div class="ebook-downloads-section" style="margin-top:1.2rem;">
        <div class="ebook-downloads-title">📱 Your eBooks are ready to download!</div>
        <div class="ebook-download-list">
          ${ebookItems.map(b => `
            <div class="ebook-download-item">
              <span class="ebook-download-name">📚 ${escHtml(b.title.replace(' (eBook)', ''))}</span>
              <button class="ebook-download-btn" id="dl-${b.id}" onclick="downloadEbookPDF(${b.id})">
                ⬇️ Download PDF
              </button>
            </div>`).join('')}
        </div>
      </div>` : '';

    const body = document.getElementById('payment-modal-body');
    if (body) {
      body.innerHTML = `
        <div class="pay-success">
          <div class="pay-success-circle">✓</div>
          <h3>Payment Successful!</h3>
          <p style="font-size:1.1rem;font-weight:800;">₹${total.toLocaleString('en-IN')} paid</p>
          <p>via <strong>${escHtml(method)}</strong></p>
          <div class="txn-id">Txn ID: ${escHtml(txnId)}</div>
          <p style="margin-top:0.8rem;font-size:0.88rem;">Order confirmation sent to <strong>${escHtml(currentUser.email)}</strong></p>
          ${ebookDownloadsHtml}
          <div style="display:flex;gap:0.8rem;margin-top:1.5rem;">
            <button class="submit-btn" style="flex:1;" onclick="closePaymentModal();openTrackingModal('${escHtml(txnId)}')">
              📍 Track Order
            </button>
            <button class="submit-btn" style="flex:1;background:linear-gradient(135deg,#ec4899,#8b5cf6);" onclick="afterPaymentSuccess()">
              ✍️ Rate Books
            </button>
          </div>
        </div>`;
    }

    cart = [];
    updateCartCount();
    apiPendingOrderBooks = purchasedBooks;
    
    // Add to local ordersDB so tracking works immediately
    ordersDB.unshift({
        id: txnId,
        placedAt: new Date(order.created_at).getTime(),
        books: order.items.map(i => {
            const localBook = (window.books || []).find(b => b.id === i.book);
            return {
                id: i.book,
                title: i.title,
                author: i.author,
                image: localBook ? localBook.image : '',
                price: i.unit_price,
                quantity: i.quantity,
                format: i.format
            };
        }),
        total: order.total,
        method: order.payment_method,
        isOnlinePayment: method && (method.toLowerCase().includes('card') || method.toLowerCase().includes('net banking') || method.toLowerCase().includes('wallet') || method.toLowerCase().includes('upi')),
        status: order.status,
        user: currentUser.name
    });
  };

  // ─── Orders override ─────────────────────────────────────────────────────────

  const originalOpenOrdersModal = window.openOrdersModal;
  window.openOrdersModal = async function() {
    if (!getToken()) {
        openLogin();
        return;
    }
    
    // Fetch real orders from the API
    const { ok, data } = await apiRequest('GET', '/orders/', null, true);
    if (ok) {
        const apiOrders = data.results || data;
        // Update the global ordersDB array in script.js by modifying it in place
        ordersDB.length = 0; 
        apiOrders.forEach(o => {
            ordersDB.push({
                id: o.tracking_id,
                placedAt: new Date(o.created_at).getTime(),
                books: o.items.map(i => {
                    const localBook = (window.books || []).find(b => b.id === i.book);
                    return {
                        id: i.book || 0,
                        title: i.title,
                        author: i.author,
                        image: localBook ? localBook.image : '',
                        price: i.unit_price,
                        quantity: i.quantity,
                        format: i.format
                    };
                }),
                total: o.total,
                method: o.payment_method,
                isOnlinePayment: o.payment_method && (o.payment_method.toLowerCase().includes('card') || o.payment_method.toLowerCase().includes('net banking') || o.payment_method.toLowerCase().includes('wallet') || o.payment_method.toLowerCase().includes('upi')),
                status: o.status,
                user: currentUser.name
            });
        });
    }
    
    // Call the original render logic which uses the updated ordersDB
    if (originalOpenOrdersModal) originalOpenOrdersModal();
  };

  // ─── Reviews override ───────────────────────────────────────────────────────

  const originalShowAllReviews = window.showAllReviews;
  window.showAllReviews = async function (bookId) {
      const { ok, data } = await apiRequest('GET', `/reviews/?book=${bookId}`);
      if (ok) {
          reviewsDB[bookId] = data.map(r => ({
              id: r.id,
              user: r.user_name || 'Anonymous',
              rating: r.rating,
              text: r.text,
              date: new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          }));
      }
      if (originalShowAllReviews) originalShowAllReviews(bookId);
  };

  const originalSubmitReview = window.submitReview;
  window.submitReview = async function (bookId) {
      if (!getToken()) {
        showNotification('Please login to leave a review 🔐', 'info');
        openLogin();
        return;
      }
      
      const ta = document.getElementById('review-text');
      const text = ta ? ta.value.trim().slice(0, 500) : ''; 
      const stars = document.querySelectorAll('#star-picker .star.selected');
      const rating = stars.length;
      
      if (rating === 0) { showNotification('Please select a star rating!', 'error'); return; }
      
      const { ok, data } = await apiRequest('POST', '/reviews/create/', {
        book: bookId, rating: rating, text,
      }, true);
      
      if (!ok) {
        showNotification(extractError(data), 'error');
        return;
      }
      
      showNotification('Review submitted! ⭐', 'success');
      
      // Call the original to advance the queue and save locally
      if (originalSubmitReview) originalSubmitReview(bookId);
  };

  // ─── Session restore ─────────────────────────────────────────────────────────

  async function restoreSession() {
    const token = getToken();
    if (!token) return;

    const { ok, data } = await apiRequest('GET', '/auth/me/', null, true);
    if (ok) {
      currentUser = data;
      currentUser.name = data.display_name || data.name || data.email.split('@')[0];
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateUIForLoggedInUser();
      await syncCartFromServer();
      await syncWishlistFromServer();
    } else {
      // Token expired — clear it
      clearTokens();
    }
  }

  // ─── Helper: attach card events after dynamic render ────────────────────────

  function attachCardEvents(container) {
    // Quick-view buttons
    container.querySelectorAll('[data-quick-view]').forEach(btn => {
      const card = btn.closest('.book-card');
      if (!card) return;
      const bookId = parseInt(card.dataset.id);
      btn.addEventListener('click', () => {
        if (window.openQuickView) window.openQuickView(bookId);
      });
    });
    // Add to cart buttons
    container.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      const card = btn.closest('.book-card');
      if (!card) return;
      const bookId = parseInt(card.dataset.id);
      btn.addEventListener('click', () => {
        const fmtBtn = card.querySelector('.format-btn.selected');
        const fmt = fmtBtn ? fmtBtn.dataset.fmt : 'physical';
        window.addToCart(bookId, fmt);
      });
    });
    // Format toggle buttons
    container.querySelectorAll('.format-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.book-card');
        if (!card) return;
        card.querySelectorAll('.format-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    // See-all-reviews buttons
    container.querySelectorAll('[data-see-reviews]').forEach(btn => {
      const bookId = parseInt(btn.dataset.seeReviews);
      btn.addEventListener('click', () => {
        if (window.openReviewModal) window.openReviewModal(bookId);
      });
    });
  }

  // ─── Status indicator ───────────────────────────────────────────────────────

  // Show a subtle badge indicating backend connection status
  async function checkBackendHealth() {
    try {
      const res = await fetch(`${API_BASE}/books/?page_size=1`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        console.info('%c✅ BookHaven Django API connected', 'color: #10b981; font-weight: bold;');
      } else {
        console.warn('%c⚠️ BookHaven Django API responded with error', 'color: #f59e0b;');
      }
    } catch {
      console.warn('%c❌ BookHaven Django API offline — using static data', 'color: #ef4444; font-weight: bold;');
    }
  }

  checkBackendHealth();

})();
