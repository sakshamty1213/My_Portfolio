// Portfolio Website Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for hero section
    const typingText = document.getElementById('typing-text');
    const textArray = [
        'Final-Year B.Tech (CSE) Student',
        'Java & Full Stack Developer',
        'Building Scalable Web Applications',
        'Passionate Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function typeWriter() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing animation
    typeWriter();

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 10;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 50;
        
        let activeSection = null;
        
        // Find the current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section.getAttribute('id');
            }
        });
        
        // Special case for very top of page
        if (window.scrollY < 100) {
            activeSection = 'home';
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('href').substring(1); // Remove #
            if (linkTarget === activeSection) {
                link.classList.add('active');
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(252, 252, 249, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.background = 'rgba(252, 252, 249, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Contact form handling with enhanced notification
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate network delay and show success
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        console.log('Showing notification:', message, type); // Debug log
        
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        // Set colors based on type
        let backgroundColor;
        if (type === 'success') {
            backgroundColor = 'var(--color-success)';
        } else if (type === 'error') {
            backgroundColor = 'var(--color-error)';
        } else {
            backgroundColor = 'var(--color-info)';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            cursor: pointer;
        `;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 10);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification && notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // External link handlers - ensure all external links work properly
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Ensure the link opens in a new tab
                const href = this.getAttribute('href');
                if (href && href.startsWith('http')) {
                    e.preventDefault();
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    // Initialize external link handlers
    handleExternalLinks();

    // Certificate button enhancements
    const certButtons = document.querySelectorAll('.cert-btn');
    certButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href) {
                e.preventDefault();
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    // Open the certificate URL
                    window.open(href, '_blank', 'noopener,noreferrer');
                }, 150);
            }
        });
    });

    // Social media link enhancements
    const socialLinks = document.querySelectorAll('.social-link, .social-link-nav');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                e.preventDefault();
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    // Open the social media URL
                    window.open(href, '_blank', 'noopener,noreferrer');
                }, 100);
            }
        });
    });

    // Hero button link handling
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                e.preventDefault();
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        });
    });

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });

    // Initialize on load
    updateActiveNavLink();
    updateNavbarBackground();

    // Add click handlers for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Add click handlers for certification cards
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });

    // Add parallax effect to hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${parallax}px)`;
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // Add CSS for revealed sections and other enhancements
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            color: var(--color-primary);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--color-background);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--color-primary);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--color-primary-hover);
        }
        
        .form-control.error {
            border-color: var(--color-error);
            box-shadow: 0 0 0 3px rgba(192, 21, 47, 0.1);
        }
        
        .cert-btn {
            transition: transform 0.15s ease;
        }
        
        .cert-btn:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    // Enhanced form validation with real-time feedback
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Validation rules
        if (!value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (fieldName === 'name' && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        } else if (fieldName === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }

        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--color-error);
                font-size: var(--font-size-sm);
                margin-top: var(--space-4);
                display: block;
            `;
            errorElement.textContent = errorMessage;
            field.parentNode.appendChild(errorElement);
        }

        return isValid;
    }

    // Add keyboard navigation for mobile menu
    if (navToggle) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Add escape key handler for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.focus();
        }
    });

    // Initialize hero section animations
    setTimeout(() => {
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        if (heroName) heroName.style.opacity = '1';
        if (heroTitle) heroTitle.style.opacity = '1';
    }, 500);

    console.log('Portfolio website loaded successfully!');
    console.log('All interactive features initialized.');
    console.log('External links enhanced for proper functionality.');
});