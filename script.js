document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, .hero-section");
    const scrollIndicator = document.getElementById("scroll-indicator");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const line = entry.target.querySelector('.line-through');
                if (line) {
                    line.classList.add('crossed');
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Function to move the scroll indicator with the user scroll
    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        let viewportHeight = window.innerHeight;
        scrollIndicator.style.top = (scrollTop + viewportHeight - 100) + 'px';
    });
});
