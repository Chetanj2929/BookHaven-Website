// ---- Security: HTML escape utility (prevents XSS) ----
function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// ---- Data ----
const books = [
  { title: "Sapiens", author: "Yuval Noah Harari", price: 599, id: 1, category: "Classics", image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", rating: 4.8, reviews: 15234, ebook: true, badge: "Bestseller" },
  { title: "Atomic Habits", author: "James Clear", price: 650, id: 2, category: "Self-Help", image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", rating: 4.9, reviews: 23451, ebook: true, badge: "Bestseller" },
  { title: "1984", author: "George Orwell", price: 399, id: 3, category: "Classics", image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", rating: 4.7, reviews: 18923, ebook: true, badge: "Classic" },
  { title: "Harry Potter & The Sorcerer's Stone", author: "J.K. Rowling", price: 399, id: 4, category: "Fiction", image: "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg", rating: 4.9, reviews: 45678, ebook: false, badge: "Bestseller" },
  { title: "The Alchemist", author: "Paulo Coelho", price: 350, id: 5, category: "Fiction", image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg", rating: 4.6, reviews: 12345, ebook: true, badge: "Trending" },
  { title: "Psychology of Money", author: "Morgan Housel", price: 499, id: 6, category: "Self-Help", image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg", rating: 4.8, reviews: 9876, ebook: true, badge: "Hot" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 275, id: 7, category: "Classics", image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", rating: 4.5, reviews: 8765, ebook: true, badge: "Classic" },
  { title: "Deep Work", author: "Cal Newport", price: 525, id: 8, category: "Self-Help", image: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", rating: 4.7, reviews: 7654, ebook: false, badge: "Bestseller" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", price: 450, id: 9, category: "Fiction", image: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg", rating: 4.8, reviews: 21345, ebook: false, badge: "Classic" },
  { title: "Dune", author: "Frank Herbert", price: 599, id: 10, category: "Sci-Fi", image: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg", rating: 4.8, reviews: 31200, ebook: true, badge: "Epic" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 549, id: 11, category: "Self-Help", image: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg", rating: 4.6, reviews: 14500, ebook: true, badge: "Bestseller" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", price: 325, id: 12, category: "Classics", image: "https://covers.openlibrary.org/b/isbn/9780061935466-L.jpg", rating: 4.7, reviews: 22100, ebook: true, badge: "Classic" },
  { title: "The Da Vinci Code", author: "Dan Brown", price: 449, id: 13, category: "Mystery", image: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg", rating: 4.4, reviews: 19800, ebook: true, badge: "Thriller" },
  { title: "Gone Girl", author: "Gillian Flynn", price: 399, id: 14, category: "Mystery", image: "https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg", rating: 4.3, reviews: 16300, ebook: true, badge: "Bestseller" },
  { title: "The Martian", author: "Andy Weir", price: 499, id: 15, category: "Sci-Fi", image: "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg", rating: 4.7, reviews: 18700, ebook: true, badge: "Award Winner" },
  { title: "Zero to One", author: "Peter Thiel", price: 575, id: 16, category: "Business", image: "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg", rating: 4.5, reviews: 11200, ebook: true, badge: "Must Read" },
  { title: "The Lean Startup", author: "Eric Ries", price: 525, id: 17, category: "Business", image: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", rating: 4.4, reviews: 9800, ebook: false, badge: "Startup Bible" },
  { title: "Steve Jobs", author: "Walter Isaacson", price: 699, id: 18, category: "Biography", image: "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg", rating: 4.6, reviews: 17600, ebook: true, badge: "Inspiring" },
  { title: "Elon Musk", author: "Walter Isaacson", price: 749, id: 19, category: "Biography", image: "https://covers.openlibrary.org/b/isbn/9781982181284-L.jpg", rating: 4.5, reviews: 8400, ebook: true, badge: "New" },
  { title: "Brave New World", author: "Aldous Huxley", price: 349, id: 20, category: "Classics", image: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg", rating: 4.4, reviews: 13200, ebook: true, badge: "Classic" },
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", price: 429, id: 21, category: "Mystery", image: "https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg", rating: 4.5, reviews: 15700, ebook: false, badge: "Thriller" },
  { title: "Ender's Game", author: "Orson Scott Card", price: 399, id: 22, category: "Sci-Fi", image: "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg", rating: 4.6, reviews: 12900, ebook: true, badge: "Sci-Fi Classic" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", price: 499, id: 23, category: "Self-Help", image: "https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg", rating: 4.7, reviews: 20100, ebook: true, badge: "Life Changer" },
  { title: "Good to Great", author: "Jim Collins", price: 549, id: 24, category: "Business", image: "https://covers.openlibrary.org/b/isbn/9780066620992-L.jpg", rating: 4.5, reviews: 10300, ebook: false, badge: "Business" },
  { title: "The Power of Now", author: "Eckhart Tolle", price: 399, id: 25, category: "Self-Help", image: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg", rating: 4.4, reviews: 11800, ebook: true, badge: "Mindfulness" },
  { title: "Born a Crime", author: "Trevor Noah", price: 449, id: 26, category: "Biography", image: "https://covers.openlibrary.org/b/isbn/9780399588174-L.jpg", rating: 4.8, reviews: 14200, ebook: true, badge: "Memoir" },
  { title: "A Brief History of Time", author: "Stephen Hawking", price: 375, id: 27, category: "Sci-Fi", image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg", rating: 4.5, reviews: 16500, ebook: true, badge: "Classic" },
  { title: "The Silent Patient", author: "Alex Michaelides", price: 425, id: 28, category: "Mystery", image: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg", rating: 4.5, reviews: 13700, ebook: true, badge: "Thriller" }
];

// Trending books data (top 8 by popularity)
const trendingBooks = [
  { rank: 1, bookId: 2, weeklyChange: '+12%', hot: true },
  { rank: 2, bookId: 1, weeklyChange: '+8%', hot: true },
  { rank: 3, bookId: 28, weeklyChange: '+22%', hot: true },
  { rank: 4, bookId: 4, weeklyChange: '+5%', hot: false },
  { rank: 5, bookId: 10, weeklyChange: '+18%', hot: true },
  { rank: 6, bookId: 6, weeklyChange: '+9%', hot: false },
  { rank: 7, bookId: 19, weeklyChange: '+31%', hot: true },
  { rank: 8, bookId: 26, weeklyChange: '+14%', hot: true }
];

// Offers data
const offers = [
  { gradient: 'offer-card-1', discount: '30% OFF', title: 'Classics Collection', desc: 'On all classic literature books. Perfect for bookworms!', code: 'CLASSIC30', expiry: '3 days', hours: 71 },
  { gradient: 'offer-card-2', discount: '₹150 OFF', title: 'Self-Help Bundle', desc: 'Buy any 2 self-help books and get ₹150 off your total.', code: 'SELFHELP150', expiry: '1 day', hours: 23 },
  { gradient: 'offer-card-3', discount: '25% OFF', title: 'eBook Special', desc: 'All eBooks at 25% off — read instantly on any device!', code: 'EBOOK25', expiry: '5 days', hours: 119 },
  { gradient: 'offer-card-4', discount: 'FREE', title: 'Delivery Offer', desc: 'Free delivery on all orders above ₹499. No code needed.', code: 'AUTO APPLIED', expiry: 'Always', hours: null },
  { gradient: 'offer-card-5', discount: '40% OFF', title: 'New User Deal', desc: 'First order? Get a massive 40% off any single book!', code: 'NEWREADER40', expiry: '7 days', hours: 167 },
  { gradient: 'offer-card-6', discount: '₹200 OFF', title: 'Weekend Sale', desc: 'This weekend only — spend ₹800 or more and save ₹200!', code: 'WEEKEND200', expiry: '2 days', hours: 47 }
];

let cart = [];
let currentUser = null;

// ---- Utilities ----
function showNotification(message, type = 'success') {
  // Remove existing notification if present (avoid stacking)
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const colors = {
    success: 'linear-gradient(135deg, #10b981, #059669)',
    error: 'linear-gradient(135deg, #ef4444, #dc2626)',
    info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  };

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
        position: fixed; top: 100px; right: 2rem; background: ${colors[type] || colors.success};
        color: white; padding: 1rem 2rem; border-radius: 16px; font-weight: 700; z-index: 3000; box-shadow: 0 10px 40px rgba(16,185,129,0.4);
        animation: slideIn 0.4s ease;`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

function formatINR(n) { return `₹${n.toLocaleString('en-IN')}`; }



// ---- Auth ----
function updateUIForLoggedInUser() {
  const avatar = document.getElementById('user-avatar');
  const loginBtn = document.getElementById('login-btn');
  const nameEl = document.getElementById('menu-user-name');
  const emailEl = document.getElementById('menu-user-email');
  const adminLink = document.getElementById('admin-panel-link');
  if (!currentUser) return;
  if (avatar) { avatar.classList.add('active'); avatar.textContent = currentUser.name.charAt(0).toUpperCase(); }
  if (loginBtn) loginBtn.style.display = 'none';
  if (nameEl) nameEl.textContent = currentUser.name;
  if (emailEl) emailEl.textContent = currentUser.email;
  if (adminLink) {
    adminLink.style.display = (currentUser.is_staff || currentUser.is_superuser) ? '' : 'none';
  }
}

function updateUIForLoggedOutUser() {
  const avatar = document.getElementById('user-avatar');
  const loginBtn = document.getElementById('login-btn');
  const userMenu = document.getElementById('user-menu');
  const adminLink = document.getElementById('admin-panel-link');
  if (avatar) { avatar.classList.remove('active'); avatar.textContent = 'A'; }
  if (loginBtn) loginBtn.style.display = 'block';
  if (userMenu) userMenu.classList.remove('active');
  if (adminLink) adminLink.style.display = 'none';
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (loginForm) loginForm.reset();
  if (signupForm) signupForm.reset();
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const modalTitle = document.getElementById('auth-title');
  if (!loginForm || !signupForm || !modalTitle) return;
  if (tab === 'login') {
    loginForm.style.display = '';
    signupForm.style.display = 'none';
    modalTitle.textContent = 'Login';
  } else {
    signupForm.style.display = '';
    loginForm.style.display = 'none';
    modalTitle.textContent = 'Create Account';
  }
}

function openLogin() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  switchAuthTab('login');
}
function closeLogin() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) return showNotification('Please fill in all fields', 'error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return showNotification('Please enter a valid email address', 'error');
  const name = email.split('@')[0].replace(/\./g, ' ');
  currentUser = { name: name.charAt(0).toUpperCase() + name.slice(1), email, loginDate: new Date().toISOString() };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateUIForLoggedInUser();
  closeLogin();
  showNotification(`Welcome back, ${currentUser.name}! 👋`, 'success');
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  if (!name || !email || !password || !confirm) return showNotification('Please fill in all fields', 'error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return showNotification('Please enter a valid email address', 'error');
  if (password !== confirm) return showNotification('Passwords do not match!', 'error');
  if (password.length < 8) return showNotification('Password must be at least 8 characters', 'error');
  currentUser = { name, email, signupDate: new Date().toISOString() };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateUIForLoggedInUser();
  closeLogin();
  showNotification(`Account created! Welcome, ${name}! 🎉`, 'success');
}

function handleGoogleAuth() {
  showNotification('Connecting to Google...', 'info');
  setTimeout(() => {
    currentUser = { name: 'Google User', email: 'user@gmail.com', provider: 'google', loginDate: new Date().toISOString() };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    closeLogin();
    showNotification(`Welcome ${currentUser.name}! 🎉`, 'success');
  }, 1000);
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateUIForLoggedOutUser();
  showNotification('Logged out successfully! 👋', 'success');
}

// ---- User menu ----
function toggleUserMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('user-menu');
  if (menu) menu.classList.toggle('active');
}
function closeUserMenu() {
  const menu = document.getElementById('user-menu');
  if (menu) menu.classList.remove('active');
}

// ---- Books ----
function generateBooks(filter = 'all') {
  const container = document.getElementById('books-container');
  if (!container) return;
  let filtered;
  if (filter === 'eBook') {
    filtered = books.filter(b => b.ebook);
  } else {
    filtered = filter === 'all' ? books : books.filter(b => b.category === filter);
  }
  container.innerHTML = filtered.map(book => buildBookCard(book)).join('');
}

function buildBookCard(book) {
  const bookReviews = reviewsDB[book.id] || [];
  const latestReview = bookReviews[0];
  let reviewsHtml = '';
  if (latestReview) {
    const userName = escHtml(latestReview.user);
    const reviewText = latestReview.text ? escHtml(latestReview.text.slice(0, 120)) + (latestReview.text.length > 120 ? '…' : '') : '';
    const photoHtml = latestReview.photos.length
      ? '<div class="review-photos">' + latestReview.photos.slice(0, 3).map((p, pi) =>
        `<img class="review-photo-thumb" src="${escHtml(p)}" alt="Review photo" data-lightbox-idx="${pi}" />`
      ).join('') + '</div>'
      : '';
    const seeAll = bookReviews.length > 1
      ? `<button class="see-all-reviews-btn" data-see-reviews="${book.id}">See all ${bookReviews.length} reviews →</button>`
      : '';
    reviewsHtml = `
          <div class="book-reviews-section">
            <div class="book-review-item">
              <div class="review-user-avatar">${escHtml(latestReview.user.charAt(0).toUpperCase())}</div>
              <div class="review-content">
                <div class="review-header-row">
                  <span class="review-user-name">${userName}</span>
                  <span class="review-stars">${'★'.repeat(latestReview.rating)}${'☆'.repeat(5 - latestReview.rating)}</span>
                </div>
                ${reviewText ? `<div class="review-text">${reviewText}</div>` : ''}
                ${photoHtml}
              </div>
            </div>
            ${seeAll}
          </div>`;
  }

  const ebookBadge = book.ebook ? '<span class="ebook-badge">📱 eBook</span>' : '';
  const formatRow = book.ebook
    ? `<div class="book-format-row">
            <button class="format-btn selected" data-fmt="physical" data-book-id="${book.id}">📚 Physical</button>
            <button class="format-btn" data-fmt="ebook" data-book-id="${book.id}">📱 eBook (₹${Math.round(book.price * 0.6)})</button>
           </div>`
    : '';

  return `
        <div class="book-card" data-id="${book.id}">
          <span class="book-badge">${escHtml(book.badge || 'Bestseller')}</span>
          <div class="book-image-container">
            <button class="wishlist-btn" data-wishlist-book="${book.id}" style="position:absolute; top:10px; right:10px; background:white; border:none; border-radius:50%; width:32px; height:32px; font-size:16px; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.2); z-index:2; display:flex; align-items:center; justify-content:center; transition:transform 0.2s;">🤍</button>
            <img src="${escHtml(book.image)}" alt="${escHtml(book.title)}" class="book-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%23667eea%22 width=%22300%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22white%22 font-size=%2218%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📚%3C/text%3E%3C/svg%3E'" />
            <div class="book-overlay">
              <button class="quick-view-btn" data-quick-view>Quick View</button>
            </div>
          </div>
          <div class="book-info">
            <h3 class="book-title">${escHtml(book.title)} ${ebookBadge}</h3>
            <p class="book-author">${escHtml(book.author)}</p>
            <div class="book-rating">
              <span class="stars">${'★'.repeat(Math.round(book.rating))}${'☆'.repeat(5 - Math.round(book.rating))}</span>
              <span class="rating-text">${book.rating} (${(book.reviews + bookReviews.length).toLocaleString()})</span>
            </div>
            ${formatRow}
            <div class="book-footer">
              <div class="book-price">${formatINR(book.price)}</div>
              <button class="add-cart-btn" data-add-to-cart>Add to Cart</button>
            </div>
            ${reviewsHtml}
          </div>
        </div>`;
}

// ---- Trending ----
function renderTrending() {
  const container = document.getElementById('trending-container');
  if (!container) return;
  container.innerHTML = trendingBooks.map(t => {
    const book = books.find(b => b.id === t.bookId);
    if (!book) return '';
    return `
          <div class="trending-card" data-id="${book.id}">
            <div class="trending-rank">#${t.rank}</div>
            <img class="trending-cover" src="${escHtml(book.image)}" alt="${escHtml(book.title)}"
                 onerror="this.style.display='none'" />
            <div class="trending-info">
              <div class="trending-title">${escHtml(book.title)}</div>
              <div class="trending-author">${escHtml(book.author)}</div>
              <div class="trending-meta">
                <span class="trending-price">${formatINR(book.price)}</span>
                ${t.hot ? '<span class="trending-fire">🔥</span>' : ''}
                <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:700;">${escHtml(t.weeklyChange)}</span>
              </div>
            </div>
            <button class="trending-add-btn" data-add-trending="${book.id}">+ Cart</button>
          </div>`;
  }).join('');
}

// ---- Offers ----
const offerTimers = {};
function renderOffers() {
  const container = document.getElementById('offers-container');
  if (!container) return;
  container.innerHTML = offers.map((o, idx) => {
    const timerId = 'timer-' + idx;
    const timerHtml = o.hours !== null
      ? `<div class="offer-timer" id="${timerId}">
               <div class="timer-block"><span class="timer-num" id="${timerId}-h">--</span><span class="timer-label">Hrs</span></div>
               <div class="timer-block"><span class="timer-num" id="${timerId}-m">--</span><span class="timer-label">Min</span></div>
               <div class="timer-block"><span class="timer-num" id="${timerId}-s">--</span><span class="timer-label">Sec</span></div>
             </div>`
      : `<div class="offer-expiry">✅ ${escHtml(o.expiry)}</div>`;
    return `
          <div class="offer-card ${escHtml(o.gradient)}">
            <div class="offer-corner-deco"></div>
            <div class="offer-corner-deco2"></div>
            <div class="offer-discount">${escHtml(o.discount)}</div>
            <div class="offer-title">${escHtml(o.title)}</div>
            <div class="offer-desc">${escHtml(o.desc)}</div>
            <div class="offer-code-row">
              <div class="offer-code" id="code-${idx}">${escHtml(o.code)}</div>
              <button class="offer-copy-btn" data-copy-idx="${idx}">📋 Copy</button>
            </div>
            ${timerHtml}
          </div>`;
  }).join('');

  // Start countdown timers
  offers.forEach((o, idx) => {
    if (o.hours === null) return;
    const endMs = Date.now() + o.hours * 3600000;
    offerTimers[idx] = endMs;
    updateTimer(idx);
    setInterval(() => updateTimer(idx), 1000);
  });

  // Copy coupon code handler
  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy-idx]');
    if (!btn) return;
    const idx = btn.dataset.copyIdx;
    const code = offers[idx].code;
    navigator.clipboard.writeText(code).then(() => {
      showNotification(`✅ Coupon "${code}" copied!`, 'success');
    }).catch(() => {
      showNotification(`Code: ${code}`, 'info');
    });
  });
}

function updateTimer(idx) {
  const remaining = offerTimers[idx] - Date.now();
  if (remaining <= 0) return;
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const pad = n => String(n).padStart(2, '0');
  const hEl = document.getElementById(`timer-${idx}-h`);
  const mEl = document.getElementById(`timer-${idx}-m`);
  const sEl = document.getElementById(`timer-${idx}-s`);
  if (hEl) hEl.textContent = pad(h);
  if (mEl) mEl.textContent = pad(m);
  if (sEl) sEl.textContent = pad(s);
}

// ---- eBooks section ----
function renderEbooks() {
  const container = document.getElementById('ebooks-container');
  if (!container) return;
  const ebookList = books.filter(b => b.ebook);
  container.innerHTML = ebookList.map(book => buildBookCard(book)).join('');
}

function addToCart(id, format = 'physical') {
  const book = books.find(b => b.id === id);
  if (!book) return;
  const cartId = `${id}-${format}`;
  const itemPrice = format === 'ebook' ? Math.round(book.price * 0.6) : book.price;
  const existing = cart.find(item => item.cartId === cartId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...book, cartId, quantity: 1, price: itemPrice, format,
      title: book.title + (format === 'ebook' ? ' (eBook)' : '')
    });
  }
  updateCartCount();
  const label = format === 'ebook' ? '📱 eBook added to cart!' : '📚 Added to cart! 🎉';
  showNotification(label, 'success');
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = String(count);
    countEl.classList.remove('bouncing');
    void countEl.offsetWidth; // force reflow
    countEl.classList.add('bouncing');
    countEl.addEventListener('animationend', () => countEl.classList.remove('bouncing'), { once: true });
  }
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  const itemsDiv = document.getElementById('cart-items');
  const totalDiv = document.getElementById('cart-total');
  if (!modal || !itemsDiv || !totalDiv) return;
  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:2rem;">Your cart is empty</p>';
    totalDiv.textContent = formatINR(0);
  } else {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    itemsDiv.innerHTML = cart.map(item => `
          <div style="display:flex;justify-content:space-between;padding:1rem;background:var(--light);border-radius:16px;margin-bottom:1rem;">
            <div>
              <div style="font-weight:600;margin-bottom:0.3rem;">${item.title}</div>
              <div style="color:var(--text-secondary);font-size:0.9rem;">Qty: ${item.quantity}</div>
            </div>
            <div style="font-weight:800;color:var(--primary);">${formatINR(item.price * item.quantity)}</div>
          </div>`).join('');
    totalDiv.textContent = formatINR(total);
  }
  modal.classList.add('active');
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.remove('active');
}

function checkout() {
  if (cart.length === 0) return showNotification('Your cart is empty!', 'error');
  if (!currentUser) {
    showNotification('Please login to checkout!', 'error');
    closeCart();
    openLogin();
    return;
  }
  closeCart();
  openPaymentModal();
}

// ---- Payment System ----
let _pendingOrderBooks = [];
let _activePayTab = 'upi';
let _selectedBank = null;
let _selectedWallet = null;
let _cardData = { number: '', name: '', expiry: '', cvv: '' };

function openPaymentModal() {
  _pendingOrderBooks = [...cart];
  _activePayTab = 'upi';
  _selectedBank = null;
  _selectedWallet = null;
  _cardData = { number: '', name: '', expiry: '', cvv: '' };
  renderPaymentModal();
  const modal = document.getElementById('payment-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function closePaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function renderPaymentModal() {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const body = document.getElementById('payment-modal-body');
  if (!body) return;

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1rem;">
          <div style="font-size:1.6rem;">💳</div>
          <h2 class="modal-title">Secure Payment</h2>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:0.2rem;">🔒 256-bit SSL encrypted</p>
        </div>

        <!-- Order amount bar -->
        <div class="payment-order-bar">
          <div>
            <div class="payment-order-label">Order Total</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">${cart.length} item${cart.length > 1 ? 's' : ''}</div>
          </div>
          <div class="payment-order-amount">${formatINR(total)}</div>
        </div>

        <!-- Method tabs -->
        <div class="payment-tabs">
          <button class="pay-tab ${_activePayTab === 'upi' ? 'active' : ''}" onclick="switchPayTab('upi')">
            <span class="tab-icon">📱</span>UPI
          </button>
          <button class="pay-tab ${_activePayTab === 'card' ? 'active' : ''}" onclick="switchPayTab('card')">
            <span class="tab-icon">💳</span>Card
          </button>
          <button class="pay-tab ${_activePayTab === 'netbanking' ? 'active' : ''}" onclick="switchPayTab('netbanking')">
            <span class="tab-icon">🏦</span>Net Banking
          </button>
          <button class="pay-tab ${_activePayTab === 'wallet' ? 'active' : ''}" onclick="switchPayTab('wallet')">
            <span class="tab-icon">👜</span>Wallets
          </button>
        </div>

        <!-- UPI Panel -->
        <div class="pay-panel ${_activePayTab === 'upi' ? 'active' : ''}" id="panel-upi">
          <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.8rem;font-size:0.9rem;">Quick Pay with UPI App</div>
          <div class="upi-apps">
            <button class="upi-app-btn phonepe" onclick="handleUPIApp('PhonePe')">
              <span class="upi-app-icon">🟣</span>PhonePe
            </button>
            <button class="upi-app-btn gpay" onclick="handleUPIApp('Google Pay')">
              <span class="upi-app-icon">🔵</span>GPay
            </button>
            <button class="upi-app-btn paytm" onclick="handleUPIApp('Paytm')">
              <span class="upi-app-icon">🔵</span>Paytm
            </button>
            <button class="upi-app-btn bhim" onclick="handleUPIApp('BHIM')">
              <span class="upi-app-icon">🇮🇳</span>BHIM
            </button>
          </div>

          <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.8rem;font-size:0.9rem;">Or Scan QR Code</div>
          <div class="qr-section">
            <img src="phonepe_qr.png" alt="PhonePe QR Code"
                 onerror="this.style.display='none';document.getElementById('qr-fallback').style.display='block'" />
            <div id="qr-fallback" style="display:none;font-size:3rem;padding:1rem;">📲</div>
            <div class="qr-merchant">CHETAN PRAMOD JANGID</div>
            <div class="qr-sub">Scan using any UPI app to pay</div>
          </div>

          <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.5rem;font-size:0.9rem;">Or Enter UPI ID</div>
          <div class="upi-input-row">
            <input type="text" class="form-input" id="upi-id-input" placeholder="e.g. name@upi or 9876543210@ybl" />
            <button class="upi-verify-btn" onclick="verifyUPI()">Verify & Pay</button>
          </div>
          <button class="pay-now-btn" onclick="processPayment('UPI — PhonePe QR')">
            🔒 Pay ${formatINR(total)}
          </button>
        </div>

        <!-- Card Panel -->
        <div class="pay-panel ${_activePayTab === 'card' ? 'active' : ''}" id="panel-card">
          <!-- 3D card visual -->
          <div class="card-visual-wrap">
            <div class="card-visual" id="card-visual">
              <div class="card-face card-front">
                <div class="card-chip"></div>
                <div class="card-number-display" id="cv-number">•••• •••• •••• ••••</div>
                <div class="card-bottom-row">
                  <div>
                    <div class="card-label">Card Holder</div>
                    <div class="card-value" id="cv-name">YOUR NAME</div>
                  </div>
                  <div>
                    <div class="card-label">Expires</div>
                    <div class="card-value" id="cv-expiry">MM/YY</div>
                  </div>
                  <div class="card-network" id="cv-network">💳</div>
                </div>
              </div>
              <div class="card-face card-back">
                <div class="card-stripe"></div>
                <div class="card-cvv-row">
                  <span style="color:rgba(255,255,255,0.6);font-size:0.85rem;">CVV</span>
                  <div class="cvv-box" id="cv-cvv">•••</div>
                </div>
                <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;margin-top:1rem;text-align:center;">Authorised Signature</div>
              </div>
            </div>
          </div>

          <div class="card-inputs">
            <div>
              <label class="form-label">Card Number</label>
              <input type="text" class="form-input" id="card-number" placeholder="1234 5678 9012 3456"
                maxlength="19" oninput="formatCardNumber(this)" />
            </div>
            <div>
              <label class="form-label">Name on Card</label>
              <input type="text" class="form-input" id="card-name" placeholder="CHETAN JANGID"
                oninput="document.getElementById('cv-name').textContent=this.value.toUpperCase()||'YOUR NAME'" />
            </div>
            <div class="card-row">
              <div>
                <label class="form-label">Expiry Date</label>
                <input type="text" class="form-input" id="card-expiry" placeholder="MM / YY"
                  maxlength="7" oninput="formatExpiry(this)" />
              </div>
              <div>
                <label class="form-label">CVV</label>
                <input type="password" class="form-input" id="card-cvv" placeholder="•••"
                  maxlength="4"
                  onfocus="document.getElementById('card-visual').classList.add('flipped')"
                  onblur="document.getElementById('card-visual').classList.remove('flipped')"
                  oninput="document.getElementById('cv-cvv').textContent=this.value.replace(/./g,'•')||'•••'" />
              </div>
            </div>
          </div>
          <button class="pay-now-btn" onclick="processPayment('Card')">
            🔒 Pay ${formatINR(total)}
          </button>
        </div>

        <!-- Net Banking Panel -->
        <div class="pay-panel ${_activePayTab === 'netbanking' ? 'active' : ''}" id="panel-netbanking">
          <div style="font-weight:700;color:var(--text-primary);margin-bottom:1rem;font-size:0.9rem;">Select Your Bank</div>
          <div class="bank-list">
            ${[['🏛', 'SBI'], ['🔵', 'HDFC'], ['🟠', 'ICICI'], ['🟢', 'Axis'], ['🏦', 'Kotak'], ['💛', 'PNB']].map(([icon, name]) =>
    `<div class="bank-item ${_selectedBank === name ? 'selected' : ''}" onclick="selectBank('${name}')">
                <span class="bank-icon">${icon}</span>${name} Bank
              </div>`).join('')}
          </div>
          <div class="more-banks">+ View all banks</div>
          <button class="pay-now-btn" id="nb-pay-btn" onclick="processPayment('Net Banking — '+(_selectedBank||''))" ${!_selectedBank ? 'disabled' : ''}>
            🔒 Pay ${formatINR(total)}
          </button>
        </div>

        <!-- Wallet Panel -->
        <div class="pay-panel ${_activePayTab === 'wallet' ? 'active' : ''}" id="panel-wallet">
          <div style="font-weight:700;color:var(--text-primary);margin-bottom:1rem;font-size:0.9rem;">Select Wallet</div>
          <div class="wallet-list">
            ${[['💰', 'Paytm'], ['🛒', 'Amazon Pay'], ['📱', 'Mobikwik'], ['🎮', 'JioMoney'], ['🌐', 'Freecharge'], ['💎', 'PhonePe Wallet']].map(([icon, name]) =>
      `<div class="wallet-item ${_selectedWallet === name ? 'selected' : ''}" onclick="selectWallet('${name}')">
                <span class="wallet-icon">${icon}</span>${name}
              </div>`).join('')}
          </div>
          <button class="pay-now-btn" id="wallet-pay-btn" onclick="processPayment('Wallet — '+(_selectedWallet||''))" ${!_selectedWallet ? 'disabled' : ''}>
            🔒 Pay ${formatINR(total)}
          </button>
        </div>`;
}

function switchPayTab(tab) {
  _activePayTab = tab;
  renderPaymentModal();
}

function selectBank(name) {
  _selectedBank = name;
  document.querySelectorAll('.bank-item').forEach(el => el.classList.toggle('selected', el.textContent.includes(name)));
  const btn = document.getElementById('nb-pay-btn');
  if (btn) btn.disabled = false;
}

function selectWallet(name) {
  _selectedWallet = name;
  document.querySelectorAll('.wallet-item').forEach(el => el.classList.toggle('selected', el.textContent.trim().includes(name)));
  const btn = document.getElementById('wallet-pay-btn');
  if (btn) btn.disabled = false;
}

function handleUPIApp(app) {
  processPayment('UPI — ' + app);
}

function verifyUPI() {
  const id = (document.getElementById('upi-id-input') || {}).value.trim();
  if (!id) return showNotification('Please enter a UPI ID', 'error');
  if (!id.includes('@')) return showNotification('Enter a valid UPI ID (e.g. name@upi)', 'error');
  showNotification(`✅ ${id} verified!`, 'success');
}

function formatCardNumber(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
  const display = v.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();
  document.getElementById('cv-number').textContent = display;
  // Detect card network
  const net = document.getElementById('cv-network');
  if (net) net.textContent = v[0] === '4' ? 'VISA' : v[0] === '5' ? 'MC' : v.slice(0, 2) === '34' || v.slice(0, 2) === '37' ? 'AMEX' : '💳';
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2);
  input.value = v;
  document.getElementById('cv-expiry').textContent = v || 'MM/YY';
}

function processPayment(method) {
  // 1. Show shipping animation screen overlay in the payment body
  const body = document.getElementById('payment-modal-body');
  if (!body) return;

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  body.innerHTML = `
        <div class="pay-processing" style="text-align: center; padding: 2rem 1rem;">
          <p style="margin-bottom: 1.8rem; font-weight: 800; font-size: 1.25rem; color: var(--text-primary);">Preparing Your Shipment...</p>
          
          <button class="ship-btn animating" id="shipping-anim-btn" style="width: 280px; margin: 0 auto; pointer-events: none;">
            <span class="default-text">🔒 Processing...</span>
            <span class="success-text">Order Confirmed! 🚚</span>
            <div class="truck">
              <div class="box"></div>
              <div class="cabin"></div>
              <div class="engine"></div>
              <div class="wheels">
                <span class="wheel front"></span>
                <span class="wheel back"></span>
              </div>
            </div>
            <div class="road"></div>
          </button>

          <small style="display: block; margin-top: 1.8rem; color: var(--text-secondary); font-weight: 500;">
            Securing gateway and loading books via <strong>${escHtml(method)}</strong>
          </small>
        </div>`;

  const animBtn = document.getElementById('shipping-anim-btn');

  // Disable payment close button during animation
  const closeBtn = document.getElementById('payment-close-btn');
  if (closeBtn) closeBtn.style.pointerEvents = 'none';

  // Step 1: Drop the package after 800ms
  setTimeout(() => {
    if (animBtn) animBtn.classList.add('box-dropped');
  }, 800);

  // Step 2: Truck drives off-screen after 1800ms
  setTimeout(() => {
    if (animBtn) animBtn.classList.add('driving-off');
  }, 1800);

  // Step 3: Transition button to green success state after 2600ms
  setTimeout(() => {
    if (animBtn) {
      animBtn.classList.remove('animating', 'box-dropped', 'driving-off');
      animBtn.classList.add('success-state');
    }
  }, 2600);

  // Step 4: Finalize payment success page updates after 3400ms
  setTimeout(() => {
    if (closeBtn) closeBtn.style.pointerEvents = 'auto';
    executePaymentLogic(method);
  }, 3400);
}

function executePaymentLogic(method) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const purchasedBooks = [...cart];
  const txnId = 'TXN' + Date.now().toString().slice(-10).toUpperCase();

  // 💾 Save order to DB
  saveOrderRecord(purchasedBooks, total, txnId, method);

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
            <p style="font-size:1.1rem;font-weight:800;">${formatINR(total)} paid</p>
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

  // Clear cart
  cart = [];
  updateCartCount();
  _pendingOrderBooks = purchasedBooks;
}

function afterPaymentSuccess() {
  closePaymentModal();
  setTimeout(() => openReviewModal(_pendingOrderBooks), 400);
}

// ---- eBook PDF Download ----
function downloadEbookPDF(bookId) {
  const book = books.find(b => b.id === Number(bookId));
  if (!book) return showNotification('Book not found!', 'error');

  // Check jsPDF loaded
  if (typeof window.jspdf === 'undefined' && typeof jsPDF === 'undefined') {
    showNotification('PDF library loading... Please try again in a moment.', 'info');
    return;
  }

  const btn = document.getElementById('dl-' + bookId) || document.querySelector(`[onclick="downloadEbookPDF(${bookId})"]`);
  if (btn) { btn.classList.add('downloading'); btn.textContent = '⏳ Generating...'; }

  showNotification('📄 Preparing your eBook PDF...', 'info');

  setTimeout(() => {
    try {
      const { jsPDF } = window.jspdf || { jsPDF: window.jsPDF };
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentW = pageW - margin * 2;

      // ─── COVER PAGE ─────────────────────────────────────────
      // Background gradient simulation (two rectangles)
      doc.setFillColor(99, 102, 241);          // indigo
      doc.rect(0, 0, pageW, pageH, 'F');

      doc.setFillColor(139, 92, 246);           // purple overlay
      doc.circle(pageW + 10, -10, 80, 'F');
      doc.setFillColor(236, 72, 153, 0.5);      // pink accent
      doc.circle(-10, pageH + 10, 70, 'F');

      // BookHaven logo text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('📚 BookHaven eBook Library', pageW / 2, 22, { align: 'center' });

      // Decorative line
      doc.setDrawColor(255, 255, 255, 80);
      doc.setLineWidth(0.5);
      doc.line(margin, 28, pageW - margin, 28);

      // Book cover placeholder box
      const coverX = pageW / 2 - 30;
      const coverY = 38;
      doc.setFillColor(255, 255, 255, 20);
      doc.roundedRect(coverX, coverY, 60, 80, 4, 4, 'F');
      doc.setFontSize(28);
      doc.text('📖', pageW / 2, coverY + 46, { align: 'center' });

      // Title
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      const titleLines = doc.splitTextToSize(book.title, contentW);
      doc.text(titleLines, pageW / 2, coverY + 100, { align: 'center' });

      // Author
      const authorY = coverY + 100 + titleLines.length * 10 + 6;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(200, 200, 255);
      doc.text('by ' + book.author, pageW / 2, authorY, { align: 'center' });

      // Category pill
      doc.setFillColor(255, 255, 255, 30);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(255, 255, 255);
      doc.text(`Category: ${book.category}`, pageW / 2, authorY + 14, { align: 'center' });

      // Rating
      const stars = '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating));
      doc.setFontSize(16);
      doc.text(`${stars}  ${book.rating}/5`, pageW / 2, authorY + 26, { align: 'center' });

      // Price
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(pageW / 2 - 30, authorY + 32, 60, 12, 3, 3, 'F');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`eBook Price: ₹${Math.round(book.price * 0.6)}`, pageW / 2, authorY + 40, { align: 'center' });

      // Footer on cover
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(180, 180, 255);
      doc.text('This eBook is licensed for personal use only.', pageW / 2, pageH - 18, { align: 'center' });
      doc.text(`Downloaded: ${new Date().toLocaleString('en-IN')}`, pageW / 2, pageH - 12, { align: 'center' });

      // ─── PAGE 2: TABLE OF CONTENTS ──────────────────────────
      doc.addPage();
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageW, pageH, 'F');

      // Page header bar
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageW, 16, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${book.title}  |  BookHaven eBook`, margin, 10);

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Table of Contents', margin, 36);

      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(1.5);
      doc.line(margin, 40, margin + 60, 40);

      const toc = [
        { title: 'About This Book', page: 3 },
        { title: 'Chapter 1 — Introduction', page: 4 },
        { title: 'Chapter 2 — Core Concepts', page: 5 },
        { title: 'Chapter 3 — Deep Dive', page: 6 },
        { title: 'Chapter 4 — Practical Insights', page: 7 },
        { title: 'Chapter 5 — Case Studies', page: 8 },
        { title: 'Chapter 6 — Key Takeaways', page: 9 },
        { title: 'Conclusion', page: 10 },
      ];

      let tocY = 52;
      doc.setFontSize(12);
      toc.forEach((item, i) => {
        const isOdd = i % 2 === 0;
        if (isOdd) {
          doc.setFillColor(240, 240, 255);
          doc.rect(margin - 3, tocY - 5, contentW + 6, 11, 'F');
        }
        doc.setFont('helvetica', i === 0 ? 'bold' : 'normal');
        doc.setTextColor(50, 50, 100);
        doc.text(item.title, margin + 2, tocY + 1);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(99, 102, 241);
        doc.text(String(item.page), pageW - margin, tocY + 1, { align: 'right' });
        // Dotted line
        doc.setDrawColor(180, 180, 220);
        doc.setLineWidth(0.3);
        const titleWidth = doc.getTextWidth(item.title) + margin + 4;
        for (let x = titleWidth; x < pageW - margin - 14; x += 3) {
          doc.line(x, tocY + 1.5, x + 1.5, tocY + 1.5);
        }
        tocY += 14;
      });

      // ─── PAGE 3: ABOUT THIS BOOK ────────────────────────────
      doc.addPage();
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageW, pageH, 'F');

      // Header
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageW, 16, 'F');
      doc.setFontSize(10); doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${book.title}  |  BookHaven eBook`, margin, 10);

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(20); doc.setFont('helvetica', 'bold');
      doc.text('About This Book', margin, 36);
      doc.setDrawColor(99, 102, 241); doc.setLineWidth(1.5);
      doc.line(margin, 40, margin + 50, 40);

      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 80);
      const aboutText = `"${book.title}" by ${book.author} is a highly acclaimed work in the ${book.category} genre, ` +
        `rated ${book.rating} out of 5 stars by over ${book.reviews.toLocaleString()} readers worldwide.\n\n` +
        `This eBook edition has been specially formatted for digital reading, with clear typography and ` +
        `well-structured chapters designed to deliver the best reading experience on any screen.\n\n` +
        `Whether you are new to this subject or looking to deepen your knowledge, this book offers ` +
        `valuable insights, practical wisdom, and thought-provoking ideas that have inspired millions of readers globally.\n\n` +
        `We hope you enjoy reading this eBook. Happy reading! 📚`;
      const aboutLines = doc.splitTextToSize(aboutText, contentW);
      doc.text(aboutLines, margin, 54);

      // Book metadata table
      const metaY = 54 + aboutLines.length * 6 + 12;
      doc.setFillColor(230, 230, 255);
      doc.roundedRect(margin, metaY, contentW, 42, 4, 4, 'F');
      doc.setFontSize(11); doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 140);
      const meta = [
        ['Title', book.title],
        ['Author', book.author],
        ['Category', book.category],
        ['Rating', `${book.rating} ★ (${book.reviews.toLocaleString()} reviews)`],
        ['Format', 'eBook — PDF'],
      ];
      meta.forEach(([key, val], i) => {
        doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 160);
        doc.text(key + ':', margin + 4, metaY + 9 + i * 7);
        doc.setFont('helvetica', 'normal'); doc.setTextColor(40, 40, 80);
        doc.text(val.slice(0, 55), margin + 32, metaY + 9 + i * 7);
      });

      // ─── PAGE 4: CHAPTER 1 — INTRODUCTION ──────────────────
      doc.addPage();
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageW, pageH, 'F');

      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageW, 16, 'F');
      doc.setFontSize(10); doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${book.title}  |  BookHaven eBook`, margin, 10);

      doc.setFillColor(99, 102, 241, 10);
      doc.rect(margin - 5, 22, contentW + 10, 18, 'F');
      doc.setTextColor(99, 102, 241);
      doc.setFontSize(9); doc.setFont('helvetica', 'bold');
      doc.text('CHAPTER ONE', margin, 30);
      doc.setFontSize(20); doc.setFont('helvetica', 'bold');
      doc.setTextColor(20, 20, 60);
      doc.text('Introduction', margin, 42);
      doc.setDrawColor(99, 102, 241); doc.setLineWidth(1.5);
      doc.line(margin, 46, margin + 40, 46);

      const intro = `Every great journey begins with a single step, and the pages of this book represent just that — ` +
        `a gateway into a world of knowledge, perspective, and transformation.\n\n` +
        `${book.author} brings a unique and compelling voice to the subject of ${book.category.toLowerCase()}, ` +
        `drawing on years of research, real-world experience, and a deep passion for sharing ideas that matter.\n\n` +
        `In this introduction, we set the stage for the explorations ahead. We invite you to approach each page ` +
        `with an open mind and a curious spirit. The ideas you encounter here have the potential to reshape ` +
        `the way you see the world, your work, and yourself.\n\n` +
        `"The more that you read, the more things you will know. The more that you learn, the more places you'll go."\n` +
        `— Dr. Seuss\n\n` +
        `Let us begin. Turn the page and step into a world of discovery.`;
      const introLines = doc.splitTextToSize(intro, contentW);
      doc.setFontSize(11); doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 70);
      doc.text(introLines, margin, 58);

      // ─── PAGE 5+: SAMPLE CHAPTERS (condensed) ───────────────
      const chapters = [
        {
          num: 2, title: 'Core Concepts', body: `This chapter lays the intellectual foundation for everything that follows. ` +
            `${book.author} introduces the central themes and frameworks that make this work distinctive.\n\n` +
            `The core ideas explored here challenge conventional thinking and offer fresh perspectives rooted in ` +
            `evidence, experience, and a nuanced understanding of human behavior and systems.\n\n` +
            `As you work through these pages, take notes. Reflect on how these concepts apply to your own life. ` +
            `The real value of this book emerges when you connect the ideas to your personal journey.`
        },
        {
          num: 3, title: 'Deep Dive', body: `Moving beyond the surface, this chapter immerses us in the deeper ` +
            `dimensions of our topic. ${book.author}'s thorough analysis, backed by meticulous research and ` +
            `real-world data, provides a comprehensive understanding that goes far beyond conventional wisdom.\n\n` +
            `The insights here are both challenging and liberating. They invite us to question assumptions, ` +
            `embrace complexity, and find clarity in what once seemed overwhelming.`
        },
      ];

      chapters.forEach(ch => {
        doc.addPage();
        doc.setFillColor(248, 250, 252);
        doc.rect(0, 0, pageW, pageH, 'F');

        doc.setFillColor(99, 102, 241);
        doc.rect(0, 0, pageW, 16, 'F');
        doc.setFontSize(10); doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(`${book.title}  |  BookHaven eBook`, margin, 10);

        doc.setFillColor(248, 248, 255);
        doc.rect(margin - 5, 22, contentW + 10, 18, 'F');
        doc.setTextColor(99, 102, 241);
        doc.setFontSize(9); doc.setFont('helvetica', 'bold');
        doc.text(`CHAPTER ${ch.num === 2 ? 'TWO' : 'THREE'}`, margin, 30);
        doc.setFontSize(20); doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 20, 60);
        doc.text(ch.title, margin, 42);
        doc.setDrawColor(99, 102, 241); doc.setLineWidth(1.5);
        doc.line(margin, 46, margin + 40, 46);

        const bodyLines = doc.splitTextToSize(ch.body, contentW);
        doc.setFontSize(11); doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 70);
        doc.text(bodyLines, margin, 58);

        // Page number
        doc.setFontSize(9); doc.setTextColor(150, 150, 180);
        doc.text(`${book.title} — Page ${doc.internal.getCurrentPageInfo().pageNumber}`, pageW / 2, pageH - 10, { align: 'center' });
      });

      // ─── LAST PAGE: Thank You ────────────────────────────────
      doc.addPage();
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageW, pageH, 'F');
      doc.setFillColor(139, 92, 246);
      doc.circle(pageW + 10, -10, 80, 'F');

      doc.setFontSize(36);
      doc.setTextColor(255, 255, 255);
      doc.text('📚', pageW / 2, 80, { align: 'center' });
      doc.setFontSize(26); doc.setFont('helvetica', 'bold');
      doc.text('Thank You for Reading!', pageW / 2, 108, { align: 'center' });
      doc.setFontSize(13); doc.setFont('helvetica', 'normal');
      doc.setTextColor(200, 200, 255);
      const thankText = doc.splitTextToSize(`We hope you enjoyed "${book.title}" by ${book.author}. ` +
        `Explore more great books at BookHaven — your trusted digital bookstore.`, contentW - 20);
      doc.text(thankText, pageW / 2, 126, { align: 'center' });

      // Stars
      doc.setFontSize(22); doc.setTextColor(251, 191, 36);
      doc.text('★ ★ ★ ★ ★', pageW / 2, 158, { align: 'center' });
      doc.setFontSize(11); doc.setTextColor(200, 200, 255);
      doc.text('Please leave a review on BookHaven!', pageW / 2, 168, { align: 'center' });

      doc.setFillColor(16, 185, 129);
      doc.roundedRect(pageW / 2 - 40, 178, 80, 14, 4, 4, 'F');
      doc.setFontSize(11); doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('bookhaven.store', pageW / 2, 187, { align: 'center' });

      doc.setFontSize(9); doc.setFont('helvetica', 'normal');
      doc.setTextColor(170, 170, 210);
      doc.text('© BookHaven — This eBook is for personal use only. Redistribution is prohibited.', pageW / 2, pageH - 12, { align: 'center' });

      // ─── SAVE PDF ────────────────────────────────────────────
      const safeTitle = book.title.replace(/[^a-z0-9]/gi, '_').slice(0, 40);
      doc.save(`BookHaven_${safeTitle}_eBook.pdf`);

      showNotification(`✅ "${book.title}" PDF downloaded!`, 'success');
    } catch (err) {
      console.error('PDF generation error:', err);
      showNotification('❌ PDF generation failed. Please try again.', 'error');
    } finally {
      if (btn) { btn.classList.remove('downloading'); btn.innerHTML = '⬇️ Download PDF'; }
    }
  }, 100);
}

