document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, .hero-section");
    const scrollIndicator = document.getElementById("scroll-indicator");
    const scrollText = scrollIndicator ? scrollIndicator.querySelector("span") : null;

    // Create an Intersection Observer to animate sections when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                const line = entry.target.querySelector(".line-through");
                if (line) {
                    line.classList.add("crossed");
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
        observer.observe(section);
    });

    if (scrollIndicator && scrollText) {
        const contactSection = document.querySelector('.contact-section');

        if (contactSection) {
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scrollIndicator.classList.add('scroll-up');
                        scrollText.innerText = "Scroll Up";
                    } else {
                        scrollIndicator.classList.remove('scroll-up');
                        scrollText.innerText = "Scroll Down";
                    }
                });
            }, { threshold: 0.1 });

            contactObserver.observe(contactSection);
        } else {
            const hasReachedBottom = () => Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1;

            const updateScrollIndicator = () => {
                if (window.scrollY > 0 && hasReachedBottom()) {
                    scrollIndicator.classList.add('scroll-up');
                    scrollText.innerText = "Scroll Up";
                } else {
                    scrollIndicator.classList.remove('scroll-up');
                    scrollText.innerText = "Scroll Down";
                }
            };

            window.addEventListener('scroll', updateScrollIndicator, { passive: true });
            window.addEventListener('load', updateScrollIndicator);
            window.addEventListener('resize', updateScrollIndicator);
            window.addEventListener('orientationchange', updateScrollIndicator);
        }

        scrollIndicator.addEventListener('click', function () {
            if (scrollIndicator.classList.contains('scroll-up')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const hero = document.querySelector('.hero-section');
                let target = hero ? hero.nextElementSibling : null;

                while (target && (target.classList.contains('line-through') || target.id === 'scroll-indicator')) {
                    target = target.nextElementSibling;
                }

                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }
            }
        });
    }
});

// Toggle between design fee options
const withDesign = document.getElementById('with-design-fee');
const withoutDesign = document.getElementById('without-design-fee');

if (withDesign && withoutDesign) {
    withDesign.addEventListener('click', function() {
        withoutDesign.classList.remove('active');
        this.classList.add('active');
        document.querySelectorAll('.with-design-fee').forEach(function(el) {
            el.classList.remove('hidden');
        });
        document.querySelectorAll('.without-design-fee').forEach(function(el) {
            el.classList.add('hidden');
        });
    });

    withoutDesign.addEventListener('click', function() {
        withDesign.classList.remove('active');
        this.classList.add('active');
        document.querySelectorAll('.with-design-fee').forEach(function(el) {
            el.classList.add('hidden');
        });
        document.querySelectorAll('.without-design-fee').forEach(function(el) {
            el.classList.remove('hidden');
        });
    });
}

// Pre-fill the package dropdown and handle 'Consult Us' button clicks
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('Y-XtDjX-x7GuFRumI');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            emailjs.sendForm('service_ni1jgq2', 'template_rd9i0ip', this)
                .then(function() {
                    alert('Email sent successfully!');
                }, function(error) {
                    alert('Failed to send email: ' + JSON.stringify(error));
                });
        });
    }

    // Function to scroll to the contact section
    function scrollToContactForm() {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Function to pre-fill the package dropdown
    function fillPackageDropdown() {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedPackage = urlParams.get('package');
        if (selectedPackage) {
            const packageSelect = document.getElementById('package_select');
            if (packageSelect) {
                packageSelect.value = selectedPackage;
            }
        }
    }

    // Event listener for "Consult Us" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const packageType = button.closest('.package').dataset.package;
            window.location.href = `index.html#contact?package=${encodeURIComponent(packageType)}`;

            // Scroll to the contact form after redirection
            setTimeout(() => {
                scrollToContactForm();
                fillPackageDropdown();
            }, 500); // Wait for redirection before scrolling
        });
    });

    // On page load, scroll to contact form and pre-fill the dropdown
    if (window.location.hash === '#contact') {
        scrollToContactForm();
        fillPackageDropdown();
    }
});

// Ensure sections are revealed as you scroll
const revealSections = document.querySelectorAll('section');
const revealOptions = { threshold: 0.5 };

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealSections.forEach(section => revealObserver.observe(section));
