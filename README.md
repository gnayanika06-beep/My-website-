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
}My website url