// ---- Order Tracking System ----
let ordersDB = JSON.parse(localStorage.getItem('bookOrders') || '[]');

const DELIVERY_STEPS = [
  { key: 'placed', icon: '📋', title: 'Order Placed', desc: 'Your order has been received.' },
  { key: 'confirmed', icon: '✅', title: 'Payment Confirmed', desc: 'Payment verified successfully.' },
  { key: 'packed', icon: '📦', title: 'Order Packed', desc: 'Books packed and ready to dispatch.' },
  { key: 'shipped', icon: '🚚', title: 'Shipped', desc: 'Order picked up by delivery partner.' },
  { key: 'out', icon: '🏃', title: 'Out for Delivery', desc: 'Your delivery partner is nearby!' },
  { key: 'delivered', icon: '🎉', title: 'Delivered', desc: 'Order delivered successfully. Enjoy your books!' }
];

// Minutes per step (for demo progression)
const STEP_MINUTES = [0, 1, 3, 6, 10, 16];

function getOrderStep(placedAt) {
  const elapsedMin = (Date.now() - placedAt) / 60000;
  let step = 0;
  STEP_MINUTES.forEach((m, i) => { if (elapsedMin >= m) step = i; });
  return step;
}

function saveOrders() { localStorage.setItem('bookOrders', JSON.stringify(ordersDB)); }

