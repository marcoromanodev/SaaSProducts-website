document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, .hero-section");
    const scrollIndicator = document.getElementById("scroll-indicator");
    const scrollText = scrollIndicator.querySelector("span");

    // Select the footer and logo container sections
    const contactSection = document.querySelector(".footer");
    const logoContainer = document.querySelector(".logo-container");

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

    // Function to update the scroll indicator text and behavior
    const updateScrollIndicator = () => {
        let scrollTop = window.scrollY;
        let viewportHeight = window.innerHeight;

        // Get the positions of contact section (footer) and logo container
        const contactRect = contactSection.getBoundingClientRect();
        const logoRect = logoContainer.getBoundingClientRect();

        // Define an even larger buffer for earlier switching
        const earlyTrigger = 300; // Reduced buffer for even earlier switching

        // Switch to "Scroll Up" when nearing the contact section (footer)
        if (contactRect.top - earlyTrigger < viewportHeight) {
            scrollText.innerText = "Scroll Up";
        } 
        // Switch to "Scroll Down" when nearing the top of the page (logo container)
        else if (logoRect.bottom + earlyTrigger > 0) {
            scrollText.innerText = "Scroll Down";
        }
    };

    // Listen for scroll events and update the scroll indicator
    window.addEventListener("scroll", updateScrollIndicator);

    // Run the function initially to set the correct text
    updateScrollIndicator();
});

// Toggle between design fee options
document.getElementById('with-design-fee').addEventListener('click', function() {
    document.getElementById('without-design-fee').classList.remove('active');
    this.classList.add('active');
    document.querySelectorAll('.with-design-fee').forEach(function(el) {
        el.classList.remove('hidden');
    });
    document.querySelectorAll('.without-design-fee').forEach(function(el) {
        el.classList.add('hidden');
    });
});

document.getElementById('without-design-fee').addEventListener('click', function() {
    document.getElementById('with-design-fee').classList.remove('active');
    this.classList.add('active');
    document.querySelectorAll('.with-design-fee').forEach(function(el) {
        el.classList.add('hidden');
    });
    document.querySelectorAll('.without-design-fee').forEach(function(el) {
        el.classList.remove('hidden');
    });
});

// Pre-fill the package dropdown and handle 'Consult Us' button clicks
document.addEventListener('DOMContentLoaded', function() {

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
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once active
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
