// SHOP PAGE — sidebar category filter

let activeCategory = null;
let activeEdition = "all";

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

function updateShopUrl() {
  const params = new URLSearchParams(window.location.search);
  params.set("cat", activeCategory);
  if (activeCategory === "Shirts" && activeEdition !== "all") params.set("edition", activeEdition);
  else params.delete("edition");
  history.replaceState(null, "", "?" + params.toString());
}

function selectCategory(category) {
  activeCategory = getCategories().includes(category) ? category : getCategories()[0];
  activeEdition = "all";
  renderSidebar();
  renderShopGrid();
  updateShopUrl();
}

function selectEdition(edition) {
  const restoreFocus = Boolean(document.activeElement?.dataset.edition);
  activeEdition = ["all", "classic", "new"].includes(edition) ? edition : "all";
  renderShopGrid();
  updateShopUrl();
  if (restoreFocus) document.querySelector('#shirtEditionFilters [data-edition="' + activeEdition + '"]')?.focus();
}

function renderEditionFilters() {
  const nav = document.getElementById("shirtEditionFilters");
  if (!nav) return;
  nav.hidden = activeCategory !== "Shirts";
  if (nav.hidden) { nav.innerHTML = ""; return; }
  const labels = { all: "All Shirts", new: "New Edition", classic: "Classic Edition" };
  nav.innerHTML = Object.keys(labels).map(function (edition) {
    const count = PRODUCTS.filter(p => p.available && p.category === "Shirts" && (edition === "all" || p.edition === edition)).length;
    return '<button type="button" data-edition="' + edition + '" aria-pressed="' + (edition === activeEdition) + '" onclick="selectEdition(\'' + edition + '\')">' + labels[edition] + '<span>' + count + '</span></button>';
  }).join("");
}

function renderShopGrid() {
  const grid = document.getElementById("shopGrid");
  const heading = document.getElementById("shopCategoryHeading");
  if (!grid) return;
  renderEditionFilters();
  const items = PRODUCTS.filter(p => p.category === activeCategory && p.available);
  if (heading) heading.textContent = activeCategory;
  if (activeCategory === "Shirts") {
    const editions = activeEdition === "all" ? ["new", "classic"] : [activeEdition];
    grid.innerHTML = editions.map(function (edition) {
      const group = items.filter(p => p.edition === edition);
      const label = edition === "classic" ? "Classic Edition" : "New Edition";
      return '<div class="edition-heading"><h3>' + label + '</h3><p>' + group.length + ' shirts</p></div>' + group.map(renderProductCard).join("");
    }).join("");
  } else {
    grid.innerHTML = items.length ? items.map(renderProductCard).join("") : renderComingSoonCard(activeCategory);
  }
}

function renderProductCard(p) {
  return (
    '<article class="group overflow-hidden overflow-hidden rounded-2xl hover-glow rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-night/60">' +
    '<div class="relative overflow-hidden aspect-square">' + saleBadge(p) + renderHeartButton(p, getCart().some(function(item) { return item.id === p.id; })) +
    '<img src="' +
    p.image +
    '"' + productImageAttributes(p) + ' decoding="async" alt="' +
    p.name +
    '" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />' +
    "</div>" +
    '<div class="p-4 sm:p-5">' +
    '<span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">' +
    shirtEditionLabel(p) +
    "</span>" +
    '<h3 class="mt-1 font-serif text-sm font-bold text-charcoal dark:text-pearl sm:text-base">' +
    p.name +
    "</h3>" +
    salePrice(p) +
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
  const requestedCategory = params.get("cat") === "Vintage" ? "Shirts" : params.get("cat");
  const categories = getCategories();

  activeCategory =
    categories.indexOf(requestedCategory) !== -1
      ? requestedCategory
      : categories[0];

  activeEdition = activeCategory === "Shirts" && ["classic", "new"].includes(params.get("edition")) ? params.get("edition") : "all";
  renderSidebar();
  renderShopGrid();
}

document.addEventListener("DOMContentLoaded", initShopPage);