function saveOrderRecord(books, total, txnId, method) {
  // Determine if this is an online/card payment eligible for cash refund
  const isOnlinePayment = method && (
    method.toLowerCase().includes('card') ||
    method.toLowerCase().includes('net banking') ||
    method.toLowerCase().includes('wallet') ||
    method.toLowerCase().includes('upi')
  );
  const order = {
    id: txnId,
    placedAt: Date.now(),
    books: books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.author,
      image: b.image,
      price: b.price,
      quantity: b.quantity,
      format: b.format || 'physical'
    })),
    total,
    method,
    isOnlinePayment,
    status: 'active',   // active | cancelled | refunded
    cancelledAt: null,
    refundInitiatedAt: null,
    user: currentUser ? currentUser.name : 'Guest'
  };
  ordersDB.unshift(order);
  saveOrders();
}

// Open My Orders
function openOrdersModal() {
  renderOrdersModal();
  const modal = document.getElementById('orders-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeOrdersModal() {
  const modal = document.getElementById('orders-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function renderOrdersModal() {
  const body = document.getElementById('orders-modal-body');
  if (!body) return;

  if (ordersDB.length === 0) {
    body.innerHTML = `
          <div class="modal-header"><div style="font-size:1.6rem;">📦</div>
            <h2 class="modal-title">My Orders</h2></div>
          <div style="text-align:center;padding:3rem 1rem;">
            <div style="font-size:4rem;margin-bottom:1rem;">🛒</div>
            <p style="font-weight:700;color:var(--text-primary);font-size:1.1rem;">No orders yet</p>
            <p style="color:var(--text-secondary);margin-top:0.5rem;">Your orders will appear here after purchase.</p>
          </div>`;
    return;
  }

  const statusLabels = ['Order Placed', 'Payment Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const statusClasses = ['status-placed', 'status-confirmed', 'status-packed', 'status-shipped', 'status-out', 'status-delivered'];

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1.5rem;">
          <div style="font-size:1.6rem;">📦</div>
          <h2 class="modal-title">My Orders</h2>
          <p style="color:var(--text-secondary);font-size:0.88rem;margin-top:0.3rem;">${ordersDB.length} order${ordersDB.length > 1 ? 's' : ''}</p>
        </div>
        ${ordersDB.map(order => {
    const step = getOrderStep(order.placedAt);
    const d = new Date(order.placedAt);
    const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const isCancelled = order.status === 'cancelled' || order.status === 'refunded';

    // Status badge
    let statusBadgeHtml;
    if (order.status === 'cancelled' && !order.isOnlinePayment) {
      statusBadgeHtml = `<span class="order-status-badge status-cancelled">❌ Cancelled</span>`;
    } else if (order.status === 'cancelled' && order.isOnlinePayment) {
      statusBadgeHtml = `<span class="order-status-badge status-refund-init">🔄 Refund Initiated</span>`;
    } else if (order.status === 'refunded') {
      statusBadgeHtml = `<span class="order-status-badge status-refunded">✅ Refunded</span>`;
    } else {
      statusBadgeHtml = `<span class="order-status-badge ${statusClasses[step]}">${statusLabels[step]}</span>`;
    }

    // Cancel eligibility: only if not delivered and not already cancelled, and within first 5 steps
    const canCancel = !isCancelled && step < 5;

    // Build eBook download section for this order
    const ebookBooksInOrder = order.books.filter(b => b.format === 'ebook');
    const ebookSection = !isCancelled && ebookBooksInOrder.length > 0 ? `
            <div class="ebook-downloads-section">
              <div class="ebook-downloads-title">📱 eBooks — Available to Download</div>
              <div class="ebook-download-list">
                ${ebookBooksInOrder.map(b => `
                  <div class="ebook-download-item">
                    <span class="ebook-download-name">📚 ${escHtml(b.title.replace(' (eBook)', ''))}</span>
                    <button class="ebook-download-btn" onclick="downloadEbookPDF(${b.id})">
                      ⬇️ Download PDF
                    </button>
                  </div>`).join('')}
              </div>
            </div>` : '';

    // Refund note for cancelled online payments
    const refundNote = isCancelled && order.isOnlinePayment ? `
            <div style="background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(16,185,129,0.06));border:1.5px solid rgba(245,158,11,0.25);border-radius:14px;padding:0.9rem 1.1rem;margin:0.8rem 0;font-size:0.85rem;">
              <div style="font-weight:800;color:#d97706;margin-bottom:0.3rem;">💰 Refund Information</div>
              <div style="color:var(--text-secondary);line-height:1.5;">
                ${order.isOnlinePayment
        ? 'Your refund of <strong>' + formatINR(order.total) + '</strong> will be credited to your original payment method within <strong>2–4 business days</strong>.'
        : 'No payment was made online. No refund is applicable for this order.'}
              </div>
            </div>` : '';

    const orderActionBtns = `
            <div style="display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
              ${!isCancelled ? `<button class="track-order-btn" onclick="openTrackingModal('${escHtml(order.id)}')">📍 Track Order</button>` : ''}
              ${canCancel ? `<button class="cancel-order-btn" onclick="promptCancelOrder('${escHtml(order.id)}')">✕ Cancel Order</button>` : ''}
              ${isCancelled && order.isOnlinePayment ? `<button class="track-refund-btn" onclick="openRefundModal('${escHtml(order.id)}')">💰 Track Refund</button>` : ''}
            </div>`;

    return `
          <div class="order-card" id="order-card-${escHtml(order.id)}">
            <div class="order-card-header">
              <div>
                <div class="order-id">#${escHtml(order.id)}</div>
                <div class="order-date">${escHtml(dateStr)} at ${escHtml(timeStr)} &bull; ${escHtml(order.method || 'UPI')}</div>
              </div>
              ${statusBadgeHtml}
            </div>
            <div class="order-books-row">
              ${order.books.map(b => `
                <img class="order-book-thumb" src="${escHtml(b.image)}" alt="${escHtml(b.title)}"
                     onerror="this.style.display='none'" title="${escHtml(b.title)}" />`).join('')}
            </div>
            ${ebookSection}
            ${refundNote}
            <div class="order-footer">
              <div class="order-total" style="${isCancelled ? 'text-decoration:line-through;opacity:0.5;' : ''}">${formatINR(order.total)}</div>
              ${orderActionBtns}
            </div>
          </div>`;
  }).join('')}`;
}

// Open Tracking
function openTrackingModal(orderId) {
  const order = ordersDB.find(o => o.id === orderId);
  if (!order) return;
  renderTrackingModal(order);
  const modal = document.getElementById('tracking-modal');
  if (modal) { modal.classList.add('active'); }
}
function closeTrackingModal() {
  const modal = document.getElementById('tracking-modal');
  if (modal) modal.classList.remove('active');
}

function renderTrackingModal(order) {
  const body = document.getElementById('tracking-modal-body');
  if (!body) return;

  const step = getOrderStep(order.placedAt);
  const progressPct = Math.round((step / (DELIVERY_STEPS.length - 1)) * 100);
  const isDelivered = step === DELIVERY_STEPS.length - 1;

  // ETA calculation
  const etaMs = order.placedAt + STEP_MINUTES[DELIVERY_STEPS.length - 1] * 60000;
  const etaDate = new Date(etaMs);
  const etaStr = isDelivered ? 'Delivered!' :
    etaDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) +
    ' by ' + etaDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Step times
  function stepTime(i) {
    const t = new Date(order.placedAt + STEP_MINUTES[i] * 60000);
    return t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1rem;">
          <div style="font-size:1.6rem;">📍</div>
          <h2 class="modal-title">Track Order</h2>
          <p style="color:var(--text-secondary);font-size:0.82rem;margin-top:0.2rem;font-family:monospace;">#${order.id}</p>
        </div>

        <!-- ETA Banner -->
        <div class="eta-banner">
          <div class="eta-icon">${isDelivered ? '🎉' : '🚚'}</div>
          <div>
            <div class="eta-label">${isDelivered ? 'Status' : 'Estimated Delivery'}</div>
            <div class="eta-date">${etaStr}</div>
            <div class="eta-via">Paid via ${order.method || 'UPI'} &bull; ${formatINR(order.total)}</div>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="delivery-progress-bar">
          <div class="delivery-progress-fill" style="width:${progressPct}%"></div>
        </div>

        <!-- Books ordered -->
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-bottom:1.5rem;">
          ${order.books.map(b => `<img class="order-book-thumb" src="${b.image}" alt="${b.title}" title="${b.title} (Qty: ${b.quantity})" onerror="this.style.display='none'" />`).join('')}
        </div>

        <!-- Stepper -->
        <div class="delivery-stepper">
          ${DELIVERY_STEPS.map((s, i) => {
    const cls = i < step ? 'done' : i === step ? 'active' : '';
    return `<div class="step-item ${cls}">
              <div class="step-icon">${i <= step ? s.icon : '○'}</div>
              <div class="step-content">
                <div class="step-title">${s.title}</div>
                ${i <= step ? `<div class="step-time">${stepTime(i)}</div>` : ''}
                ${i === step ? `<div class="step-desc">${s.desc}</div>` : ''}
              </div>
            </div>`;
  }).join('')}
        </div>

        <button class="submit-btn" style="margin-top:1.5rem;" onclick="closeTrackingModal()">
          Close
        </button>`;
}

// ---- Cancel Order System ----
function promptCancelOrder(orderId) {
  const order = ordersDB.find(o => o.id === orderId);
  if (!order) return;
  // Find the order card and inject a confirmation box inside it
  const card = document.getElementById('order-card-' + orderId);
  if (!card) return;

  // Remove any existing confirm box first
  const existing = card.querySelector('.cancel-confirm-box');
  if (existing) { existing.remove(); return; }

  const step = getOrderStep(order.placedAt);
  const isDelivered = step >= 5;
  if (isDelivered) { showNotification('Delivered orders cannot be cancelled.', 'error'); return; }

  const refundMsg = order.isOnlinePayment
    ? `Refund of <strong>${formatINR(order.total)}</strong> will be credited to your original payment method within <strong>2–4 business days</strong>.`
    : `This order was not paid online. No cash refund applies.`;

  const box = document.createElement('div');
  box.className = 'cancel-confirm-box';
  box.innerHTML = `
        <h4>⚠️ Cancel This Order?</h4>
        <p>Are you sure you want to cancel order <strong>#${escHtml(orderId)}</strong>?<br/>${refundMsg}</p>
        <div class="cancel-confirm-actions">
          <button class="btn-cancel-confirm" onclick="confirmCancelOrder('${escHtml(orderId)}')">Yes, Cancel Order</button>
          <button class="btn-cancel-dismiss" onclick="dismissCancelConfirm('${escHtml(orderId)}')">Keep Order</button>
        </div>`;
  card.appendChild(box);
}

function dismissCancelConfirm(orderId) {
  const card = document.getElementById('order-card-' + orderId);
  if (!card) return;
  const box = card.querySelector('.cancel-confirm-box');
  if (box) box.remove();
}

function confirmCancelOrder(orderId) {
  const idx = ordersDB.findIndex(o => o.id === orderId);
  if (idx === -1) return;
  ordersDB[idx].status = 'cancelled';
  ordersDB[idx].cancelledAt = Date.now();
  if (ordersDB[idx].isOnlinePayment) {
    ordersDB[idx].refundInitiatedAt = Date.now();
  }
  saveOrders();
  showNotification(
    ordersDB[idx].isOnlinePayment
      ? `Order cancelled! Refund of ${formatINR(ordersDB[idx].total)} will arrive in 2–4 business days. 💰`
      : `Order cancelled successfully! ✅`,
    ordersDB[idx].isOnlinePayment ? 'info' : 'success'
  );
  renderOrdersModal();
}

// ---- Refund Tracking Modal ----
const REFUND_STEPS = [
  { icon: '✕', title: 'Order Cancelled', desc: 'Your cancellation request was received.' },
  { icon: '🔄', title: 'Refund Initiated', desc: 'Refund request sent to payment gateway.' },
  { icon: '🏦', title: 'Bank Processing', desc: 'Your bank is processing the refund.' },
  { icon: '✅', title: 'Refund Credited', desc: 'Amount credited to your original payment source!' }
];

// Refund takes 2–4 business days (using 3 days / 4320 minutes for demo)
// For demo: steps at 0, 60, 2880, 4320 minutes after cancellation
const REFUND_STEP_MINUTES = [0, 2, 10, 20]; // compressed demo timeline

function getRefundStep(cancelledAt) {
  const elapsed = (Date.now() - cancelledAt) / 60000;
  let step = 0;
  REFUND_STEP_MINUTES.forEach((m, i) => { if (elapsed >= m) step = i; });
  return step;
}

function openRefundModal(orderId) {
  const order = ordersDB.find(o => o.id === orderId);
  if (!order || !order.isOnlinePayment) return;
  renderRefundModal(order);
  const modal = document.getElementById('refund-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeRefundModal() {
  const modal = document.getElementById('refund-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function renderRefundModal(order) {
  const body = document.getElementById('refund-modal-body');
  if (!body) return;

  const cancelledAt = order.cancelledAt || order.placedAt;
  const step = getRefundStep(cancelledAt);
  const progressPct = Math.round((step / (REFUND_STEPS.length - 1)) * 100);
  const isRefunded = step >= REFUND_STEPS.length - 1;

  if (isRefunded && order.status !== 'refunded') {
    const idx = ordersDB.findIndex(o => o.id === order.id);
    if (idx !== -1) { ordersDB[idx].status = 'refunded'; saveOrders(); }
  }

  // Estimated refund date: 2–4 days from cancellation
  const refundByMs = cancelledAt + 4 * 24 * 60 * 60 * 1000;
  const refundByDate = new Date(refundByMs).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  function refundStepTime(i) {
    const t = new Date(cancelledAt + REFUND_STEP_MINUTES[i] * 60000);
    return t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1rem;">
          <div style="font-size:1.6rem;">💰</div>
          <h2 class="modal-title">Refund Tracker</h2>
          <p style="color:var(--text-secondary);font-size:0.82rem;margin-top:0.2rem;font-family:monospace;">#${escHtml(order.id)}</p>
        </div>

        <!-- Refund Banner -->
        <div class="refund-banner">
          <div class="refund-banner-icon">${isRefunded ? '✅' : '🔄'}</div>
          <div>
            <div class="refund-banner-label">${isRefunded ? 'Refund Completed' : 'Refund Amount'}</div>
            <div class="refund-banner-amount">${formatINR(order.total)}</div>
            <div class="refund-banner-note">
              ${isRefunded
      ? 'Credited to your original payment method.'
      : 'Expected by ' + refundByDate + ' (2–4 business days)'}
            </div>
          </div>
        </div>

        <!-- Refund method info -->
        <div style="background:var(--light);border-radius:14px;padding:0.9rem 1.1rem;margin-bottom:1.2rem;font-size:0.85rem;">
          <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.4rem;">📋 Refund Details</div>
          <div style="display:flex;flex-direction:column;gap:0.3rem;color:var(--text-secondary);">
            <div>Payment Method: <strong style="color:var(--text-primary);">${escHtml(order.method || 'Online Payment')}</strong></div>
            <div>Cancelled On: <strong style="color:var(--text-primary);">${new Date(order.cancelledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div>
            <div>Refund Policy: <strong style="color:#059669;">2–4 Business Days</strong></div>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="refund-progress-bar">
          <div class="refund-progress-fill" style="width:${progressPct}%"></div>
        </div>

        <!-- Refund Stepper -->
        <div class="refund-stepper">
          ${REFUND_STEPS.map((s, i) => {
        const cls = i < step ? 'done' : i === step ? 'active' : '';
        return `<div class="refund-step-item ${cls}">
              <div class="refund-step-icon">${i <= step ? s.icon : '○'}</div>
              <div class="refund-step-content">
                <div class="refund-step-title">${s.title}</div>
                ${i <= step ? `<div class="refund-step-time">${refundStepTime(i)}</div>` : ''}
                ${i === step ? `<div class="refund-step-desc">${s.desc}</div>` : ''}
              </div>
            </div>`;
      }).join('')}
        </div>

        ${!isRefunded ? `
        <div style="background:rgba(99,102,241,0.07);border-radius:14px;padding:1rem;margin-top:1.2rem;font-size:0.84rem;color:var(--text-secondary);line-height:1.6;">
          ℹ️ <strong>Note:</strong> Refund processing times depend on your bank or payment provider. UPI refunds typically arrive in 1–2 business days. Card refunds may take up to 4 business days. If you don't receive your refund within 5 business days, please contact support.
        </div>` : `
        <div style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.2);border-radius:14px;padding:1rem;margin-top:1.2rem;text-align:center;">
          <div style="font-size:2rem;">🎉</div>
          <div style="font-weight:800;color:#059669;font-size:1.05rem;">Refund Successful!</div>
          <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.3rem;">${formatINR(order.total)} has been credited to your account.</div>
        </div>`}

        <button class="submit-btn" style="margin-top:1.5rem;" onclick="closeRefundModal()">
          Close
        </button>`;
}

// ---- Review System ----
let reviewsDB = JSON.parse(localStorage.getItem('bookReviews') || '{}');
let reviewQueue = [];   // books waiting to be reviewed
let reviewIndex = 0;    // current book in queue
let currentReviewData = { rating: 0, text: '', photos: [] };

function saveReviews() {
  localStorage.setItem('bookReviews', JSON.stringify(reviewsDB));
}

function openReviewModal(purchasedBooks) {
  reviewQueue = purchasedBooks;
  reviewIndex = 0;
  currentReviewData = { rating: 0, text: '', photos: [] };
  renderReviewStep();
  const modal = document.getElementById('review-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function closeReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

const starLabels = ['', 'Poor 😞', 'Fair 😐', 'Good 😊', 'Great 😄', 'Excellent! 🤩'];

function renderReviewStep() {
  const body = document.getElementById('review-modal-body');
  if (!body) return;

  if (reviewIndex >= reviewQueue.length) {
    // All reviews done — show success screen
    body.innerHTML = `
          <div class="review-success">
            <div class="review-success-icon">🎉</div>
            <h3>Thank You!</h3>
            <p>Your reviews help other readers find great books.</p>
            <button class="submit-btn" style="margin-top:2rem;" onclick="closeReviewModal(); regenerateBookCards();">Back to Books</button>
          </div>`;
    return;
  }

  const book = reviewQueue[reviewIndex];
  const total = reviewQueue.length;
  const dots = Array.from({ length: total }, (_, i) =>
    `<div class="review-step-dot ${i <= reviewIndex ? 'active' : ''}"></div>`).join('');

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1rem;">
          <div style="font-size:1.6rem;">✍️</div>
          <h2 class="modal-title">Rate Your Purchase</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:0.3rem;">Book ${reviewIndex + 1} of ${total}</p>
        </div>
        <div class="review-steps">${dots}</div>
        <div class="review-book-row">
          <img class="review-book-thumb" src="${book.image}" alt="${book.title}"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2280%22%3E%3Crect fill=%22%236366f1%22 width=%2260%22 height=%2280%22/%3E%3C/svg%3E'" />
          <div class="review-book-info">
            <div class="review-book-title">${book.title}</div>
            <div class="review-book-author">${book.author}</div>
          </div>
        </div>

        <!-- Star Rating -->
        <div class="form-label">Your Rating</div>
        <div class="star-picker" id="star-picker">
          ${[1, 2, 3, 4, 5].map(n => `<span class="star" data-val="${n}">★</span>`).join('')}
        </div>
        <div class="star-label" id="star-label">Tap a star to rate</div>

        <!-- Review Text -->
        <div class="form-group" style="margin-top:1rem;">
          <label class="form-label">Your Review <span style="color:var(--text-secondary);font-weight:500;">(optional)</span></label>
          <textarea class="review-textarea" id="review-text" placeholder="Share your experience with this book..." maxlength="500">${currentReviewData.text}</textarea>
          <div class="char-counter"><span id="char-count">0</span>/500</div>
        </div>

        <!-- Photo Upload -->
        <div class="form-label">Add Photos <span style="color:var(--text-secondary);font-weight:500;">(optional)</span></div>
        <div class="photo-upload-zone" id="photo-zone">
          <input type="file" id="photo-input" accept="image/*" multiple />
          <div class="photo-upload-icon">📷</div>
          <div class="photo-upload-text">Click to upload photos</div>
          <div class="photo-upload-sub">JPG, PNG, WEBP · Max 5 photos</div>
        </div>
        <div class="photo-previews" id="photo-previews"></div>

        <!-- Navigation -->
        <div class="review-nav">
          <button class="btn-secondary" onclick="skipReview()">Skip</button>
          <button class="btn-submit-review" id="submit-review-btn" onclick="submitReview(${book.id})" disabled>Submit Review</button>
        </div>`;

  // Restore state
  updateStarUI(currentReviewData.rating);
  renderPhotoPreviews();
  updateCharCount(currentReviewData.text.length);

  // Events
  bindStarPicker();
  const ta = document.getElementById('review-text');
  if (ta) ta.addEventListener('input', (e) => {
    currentReviewData.text = e.target.value;
    updateCharCount(e.target.value.length);
  });
  const photoInput = document.getElementById('photo-input');
  if (photoInput) photoInput.addEventListener('change', handlePhotoUpload);
}

function bindStarPicker() {
  const stars = document.querySelectorAll('#star-picker .star');
  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = Number(star.dataset.val);
      stars.forEach((s, i) => s.classList.toggle('hovered', i < val));
      const label = document.getElementById('star-label');
      if (label) label.textContent = starLabels[val];
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
      const label = document.getElementById('star-label');
      if (label) label.textContent = currentReviewData.rating ? starLabels[currentReviewData.rating] : 'Tap a star to rate';
    });
    star.addEventListener('click', () => {
      currentReviewData.rating = Number(star.dataset.val);
      updateStarUI(currentReviewData.rating);
      checkSubmitReady();
    });
  });
}

function updateStarUI(rating) {
  const stars = document.querySelectorAll('#star-picker .star');
  stars.forEach((s, i) => s.classList.toggle('selected', i < rating));
  const label = document.getElementById('star-label');
  if (label) label.textContent = rating ? starLabels[rating] : 'Tap a star to rate';
}

function updateCharCount(len) {
  const el = document.getElementById('char-count');
  if (el) el.textContent = len;
}

function checkSubmitReady() {
  const btn = document.getElementById('submit-review-btn');
  if (btn) btn.disabled = currentReviewData.rating === 0;
}

function handlePhotoUpload(e) {
  const files = Array.from(e.target.files);
  const remaining = 5 - currentReviewData.photos.length;
  if (remaining <= 0) { showNotification('Max 5 photos allowed', 'error'); return; }
  files.slice(0, remaining).forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentReviewData.photos.push(ev.target.result);
      renderPhotoPreviews();
    };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
}

function renderPhotoPreviews() {
  const container = document.getElementById('photo-previews');
  if (!container) return;
  container.innerHTML = currentReviewData.photos.map((src, i) => `
        <div class="photo-preview-wrap">
          <img src="${src}" alt="preview" />
          <button class="photo-remove-btn" onclick="removePhoto(${i})">✕</button>
        </div>`).join('');
}

function removePhoto(index) {
  currentReviewData.photos.splice(index, 1);
  renderPhotoPreviews();
}

function submitReview(bookId) {
  const ta = document.getElementById('review-text');
  const text = ta ? ta.value.trim().slice(0, 500) : ''; // truncate to max
  if (currentReviewData.rating === 0) { showNotification('Please select a star rating!', 'error'); return; }

  // Validate bookId is a known book
  const validBook = books.find(b => b.id === bookId);
  if (!validBook) { showNotification('Invalid book reference', 'error'); return; }

  const userName = currentUser ? currentUser.name.slice(0, 60) : 'Anonymous';

  const review = {
    id: Date.now(),
    user: userName,
    rating: Math.min(5, Math.max(1, currentReviewData.rating)),
    text,
    photos: [...currentReviewData.photos].slice(0, 5),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  if (!reviewsDB[bookId]) reviewsDB[bookId] = [];
  reviewsDB[bookId].unshift(review);
  saveReviews();

  // Move to next book
  reviewIndex++;
  currentReviewData = { rating: 0, text: '', photos: [] };
  renderReviewStep();
}

function skipReview() {
  reviewIndex++;
  currentReviewData = { rating: 0, text: '', photos: [] };
  renderReviewStep();
}

function regenerateBookCards() {
  // Re-render current filter
  const activeFilter = document.querySelector('.filter-pill.active');
  generateBooks(activeFilter ? activeFilter.dataset.category : 'all');
  observeBookCards();
}

// ---- Profile Modal ----
function openProfileModal() {
  renderProfileModal();
  const modal = document.getElementById('profile-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function renderProfileModal() {
  const body = document.getElementById('profile-modal-body');
  if (!body || !currentUser) return;

  const initials = currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const totalOrders = ordersDB.length;
  const totalBooks = ordersDB.reduce((sum, o) => sum + o.books.reduce((s, b) => s + b.quantity, 0), 0);
  const totalReviews = Object.values(reviewsDB).flat().filter(r => r.user === currentUser.name).length;
  const memberDate = currentUser.signupDate || currentUser.loginDate || new Date().toISOString();
  const memberSince = new Date(memberDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1.5rem;">
          <div style="font-size:1.6rem;">👤</div>
          <h2 class="modal-title">My Profile</h2>
        </div>

        <div class="profile-avatar-section">
          <div class="profile-avatar-big">
            ${initials}
            <div class="profile-avatar-edit">✏️</div>
          </div>
          <div style="font-weight:800;font-size:1.1rem;color:var(--text-primary);margin-bottom:0.2rem;">${currentUser.name}</div>
          <div class="profile-member-since">Member since ${memberSince}</div>
        </div>

        <div class="profile-stats">
          <div class="profile-stat">
            <span class="profile-stat-value">${totalOrders}</span>
            <span class="profile-stat-label">Orders</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-value">${totalBooks}</span>
            <span class="profile-stat-label">Books</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-value">${totalReviews}</span>
            <span class="profile-stat-label">Reviews</span>
          </div>
        </div>

        <div class="profile-section-title">Account Details</div>
        <div class="form-group">
          <label class="form-label" for="profile-name">Full Name</label>
          <input type="text" class="form-input" id="profile-name" value="${currentUser.name}" placeholder="Your name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="profile-email">Email Address</label>
          <input type="email" class="form-input" id="profile-email" value="${currentUser.email}" placeholder="your@email.com" />
        </div>
        <div class="form-group">
          <label class="form-label" for="profile-phone">Phone Number <span style="color:var(--text-secondary);font-weight:500;">(optional)</span></label>
          <input type="tel" class="form-input" id="profile-phone" value="${currentUser.phone || ''}" placeholder="+91 98765 43210" />
        </div>

        <button class="profile-save-btn" onclick="saveProfile()">💾 Save Changes</button>`;
}

function saveProfile() {
  const name = (document.getElementById('profile-name') || {}).value.trim();
  const email = (document.getElementById('profile-email') || {}).value.trim();
  const phone = (document.getElementById('profile-phone') || {}).value.trim();
  if (!name) return showNotification('Name cannot be empty', 'error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return showNotification('Please enter a valid email', 'error');
  currentUser = { ...currentUser, name, email, phone };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // Update avatar letter + dropdown header
  const avatar = document.getElementById('user-avatar');
  if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
  const nameEl = document.getElementById('menu-user-name');
  const emailEl = document.getElementById('menu-user-email');
  if (nameEl) nameEl.textContent = name;
  if (emailEl) emailEl.textContent = email;
  showNotification('Profile updated! ✅', 'success');
  closeProfileModal();
}

// Lightbox
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (lb && img) { img.src = src; lb.classList.add('active'); }
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
}

// Show all reviews for a book in the review modal
function showAllReviews(bookId) {
  const bid = Number(bookId);
  const book = books.find(b => b.id === bid);
  const allReviews = reviewsDB[bid] || [];
  if (!allReviews.length || !book) return;

  const body = document.getElementById('review-modal-body');
  if (!body) return;

  body.innerHTML = `
        <div class="modal-header" style="margin-bottom:1rem;">
          <div style="font-size:1.6rem;">💬</div>
          <h2 class="modal-title">All Reviews</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:0.3rem;">${escHtml(book.title)}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${allReviews.map(r => `
            <div class="book-review-item" style="flex-direction:column;padding:1.2rem;">
              <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.8rem;">
                <div class="review-user-avatar">${escHtml(r.user.charAt(0).toUpperCase())}</div>
                <div>
                  <div class="review-user-name">${escHtml(r.user)}</div>
                  <div style="font-size:0.8rem;color:var(--text-secondary);">${escHtml(r.date)}</div>
                </div>
                <div class="review-stars" style="margin-left:auto;font-size:1rem;">${'★'.repeat(Math.min(5, r.rating))}${'☆'.repeat(5 - Math.min(5, r.rating))}</div>
              </div>
              ${r.text ? `<div class="review-text" style="font-size:0.95rem;line-height:1.6;">${escHtml(r.text)}</div>` : ''}
              ${r.photos && r.photos.length ? `<div class="review-photos">${r.photos.map(p => `<img class="review-photo-thumb" src="${escHtml(p)}" alt="Review photo" data-lb-src="${escHtml(p)}" />`).join('')}</div>` : ''}
            </div>`).join('')}
        </div>
        <button class="submit-btn" style="margin-top:1.5rem;" onclick="closeReviewModal()">Close</button>`;

  // Attach lightbox events
  body.querySelectorAll('[data-lb-src]').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.dataset.lbSrc));
  });

  const modal = document.getElementById('review-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

// ---- Init & Events ----
document.addEventListener('DOMContentLoaded', () => {
  // Restore user
  try {
    const raw = localStorage.getItem('currentUser');
    const savedUser = raw ? JSON.parse(raw) : null;
    if (savedUser && typeof savedUser === 'object' && savedUser.name && savedUser.email) {
      currentUser = savedUser;
      updateUIForLoggedInUser();
    }
  } catch (e) { localStorage.removeItem('currentUser'); }


  // Render books, trending, offers, ebooks
  generateBooks();
  observeBookCards();
  renderTrending();
  renderOffers();
  renderEbooks();

  // Observe trending & ebook cards
  setTimeout(() => {
    document.querySelectorAll('#trending-container .trending-card, #ebooks-container .book-card').forEach(el => el.classList.add('visible'));
  }, 300);

  // Filter click
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('books-container');
      grid.classList.add('filtering');
      generateBooks(btn.dataset.category);
      observeBookCards();
      setTimeout(() => grid.classList.remove('filtering'), 500);
    });
  });

  // Helper to handle book card clicks (reused for multiple containers)
  function handleBookContainerClick(e, container) {
    // eBook format toggle
    const fmtBtn = e.target.closest('[data-fmt]');
    if (fmtBtn) {
      e.stopPropagation();
      const bookId = Number(fmtBtn.dataset.bookId);
      const fmt = fmtBtn.dataset.fmt;
      fmtBtn.closest('.book-format-row').querySelectorAll('.format-btn').forEach(b => b.classList.remove('selected'));
      fmtBtn.classList.add('selected');
      // Update price display
      const card = fmtBtn.closest('.book-card');
      const book = books.find(b => b.id === bookId);
      if (card && book) {
        const priceEl = card.querySelector('.book-price');
        if (priceEl) priceEl.textContent = formatINR(fmt === 'ebook' ? Math.round(book.price * 0.6) : book.price);
      }
      return;
    }

    const card = e.target.closest('.book-card');
    if (!card) return;
    const id = Number(card.getAttribute('data-id'));

    // Determine selected format
    const selectedFmtBtn = card.querySelector('.format-btn.selected');
    const fmt = selectedFmtBtn ? selectedFmtBtn.dataset.fmt : 'physical';

    if (e.target.matches('[data-add-to-cart]')) {
      e.stopPropagation();
      addToCart(id, fmt);
      e.target.classList.remove('pulsing');
      void e.target.offsetWidth;
      e.target.classList.add('pulsing');
      e.target.addEventListener('animationend', () => e.target.classList.remove('pulsing'), { once: true });
    } else if (e.target.closest('[data-see-reviews]')) {
      e.stopPropagation();
      const bid = Number(e.target.closest('[data-see-reviews]').dataset.seeReviews);
      showAllReviews(bid);
    } else if (e.target.closest('[data-lightbox-idx]')) {
      e.stopPropagation();
      const src = e.target.getAttribute('src');
      if (src) openLightbox(src);
    } else if (e.target.closest('.wishlist-btn')) {
      e.stopPropagation();
      const btn = e.target.closest('.wishlist-btn');
      const bid = Number(btn.dataset.wishlistBook);
      // Animate it
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => btn.style.transform = 'scale(1)', 200);

      if (window.toggleWishlist) {
        window.toggleWishlist(bid);
      } else {
        showNotification('Wishlist coming soon!', 'info');
      }
    } else if (e.target.matches('[data-quick-view]')) {
      e.stopPropagation();
      showQuickView(id);
    } else {
      addToCart(id, fmt);
    }
  }

  // Delegate book card buttons
  document.getElementById('books-container').addEventListener('click', e => handleBookContainerClick(e, 'books'));
  document.getElementById('ebooks-container').addEventListener('click', e => handleBookContainerClick(e, 'ebooks'));

  // Trending container clicks
  document.getElementById('trending-container').addEventListener('click', e => {
    const btn = e.target.closest('[data-add-trending]');
    if (btn) { e.stopPropagation(); addToCart(Number(btn.dataset.addTrending)); return; }
    const card = e.target.closest('.trending-card');
    if (card) addToCart(Number(card.getAttribute('data-id')));
  });

  // Buttons in header
  document.getElementById('browse-btn').addEventListener('click', () => {
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('login-btn').addEventListener('click', openLogin);
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('checkout-btn').addEventListener('click', checkout);
  document.getElementById('user-avatar').addEventListener('click', toggleUserMenu);
  document.getElementById('logout-btn').addEventListener('click', (e) => { e.preventDefault(); (window.handleLogout || handleLogout)(); });

  // Close menus/modals on backdrop or outside
  document.addEventListener('click', (e) => {
    const avatar = document.getElementById('user-avatar');
    const menu = document.getElementById('user-menu');
    if (menu && avatar && !avatar.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('active');
  });
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (!modal) return;
      if (modal.id === 'login-modal') closeLogin();
      else if (modal.id === 'cart-modal') closeCart();
    });
  });
  document.getElementById('cart-modal').addEventListener('click', (e) => { if (e.target.id === 'cart-modal') closeCart(); });
  document.getElementById('login-modal').addEventListener('click', (e) => { if (e.target.id === 'login-modal') closeLogin(); });

  // Auth form events
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleSignup);
  const googleLoginBtn = document.getElementById('google-login');
  if (googleLoginBtn) googleLoginBtn.addEventListener('click', handleGoogleAuth);
  const googleSignupBtn = document.getElementById('google-signup');
  if (googleSignupBtn) googleSignupBtn.addEventListener('click', handleGoogleAuth);
  document.getElementById('to-signup').addEventListener('click', (e) => { e.preventDefault(); switchAuthTab('signup'); });
  document.getElementById('to-login').addEventListener('click', (e) => { e.preventDefault(); switchAuthTab('login'); });
  document.getElementById('forgot-link').addEventListener('click', (e) => { e.preventDefault(); showNotification('Password reset link sent to your email 📧', 'info'); });

  // Review modal close
  document.getElementById('review-close-btn').addEventListener('click', closeReviewModal);
  document.getElementById('review-modal').addEventListener('click', (e) => { if (e.target.id === 'review-modal') closeReviewModal(); });

  // Payment modal close
  document.getElementById('payment-close-btn').addEventListener('click', closePaymentModal);
  document.getElementById('payment-modal').addEventListener('click', (e) => { if (e.target.id === 'payment-modal') closePaymentModal(); });

  // Orders modal
  document.getElementById('orders-close-btn').addEventListener('click', closeOrdersModal);
  document.getElementById('orders-modal').addEventListener('click', (e) => { if (e.target.id === 'orders-modal') closeOrdersModal(); });

  // Tracking modal
  document.getElementById('tracking-close-btn').addEventListener('click', closeTrackingModal);
  document.getElementById('tracking-modal').addEventListener('click', (e) => { if (e.target.id === 'tracking-modal') closeTrackingModal(); });

  // Refund modal
  document.getElementById('refund-close-btn').addEventListener('click', closeRefundModal);
  document.getElementById('refund-modal').addEventListener('click', (e) => { if (e.target.id === 'refund-modal') closeRefundModal(); });

  // ---- Settings Modal ----
  function openSettingsModal() {
    if (!currentUser) return openLogin();
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    // Populate form
    document.getElementById('settings-name').value = currentUser.name || '';
    document.getElementById('settings-email').value = currentUser.email || '';
    document.getElementById('settings-phone').value = currentUser.phone || '';
    document.getElementById('settings-address').value = currentUser.address || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function handleSettingsSave(e) {
    e.preventDefault();
    // Fallback local save (will be overridden by api.js for real backend save)
    const name = document.getElementById('settings-name').value;
    const phone = document.getElementById('settings-phone').value;
    const address = document.getElementById('settings-address').value;

    currentUser = { ...currentUser, name, phone, address };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    closeSettingsModal();
    showNotification('Settings updated! ✅', 'success');
  }

  // ---- Wishlist Modal ----
  window.renderWishlistItems = function () {
    const body = document.getElementById('wishlist-body');
    if (!body) return;

    const wList = window.wishlist || [];
    if (wList.length === 0) {
      body.innerHTML = '<div style="text-align:center; color:var(--text-secondary); padding:2rem;">Your wishlist is empty.</div>';
      return;
    }

    let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(150px, 1fr)); gap:1rem;">';
    wList.forEach(item => {
      const b = item.book_details || item; // fallback if just a book object
      html += `
            <div class="wishlist-item" style="border:1px solid rgba(0,0,0,0.1); border-radius:8px; padding:0.5rem; text-align:center; position:relative;">
              <button class="wishlist-btn" data-wishlist-book="${b.id}" style="position:absolute; top:5px; right:5px; background:white; border:none; border-radius:50%; width:24px; height:24px; font-size:12px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.2); z-index:2; transition:transform 0.2s;">❤️</button>
              <img src="${b.image || b.image_url}" style="width:100%; height:auto; aspect-ratio:2/3; object-fit:cover; border-radius:4px; margin-bottom:0.5rem;" />
              <div style="font-size:0.9rem; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${b.title}">${b.title}</div>
              <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">${b.author}</div>
              <button class="btn btn-primary" style="padding:0.3rem 0.5rem; font-size:0.8rem; width:100%;" onclick="addToCart(${b.id}, 'physical')">Add to Cart</button>
            </div>
          `;
    });
    html += '</div>';
    body.innerHTML = html;
  };

  function openWishlistModal() {
    if (!currentUser) return openLogin();
    const modal = document.getElementById('wishlist-modal');
    if (!modal) return;

    if (window.renderWishlistItems) window.renderWishlistItems();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Wire user-menu items
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const action = el.dataset.action;
      closeUserMenu();
      if (action === 'orders') { openOrdersModal(); }
      else if (action === 'profile') {
        if (!currentUser) { openLogin(); return; }
        openProfileModal();
      }
      else if (action === 'wishlist') { openWishlistModal(); }
      else if (action === 'settings') { openSettingsModal(); }
    });
  });

  // Settings modal wire-up
  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) settingsForm.addEventListener('submit', handleSettingsSave);
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettingsModal);
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) settingsModal.addEventListener('click', (e) => { if (e.target.id === 'settings-modal') closeSettingsModal(); });

  // Wishlist modal wire-up
  const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
  if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', closeWishlistModal);
  const wishlistModal = document.getElementById('wishlist-modal');
  if (wishlistModal) wishlistModal.addEventListener('click', (e) => { if (e.target.id === 'wishlist-modal') closeWishlistModal(); });

  // Profile modal close
  document.getElementById('profile-close-btn').addEventListener('click', closeProfileModal);
  document.getElementById('profile-modal').addEventListener('click', (e) => { if (e.target.id === 'profile-modal') closeProfileModal(); });

  // Lightbox close
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

  // Quick View modal close
  document.getElementById('quick-view-close-btn').addEventListener('click', closeQuickView);
  document.getElementById('quick-view-modal').addEventListener('click', (e) => { if (e.target.id === 'quick-view-modal') closeQuickView(); });

  // Submit forms with Enter inside modal inputs
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) e.target.closest('form').requestSubmit();
    });
  });

  // ===== ANIMATION INIT =====

  // 1. Floating particles on hero canvas
  // Disabled to improve performance / reduce lag
  // initParticles();

  // 2. Mouse parallax on hero content
  // Disabled to improve performance / reduce lag
  /*
  const heroContent = document.getElementById('hero-content');
  document.getElementById('home').addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const dx = (e.clientX / w - 0.5) * 20;
    const dy = (e.clientY / h - 0.5) * 10;
    heroContent.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  document.getElementById('home').addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0,0)';
  });
  */

  // 3. Ripple effect on all .ripple-btn elements
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.ripple-btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  });
});

