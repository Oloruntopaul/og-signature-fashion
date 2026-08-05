// SHOP PAGE — sidebar category filter

let activeCategory = null;

function getCategories() {
  const categories = [];
  PRODUCTS.forEach(function (p) {
    if (categories.indexOf(p.category) === -1) categories.push(p.category);
  });
  return categories;
}

function renderSidebar() {
  const sidebar = document.getElementById("shopSidebar");
  if (!sidebar) return;

  const categories = getCategories();

  sidebar.innerHTML = categories
    .map(function (category) {
      // Correctly counting only available items
      const count = PRODUCTS.filter(function (p) {
        return p.category === category && p.available === true;
      }).length;
      const isActive = category === activeCategory;
      return (
        "<button onclick=\"selectCategory('" +
        category +
        '\')" class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ' +
        (isActive
          ? "bg-gold text-white"
          : "text-ink/70 hover:bg-gold/10 dark:text-pearl/70") +
        '">' +
        "<span>" +
        category +
        "</span>" +
        '<span class="text-xs opacity-70">' +
        count +
        "</span>" +
        "</button>"
      );
    })
    .join("");

  // Dynamically populate the mobile dropdown so it matches the sidebar
  const mobileDropdown = document.getElementById("mobileCategorySelect");
  if (mobileDropdown) {
    mobileDropdown.innerHTML = categories
      .map(function (category) {
        const isActive = category === activeCategory;
        return (
          '<option value="' +
          category +
          '" ' +
          (isActive ? "selected" : "") +
          ">" +
          category +
          "</option>"
        );
      })
      .join("");
  }
}

function selectCategory(category) {
  activeCategory = category;
  renderSidebar();
  renderShopGrid();
  // update the URL so the link is shareable/bookmarkable without reloading the page
  history.replaceState(null, "", "?cat=" + encodeURIComponent(category));
}

function renderShopGrid() {
  const grid = document.getElementById("shopGrid");
  const heading = document.getElementById("shopCategoryHeading");
  if (!grid) return;

  const items = PRODUCTS.filter(function (p) {
    return p.category === activeCategory;
  });
  const availableItems = items.filter(function (p) {
    return p.available;
  });

  if (heading) heading.textContent = activeCategory;

  grid.innerHTML =
    availableItems.length > 0
      ? availableItems.map(renderProductCard).join("")
      : renderComingSoonCard(activeCategory);
}

function renderProductCard(p) {
  return (
    '<article class="group overflow-hidden overflow-hidden rounded-2xl hover-glow rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-night/60">' +
    '<div class="overflow-hidden aspect-square">' +
    '<img src="' +
    p.image +
    '" alt="' +
    p.name +
    '" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />' +
    "</div>" +
    '<div class="p-4 sm:p-5">' +
    '<span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">' +
    p.category +
    "</span>" +
    '<h3 class="mt-1 font-serif text-sm font-bold text-charcoal dark:text-pearl sm:text-base">' +
    p.name +
    "</h3>" +
    '<p class="mt-1 font-display text-sm font-bold text-gold">' +
    formatNaira(p.price) +
    "</p>" +
    "<button onclick=\"addToCart('" +
    p.id +
    '\')" class="focus-ring mt-3 w-full rounded-full border border-gold/40 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-goldDeep transition hover:bg-gold hover:text-white dark:text-white sm:text-xs">Add to Cart</button>' +
    "</div>" +
    "</article>"
  );
}

function renderComingSoonCard(category) {
  const enquiryMessage = "Hi, I'd like to enquire about " + category;
  return (
    '<div class="col-span-2 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-gold/5 p-10 text-center lg:col-span-3">' +
    '<p class="font-display text-lg font-bold text-charcoal dark:text-pearl">' +
    category +
    " — Coming Soon</p>" +
    '<p class="mt-2 max-w-md text-sm text-ink/60 dark:text-pearl/60">We\'re still tailoring this collection. Check out our Vintage Shirts available now, or message us on WhatsApp to place a custom order.</p>' +
    '<a href="https://wa.me/2348159355348?text=' +
    encodeURIComponent(enquiryMessage) +
    '" target="_blank" rel="noopener" class="focus-ring mt-5 inline-flex rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white">Request a Custom Order</a>' +
    "</div>"
  );
}

function initShopPage() {
  // Check the URL for a category (?cat=Agbada) — set by links from the homepage.
  // If none given, or it doesn't match a real category, default to the first one (Shirts).
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("cat");
  const categories = getCategories();

  activeCategory =
    categories.indexOf(requestedCategory) !== -1
      ? requestedCategory
      : categories[0];

  renderSidebar();
  renderShopGrid();
}

document.addEventListener("DOMContentLoaded", initShopPage);
