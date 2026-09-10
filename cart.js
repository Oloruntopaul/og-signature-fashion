// CART LOGIC
// Cart is stored in localStorage so it survives page changes and refreshes.

const CART_KEY = "og_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(item => item && findProduct(item.id)?.available && Number.isSafeInteger(item.qty) && item.qty > 0) : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product || product.available === false) return;

  const cart = getCart();
  const existing = cart.find(function (item) {
    return item.id === productId;
  });

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  saveCart(cart);
  renderCart();
  openCart();
}

function removeFromCart(productId) {
  const cart = getCart().filter(function (item) {
    return item.id !== productId;
  });
  saveCart(cart);
  renderCart();
}

function changeQty(productId, newQty) {
  let cart = getCart();
  const item = cart.find(function (item) {
    return item.id === productId;
  });

  if (item) {
    item.qty = Math.max(0, newQty);
  }

  saveCart(cart.filter(function (entry) { return entry.qty > 0; }));
  renderCart();
}

//  empty the whole cart
function clearCart() {
  saveCart([]);
  renderCart();
}

function calculateTotal(cart) {
  return cart.reduce(function (sum, item) {
    const product = findProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function buildWhatsAppMessage(cart) {
  const lines = ["Hello OG Signature & Fashion World, I'd like to order:", ""];

  cart.forEach(function (item) {
    const product = findProduct(item.id);
    if (product) {
      lines.push(
        item.qty +
          "x " +
          product.name +
          " - " +
          formatNaira(product.price * item.qty),
      );
    }
  });

  lines.push("");
  lines.push("Total: " + formatNaira(calculateTotal(cart)));

  return lines.join("\n");
}


function renderHeartButton(p, active) {
  return `<button type="button" class="heart-btn ${active ? 'is-active' : ''}" data-id="${p.id}" aria-pressed="${active}" aria-label="${active ? 'Remove' : 'Add'} ${p.name} ${active ? 'from' : 'to'} bag" onclick="event.stopPropagation(); toggleWishlistHeart('${p.id}')"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>`;
}
function toggleWishlistHeart(id) {
  if (getCart().some(item => item.id === id)) removeFromCart(id);
  else addToCart(id);
}
function syncHeartButtons() {
  const ids = new Set(getCart().map(item => item.id));
  document.querySelectorAll('.heart-btn').forEach(btn => {
    const active = ids.has(btn.dataset.id);
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
    const product = findProduct(btn.dataset.id);
    btn.setAttribute('aria-label', `${active ? 'Remove' : 'Add'} ${product.name} ${active ? 'from' : 'to'} bag`);
  });
}
function renderCart() {
  const cart = getCart();
  syncHeartButtons();
  const count = cart.reduce((sum,item) => sum + item.qty,0);
  const badge = document.getElementById('cartCount');
  if(badge) { badge.textContent = count; badge.classList.toggle('hidden', count === 0); }
  const box = document.getElementById('cartItems');
  if(!box) return;
  // Preserve keyboard focus when the quantity controls are re-rendered.
  const focusKey = box.contains(document.activeElement) ? document.activeElement.dataset.focus : null;
  document.getElementById('cartItemCount').textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
  document.getElementById('cartEmpty').classList.toggle('hidden', count > 0);
  document.getElementById('clearCartButton').disabled = count === 0;
  box.innerHTML = cart.map(item => {
    const p = findProduct(item.id);
    return `<article class="cart-item"><img src="${p.image.replace(".webp", "-small.webp")}" alt="${p.name}" width="88" height="110"><div class="cart-item-detail"><p class="cart-eyebrow">${p.category}</p><h3>${p.name}</h3><div class="cart-item-price"><span>${formatNaira(p.price)}</span>${p.originalPrice > p.price ? `<del>${formatNaira(p.originalPrice)}</del>` : ''}</div><div class="cart-item-controls"><div class="cart-quantity"><button type="button" data-focus="minus-${p.id}" aria-label="Decrease quantity of ${p.name}" onclick="changeQty('${p.id}',${item.qty-1})">−</button><span aria-label="Quantity">${item.qty}</span><button type="button" data-focus="plus-${p.id}" aria-label="Increase quantity of ${p.name}" onclick="changeQty('${p.id}',${item.qty+1})">+</button></div><button type="button" class="cart-remove" data-focus="remove-${p.id}" aria-label="Remove ${p.name}" onclick="removeFromCart('${p.id}')">Remove</button></div><p class="cart-line-total">Item total <strong>${formatNaira(p.price * item.qty)}</strong></p></div></article>`;
  }).join('');
  const total = calculateTotal(cart);
  document.getElementById('cartTotal').textContent = formatNaira(total);
  const savings = cart.reduce((sum,item) => { const p=findProduct(item.id);return sum+Math.max(0,(p.originalPrice || p.price)-p.price)*item.qty; },0);
  document.getElementById('cartSavingsRow').hidden = savings === 0;
  document.getElementById('cartSavings').textContent = formatNaira(savings);
  const link = document.getElementById('cartWhatsappLink');
  link.setAttribute('aria-disabled', String(count === 0));
  link.tabIndex = count ? 0 : -1;
  if(count) link.href = 'https://wa.me/2348159355348?text=' + encodeURIComponent(buildWhatsAppMessage(cart));
  else link.removeAttribute('href');
  document.getElementById('cartAnnouncement').textContent = `${count} items in bag. Subtotal ${formatNaira(total)}.`;
  if(focusKey) {
    const replacement = Array.from(box.querySelectorAll('[data-focus]')).find(el => el.dataset.focus === focusKey);
    (replacement || document.querySelector('#cartPanel [aria-label="Close cart"]')).focus();
  }
}
let cartReturnFocus = null;
let cartPreviousOverflow = '';
function openCart() {
  const panel = document.getElementById('cartPanel');
  if(panel.getAttribute('aria-hidden') === 'false') return;
  cartReturnFocus = document.activeElement;
  cartPreviousOverflow = document.body.style.overflow;
  panel.inert = false;
  panel.setAttribute('aria-hidden','false');
  panel.classList.remove('translate-x-full');
  document.getElementById('cartOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.querySelector('#cartPanel [aria-label="Close cart"]').focus();
}
function closeCart() {
  const panel = document.getElementById('cartPanel');
  if(panel.getAttribute('aria-hidden') !== 'false') return;
  panel.classList.add('translate-x-full');
  panel.setAttribute('aria-hidden','true');
  panel.inert = true;
  document.getElementById('cartOverlay').classList.add('hidden');
  document.body.style.overflow = cartPreviousOverflow;
  syncHeartButtons();
  if(cartReturnFocus?.isConnected) cartReturnFocus.focus();
}
document.addEventListener('keydown', event => {
  const panel = document.getElementById('cartPanel');
  if(panel?.getAttribute('aria-hidden') !== 'false') return;
  if(event.key === 'Escape') {event.preventDefault();closeCart();}
  if(event.key === 'Tab') {
    const focusable = Array.from(panel.querySelectorAll('button:not([disabled]), a[href]:not([tabindex="-1"])')).filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length-1];
    if(event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    else if(!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  }
});
window.addEventListener('storage', event => {if(event.key === CART_KEY || event.key === null) renderCart();});
document.addEventListener('DOMContentLoaded', renderCart);
