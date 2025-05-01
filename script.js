document.addEventListener('DOMContentLoaded', function() {
    // Hero Image Slideshow
    const slideshowImages = document.querySelectorAll('.hero-slideshow img');
    let currentImageIndex = 0;
    
    function showNextImage() {
        // Remove active class from current image
        slideshowImages[currentImageIndex].classList.remove('active');
        
        // Increment index and wrap around if necessary
        currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        
        // Add active class to next image
        slideshowImages[currentImageIndex].classList.add('active');
    }
    
    // Show first image immediately
    slideshowImages[0].classList.add('active');
    
    // Set interval for slideshow
    setInterval(showNextImage, 5000);
    
    // Sticky Navigation
    const nav = document.querySelector('nav');
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            nav.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Back to Top Button
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    nav.appendChild(mobileMenuBtn);
    
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.querySelector('[data-error="name-error"]');
        const emailError = document.querySelector('[data-error="email-error"]');
        const messageError = document.querySelector('[data-error="message-error"]');
        
        // Function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset error messages
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';
            
            // Validate name
            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                messageError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
                successMessage.innerHTML = '<strong>Success!</strong> Your message has been sent.';
                contactForm.appendChild(successMessage);
                
                // Clear form fields
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.card img');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Add click event to gallery images
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elementsToAnimate = document.querySelectorAll('.card, .review-card, section h2');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize video thumbnail previews
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
        // Preload video metadata
        video.preload = 'metadata';
        
        // Add play button overlay
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container relative';
        video.parentNode.insertBefore(videoContainer, video);
        videoContainer.appendChild(video);
        
        const playButton = document.createElement('div');
        playButton.className = 'play-button absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg transition-opacity cursor-pointer';
        playButton.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white" opacity="0.8"/><path d="M16 12L10 16V8L16 12Z" fill="#2F4F4F"/></svg>';
        videoContainer.appendChild(playButton);
        
        // Add click event to play button
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playButton.style.opacity = '0';
            } else {
                video.pause();
                playButton.style.opacity = '1';
            }
        });
        
        // Show play button when video is paused
        video.addEventListener('pause', function() {
            playButton.style.opacity = '1';
        });
        
        // Hide play button when video is playing
        video.addEventListener('play', function() {
            playButton.style.opacity = '0';
        });
    });
});

// Add window load event listener to ensure all images are loaded
window.addEventListener('load', function() {
    // Remove loader if present
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add animated entrance to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});