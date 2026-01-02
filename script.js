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

    // Chatbot toggle button
    const chatBtn = document.createElement('button');
    chatBtn.id = 'chatbot-btn';
    chatBtn.innerHTML = '<i class="fas fa-comments"></i>';
    utilContainer.appendChild(chatBtn);

    // Language button with Google Translate PNG icon
    const langBtn = document.createElement('button');
    langBtn.id = 'language-btn';
    langBtn.innerHTML = '<img src="IMG_1870.png" alt="Translate" />';
    utilContainer.appendChild(langBtn);

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
        <div id="chat-header">
            <span>Ask our AI</span>
            <button id="chat-close" aria-label="Close chat">×</button>
        </div>
        <div id="chat-log"></div>
        <div id="chat-input-container">
            <input type="text" id="chat-input" placeholder="Ask a question about SaaS Productized Co or anything else..." />
            <button id="chat-send">Send</button>
        </div>`;
    document.body.appendChild(chatWidget);

    chatBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('hidden');
    });

    document.getElementById('chat-close').addEventListener('click', () => {
        chatWidget.classList.add('hidden');
    });

    appendMessage('AI', 'Hi! Ask me anything about SaaS Productized Co, our services, or the wider world.');

    const knowledgeBase = [
        { match: ['hi', 'hello', 'hey', 'yo'], response: 'Hi there! How can I help you today?' },
        { match: ['price', 'cost', 'pricing'], response: 'We offer tiered packages for web design, ads, AI, and more. Pick the package that fits your needs or use the contact form for a tailored quote.' },
        {
            match: ['what is this', 'what is this site', 'what’s this website', "what's this website", 'who are you', 'what is this company', 'company about'],
            response: 'SaaS Productized Co is a B2B SaaS company offering software development, web design, Web3.0, AI solutions, Google My Business, custom analytics, and ad management.'
        },
        { match: ['ai', 'artificial intelligence', 'automation'], response: 'Our AI services cover chatbots, automation, and integrations. Tell me your use case and I can recommend the right package.' },
        { match: ['web3', 'blockchain'], response: 'We provide Web3 consulting, NFT support, and blockchain integrations. Share your goals and we will map out the best approach.' },
        { match: ['ads', 'google', 'facebook', 'marketing'], response: 'We manage Google and Facebook ad campaigns, including strategy, creative, and optimization to boost your ROI.' },
        { match: ['seo', 'search'], response: 'We can optimize your site structure, keywords, and content to improve search visibility.' },
        { match: ['contact', 'support', 'email'], response: 'You can reach us via the contact form at the bottom of the page or by using the provided email address.' },
        { match: ['timeline', 'turnaround', 'how long'], response: 'Most website builds take 2-4 weeks depending on scope. Marketing and AI timelines vary by project complexity.' },
        { match: ['payment', 'pay', 'deposit'], response: 'Projects typically start with a deposit followed by milestone-based payments. We can confirm details when you share your needs.' },
        { match: ['package', 'plan', 'offer'], response: 'Browse our package list on the site. If you need a custom plan, send us a note through the contact form.' },
        { match: ['location', 'where', 'based'], response: 'We work with clients remotely and can collaborate across time zones.' },
        {
            match: ['weather', 'temperature', 'forecast'],
            response: 'I can help explain weather terms or give general advice, but I do not have live weather data. Share your city and I can suggest where to check or explain what a forecast means.'
        }
    ];

    const aiApiEndpoint = '/api/chat';

    function findAnswer(message) {
        const normalized = message.toLowerCase();
        const timeRegex = /\btime\b/;
        if (timeRegex.test(normalized)) {
            const now = new Date();
            return `It is currently ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}.`;
        }

        const escapeRegex = (keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matchesKeyword = (keyword) => {
            const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`);
            return regex.test(normalized);
        };

        for (const entry of knowledgeBase) {
            if (entry.match.some(matchesKeyword)) {
                return entry.response;
            }
        }
        return "I can answer questions about SaaS Productized Co or general topics. If you need live data (like weather), share your location and I can guide you to the best source.";
    }

    async function sendChatMessage(message) {
        try {
            const response = await fetch(aiApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('AI request failed.');
            }

            const data = await response.json();
            const reply = data?.reply?.trim();
            if (reply) {
                return reply;
            }
        } catch (error) {
            return findAnswer(message);
        }
        return findAnswer(message);
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
            appendMessage('AI', 'Thinking...');
            const reply = await sendChatMessage(userText);
            const log = document.getElementById('chat-log');
            log.removeChild(log.lastChild);
            appendMessage('AI', reply);
        } catch (e) {
            appendMessage('AI', 'There was an error creating a response. Please try again.');
        }
    });

    document.getElementById('chat-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            document.getElementById('chat-send').click();
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
