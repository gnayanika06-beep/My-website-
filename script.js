const products = [
    {
        id: 1,
        name: "Product 1",
        price: 10.00,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 2,
        name: "Product 2",
        price: 15.00,
        image: "https://via.placeholder.com/300"
    },
    {
        id: 3,
        name: "Product 3",
        price: 20.00,
        image: "https://via.placeholder.com/300"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
}

function renderProducts() {
    const grid = document.querySelector(".product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(div);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
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
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
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
