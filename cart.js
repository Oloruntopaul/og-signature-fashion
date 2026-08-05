// =============================
// CART LOGIC
// Cart is stored in localStorage so it survives page changes and refreshes.
// =============================

const CART_KEY = "og_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product || product.available === false) return; // safety: can't add unavailable items

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
    // ✅ FIXED: Allow quantity to go down to 0, but never negative.
    // It will NOT disappear automatically anymore.
    item.qty = Math.max(0, newQty);
  }

  saveCart(cart);
  renderCart();
}

// NEW: empty the whole cart
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

// ✅ NEW: Syncs the heart icons on the shop page to match the cart state
function syncHeartButtons() {
  const cart = getCart();
  // Build a list of product IDs currently in the cart (even if qty is 0)
  const cartIds = cart.map(function (item) {
    return item.id;
  });

  document.querySelectorAll(".heart-btn").forEach(function (btn) {
    const id = btn.dataset.id;
    if (cartIds.includes(id)) {
      // Item is in cart -> Turn Heart Red
      btn.classList.add("text-red-500", "fill-red-500");
      btn.classList.remove("text-gray-400");
    } else {
      // Item is NOT in cart -> Turn Heart Gray
      btn.classList.remove("text-red-500", "fill-red-500");
      btn.classList.add("text-gray-400");
    }
  });
}

function renderCart() {
  const cart = getCart();

  // ✅ Sync the hearts on the page immediately
  syncHeartButtons();

  const countBadge = document.getElementById("cartCount");
  if (countBadge) {
    const totalItems = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
    countBadge.textContent = totalItems;
    countBadge.classList.toggle("hidden", totalItems === 0);
  }

  const cartItemsBox = document.getElementById("cartItems");
  const cartEmptyBox = document.getElementById("cartEmpty");
  const cartTotalBox = document.getElementById("cartTotal");
  const whatsappLink = document.getElementById("cartWhatsappLink");

  if (!cartItemsBox) return;

  if (cart.length === 0) {
    cartItemsBox.innerHTML = "";
    cartEmptyBox.classList.remove("hidden");
    cartTotalBox.textContent = formatNaira(0);
    if (whatsappLink)
      whatsappLink.classList.add("pointer-events-none", "opacity-40");
    return;
  }

  cartEmptyBox.classList.add("hidden");
  if (whatsappLink)
    whatsappLink.classList.remove("pointer-events-none", "opacity-40");

  cartItemsBox.innerHTML = cart
    .map(function (item) {
      const product = findProduct(item.id);
      if (!product) return "";
      return (
        '<div class="flex gap-3 border-b border-gold/10 py-4">' +
        '<img src="' +
        product.image +
        '" alt="' +
        product.name +
        '" class="h-16 w-16 rounded-xl object-cover" />' +
        '<div class="flex-1">' +
        '<p class="text-sm font-semibold text-charcoal dark:text-pearl">' +
        product.name +
        "</p>" +
        '<p class="text-xs text-ink/60 dark:text-pearl/60">' +
        formatNaira(product.price) +
        "</p>" +
        '<div class="mt-2 flex items-center gap-3">' +
        "<button onclick=\"changeQty('" +
        item.id +
        "', " +
        (item.qty - 1) +
        ')" class="focus-ring h-7 w-7 rounded-full border border-gold/30 text-goldDeep dark:text-gold">-</button>' +
        '<span class="text-sm font-semibold">' +
        item.qty +
        "</span>" +
        "<button onclick=\"changeQty('" +
        item.id +
        "', " +
        (item.qty + 1) +
        ')" class="focus-ring h-7 w-7 rounded-full border border-gold/30 text-goldDeep dark:text-gold">+</button>' +
        "<button onclick=\"removeFromCart('" +
        item.id +
        '\')" class="focus-ring ml-auto text-xs font-semibold uppercase tracking-wide text-ink/40 hover:text-ink/70 dark:text-pearl/40">Remove</button>' +
        "</div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  cartTotalBox.textContent = formatNaira(calculateTotal(cart));

  if (whatsappLink) {
    const message = buildWhatsAppMessage(cart);
    whatsappLink.href =
      "https://wa.me/2348159355348?text=" + encodeURIComponent(message);
  }
}

function openCart() {
  document.getElementById("cartPanel").classList.remove("translate-x-full");
  document.getElementById("cartOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartPanel").classList.add("translate-x-full");
  document.getElementById("cartOverlay").classList.add("hidden");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", renderCart);
