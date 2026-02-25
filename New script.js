const products = [
  { id: 1, name: "Men T-Shirt", price: 399, image: "https://via.placeholder.com/300", category: "men", options: ["S","M","L","XL"] },
  { id: 2, name: "Men Jeans", price: 899, image: "https://via.placeholder.com/300", category: "men", options: ["30","32","34"] },
  { id: 3, name: "Women Kurti", price: 599, image: "https://via.placeholder.com/300", category: "women", options: ["S","M","L"] },
  { id: 4, name: "Rice 5kg", price: 320, image: "https://via.placeholder.com/300", category: "food", options: ["5kg","10kg"] }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

function renderProducts() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach(product => {
    const optionsHTML = product.options
      ? product.options.map(opt => `<option value="${opt}">${opt}</option>`).join("")
      : `<option value="default">Default</option>`;

    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>৳${product.price}</p>

      <select id="opt-${product.id}">
        ${optionsHTML}
      </select>

      <button onclick="addToCart(${product.id}, document.getElementById('opt-${product.id}').value)">
        Add to Cart
      </button>
    `;
    grid.appendChild(div);
  });
}

function addToCart(productId, option) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId && item.option === option);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, option, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  if (!cartItems || !totalPriceEl) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}">
      <span>${item.name} (${item.option}) x ${item.quantity}</span>
      <span>৳${(item.price * item.quantity).toFixed(2)}</span>
    `;
    cartItems.appendChild(div);
  });

  totalPriceEl.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  renderCart();
});
