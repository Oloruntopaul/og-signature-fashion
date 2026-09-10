// HOMEPAGE COLLECTION TEASER
function renderCollectionTeaser() {
  const grid = document.getElementById("collectionGrid");
  if (!grid) return;

  const cart = getCart();
  const teaserItems = ["v1", "p1", "v4", "p2"].map(findProduct);

  grid.innerHTML = teaserItems
    .map(function (p) {
      const shopLink = "./shop.html?cat=" + encodeURIComponent(p.category);
      const isInCart = cart.some(function (item) {
        return item.id === p.id;
      });

      const priceOrBadge = p.available ? salePrice(p) : '<p>Coming Soon</p>';

      const heartButton = p.available ? renderHeartButton(p, isInCart) : "";

      return (
        '<article class="group relative cursor-pointer overflow-hidden hover-glow rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-night/60" onclick="window.location.href=\'' +
        shopLink +
        "'\">" +
        '<div class="relative overflow-hidden aspect-square">' + saleBadge(p) +
        '<img src="' +
        p.image +
        '"' + productImageAttributes(p) + ' decoding="async" alt="' +
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

document.addEventListener("DOMContentLoaded", renderCollectionTeaser);
