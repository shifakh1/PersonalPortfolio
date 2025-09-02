 // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize theme
            initTheme();
            
            // Initialize smooth scrolling
            initSmoothScrolling();
            
            // Initialize navigation
            initNavigation();
            
            // Initialize project filtering
            initProjectFiltering();
            
            // Initialize back to top button
            initBackToTop();
            
            // Initialize scroll animations
            initScrollAnimations();
            
            // Initialize contact form
            initContactForm();
            
            // Initialize project modals
            initProjectModals();
            
            // Create particle backgrounds
            createParticles('particles', 30);
            createParticles('about-particles', 20);
            createParticles('projects-particles', 25);
            
            // Animate skills on page load
            animateSkills();
        });

        // Theme Switching Functionality
        function initTheme() {
            const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
            const currentTheme = localStorage.getItem('theme') || 'light';
            const toggleIcon = document.getElementById('toggle-icon');
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                toggleSwitch.checked = true;
                toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            toggleSwitch.addEventListener('change', switchTheme, false);
            
            function switchTheme(e) {
                if (e.target.checked) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
                }
            }
        }

        // Smooth Scrolling Functionality
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    smoothScroll(targetId);
                });
            });
        }

        function smoothScroll(target) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const navHeight = document.querySelector('#nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Navigation Functionality
        function initNavigation() {
            const nav = document.getElementById('nav');
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Sticky navigation
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                // Update active nav link
                const scrollPosition = window.scrollY;
                
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            });
        }

        // Project Filtering Functionality
        function initProjectFiltering() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) rotate(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px) rotate(5deg)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }

        // Back to Top Button Functionality
        function initBackToTop() {
            const backToTopButton = document.getElementById('back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
            
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Scroll Animations Functionality
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.section-title, .skill-category, .project-card, .contact-item, .about-image, .about-content, .contact-info, .contact-form');
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                    rect.bottom >= 0
                );
            }
            
            // Function to handle scroll event
            function handleScroll() {
                animatedElements.forEach(element => {
                    if (isInViewport(element)) {
                        element.classList.add('animated');
                    }
                });
            }
            
            // Initial check on page load
            handleScroll();
            
            // Listen for scroll events
            window.addEventListener('scroll', handleScroll);
        }

        // Contact Form Functionality
        function initContactForm() {
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                // Add floating labels functionality
                const formInputs = contactForm.querySelectorAll('input, textarea');
                formInputs.forEach(input => {
                    // Check if input has value on page load
                    if (input.value !== '') {
                        input.parentNode.classList.add('focused');
                    }
                    
                    input.addEventListener('focus', function() {
                        this.parentNode.classList.add('focused');
                    });
                    
                    input.addEventListener('blur', function() {
                        if (this.value === '') {
                            this.parentNode.classList.remove('focused');
                        }
                    });
                });
                
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simple form validation
                    const nameInput = this.querySelector('#name');
                    const emailInput = this.querySelector('#email');
                    const messageInput = this.querySelector('#message');
                    const successMessage = this.querySelector('#formSuccess');
                    
                    let isValid = true;
                    
                    if (!nameInput.value.trim()) {
                        showError(nameInput, 'Name is required');
                        isValid = false;
                    } else {
                        clearError(nameInput);
                    }
                    
                    if (!emailInput.value.trim()) {
                        showError(emailInput, 'Email is required');
                        isValid = false;
                    } else if (!isValidEmail(emailInput.value)) {
                        showError(emailInput, 'Please enter a valid email');
                        isValid = false;
                    } else {
                        clearError(emailInput);
                    }
                    
                    if (!messageInput.value.trim()) {
                        showError(messageInput, 'Message is required');
                        isValid = false;
                    } else {
                        clearError(messageInput);
                    }
                    
                    if (isValid) {
                        // Simulate form submission
                        const submitBtn = this.querySelector('.submit-btn');
                        const originalText = submitBtn.textContent;
                        
                        submitBtn.textContent = 'Sending...';
                        submitBtn.disabled = true;
                        
                        setTimeout(() => {
                            successMessage.style.display = 'block';
                            this.reset();
                            
                            // Remove focused class from all inputs
                            formInputs.forEach(input => {
                                input.parentNode.classList.remove('focused');
                            });
                            
                            // Hide success message after 5 seconds
                            setTimeout(() => {
                                successMessage.style.display = 'none';
                            }, 5000);
                            
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 1500);
                    }
                });
            }
            
            function showError(input, message) {
                clearError(input);
                
                const error = document.createElement('small');
                error.className = 'error-message';
                error.textContent = message;
                
                input.parentNode.appendChild(error);
                input.parentNode.classList.add('error');
            }
            
            function clearError(input) {
                const error = input.parentNode.querySelector('.error-message');
                if (error) {
                    error.remove();
                }
                input.parentNode.classList.remove('error');
            }
            
            function isValidEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        }

        // Project Modals Functionality
        function initProjectModals() {
            const projectLinks = document.querySelectorAll('.project-link');
            const modal = document.getElementById('project-modal');
            const closeModal = document.querySelector('.close-modal');
            
            projectLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get project details
                    const projectCard = this.closest('.project-card');
                    const projectTitle = projectCard.querySelector('h3').textContent;
                    const projectDescription = projectCard.querySelector('p').textContent;
                    const projectImage = projectCard.querySelector('img').src;
                    const projectTech = projectCard.querySelector('.project-tech').innerHTML;
                    
                    // Populate modal
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = `
                        <div class="modal-project-image">
                            <img src="${projectImage}" alt="${projectTitle}">
                        </div>
                        <div class="modal-project-info">
                            <h2>${projectTitle}</h2>
                            <p>${projectDescription}</p>
                            <div class="modal-project-tech">
                                <h4>Technologies Used:</h4>
                                ${projectTech}
                            </div>
                            <div class="modal-project-links">
                                <a href="#" class="modal-project-demo">Live Demo</a>
                                <a href="#" class="modal-project-github">GitHub Repository</a>
                            </div>
                        </div>
                    `;
                    
                    // Show modal
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close modal
            closeModal.addEventListener('click', function() {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Animate Skills Progress Bars
        function animateSkills() {
            const progressBars = document.querySelectorAll('.progress');
            
            // Set initial width to 0
            progressBars.forEach(bar => {
                // Get the width from the class name
                const widthClass = Array.from(bar.classList).find(cls => 
                    cls !== 'progress' && 
                    ['html', 'css', 'js', 'react', 'uiux', 'git', 'responsive', 'problem-solving'].includes(cls)
                );
                
                // Set width to 0 initially
                bar.style.width = '0';
                
                // Animate after a short delay
                setTimeout(() => {
                    // Reset to the class-defined width
                    bar.style.width = '';
                }, 500);
            });
        }

        // Create Particle Background
        function createParticles(containerId, count) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const colors = ['#4a6cf7', '#6f42c1', '#ff6b6b', '#6d8bff', '#9370db'];
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 10 + 2;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Set styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = color;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                // Set initial position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Set animation delay and duration
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
                
                container.appendChild(particle);
            }
        }

        // Additional utility functions
        function debounce(func, wait, immediate) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        // Add some additional animations on load
        window.addEventListener('load', function() {
            // Animate project cards with delay
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.1}s`;
            });
            
            // Animate skill categories with delay
            const skillCategories = document.querySelectorAll('.skill-category');
            skillCategories.forEach((category, index) => {
                category.style.transitionDelay = `${index * 0.2}s`;
            });
        });