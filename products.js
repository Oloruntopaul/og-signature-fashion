// PRODUCT DATA
// Only items with available: true can be bought right now.
// Everything else shows "Coming Soon" automatically.

const PRODUCTS = [
  {
    id: "p1",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
    image: "./images/shirt7.png",
    available: true,
  },
  {
    id: "p2",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
    image: "./images/shirt5.png",
    available: true,
  },
  {
    id: "p3",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
    image: "./images/shirt3.png",
    available: true,
  },
  {
    id: "p4",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
    image: "./images/shirt4.png",
    available: true,
  },
  {
    id: "p5",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
    image: "./images/shirt6.png",
    available: true,
  },
  {
    id: "p6",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
    image: "./images/shirt2.png",
    available: true,
  },
  {
    id: "p7",
    name: "Vintage Shirt",
    category: "Shirts",
    price: 10000,
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
