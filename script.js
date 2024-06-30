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