// Product Database
const products = [
    {
        id: 1,
        name: "Kundans Necklace",
        category: "Necklaces",
        price: 6500,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
        description: "Artificial kundans and stones are studded very closely to give a rich finishing to this necklace set"
    },
    {
        id: 2,
        name: "Traditional Gold Necklace",
        category: "Necklaces",
        price: 5500,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
        description: "Elegant 1-gram gold necklace with intricate traditional design"
    },
    {
        id: 3,
        name: "Pearl Drop Earrings",
        category: "Earrings",
        price: 3500,
        image: "https://images.unsplash.com/photo-1599643478035-281b57da901f?w=500&q=80",
        description: "Beautiful pearl drop earrings perfect for daily wear"
    },
    {
        id: 4,
        name: "Gold Stud Earrings",
        category: "Earrings",
        price: 4000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
        description: "Classic gold stud earrings with elegant finish"
    },
    {
        id: 5,
        name: "Bangles Set",
        category: "Bangles",
        price: 7500,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
        description: "Set of 4 traditional gold bangles for all occasions"
    },
    {
        id: 6,
        name: "Gold Bangle Single",
        category: "Bangles",
        price: 2500,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
        description: "Single gold bangle with beautiful traditional design"
    },
    {
        id: 7,
        name: "Vaddanam Traditional",
        category: "Vaddanam",
        price: 12000,
        image: "https://images.unsplash.com/photo-1505636295777-f7a9d5f766f1?w=500&q=80",
        description: "Traditional waist ornament with intricate craftsmanship"
    },
    {
        id: 8,
        name: "Modern Vaddanam",
        category: "Vaddanam",
        price: 10000,
        image: "https://images.unsplash.com/photo-1505636295777-f7a9d5f766f1?w=500&q=80",
        description: "Contemporary design vaddanam for modern women"
    },
    {
        id: 9,
        name: "Diamond Ring",
        category: "Rings",
        price: 4500,
        image: "https://images.unsplash.com/photo-1599643478516-5ee6f9b51f8d?w=500&q=80",
        description: "Elegant diamond studded ring in 1-gram gold"
    },
    {
        id: 10,
        name: "Simple Gold Ring",
        category: "Rings",
        price: 3000,
        image: "https://images.unsplash.com/photo-1599643478516-5ee6f9b51f8d?w=500&q=80",
        description: "Simple yet elegant gold ring for everyday wear"
    },
    {
        id: 11,
        name: "Gold Pendant",
        category: "Pendants",
        price: 3500,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
        description: "Beautiful gold pendant with traditional motif"
    },
    {
        id: 12,
        name: "Locket Pendant",
        category: "Pendants",
        price: 4000,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
        description: "Decorative locket pendant perfect as a keepsake"
    }
];

// Shopping Cart
let cart = [];

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    loadCart();
});

// Load Products
function loadProducts(filter = null) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    let filteredProducts = products;
    if (filter) {
        filteredProducts = products.filter(p => p.category === filter);
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">₹${product.price}/-</div>
                <div class="product-buttons">
                    <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-view" onclick="viewProduct(${product.id})">View</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Smooth scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Filter Products
function filterProducts(category) {
    loadProducts(category);
}

// View Product Details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-category').textContent = `Category: ${product.category}`;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-price').textContent = `₹${product.price}/-`;
    
    // Store product id for modal add to cart
    document.getElementById('productModal').dataset.productId = productId;
    
    modal.style.display = 'block';
}

// Add to Cart from Modal
function addToCartFromModal() {
    const productId = parseInt(document.getElementById('productModal').dataset.productId);
    addToCart(productId);
    document.getElementById('productModal').style.display = 'none';
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('subtotal').textContent = '₹0';
        document.getElementById('tax').textContent = '₹0';
        document.getElementById('total').textContent = '₹0';
        return;
    }
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="product-category">${item.category}</p>
                <p>Quantity: <strong>${item.quantity}</strong></p>
                <div class="cart-item-price">₹${itemTotal}/-</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('tax').textContent = `₹${tax}`;
    document.getElementById('total').textContent = `₹${total}`;
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
    showNotification('Item removed from cart');
}

// Save Cart to Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Continue Shopping
function continueShopping() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    const message = `I would like to purchase items worth ${total} from Baahumanyu One Gram Jewellery.`;
    const phoneNumber = '919100000000'; // WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Handle Contact Form
function handleContactForm(event) {
    event.preventDefault();
    showNotification('Thank you for your message! We will contact you soon.');
    event.target.reset();
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #D4AF37 0%, #A0826D 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Modal Close
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            navMenu.classList.remove('active');
        });
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
