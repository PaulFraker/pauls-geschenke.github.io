document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        navLinksContainer.classList.toggle('show');
    });

    // Array of product objects
    const products = [
        {
            id: 1,
            name: 'Individuelle Holzgravur',
            description: 'Personalisierte Holzartikel wie Schneidebretter, Bilderrahmen und Schilder.',
            price: 29.99,
            image: 'img/product1.jpg'
        },
        {
            id: 2,
            name: 'Metallgravur',
            description: 'Dauerhafte Gravuren auf Metalloberflächen für Schilder, Plaketten und Schmuck.',
            price: 39.99,
            image: 'img/product2.jpg'
        },
        {
            id: 3,
            name: 'Glasgravur',
            description: 'Elegante Designs, geätzt auf Gläser, Spiegel und Auszeichnungen.',
            price: 49.99,
            image: 'img/product3.jpg'
        },
        // Add more products as needed
    ];

    // Function to render products to the page
    function loadProducts() {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">€${product.price.toFixed(2)}</p>
                <a href="#" class="buy-button" data-id="${product.id}">Jetzt kaufen</a>
            `;
            productList.appendChild(productItem);
        });
    }
    let cart = [];

    // Function to add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
    
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    
        updateCartDisplay();
        saveCart();
    }
    
    // Function to update cart display
    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;
    
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${item.name} (x${item.quantity}) - €${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartItems.appendChild(cartItem);
        });
    
        document.getElementById('cart-total').innerText = `Gesamt: €${total.toFixed(2)}`;
    }
    
    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Function to load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        }
    }
    
    // Handle buy button clicks
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('buy-button')) {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Load the cart when the page loads
    window.onload = () => {
        loadProducts();
        loadCart();
    };
    
// Load products when the page is loaded
window.onload = loadProducts;


    // Handle navigation and smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinksContainer.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active nav link
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    });

    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Laser animation
    function initLaserAnimation() {
        const laser = document.querySelector('.laser-animation');
        if (laser) {
            laser.style.animation = 'none';
            laser.offsetHeight; // Trigger reflow
            laser.style.animation = null;
        }
    }

    // Gallery initialization
    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Implement lightbox or enlarge image functionality here
                console.log('Gallery item clicked');
            });
        });
    }

    // Contact form initialization
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Implement form submission logic here
                console.log('Form submitted');
                form.reset();
            });
        }
    }

    // Initialize all sections
    initLaserAnimation();
    initGallery();
    initContactForm();

    // Handle scroll events to update active nav link
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPosition + 60) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    });
});