// ---- Quick View ----
const QV_DESCRIPTIONS = {
  'Classics': 'A timeless masterpiece that has shaped literature and culture for generations. This classic work continues to captivate readers with its enduring themes, rich characters, and profound insights into the human condition.',
  'Self-Help': 'A transformative guide packed with actionable strategies and proven principles. Backed by research and real-world examples, this book will help you build better habits, sharpen your focus, and unlock your true potential.',
  'Fiction': 'An immersive story that transports you to another world. Filled with vivid characters, unexpected twists, and emotional depth, this novel is impossible to put down.',
  'Mystery': 'A gripping page-turner that keeps you guessing until the very last line. Master storytelling, intricate plot twists, and a cast of unforgettable characters make this a must-read for thriller fans.',
  'Sci-Fi': 'A visionary exploration of future worlds, advanced technology, and the possibilities of human imagination. This thought-provoking work challenges your assumptions and expands your perspective.',
  'Biography': 'An intimate and inspiring portrait of an extraordinary life. This meticulously researched biography reveals the private struggles, defining decisions, and remarkable achievements behind the legend.',
  'Business': 'Essential reading for entrepreneurs, leaders, and professionals. Packed with frameworks, case studies, and hard-won wisdom, this book will transform the way you think about business and success.',
};

let _qvFmt = 'physical';

