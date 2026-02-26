

    // 👕 MEN CLOTHING
    {
        id: 1,
        name: "Men Casual T-Shirt",
        price: 499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        category: "men"
    },
    {
        id: 2,
        name: "Men Blue Jeans",
        price: 1199,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        category: "men"
    },

    // 👗 WOMEN CLOTHING
    {
        id: 3,
        name: "Women Kurti",
        price: 799,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
        category: "women"
    },
    {
        id: 4,
        name: "Women Stylish Top",
        price: 599,
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
        category: "women"
    },

    // 🍚 FOOD ITEMS
    {
        id: 5,
        name: "Premium Basmati Rice 5kg",
        price: 450,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        category: "food"
    },
    {
        id: 6,
        name: "Sunflower Cooking Oil",
        price: 180,
        image: "https://images.unsplash.com/photo-1604908554027-1a92a5e4e3d3",
        category: "food"
    },

    // 🧴 DAILY NEEDS
    {
        id: 7,
        name: "Bath Soap Pack",
        price: 120,
        image: "https://images.unsplash.com/photo-1606813909353-6c3b8b3d2d8a",
        category: "daily"
    },
    {
        id: 8,
        name: "Toothpaste",
        price: 95,
        image: "https://images.unsplash.com/photo-1588776814546-ec7e0b4d4c55",
        category: "daily"
    },

    // 💄 MAKEUP
    {
        id: 9,
        name: "Matte Lipstick",
        price: 299,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
        category: "makeup"
    },
    {
        id: 10,
        name: "Face Cream",
        price: 349,
        image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58",
        category: "makeup"
    },

    // 👟 SHOES
    {
        id: 11,
        name: "Men Sports Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "shoes"
    },
    {
        id: 12,
        name: "Women Sandals",
        price: 999,
        image: "https://images.unsplash.com/photo-1528701800489-20be3c4d3c61",
        category: "shoes"
    }
];

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
