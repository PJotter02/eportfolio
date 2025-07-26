// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Hero section scroll buttons - FIXED
    const viewWorkBtn = document.querySelector('.hero-buttons .btn--primary');
    const downloadResumeBtn = document.querySelector('.hero-buttons .btn--outline');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.querySelector('#portfolio');
            if (portfolioSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = portfolioSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const resumeSection = document.querySelector('#resume');
            if (resumeSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = resumeSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Active navigation highlighting based on scroll position - FIXED
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150; // Increased offset for better detection
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        if (activeSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (header) {
                header.style.background = 'rgba(252, 252, 249, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        } else {
            if (header) {
                header.style.background = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Contact form handling - FIXED
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            showLoadingState(true);
            
            // Simulate form submission
            setTimeout(() => {
                showLoadingState(false);
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Resume download functionality - FIXED
    const downloadBtns = document.querySelectorAll('.resume-actions .btn--primary');
    const printBtns = document.querySelectorAll('.resume-actions .btn--outline');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Create a simple text file as PDF download simulation
            const resumeContent = generateResumeContent();
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'resume.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showNotification('Resume download started!', 'success');
        });
    });
    
    printBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });
    
    // Generate resume content for download
    function generateResumeContent() {
        return `RESUME - SOFTWARE ENGINEER & STUDENT

CONTACT INFORMATION
Email: your.email@example.com
Phone: (555) 123-4567
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourusername

EDUCATION
Bachelor of Science in Computer Science
University Name
Expected 2026
GPA: 3.8/4.0

EXPERIENCE
Part-time Software Engineer
Tech Startup Inc.
2023 - Present
Develop and maintain web applications using React and Node.js. Collaborate with cross-functional teams to deliver features on schedule.

Computer Science Student
University Name
2022 - Present
Pursuing Bachelor's degree in Computer Science with focus on software engineering, algorithms, and system design.

TECHNICAL SKILLS
Languages: JavaScript, Python, Java, SQL
Frameworks: React, Node.js, Express
Tools & Technologies: Git, AWS, Docker, MongoDB
Methodologies: Agile Development, REST APIs

PROJECTS
1. Task Management Web Application
   Technologies: React, Node.js, MongoDB, Express
   A full-stack web application for team collaboration and project management.

2. E-commerce Database Design
   Technologies: PostgreSQL, Python, SQL
   Comprehensive database schema for e-commerce platform with optimized queries.

3. Mobile Fitness Tracker
   Technologies: React Native, Firebase, JavaScript
   Cross-platform mobile app for fitness tracking with wearable integration.

4. Open Source CLI Tool
   Technologies: Python, GitHub Actions, PyPI
   Command-line tool for automating development tasks with 1,000+ downloads.
`;
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-badge, .resume-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add styles for notification
        const baseStyles = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            padding: 16px 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        
        notification.style.cssText = baseStyles;
        
        // Set colors based on type
        if (type === 'success') {
            notification.style.borderColor = 'var(--color-success)';
            notification.style.background = 'rgba(33, 128, 141, 0.1)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--color-error)';
            notification.style.background = 'rgba(192, 21, 47, 0.1)';
        } else if (type === 'info') {
            notification.style.borderColor = 'var(--color-info)';
            notification.style.background = 'rgba(98, 108, 113, 0.1)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    function showLoadingState(show) {
        const submitBtn = contactForm?.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        
        if (show) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Sending...
                </span>
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    }
    
    // Add CSS animations and styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification-message {
            color: var(--color-text);
            font-size: var(--font-size-sm);
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            font-size: 18px;
            padding: 0;
            line-height: 1;
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: var(--color-text);
        }
        
        /* Enhanced hover effects for project cards */
        .project-card {
            transition: all 0.3s ease !important;
        }
        
        .project-card:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Skill badge hover effects */
        .skill-badge {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .skill-badge:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize active nav link on page load
    setTimeout(updateActiveNavLink, 100);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            if (navToggle) navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });
    
    console.log('Portfolio JavaScript loaded successfully!');
});