function showQuickView(bookId) {
  const book = books.find(b => b.id === bookId);
  if (!book) return;
  _qvFmt = 'physical';

  const desc = QV_DESCRIPTIONS[book.category] || QV_DESCRIPTIONS['Classics'];
  const stars = '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating));
  const ebookPrice = Math.round(book.price * 0.6);
  const reviewsDB_count = (reviewsDB[book.id] || []).length;
  const totalReviews = (book.reviews + reviewsDB_count).toLocaleString();

  const formatRow = book.ebook ? `
        <div class="qv-format-row">
          <button class="qv-fmt-btn selected" id="qv-fmt-physical"
            onclick="selectQVFormat('physical',${book.price},${ebookPrice})">
            📚 Physical &mdash; ₹${book.price}
          </button>
          <button class="qv-fmt-btn" id="qv-fmt-ebook"
            onclick="selectQVFormat('ebook',${book.price},${ebookPrice})">
            📱 eBook &mdash; ₹${ebookPrice}
          </button>
        </div>` : '';

  const body = document.getElementById('quick-view-body');
  if (!body) return;

  body.innerHTML = `
        <div class="qv-body">
          <div class="qv-cover-side">
            <img class="qv-cover-img"
              src="${escHtml(book.image)}"
              alt="${escHtml(book.title)}"
              onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%236366f1%22 width=%22300%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22white%22 font-size=%2240%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📚%3C/text%3E%3C/svg%3E'" />
          </div>
          <div class="qv-details-side">
            <div class="qv-badge-row">
              <span class="qv-badge">${escHtml(book.badge || 'Bestseller')}</span>
              <span class="qv-tag">📂 ${escHtml(book.category)}</span>
              ${book.ebook ? '<span class="qv-tag">📱 eBook</span>' : ''}
            </div>
            <div class="qv-title">${escHtml(book.title)}</div>
            <div class="qv-author">by ${escHtml(book.author)}</div>
            <div class="qv-rating-row">
              <span class="qv-stars">${stars}</span>
              <span class="qv-rating-num">${book.rating}</span>
              <span class="qv-reviews">(${totalReviews} reviews)</span>
            </div>
            <div class="qv-divider"></div>
            <div class="qv-desc">${escHtml(desc)}</div>
            <div class="qv-info-grid">
              <div class="qv-info-item">
                <div class="qv-info-label">Category</div>
                <div class="qv-info-value">${escHtml(book.category)}</div>
              </div>
              <div class="qv-info-item">
                <div class="qv-info-label">Format</div>
                <div class="qv-info-value">${book.ebook ? 'Physical + eBook' : 'Physical Only'}</div>
              </div>
              <div class="qv-info-item">
                <div class="qv-info-label">Rating</div>
                <div class="qv-info-value">${book.rating} / 5.0 ⭐</div>
              </div>
              <div class="qv-info-item">
                <div class="qv-info-label">Total Reviews</div>
                <div class="qv-info-value">${totalReviews}</div>
              </div>
            </div>
            ${formatRow}
            <div class="qv-price-row">
              <div class="qv-price" id="qv-price">₹${book.price}</div>
              <button class="qv-add-btn" id="qv-add-btn" onclick="qvAddToCart(${book.id})">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>`;

  const modal = document.getElementById('quick-view-modal');
  if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function selectQVFormat(fmt, physPrice, ebookPrice) {
  _qvFmt = fmt;
  const pBtn = document.getElementById('qv-fmt-physical');
  const eBtn = document.getElementById('qv-fmt-ebook');
  const pEl = document.getElementById('qv-price');
  if (pBtn) pBtn.classList.toggle('selected', fmt === 'physical');
  if (eBtn) eBtn.classList.toggle('selected', fmt === 'ebook');
  if (pEl) pEl.textContent = '₹' + (fmt === 'ebook' ? ebookPrice : physPrice);
}

function qvAddToCart(bookId) {
  addToCart(bookId, _qvFmt);
  const btn = document.getElementById('qv-add-btn');
  if (btn) {
    btn.textContent = '✅ Added to Cart!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = '🛒 Add to Cart';
      btn.classList.remove('added');
    }, 2000);
  }
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

