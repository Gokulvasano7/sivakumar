document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-bar');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => observer.observe(el));

    // Skill bars animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
        });
    }, revealOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Text animation for hero section
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        heroText.innerHTML = heroText.textContent.split('').map(
            char => `<span>${char}</span>`
        ).join('');

        document.querySelectorAll('.hero h1 span').forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('fade-in');
            }, 100 * idx);
        });
    }
});