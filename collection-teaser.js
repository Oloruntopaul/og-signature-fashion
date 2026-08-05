// HOMEPAGE COLLECTION TEASER
function renderCollectionTeaser() {
  const grid = document.getElementById("collectionGrid");
  if (!grid) return;

  const cart = getCart();
  const teaserItems = PRODUCTS.slice(0, 4);

  grid.innerHTML = teaserItems
    .map(function (p) {
      const shopLink = "./shop.html?cat=" + encodeURIComponent(p.category);
      const isInCart = cart.some(function (item) {
        return item.id === p.id;
      });

      const priceOrBadge = p.available
        ? '<p class="mt-1 font-display text-sm font-bold text-gold sm:text-base">' +
          formatNaira(p.price) +
          "</p>"
        : '<p class="mt-1 text-xs font-bold uppercase tracking-wide text-ink/40 dark:text-pearl/40">Coming Soon</p>';

      const heartColor = isInCart ? "text-red-500" : "text-white";

      const heartButton = p.available
        ? "<button onclick=\"event.stopPropagation(); toggleWishlistHeart('" +
          p.id +
          '\')" class="focus-ring absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/30 backdrop-blur-sm transition hover:bg-black/50"><i class="fa-solid fa-heart text-base ' +
          heartColor +
          '"></i></button>'
        : "";

      return (
        '<article class="group relative cursor-pointer overflow-hidden hover-glow  overflow-hidden rounded-2xl hover-glowrounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-night/60" onclick="window.location.href=\'' +
        shopLink +
        "'\">" +
        '<div class="relative overflow-hidden  aspect-square">' +
        '<img src="' +
        p.image +
        '" alt="' +
        p.name +
        '" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />' +
        heartButton +
        "</div>" +
        '<div class="p-4 sm:p-5">' +
        '<span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">' +
        p.category +
        "</span>" +
        '<h3 class="mt-1 font-serif text-sm font-bold text-charcoal dark:text-pearl sm:text-base">' +
        p.name +
        "</h3>" +
        priceOrBadge +
        '<button type="button" onclick="event.stopPropagation(); window.location.href=\'' +
        shopLink +
        '\'" class="focus-ring mt-3 w-full rounded-full border border-gold/30 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-white dark:text-white sm:text-xs">Shop Now</button>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");
}

function toggleWishlistHeart(productId) {
  const cart = getCart();
  const alreadyIn = cart.some(function (item) {
    return item.id === productId;
  });

  if (alreadyIn) {
    removeFromCart(productId);
  } else {
    addToCart(productId);
  }

  renderCollectionTeaser();
}

document.addEventListener("DOMContentLoaded", renderCollectionTeaser);