// ---- Scroll-reveal (IntersectionObserver) ----
function observeBookCards() {
  const cards = document.querySelectorAll('.book-card:not(.visible)');

  // Fallback: force-reveal all cards after 1.5s in case observer never fires
  const fallbackTimer = setTimeout(() => {
    document.querySelectorAll('.book-card:not(.visible)').forEach(card => {
      card.classList.add('visible');
    });
  }, 1500);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '200px 0px 200px 0px'  // generous margin so nearby cards reveal too
  });

  cards.forEach(card => observer.observe(card));

  // Also immediately reveal cards already fully in viewport
  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => card.classList.add('visible'), i * 80);
    }
  });
}



// ---- Particle System ----
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const NUM = 55;
  particles = Array.from({ length: NUM }, () => createParticle());

  function createParticle(fromBottom = false) {
    return {
      x: Math.random() * W,
      y: fromBottom ? H + 10 : Math.random() * H,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.8 + 0.2),
      alpha: Math.random() * 0.5 + 0.1,
      color: ['255,255,255', '200,180,255', '180,210,255'][Math.floor(Math.random() * 3)]
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.0015;
      if (p.y < -10 || p.alpha <= 0) particles[i] = createParticle(true);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${Math.max(0, p.alpha)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- Header Scroll Logic ----
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});