// DOM Elements
const header = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const overlay = document.querySelector('.overlay');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery if exists
    if (document.querySelector('.gallery')) {
        new Gallery();
    }
});

// Mobile Menu Animation Setup
const setMenuAnimations = () => {
    const menuItems = document.querySelectorAll('.nav-links li');
    menuItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
};

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    setMenuAnimations();
});

// Close Mobile Menu
const closeMenu = () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
};

// Close menu when clicking links
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        closeMenu();
        
        if (href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                const offsetTop = section.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Active Section Highlight
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

if (filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 0);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 500);
                }
            });
        });
    });
}

// Form Validation
const form = document.querySelector('#contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        let isValid = true;
        for (let [key, value] of Object.entries(data)) {
            const input = form.querySelector(`[name="${key}"]`);
            if (!value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        }

        if (isValid) {
            // Add form submission logic here
            console.log('Form submitted:', data);
            form.reset();
        }
    });
}

// Initialize ScrollReveal
ScrollReveal().reveal('.section-title', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom'
});

ScrollReveal().reveal('.skill-item, .project-item, .service-item', {
    delay: 200,
    interval: 100,
    distance: '30px',
    duration: 800,
    origin: 'bottom',
    mobile: true
});

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease',
    once: true,
    mirror: false
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setMenuAnimations();
    if (document.querySelector('.gallery')) {
        new Gallery();
    }
});