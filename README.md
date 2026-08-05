# OG Signature & Fashion World

A premium luxury bespoke tailoring website built with **HTML**, **Tailwind CSS**, and **Vanilla JavaScript**. Featuring a responsive flagship homepage, a fully functional online shop, and a local-storage shopping cart.

## 📁 Files & Structure

- `index.html` - The main luxury homepage (Hero, About, Services, Collection, Process, Testimonials, Contact).
- `shop.html` - The dedicated e-commerce shop page with category filtering..
- `products.js` - The single source of truth for all product data (prices, images, categories, and availability).
- `cart.js` - Persistent shopping cart logic using `localStorage` (add, remove, clear, quantity changes, and WhatsApp checkout).
- `collection-teaser.js` - JavaScript that dynamically renders the 4-item collection teaser on the homepage.
- `shop-render.js` - JavaScript that handles the dynamic sidebar categories, live product counts, and product grid rendering for the shop page.
- `main.js` - Core site functionality (mobile menu toggle, light/dark mode theme switching, sticky navbar, and navigation active states).
- `images/` - Folder containing all brand logos, product photos, and background imagery.

## 🚀 How to preview

1. **Open the homepage**: Double-click `index.html` in your file explorer to open it in Chrome/Firefox.
2. **Open the shop**: Double-click `shop.html` to preview the dynamic shop page.
3. **Recommended**: Use the **Live Server** extension in VS Code (Right-click `index.html` > "Open with Live Server") for auto-refreshing as you make changes.

## 🛠️ Easy edits you can make

- **Update the collection**: Open `products.js`. Add or remove items from the `PRODUCTS` array. Set `available: true` to display them instantly on the shop and collection pages.
- **Update contact info**: Open `index.html` and navigate to the `<section id="contact">`. Update the WhatsApp number, phone number, email, address, and Google Maps embed URL.
- **Replace images**: Drop your high-res images into the `images/` folder and update the `src=""` paths in `index.html`, `shop.html`, and `products.js`.
- **Edit testimonials**: Scroll to `<section id="testimonials">` in `index.html` to change customer names, quotes, and locations.

## ✨ Premium Features

- **Persistent Shopping Cart**: Cart data is saved in the user's browser (`localStorage`). Items stay in the cart even when they refresh the page or leave the site.
- **Dynamic Live Product Filtering**: The shop page automatically counts only `available: true` products. Categories with `0` items display an elegant "Coming Soon" card with a one-tap WhatsApp custom order button.
- **Theme System**: Seamless light and dark mode with saved user preference across the entire site.
- **Mobile-First Luxury UI**: Fully responsive from 4-column desktop layouts to 2-column mobile grids, with horizontal swiping on the "Our Process" section.
- **Effortless WhatsApp Checkout**: The cart automatically compiles every item and calculates the total to generate a pre-filled WhatsApp message for the customer.
