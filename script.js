document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        navLinksContainer.classList.toggle('show');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href');
            loadContent(pageId);
            navLinksContainer.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    function loadContent(pageId) {
        const content = document.querySelector(pageId);
        if (content) {
            mainContent.innerHTML = content.innerHTML;

            // Update active nav link
            navLinks.forEach(link => {
                if (link.getAttribute('href') === pageId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Scroll to the top of the new content
            window.scrollTo(0, 0);

            // Initialize page-specific functions
            if (pageId === '#home') initLaserAnimation();
            if (pageId === '#gallery') initGallery();
            if (pageId === '#contact') initContactForm();
        }
    }

    // Load default page (home)
    loadContent('#home');

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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 