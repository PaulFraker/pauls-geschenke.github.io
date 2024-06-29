document.addEventListener('DOMContentLoaded', function() {
    // Navigation and content loading
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContent = document.getElementById('page-content');

    function loadContent(pageId) {
        const content = pageContent.querySelector(pageId).innerHTML;
        mainContent.innerHTML = content;

        // Update active nav link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Load default page (home)
    loadContent('#home');

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href');
            loadContent(pageId);
        });
    });

    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, you would typically send the form data to a server here
            alert('Form submitted successfully!');
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
