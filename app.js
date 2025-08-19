// Portfolio Website JavaScript for Harsh Pritam Sanapala

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTypingAnimation();
        this.setupScrollAnimations();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupThemeToggle();
        this.setupSmoothScrolling();
        this.animateCounters();
        this.setupParticleEffects();
    }

    setupEventListeners() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Typing animation for hero subtitle
    startTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const phrases = [
            'Software Engineer',
            'Backend Developer',
            'Platform Engineering Enthusiast',
            'Cloud Solutions Architect',
            'Problem Solver',
            'IIT Kharagpur Graduate'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                nextDelay = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(type, nextDelay);
        };

        type();
    }

    // Scroll animations and reveal effects
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBar(entry.target);
                    }
                    
                    // Animate timeline items with stagger
                    if (entry.target.classList.contains('timeline-item')) {
                        setTimeout(() => {
                            entry.target.classList.add('revealed');
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToObserve = [
            '.reveal-text',
            '.skill-item',
            '.timeline-item',
            '.project-card',
            '.contact-item',
            '.achievement-card'
        ];

        elementsToObserve.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                observer.observe(el);
            });
        });
    }

    // Animate skill progress bars
    animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        const skillLevel = skillItem.getAttribute('data-skill');
        
        if (progressBar && skillLevel) {
            setTimeout(() => {
                progressBar.style.width = skillLevel + '%';
            }, 300);
        }
    }

    // Counter animation for highlight numbers
    animateCounters() {
        const counters = document.querySelectorAll('.highlight-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // Project filtering functionality
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const cardType = card.getAttribute('data-type');
                    
                    setTimeout(() => {
                        if (filter === 'all' || cardType === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }, index * 100);
                });
            });
        });
    }

    // Contact form handling
    setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        const submitButton = form.querySelector('.contact-submit');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Validate form
            if (!name || !email || !subject || !message) {
                this.showNotification('Please fill in all fields.', 'error');
                return;
            }

            // Simulate form submission
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;

            // Add particles effect
            this.createSubmitParticles(submitButton);

            setTimeout(() => {
                // Show success message
                this.showNotification('Message sent successfully! Harsh will get back to you soon.', 'success');
                form.reset();
                
                submitButton.innerHTML = '<span>Send Message</span><div class="btn-particles"></div>';
                submitButton.disabled = false;
            }, 2000);
        });

        // Add input focus effects
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Theme toggle functionality
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        
        if (!themeToggle || !themeIcon) return;
        
        // Set default theme to dark
        document.documentElement.setAttribute('data-color-scheme', 'dark');
        themeIcon.textContent = '🌙';

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-color-scheme', newTheme);
            
            // Update icon with animation
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
                themeToggle.style.transform = 'rotate(0deg)';
            }, 150);

            // Add theme transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Smooth scrolling for navigation
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Hero buttons smooth scroll - Fixed implementation
        const heroBtns = document.querySelectorAll('.hero-btn');
        heroBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetSection = index === 0 ? 'projects' : 'contact';
                const targetElement = document.getElementById(targetSection);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Particle effects for buttons
    setupParticleEffects() {
        const buttons = document.querySelectorAll('.hero-btn, .project-link, .social-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createHoverParticles(button);
            });
        });
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 6;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--color-teal-300);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 1;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;

            document.body.appendChild(particle);

            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const duration = 800 + Math.random() * 400;

            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    createSubmitParticles(button) {
        const rect = button.getBoundingClientRect();
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--color-teal-300);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 1;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;

            document.body.appendChild(particle);

            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            const duration = 1200 + Math.random() * 600;

            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text);
            padding: 16px 24px;
            border-radius: 8px;
            border: 1px solid var(--color-card-border);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 350px;
            font-size: 14px;
            line-height: 1.4;
        `;

        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--color-teal-400)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--color-red-400)';
            notification.style.borderLeftWidth = '4px';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Handle scroll effects
    handleScroll() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        // Navbar background opacity
        if (scrolled > 50) {
            navbar.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
        } else {
            navbar.style.background = 'rgba(var(--color-slate-900-rgb), 0.9)';
        }

        // Parallax effect for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Handle resize events
    handleResize() {
        // Recalculate any position-dependent elements
        const timeline = document.querySelector('.timeline');
        if (timeline && window.innerWidth <= 768) {
            // Mobile timeline adjustments are handled by CSS
        }
    }
}

// Enhanced cursor effect
class CustomCursor {
    constructor() {
        // Only create cursor on desktop
        if (window.innerWidth <= 768) return;
        
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.init();
    }

    init() {
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';
        
        this.cursor.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--color-teal-300);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid rgba(var(--color-teal-300-rgb), 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            this.cursorFollower.style.left = (e.clientX - 15) + 'px';
            this.cursorFollower.style.top = (e.clientY - 15) + 'px';
        });

        // Hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .achievement-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
                this.cursorFollower.style.borderColor = 'var(--color-orange-400)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursorFollower.style.borderColor = 'rgba(var(--color-teal-300-rgb), 0.3)';
            });
        });
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--color-background);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid rgba(var(--color-teal-300-rgb), 0.3);
            border-top: 3px solid var(--color-teal-300);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        `;

        const loadingText = document.createElement('div');
        loadingText.textContent = 'Loading...';
        loadingText.style.cssText = `
            color: var(--color-text);
            font-size: 16px;
            font-weight: 500;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        loader.appendChild(spinner);
        loader.appendChild(loadingText);
        document.body.appendChild(loader);

        // Hide loader when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoadingAnimation();
    new PortfolioApp();
    
    // Only create custom cursor on desktop
    if (window.innerWidth > 768) {
        new CustomCursor();
    }
});

// Add some extra interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add glitch effect on title hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.animation = 'glitch 0.3s infinite';
        });
        
        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.style.animation = '';
        });
    }

    // Add floating animation to project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'float 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
    });

    // Add pulse effect to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.achievement-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.achievement-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });

    // Add interactive effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(var(--color-teal-300-rgb), 0.5);
                left: ${x - 10}px;
                top: ${y - 10}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            link.style.position = 'relative';
            link.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Easter egg: Konami code
document.addEventListener('DOMContentLoaded', () => {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.keyCode);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join(',') === konamiCode.join(',')) {
            // Easter egg triggered!
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach(shape => {
                shape.style.animation = 'rotate 2s linear infinite, float 1s ease-in-out infinite';
                shape.style.opacity = '0.3';
            });
            
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.animation = 'glitch 0.1s infinite';
            }
            
            setTimeout(() => {
                shapes.forEach(shape => {
                    shape.style.animation = 'float 6s ease-in-out infinite';
                    shape.style.opacity = '0.1';
                });
                if (heroTitle) {
                    heroTitle.style.animation = '';
                }
            }, 5000);
            
            userInput = [];
        }
    });
});