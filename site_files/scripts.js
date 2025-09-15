// Global site JS
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation functionality
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    // Mobile nav toggle
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mainNav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                e.target !== mobileMenuBtn) {
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Header scroll effect
    function handleScroll() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    }

    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    }, { passive: true });

    // Initial scroll check
    handleScroll();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Tool card interactions
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Blog card interactions
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('btn-primary')) {
                button.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeElements = document.querySelectorAll('.tool-card, .product-card, .blog-card, .coming-item, .card');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Contact form handling (if present)
    const contactForm = document.getElementById('contact-intake-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Create mailto link with formatted data
            const subject = encodeURIComponent('VTC Contact Form Submission - ' + data.reason);
            const body = encodeURIComponent(
                `Contact Form Submission\n\n` +
                `Name: ${data.first_name} ${data.last_name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'Not provided'}\n` +
                `Company: ${data.company}\n` +
                `Industry: ${data.industry}\n` +
                `Inquiry Type: ${data.reason}\n\n` +
                `Message:\n${data.message || 'No additional message provided'}\n\n` +
                `Submitted at: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            );
            
            // Open default email client
            window.location.href = `mailto:info@thevisualthinkingcompany.com?subject=${subject}&body=${body}`;
            
            // Show success message
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Email Client Opening...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        });
    }

    // Hero parallax effect (subtle)
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.2;
            hero.style.transform = `translateY(${parallax}px)`;
        }, { passive: true });
    }

    // Initialize any tooltips or hover definitions
    const hoverTerms = document.querySelectorAll('.hover-term');
    hoverTerms.forEach(term => {
        const definition = term.querySelector('.definition');
        if (definition) {
            term.addEventListener('mouseenter', () => {
                definition.style.display = 'block';
            });
            
            term.addEventListener('mouseleave', () => {
                definition.style.display = 'none';
            });
        }
    });

    // Performance optimization: Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Dynamic year update for footer
    const yearElements = document.querySelectorAll('#year, [id="year"]');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle mega menu interactions
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const megaMenu = item.querySelector('.mega-menu');
        if (megaMenu) {
            let hoverTimeout;

            item.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                megaMenu.setAttribute('aria-hidden', 'false');
            });

            item.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    megaMenu.setAttribute('aria-hidden', 'true');
                }, 100);
            });
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus();
            }
        }
    });

    // Enhanced form validation
    const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#EF4444';
            } else {
                input.style.borderColor = '#10B981';
            }
        });

        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(239, 68, 68)' && input.value.trim() !== '') {
                input.style.borderColor = '#10B981';
            }
        });
    });

    // Add loading states for buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        if (button.tagName === 'BUTTON' || button.type === 'submit') {
            button.addEventListener('click', function(e) {
                if (this.form && !this.form.checkValidity()) {
                    return;
                }
                
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            });
        }
    });

    // Console welcome message
    console.log('%c🏢 VTC - Visual Thinking Company', 'color: #4F46E5; font-size: 16px; font-weight: bold;');
    console.log('%cFrom Complexity to Clarity™', 'color: #6B7280; font-size: 12px;');
    console.log('%cInterested in joining our team? careers@thevisualthinkingcompany.com', 'color: #10B981;');
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in other modules
window.VTC = {
    debounce,
    throttle,
    version: '1.0.0',
    initialized: true
};