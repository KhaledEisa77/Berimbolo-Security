document.addEventListener('DOMContentLoaded', function() {
    // Products data
    const products = [
        {
            id: 1,
            name: "Premium Security Package",
            price: 599.99,
            description: "Complete security system with 24/7 monitoring",
            image: "img/Premium Security Package.jpg",
            category: "smart",
            tags: ["Smart", "HD", "WiFi"]
        },
        {
            id: 2,
            name: "Advanced Alarm System",
            price: 399.99,
            description: "Professional-grade alarm system",
            image: "img/Advanced Alarm System.jpg",
            category: "alarm",
            tags: ["Wireless", "Smart", "App"]
        },
        {
            id: 3,
            name: "Smart Home Bundle",
            price: 799.99,
            description: "Complete smart home security solution",
            image: "img/Smart Home Bundle.jpg",
            category: "smart",
            tags: ["Bundle", "Smart", "WiFi"]
        },
        {
            id: 4,
            name: "Video Doorbell Pro",
            price: 249.99,
            description: "HD video doorbell with two-way audio",
            image: "img/Video Doorbell Pro.jpg",
            category: "camera",
            tags: ["HD", "Audio", "Smart"]
        },
        {
            id: 5,
            name: "Security Camera Set",
            price: 449.99,
            description: "4-camera security system with night vision",
            image: "img/Security Camera Set.jpg",
            category: "camera",
            tags: ["4K", "Night Vision", "Cloud"]
        },
        {
            id: 6,
            name: "Smart Lock Plus",
            price: 299.99,
            description: "Keyless entry smart lock system",
            image: "img/Smart Lock Plus.jpg",
            category: "smart",
            tags: ["Smart", "WiFi", "App"]
        }
    ];

    let cart = [];
    let currentFilter = 'all';

    // Create product card HTML
    function createProductCard(product) {
        return `
            <div class="col">
                <div class="card h-100">
                    <div class="card-img-wrapper mb-3">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="card-body p-3">
                        <h5 class="card-title mb-2">${product.name}</h5>
                        <p class="card-text text-muted small mb-3">${product.description}</p>
                        <div class="mb-3">
                            ${product.tags.map(tag => `
                                <span class="product-tag">${tag}</span>
                            `).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="product-price">$${product.price}</span>
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize products
    function initializeProducts() {
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = products
            .filter(product => currentFilter === 'all' || product.category === currentFilter)
            .map(product => createProductCard(product))
            .join('');

        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-product-id'));
                addToCart(productId);
            });
        });
    }

    // Add to cart function
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: Date.now(),
                productId: product.id,
                name: product.name,
                price: product.price
            });
            updateCartDisplay();
            
            const cartButton = document.getElementById('cartButton');
            cartButton.classList.add('add-to-cart-animation');
            setTimeout(() => cartButton.classList.remove('add-to-cart-animation'), 500);
        }
    }

    // Update cart display
    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.getElementById('cartTotal');

        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-muted text-center mb-0">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">${item.name}</h6>
                            <small class="text-muted">$${item.price}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger remove-from-cart" data-item-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-item-id'));
                removeFromCart(itemId);
            });
        });
    }

    // Remove from cart function
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();
    }

    // Filter products
    document.querySelectorAll('.dropdown-item[data-category]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            currentFilter = this.getAttribute('data-category');
            
            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');

            document.getElementById('filterDropdown').textContent = 
                this.textContent;

            initializeProducts();
        });
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Thank you for your purchase! Total: $' + 
                  cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
            cart = [];
            updateCartDisplay();
        } else {
            alert('Your cart is empty!');
        }
    });

    // Initialize the page
    initializeProducts();
    updateCartDisplay();
});