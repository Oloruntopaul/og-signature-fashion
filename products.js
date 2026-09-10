// PRODUCT DATA
// Only items with available: true can be bought right now.
// Everything else shows "Coming Soon" automatically.

const PRODUCTS = [
{"id": "v1", "name": "Vintage Shirt — New Edition 01", "category": "Vintage", "price": 10000, "originalPrice": 12000, "image": "./images/new-vintage-1.png", "available": true, "isNew": true},
{"id": "v2", "name": "Vintage Shirt — New Edition 02", "category": "Vintage", "price": 10000, "originalPrice": 12000, "image": "./images/new-vintage-2.png", "available": true, "isNew": true},
{"id": "v3", "name": "Vintage Shirt — New Edition 03", "category": "Vintage", "price": 10000, "originalPrice": 12000, "image": "./images/new-vintage-3.png", "available": true, "isNew": true},
{"id": "v4", "name": "Vintage Shirt — New Edition 04", "category": "Vintage", "price": 10000, "originalPrice": 12000, "image": "./images/new-vintage-4.png", "available": true, "isNew": true},
{"id": "v5", "name": "Vintage Shirt — New Edition 05", "category": "Vintage", "price": 10000, "originalPrice": 12000, "image": "./images/new-vintage-5.png", "available": true, "isNew": true},
{"id": "v6", "name": "Vintage Shirt — New Edition 06", "category": "Vintage", "price": 10000, "originalPrice": 12000, "image": "./images/new-vintage-6.png", "available": true, "isNew": true},
  {
    id: "p1",
    name: "Vintage Shirt — Classic 01",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt7.png",
    available: true,
  },
  {
    id: "p2",
    name: "Vintage Shirt — Classic 02",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt5.png",
    available: true,
  },
  {
    id: "p3",
    name: "Vintage Shirt — Classic 03",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt3.png",
    available: true,
  },
  {
    id: "p4",
    name: "Vintage Shirt — Classic 04",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt4.png",
    available: true,
  },
  {
    id: "p5",
    name: "Vintage Shirt — Classic 05",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt6.png",
    available: true,
  },
  {
    id: "p6",
    name: "Vintage Shirt — Classic 06",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt2.png",
    available: true,
  },
  {
    id: "p7",
    name: "Vintage Shirt — Classic 07",
    category: "Vintage",
    price: 8000,
    originalPrice: 10000,
    image: "./images/shirt.JPG",
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
    image: "./images/agbada2.jpeg",
    available: false,
  },
  {
    id: "p10",
    name: "Tailored Suit",
    category: "Suits & Blazers",
    price: null,
    image: "./images/suit.jpeg",
    available: false,
  },
  {
    id: "p11",
    name: "Wedding Set",
    category: "Wedding Attire",
    price: null,
    image: "./images/wedding.jpeg",
    available: false,
  },
  {
    id: "p12",
    name: "Tailored Trousers",
    category: "Trousers",
    price: null,
    image: "./images/readymade.jpeg",
    available: false,
  },
  {
    id: "p13",
    name: "Ready-to-Wear Kaftan",
    category: "Ready-to-Wear",
    price: null,
    image: "./images/readymade.jpeg",
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
  if (!p.originalPrice || p.originalPrice <= p.price) return '';
  const percent = Math.round((1 - p.price / p.originalPrice) * 1000) / 10;
  return '<span class="sale-badge">SALE · ' + percent + '% OFF</span>';
}
function salePrice(p) {
  return '<div class="sale-price"><strong>' + formatNaira(p.price) + '</strong>' +
    (p.originalPrice > p.price ? '<del aria-label="Original price">' + formatNaira(p.originalPrice) + '</del>' : '') + '</div>' +
    (p.originalPrice > p.price ? '<p class="sale-saving">Save ' + formatNaira(p.originalPrice - p.price) + '</p>' : '');
}
