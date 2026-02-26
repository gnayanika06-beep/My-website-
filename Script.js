const products = [
    { id: 1, name: "Men T-Shirt", price: 399, image: "https://via.placeholder.com/300", category: "men" },
    { id: 2, name: "Men Jeans", price: 899, image: "https://via.placeholder.com/300", category: "men" },

    { id: 3, name: "Women Kurti", price: 599, image: "https://via.placeholder.com/300", category: "women" },
    { id: 4, name: "Women Top", price: 499, image: "https://via.placeholder.com/300", category: "women" },

    { id: 5, name: "Rice 5kg", price: 320, image: "https://via.placeholder.com/300", category: "food" },
    { id: 6, name: "Cooking Oil", price: 180, image: "https://via.placeholder.com/300", category: "food" },

    { id: 7, name: "Bath Soap", price: 45, image: "https://via.placeholder.com/300", category: "daily" },
    { id: 8, name: "Toothpaste", price: 95, image: "https://via.placeholder.com/300", category: "daily" },

    { id: 9, name: "Lipstick", price: 199, image: "https://via.placeholder.com/300", category: "makeup" },
    { id: 10, name: "Face Cream", price: 249, image: "https://via.placeholder.com/300", category: "makeup" },

    { id: 11, name: "Men Shoes", price: 1499, image: "https://via.placeholder.com/300", category: "shoes" },
    { id: 12, name: "Women Sandal", price: 999, image: "https://via.placeholder.com/300", category: "shoes" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
}

function renderProducts(category = "all") {
    const grid = document.querySelector(".product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    const filtered = category === "all"
        ? products
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(div);
    });
}

function filterCategory(cat) {
    renderProducts(cat);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart");
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderProducts("all");
});
