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
        // Observe either the contact section or the footer to determine when to switch
        const endSection = document.querySelector('.contact-section') || document.querySelector('footer');

        if (endSection) {
            const endObserver = new IntersectionObserver((entries) => {
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

            endObserver.observe(endSection);
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

    // Default to "Without Design Fee" on page load
    withoutDesign.click();
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
                for (const option of packageSelect.options) {
                    if (option.value.toLowerCase().startsWith(selectedPackage.toLowerCase())) {
                        packageSelect.value = option.value;
                        break;
                    }
                }
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

// Add language toggle and chatbot buttons across the site
document.addEventListener('DOMContentLoaded', function () {
    // Container for utility buttons (language & chat)
    const utilContainer = document.createElement('div');
    utilContainer.id = 'utility-btn-container';
    document.body.appendChild(utilContainer);

    // Language button with Google Translate PNG icon
    const langBtn = document.createElement('button');
    langBtn.id = 'language-btn';
    langBtn.innerHTML = '<img src="IMG_1870.png" alt="Translate" />';
    utilContainer.appendChild(langBtn);

    // Chatbot toggle button
    const chatBtn = document.createElement('button');
    chatBtn.id = 'chatbot-btn';
    chatBtn.innerHTML = '<i class="fas fa-comments"></i>';
    utilContainer.appendChild(chatBtn);

    // Container for Google Translate widget
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.classList.add('hidden');
    document.body.appendChild(translateDiv);

    langBtn.addEventListener('click', () => {
        translateDiv.classList.toggle('hidden');
    });

    // Chatbot window
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget';
    chatWidget.classList.add('hidden');
    chatWidget.innerHTML = `
        <div id="chat-log"></div>
        <div id="chat-input-container">
            <input type="text" id="chat-input" placeholder="Ask a question..." />
            <button id="chat-send">Send</button>
        </div>`;
    document.body.appendChild(chatWidget);

    chatBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('hidden');
    });

    async function sendChatMessage(message) {
        const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an AI assistant for the SaaS Productized Co website. Answer questions about the site.' },
                    { role: 'user', content: message }
                ]
            })
        });
        const data = await response.json();
        return data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : 'Sorry, I had trouble responding.';
    }

    function appendMessage(sender, text) {
        const log = document.getElementById('chat-log');
        const p = document.createElement('p');
        p.innerHTML = `<strong>${sender}:</strong> ${text}`;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    document.getElementById('chat-send').addEventListener('click', async () => {
        const input = document.getElementById('chat-input');
        const userText = input.value.trim();
        if (!userText) return;
        appendMessage('You', userText);
        input.value = '';
        try {
            const reply = await sendChatMessage(userText);
            appendMessage('AI', reply);
        } catch (e) {
            appendMessage('AI', 'There was an error contacting the assistant.');
        }
    });

    // Load Google Translate script
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };
    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(gtScript);
});
