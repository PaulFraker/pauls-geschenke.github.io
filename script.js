document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContent = document.getElementById('page-content');
    
    function loadContent(pageId) {
        const content = pageContent.querySelector(pageId);
        if (content) {
            mainContent.innerHTML = content.innerHTML;

            // Aktualisiere aktiven Navigationslink
            navLinks.forEach(link => {
                if (link.getAttribute('href') === pageId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Initialisiere spezifische Funktionen für die geladene Seite
            if (pageId === '#home') initLaserAnimation();
            if (pageId === '#gallery') {
                initBeforeAfterSlider();
                setTimeout(init3DViewer, 0);
            }
            if (pageId === '#services') initQuoteCalculator();
            if (pageId === '#material-showcase') initMaterialShowcase();
            if (pageId === '#customization') initCustomizationPreview();

            // Handle "Explore Our Services" button
            const exploreButton = document.querySelector('.cta-button[data-navigate-to="services"]');
            if (exploreButton) {
                exploreButton.addEventListener('click', function() {
                    loadContent('#services');
                });
            }
        }
    }

    // Lade Standardseite (Startseite)
    loadContent('#home');

    // Füge Klick-Event-Listener zu Navigationslinks hinzu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href');
            loadContent(pageId);
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('show');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Laser-Animation
    function initLaserAnimation() {
        const beam = document.querySelector('.laser-beam');
        const text = document.querySelector('.engrave-text');
        let progress = 0;

        function animate() {
            if (progress <= 100) {
                beam.style.left = `${progress}%`;
                text.style.color = `rgba(51, 51, 51, ${progress / 100})`;
                progress += 0.5;
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    // Vorher/Nachher Slider
    function initBeforeAfterSlider() {
        const slider = document.getElementById('before-after-range');
        const afterImage = document.querySelector('.after-image');

        if (slider && afterImage) {
            slider.addEventListener('input', function() {
                afterImage.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
            });
        }
    }

    // 3D Produktbetrachter
    function init3DViewer() {
        const container = document.getElementById('product-viewer');
        if (!container) {
            console.log('Product viewer container not found. Skipping 3D viewer initialization.');
            return;
        }
    
        let scene, camera, renderer, cube;
    
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
    
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        camera.position.z = 5;
    
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
    
        animate();
    }

    // Benutzerdefinierter Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Touch device detection
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }

    // Resize handler for responsive design
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinksContainer.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});