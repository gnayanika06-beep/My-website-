const products = [
    { id: 1, name: "Men Casual T-Shirt", price: 499, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "men" },
    { id: 2, name: "Men Blue Jeans", price: 1199, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", category: "men" },
    { id: 3, name: "Women Kurti", price: 799, image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03", category: "women" },
    { id: 4, name: "Women Stylish Top", price: 599, image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc", category: "women" },
    { id: 5, name: "Premium Basmati Rice 5kg", price: 450, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c", category: "food" },
    { id: 6, name: "Sunflower Cooking Oil", price: 180, image: "https://images.unsplash.com/photo-1604908554027-1a92a5e4e3d3", category: "food" },
    { id: 7, name: "Bath Soap Pack", price: 120, image: "https://images.unsplash.com/photo-1606813909353-6c3b8b3d2d8a", category: "daily" },
    { id: 8, name: "Toothpaste", price: 95, image: "https://images.unsplash.com/photo-1588776814546-ec7e0b4d4c55", category: "daily" },
    { id: 9, name: "Matte Lipstick", price: 299, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa", category: "makeup" },
    { id: 10, name: "Face Cream", price: 349, image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58", category: "makeup" },
    { id: 11, name: "Men Sports Shoes", price: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "shoes" },
    { id: 12, name: "Women Sandals", price: 999, image: "https://images.unsplash.com/photo-1528701800489-20be3c4d3c61", category: "shoes" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "all";

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
}

function renderProducts() {
    const grid = document.querySelector(".product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    let filtered = currentCategory === "all"
        ? products
        : products.filter(p => p.category === currentCategory);

    const searchText = document.getElementById("searchInput")?.value.toLowerCase() || "";
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));

    const sortType = document.querySelector("select")?.value;
    if (sortType === "low") filtered.sort((a,b)=>a.price-b.price);
    if (sortType === "high") filtered.sort((a,b)=>b.price-a.price);

    filtered.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}" onclick="openProduct(${product.id})" style="cursor:pointer">
            <h3 onclick="openProduct(${product.id})" style="cursor:pointer">${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        grid.appendChild(div);
    });
}

function filterCategory(cat) {
    currentCategory = cat;
    renderProducts();
}

function searchProducts() {
    renderProducts();
}

function sortProducts() {
    renderProducts();
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);

    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart");
}

function openProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderProducts();
});
function buyNowSingle(id) {
    const quantity = parseInt(document.getElementById("qty").value);
    const product = products.find(p => p.id == id);

    let message = "New Order:%0A";
    message += product.name + " x " + quantity + "%0A";
    message += "Total: ₹" + (product.price * quantity);

    const phone = getShopPhone();
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}
