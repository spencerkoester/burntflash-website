// BURNTFLASH.WORLDWIDE - Interactive Features

// ============ STARTUP SCREEN ============
function initStartupScreen() {
    const startupScreen = document.getElementById('startup-screen');
    const skipBtn = document.getElementById('skip-startup');
    const soundToggle = document.getElementById('sound-toggle');
    let soundEnabled = false;

    skipBtn.addEventListener('click', () => {
        startupScreen.style.animation = 'startup-fade-out 0.3s ease-in forwards';
    });

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? '🔊 UNMUTED' : '🔇 MUTED';
        if (soundEnabled) {
            playStartupSound();
        }
    });

    // Auto-hide startup screen after 3.5 seconds
    setTimeout(() => {
        startupScreen.style.display = 'none';
    }, 4000);
}

// Startup sound effect (using Web Audio API)
function playStartupSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    // PS2 startup sound pattern
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ============ FLOATING PARTICLES ============
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = window.innerWidth > 768 ? 30 : 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }
}

// ============ NAVIGATION ============
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============ SMOOTH SCROLLING ============
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============ GALLERY FILTERING ============
function initGalleryFilter() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============ CONTACT FORM ============
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.querySelector('.close-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Log the data (in production, this would be sent to a server)
            console.log('Contact Form Submission:', data);

            // Show success message
            successMessage.classList.add('show');

            // Reset form
            form.reset();

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            successMessage.classList.remove('show');
        });
    }
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .location-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
}

// ============ NAVBAR STICKY EFFECT ============
function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollPos = 0;

    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;

        if (currentScrollPos > 100) {
            navbar.style.boxShadow = '0 0 25px rgba(0, 174, 239, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScrollPos = currentScrollPos;
    });
}

// ============ RESPONSIVE PARTICLES ============
function handleResize() {
    const container = document.getElementById('particles-container');
    if (window.innerWidth <= 768) {
        // Remove extra particles on mobile
        const particles = container.querySelectorAll('.particle');
        if (particles.length > 15) {
            for (let i = 15; i < particles.length; i++) {
                particles[i].remove();
            }
        }
    }
}

// ============ INITIALIZATION ============
function init() {
    // Ensure startup screen is visible at start
    const startupScreen = document.getElementById('startup-screen');
    if (startupScreen) {
        startupScreen.style.opacity = '1';
    }

    // Initialize all features
    initStartupScreen();
    createParticles();
    initNavigation();
    initGalleryFilter();
    initContactForm();
    initScrollAnimations();
    initNavbarEffect();

    // Handle responsive changes
    window.addEventListener('resize', handleResize);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============ UTILITY FUNCTIONS ============

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Ctrl/Cmd + Home to scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images if needed
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// Log initialization complete
console.log('%c BURNTFLASH.WORLDWIDE ONLINE', 'color: #00AEEF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00AEEF;');
console.log('%c Vehicle System Initialized', 'color: #C0C0C0; font-size: 14px;');