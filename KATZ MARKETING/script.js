// ==================== //
// SMOOTH SCROLLING
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.getElementById('hamburger').classList.remove('active');
            }
        }
    });
});

// ==================== //
// NAVBAR SCROLL EFFECT
// ==================== //
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==================== //
// MOBILE MENU TOGGLE
// ==================== //
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== //
// CONTACT FORM HANDLING
// ==================== //
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    console.log('Form submitted:', formData);

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to a server:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    })
    .catch(error => {
        alert('Something went wrong. Please try again.');
        console.error('Error:', error);
    });
    */
});

// ==================== //
// SCROLL ANIMATIONS
// ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .testimonial-card, .pricing-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== //
// PRICING BUTTON CLICKS
// ==================== //
document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', () => {
        // Get the plan name
        const planName = button.closest('.pricing-card').querySelector('h3').textContent;

        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = contactSection.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Pre-fill message in contact form
        setTimeout(() => {
            const messageField = document.getElementById('message');
            messageField.value = `I'm interested in the ${planName} plan. Please contact me with more information.`;
            messageField.focus();
        }, 800);
    });
});

// ==================== //
// ACTIVE NAV LINK ON SCROLL
// ==================== //
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = document.querySelector('.navbar').offsetHeight;

        if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== //
// PORTFOLIO ITEM CLICKS
// ==================== //
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;

        // You could open a modal here or navigate to a project page
        console.log('Portfolio item clicked:', { title, description });

        // For now, we'll just show an alert
        alert(`${title}\n\n${description}\n\nClick OK to learn more about this project.`);
    });
});

// ==================== //
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ==================== //
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment below to enable typing effect on page load
/*
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 30);
});
*/

// ==================== //
// PARALLAX EFFECT FOR HERO BACKGROUND
// ==================== //
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroEffect = document.querySelector('.hero-bg-effect');

    if (heroEffect) {
        heroEffect.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
        heroEffect.style.opacity = 1 - scrolled * 0.001;
    }
});

// ==================== //
// FORM INPUT ANIMATIONS
// ==================== //
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ==================== //
// SOCIAL ICON ANIMATIONS
// ==================== //
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
        this.style.transition = 'all 0.5s ease';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// ==================== //
// CURSOR GLOW EFFECT (Optional Enhancement)
// ==================== //
/*
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'rgba(0, 212, 255, 0.5)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.filter = 'blur(5px)';
    cursor.style.zIndex = '9999';

    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.style.opacity = '0';
        cursor.style.transition = 'opacity 0.5s ease';
    }, 100);

    setTimeout(() => {
        cursor.remove();
    }, 600);
});
*/

// ==================== //
// PERFORMANCE: Lazy Load Images
// ==================== //
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('=€ KATZ MARKETING - Website Loaded Successfully');
