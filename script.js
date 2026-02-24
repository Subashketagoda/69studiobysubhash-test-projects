// Sticky Header Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '8px 0';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.borderBottom = '1px solid rgba(93, 58, 26, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.background = 'var(--glass)';
        header.style.borderBottom = '1px solid var(--glass-border)';
    }
});

// Chat Window Toggle
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');

if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });
}

if (closeChat) {
    closeChat.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent chatToggle click event
        chatWindow.style.display = 'none';
    });
}

// Make "New Conversation" Work (WhatsApp Integration)
const conversationCard = document.querySelector('.conversation-card');
if (conversationCard) {
    conversationCard.addEventListener('click', () => {
        const phoneNumber = '94761210164'; // Updated phone number
        const message = 'Hello DinePro Advisors! I saw your website and I would like to consult with you about my restaurant.';
        const waUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });
}

// Make Search Work (Mock Search Logic)
const helpSearch = document.getElementById('helpSearch');
const searchResults = document.getElementById('searchResults');

const mockArticles = [
    { title: 'How to start a restaurant?', desc: 'A step-by-step guide for beginners.' },
    { title: 'Menu engineering tips', desc: 'Optimize your menu for maximum profit.' },
    { title: 'Staff training best practices', desc: 'Build a world-class hospitality team.' },
    { title: 'Improving profitability', desc: 'Reduce waste and increase your margins.' },
    { title: 'Concept development', desc: 'Creating a unique brand for your restaurant.' }
];

if (helpSearch && searchResults) {
    helpSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length > 0) {
            const filtered = mockArticles.filter(art =>
                art.title.toLowerCase().includes(query) ||
                art.desc.toLowerCase().includes(query)
            );

            searchResults.style.display = 'block';

            if (filtered.length > 0) {
                filtered.forEach(art => {
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    div.innerHTML = `<h5>${art.title}</h5><p>${art.desc}</p>`;
                    div.onclick = () => {
                        const phoneNumber = '94761210164';
                        const message = `Hello DinePro Advisors! I am interested in learning more about: "${art.title}". Could you help me with this?`;
                        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                        window.open(waUrl, '_blank');
                    };
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.innerHTML = '<div class="no-results">No results found. Try another keyword.</div>';
            }
        } else {
            searchResults.style.display = 'none';
        }
    });
}

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Hero Slider Logic
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.arrow.next');
const prevBtn = document.querySelector('.arrow.prev');
let currentSlide = 0;
let slideInterval;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function prevSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideTimer();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideTimer();
    });
}

// Start auto-slide
startSlideTimer();

// Mobile Menu Logic
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (!link.parentElement.classList.contains('dropdown')) {
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// Dropdown toggle for mobile
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            dropdown.classList.toggle('active');
        }
    });
});
