// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const isDark = document.body.classList.contains('dark-mode');
    if (window.scrollY > 50) {
        navbar.style.background = isDark ? 'rgba(12, 5, 18, 0.95)' : 'rgba(255, 252, 248, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = isDark ? 'rgba(12, 5, 18, 0.8)' : 'rgba(255, 252, 248, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in').forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for anchor links to prevent offset issues with fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Help Section WhatsApp Redirect
const helpSection = document.querySelector('.help-section');
if (helpSection) {
    const helpBtn = helpSection.querySelector('.submit-btn');
    const helpTextarea = helpSection.querySelector('textarea');
    
    if (helpBtn && helpTextarea) {
        helpBtn.addEventListener('click', () => {
            const message = helpTextarea.value.trim();
            if(!message) {
                alert('Please write a message first.');
                return;
            }
            
            const originalText = helpBtn.innerHTML;
            const formattedMessage = `*Help Request*\n\n*Message:* ${message}`;
            const whatsappUrl = `https://wa.me/919381551930?text=${encodeURIComponent(formattedMessage)}`;
            
            helpBtn.innerHTML = 'Redirecting... <i class="fa-brands fa-whatsapp" style="margin-left: 8px;"></i>';
            window.open(whatsappUrl, '_blank');
            
            setTimeout(() => {
                helpBtn.innerHTML = originalText;
                helpTextarea.value = '';
            }, 2000);
        });
    }
}

// Form submission handler with WhatsApp Redirect
const forms = document.querySelectorAll('.contact-form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        // Get form values
        const name = form.querySelector('.booking-name').value;
        const phone = form.querySelector('.booking-phone').value;
        
        if (!/^[0-9]{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        const selectEl = form.querySelector('.booking-service');
        const service = selectEl.options[selectEl.selectedIndex].text;
        const bDate = form.querySelector('.booking-date').value;
        const bTime = form.querySelector('.booking-time').value;
        const address = form.querySelector('.booking-location').value;
        const message = form.querySelector('.booking-message').value;
        
        // Format message and encode URL
        const whatsappMessage = `*New Booking Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date:* ${bDate}\n*Time:* ${bTime}\n*Location:* ${address}\n*Message:* ${message ? message : 'N/A'}`;
        const whatsappUrl = `https://wa.me/919381551930?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Visual feedback
        btn.innerHTML = 'Redirecting... <i class="fa-brands fa-whatsapp" style="margin-left: 8px;"></i>';
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        setTimeout(() => {
            btn.innerHTML = originalText;
            form.reset();
        }, 2000);
    });
});

// Lightbox Logic for Gallery
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" id="lightbox-img">
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        // Pause marquee while viewing
        document.querySelector('.marquee-content').style.animationPlayState = 'paused';
    });
});

const closeLightbox = () => {
    lightbox.style.display = 'none';
    // Resume marquee
    document.querySelector('.marquee-content').style.animationPlayState = 'running';
};

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});

// Booking UI Modal
const bookingModal = document.getElementById('booking-modal');
if (bookingModal) {
    const modalCloseBtn = bookingModal.querySelector('.modal-close');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    
    const showModal = () => {
        bookingModal.style.display = 'flex';
        setTimeout(() => bookingModal.classList.add('show'), 10);
    };

    const hideModal = () => {
        bookingModal.classList.remove('show');
        setTimeout(() => bookingModal.style.display = 'none', 300);
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal();
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            hideModal();
        }
    });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        
        // Trigger manual background update 
        window.dispatchEvent(new Event('scroll'));
    });
}

// Local Translation Manual Overrides
const hiTranslations = {
    "Home": "होम",
    "About": "परिचय",
    "Services": "सेवाएं",
    "Gallery": "गैलरी",
    "Contact Us": "संपर्क करें",
    "Awaken Your": "अपनी ",
    "Spiritual": "आध्यात्मिक",
    "Journey.": " यात्रा शुरू करें।",
    "Expert astrological guidance and authentic pooja services by Pandit Ankit Tiwari to bring peace, prosperity, and harmony into your life.": "पंडित अंकित तिवारी द्वारा विशेषज्ञ ज्योतिषीय मार्गदर्शन और प्रामाणिक पूजा सेवाएं, जो आपके जीवन में शांति, समृद्धि और सद्भाव लाएंगी।",
    "Our Services": "हमारी सेवाएं",
    "Book a consultation": "परामर्श बुक करें",
    "Pandit Ji": "पंडित जी",
    "About": "परिचय ",
    "Pandit Ankit Tiwari is a highly respected Vedic astrologer and spiritual guide with years of experience. He specializes in bringing balance and happiness to people's lives through ancient Vedic rituals and accurate astrological predictions.": "पंडित अंकित तिवारी वर्षों के अनुभव के साथ एक अत्यधिक सम्मानित वैदिक ज्योतिषी और आध्यात्मिक मार्गदर्शक हैं। विशेषज्ञता प्राचीन वैदिक अनुष्ठानों के माध्यम से जीवन में संतुलन लाना है।",
    "Years Experience": "वर्षों का अनुभव",
    "Families Served": "परिवारों की सेवा",
    "Rituals Performed": "अनुष्ठान संपन्न",
    "Spiritual": "आध्यात्मिक ",
    "Discover our range of authentic Vedic services tailored to your spiritual needs.": "आपकी आध्यात्मिक आवश्यकताओं के अनुरूप प्रामाणिक वैदिक सेवाओं की हमारी श्रृंखला खोजें।",
    "Vedic Pujas": "वैदिक पूजा",
    "Authentic rituals including Satyanarayan Katha, Rudrabhishek, and Navagraha Shanti.": "सत्यनारायण कथा और रुद्राभिषेक सहित प्रामाणिक अनुष्ठान।",
    "Marriage Ceremonies": "विवाह समारोह",
    "Complete execution of traditional Hindu weddings with all Vedic rites and mantras.": "सभी वैदिक अनुष्ठानों और मंत्रों के साथ पारंपरिक हिंदू शादियों का पूर्ण निष्पादन।",
    "Vastu Shastra": "वास्तु शास्त्र",
    "Expert Vastu consultations for homes and businesses to ensure positive cosmic energy flow.": "सकारात्मक ऊर्जा प्रवाह सुनिश्चित करने के लिए घरों और व्यवसायों के लिए वास्तु परामर्श।",
    "Astrology": "ज्योतिष",
    "Kundali matching, personalized horoscope readings, and astrological remedies.": "कुंडली मिलान, व्यक्तिगत राशिफल पढ़ना, और ज्योतिषीय उपाय।",
    "Havan & Yagya": "हवन और यज्ञ",
    "Purifying fire rituals for health, wealth, and removing obstacles from life.": "स्वास्थ्य, धन और जीवन की बाधाओं को दूर करने के लिए अग्नि अनुष्ठान।",
    "Sanskar Rituals": "संस्कार अनुष्ठान",
    "Namakaran, Mundan, and Vidyarambham ceremonies performed with utmost devotion.": "नामकरण, मुंडन और विद्यारंभ समारोह अत्यंत भक्ति के साथ किए जाते हैं।",
    "Katha & Path": "कथा और पाठ",
    "Spiritual recitations including Bhagwat Katha, Ramayan Path, and Sunderkand.": "भागवत कथा, रामायण पाठ और सुंदरकांड सहित आध्यात्मिक पाठ।",
    "Pitru Shanti": "पितृ शांति",
    "Rituals for ancestral peace, including Narayan Bali and annual Shraddh ceremonies.": "पैतृक शांति के लिए अनुष्ठान, जिसमें नारायण बलि और वार्षिक श्राद्ध शामिल हैं।",
    "Sacred": "पवित्र ",
    "Moments": "क्षण",
    "Get in": "इसमें ",
    "Touch": "संपर्क करें",
    "Reach out today for consultation, bookings, or spiritual guidance.": "परामर्श, बुकिंग या आध्यात्मिक मार्गदर्शन के लिए आज ही संपर्क करें।",
    "Call Us": "हमें कॉल करें",
    "Email": "ईमेल",
    "Location": "स्थान",
    "Instagram": "इंस्टाग्राम",
    "Book a Session": "सत्र बुक करें",
    "Send Request": "अनुरोध भेजें ",
    "Bringing light, prosperity, and peace into your life through authentic Vedic wisdom.": "प्रामाणिक वैदिक ज्ञान के माध्यम से आपके जीवन में प्रकाश, समृद्धि और शांति लाना।",
    "Book a Sacred Service": "पवित्र सेवा बुक करें",
    "Fill in the details": "विवरण भरें",
    "Select Service": "सेवा चुनें",
    "Your Name": "आपका नाम",
    "Phone Number": "फ़ोन नंबर",
    "Location / Address": "स्थान / पता",
    "Your Message (Optional)": "आपका संदेश (वैकल्पिक)",
    "To confirm you will be redirected to whatsapp": "पुष्टि करने के लिए आपको व्हाट्सएप पर रीडायरेक्ट किया जाएगा",
    "Confirm": "पुष्टि करें"
};

const walkDOM = (node, callback) => {
    if (node.nodeType === 3) {
        let text = node.nodeValue.trim();
        if (text && text.length > 0) callback(node);
    } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE'].includes(node.nodeName)) {
        for (let i = 0; i < node.childNodes.length; i++) walkDOM(node.childNodes[i], callback);
    }
};

let enNodes = [];
let enStrings = [];
document.addEventListener("DOMContentLoaded", () => {
    walkDOM(document.body, (node) => {
        enNodes.push(node);
        enStrings.push(node.nodeValue);
    });
});

// Language Toggle Logic
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const isHindi = langToggle.innerText.trim() === 'EN';
        langToggle.innerText = isHindi ? 'HI' : 'EN';
        
        // Fast DOM replace
        enNodes.forEach((node, i) => {
            const originalText = enStrings[i];
            const trimmed = originalText.trim();
            const stripped = trimmed.replace(/\s+/g, ' ');
            if (isHindi && hiTranslations[stripped]) {
                node.nodeValue = originalText.replace(trimmed, hiTranslations[stripped]);
            } else if (!isHindi) {
                node.nodeValue = originalText;
            }
        });
        
        // Update placeholders
        document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
            if (!el.dataset.en) el.dataset.en = el.placeholder;
            if (isHindi && hiTranslations[el.dataset.en]) {
                el.placeholder = hiTranslations[el.dataset.en];
            } else if (!isHindi) {
                el.placeholder = el.dataset.en;
            }
        });
    });
}
