// PRODUCT DATA
// Only items with available: true can be bought right now.
// Everything else shows "Coming Soon" automatically.

const PRODUCTS = [
  {
    id: "v1",
    name: "Vintage Shirt — New Edition 01",
    category: "Vintage",
    price: 10000,
    originalPrice: 12000,
    image: "./assets/images/new-vintage-5.webp",
    available: true,
    isNew: true,
  },
  {
    id: "v2",
    name: "Vintage Shirt — New Edition 02",
    category: "Vintage",
    price: 10000,
    originalPrice: 12000,
    image: "./assets/images/new-vintage-4.webp",
    available: true,
    isNew: true,
  },
  {
    id: "v3",
    name: "Vintage Shirt — New Edition 03",
    category: "Vintage",
    price: 10000,
    originalPrice: 12000,
    image: "./assets/images/new-vintage-3.webp",
    available: true,
    isNew: true,
  },
  {
    id: "v4",
    name: "Vintage Shirt — New Edition 04",
    category: "Vintage",
    price: 10000,
    originalPrice: 12000,
    image: "./assets/images/new-vintage-2.webp",
    available: true,
    isNew: true,
  },
  {
    id: "v5",
    name: "Vintage Shirt — New Edition 05",
    category: "Vintage",
    price: 10000,
    originalPrice: 12000,
    image: "./assets/images/new-vintage-1.webp",
    available: true,
    isNew: true,
  },
  {
    id: "v6",
    name: "Vintage Shirt — New Edition 06",
    category: "Vintage",
    price: 10000,
    originalPrice: 12000,
    image: "./assets/images/new-vintage-6.webp",
    available: true,
    isNew: true,
  },
  {
    id: "p1",
    name: "Vintage Shirt — Classic 01",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt7.webp",
    available: true,
  },
  {
    id: "p2",
    name: "Vintage Shirt — Classic 02",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt5.webp",
    available: true,
  },
  {
    id: "p3",
    name: "Vintage Shirt — Classic 03",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt3.webp",
    available: true,
  },
  {
    id: "p4",
    name: "Vintage Shirt — Classic 04",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt4.webp",
    available: true,
  },
  {
    id: "p5",
    name: "Vintage Shirt — Classic 05",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt6.webp",
    available: true,
  },
  {
    id: "p6",
    name: "Vintage Shirt — Classic 06",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt2.webp",
    available: true,
  },
  {
    id: "p7",
    name: "Vintage Shirt — Classic 07",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./assets/images/shirt.webp",
    available: false,
  },
  {
    id: "p8",
    name: "Senator Set",
    category: "Native Wear",
    price: null,
    image: "./images/native.jpeg",
    available: false,
  },
  {
    id: "p9",
    name: "Classic Agbada",
    category: "Agbada",
    price: null,
    image: "./assets/images/agbada2.webp",
    available: false,
  },
  {
    id: "p10",
    name: "Tailored Suit",
    category: "Suits & Blazers",
    price: null,
    image: "./assets/images/suit.webp",
    available: false,
  },
  {
    id: "p11",
    name: "Wedding Set",
    category: "Wedding Attire",
    price: null,
    image: "./assets/images/wedding.webp",
    available: false,
  },
  {
    id: "p12",
    name: "Tailored Trousers",
    category: "Trousers",
    price: null,
    image: "./assets/images/readymade.webp",
    available: false,
  },
  {
    id: "p13",
    name: "Ready-to-Wear Kaftan",
    category: "Ready-to-Wear",
    price: null,
    image: "./assets/images/readymade.webp",
    available: false,
  },
  {
    id: "p14",
    name: "Signature Fila",
    category: "Fila & Accessories",
    price: null,
    image: "./images/random.JPG",
    available: false,
  },
];

// Helper: find one product by its id
function findProduct(id) {
  return PRODUCTS.find(function (p) {
    return p.id === id;
  });
}

// Shared sale display keeps homepage and shop prices consistent.
function saleBadge(p) {
  if (!p.originalPrice || p.originalPrice <= p.price) return "";
  const percent = Math.round((1 - p.price / p.originalPrice) * 1000) / 10;
  return '<span class="sale-badge">SALE · ' + percent + "% OFF</span>";
}
function salePrice(p) {
  return (
    '<div class="sale-price"><strong>' +
    formatNaira(p.price) +
    "</strong>" +
    (p.originalPrice > p.price
      ? '<del aria-label="Original price">' +
        formatNaira(p.originalPrice) +
        "</del>"
      : "") +
    "</div>" +
    (p.originalPrice > p.price
      ? '<p class="sale-saving">Save ' +
        formatNaira(p.originalPrice - p.price) +
        "</p>"
      : "")
  );
}

function productImageAttributes(p) {
  if (!p.image.endsWith('.webp')) return '';
  const widths = PRODUCT_IMAGE_WIDTHS[p.image];
  if (!widths) return '';
  return ' srcset="' + p.image.replace('.webp', '-small.webp') + ' ' + widths[0] + 'w, ' + p.image + ' ' + widths[1] + 'w" sizes="(max-width: 359px) 90vw, (max-width: 639px) 46vw, (max-width: 1023px) 44vw, 300px"';
}

const PRODUCT_IMAGE_WIDTHS = {"./assets/images/agbada2.webp": [300, 600], "./assets/images/ankara.webp": [300, 600], "./assets/images/ceo.webp": [300, 600], "./assets/images/ceoimage.webp": [387, 388], "./assets/images/filas.webp": [400, 800], "./assets/images/gff.webp": [267, 534], "./assets/images/new-vintage-1.webp": [300, 600], "./assets/images/new-vintage-2.webp": [300, 600], "./assets/images/new-vintage-3.webp": [300, 600], "./assets/images/new-vintage-4.webp": [300, 600], "./assets/images/new-vintage-5.webp": [300, 600], "./assets/images/new-vintage-6.webp": [300, 600], "./assets/images/olaiya-signage.webp": [400, 800], "./assets/images/pant-trouser.webp": [306, 611], "./assets/images/readymade.webp": [300, 600], "./assets/images/shirt.webp": [397, 506], "./assets/images/shirt1.webp": [367, 487], "./assets/images/shirt2.webp": [300, 600], "./assets/images/shirt3.webp": [300, 600], "./assets/images/shirt4.webp": [300, 600], "./assets/images/shirt5.webp": [300, 600], "./assets/images/shirt6.webp": [300, 600], "./assets/images/shirt7.webp": [300, 600], "./assets/images/shirtss.webp": [400, 800], "./assets/images/suit.webp": [300, 600], "./assets/images/wedding.webp": [400, 800], "./assets/images/weddingattire.webp": [400, 800]};
