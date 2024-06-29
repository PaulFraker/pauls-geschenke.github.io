document.addEventListener('DOMContentLoaded', function() {
    // Navigation und Inhaltswechsel
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function loadContent(pageId) {
        const content = document.querySelector(pageId);
        if (content) {
            mainContent.innerHTML = content.innerHTML;
        }

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
            init3DViewer();
        }
        if (pageId === '#services') initQuoteCalculator();
        if (pageId === '#material-showcase') initMaterialShowcase();
        if (pageId === '#customization') initCustomizationPreview();

        const exploreButton = document.querySelector('.cta-button[data-navigate-to="services"]');
        if (exploreButton) {
            exploreButton.addEventListener('click', function() {
                loadContent('#services');
            });
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
        let scene, camera, renderer, cube;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('product-viewer').appendChild(renderer.domElement);

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

    // Angebotsrechner
    function initQuoteCalculator() {
        const calculateButton = document.querySelector('#quote-calculator button');
        if (calculateButton) {
            calculateButton.addEventListener('click', calculateQuote);
        }
    }

    function calculateQuote() {
        const material = document.getElementById('material').value;
        const size = document.getElementById('size').value;
        const complexity = document.getElementById('complexity').value;

        let basePrice = 0;
        switch(material) {
            case 'wood': basePrice = 20; break;
            case 'metal': basePrice = 30; break;
            case 'glass': basePrice = 40; break;
        }

        let complexityMultiplier = 1;
        switch(complexity) {
            case 'simple': complexityMultiplier = 1; break;
            case 'medium': complexityMultiplier = 1.5; break;
            case 'complex': complexityMultiplier = 2; break;
        }

        const quote = basePrice * size * complexityMultiplier;
        document.getElementById('quote-result').textContent = `Geschätztes Angebot: ${quote.toFixed(2)} €`;
    }

    // Materialvorschau
    function initMaterialShowcase() {
        document.querySelectorAll('.material').forEach(item => {
            item.addEventListener('mouseover', event => {
                const material = event.target.getAttribute('data-material');
                document.getElementById('material-preview').innerHTML = `
                    <img src="${material}-engraving.jpg" alt="${material} Gravur">
                `;
            });
        });
    }

    // Personalisierungsvorschau
    function initCustomizationPreview() {
        const customText = document.getElementById('custom-text');
        const fontSelect = document.getElementById('font-select');
        if (customText && fontSelect) {
            customText.addEventListener('input', updatePreview);
            fontSelect.addEventListener('change', updatePreview);
        }
    }

    function updatePreview() {
        const text = document.getElementById('custom-text').value;
        const font = document.getElementById('font-select').value;
        const previewText = document.getElementById('preview-text');
        
        previewText.textContent = text;
        previewText.style.fontFamily = font;
    }

    // Buchungssystem
    window.bookAppointment = function() {
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const name = document.getElementById('booking-name').value;
        const email = document.getElementById('booking-email').value;

        // Hier würden Sie normalerweise diese Daten an einen Server senden
        console.log(`Buchung: ${date} um ${time} für ${name} (${email})`);
        alert('Ihr Termin wurde gebucht! Wir senden Ihnen in Kürze eine Bestätigungs-E-Mail.');
    }

    // Auftragsverfolgung
    window.checkOrderStatus = function() {
        const orderId = document.getElementById('order-id').value;
        // In einem echten Szenario würden Sie den tatsächlichen Status von einem Server abrufen
        const status = Math.floor(Math.random() * 5); // 0-4 für Demo-Zwecke
        const statusText = ['Bestellung eingegangen', 'In Produktion', 'Qualitätskontrolle', 'Versand', 'Geliefert'];
        const progressBar = document.getElementById('progress-bar');
        const statusElement = document.getElementById('order-status');

        progressBar.style.width = `${(status + 1) * 20}%`;
        statusElement.textContent = `Status: ${statusText[status]}`;
    }

    // Benutzerdefinierter Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Kontaktformular-Validierung
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Bitte füllen Sie alle Felder aus');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein');
                return;
            }
            
            // Wenn die Validierung erfolgreich ist, würden Sie hier normalerweise die Formulardaten an einen Server senden
            alert('Formular erfolgreich gesendet!');
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});