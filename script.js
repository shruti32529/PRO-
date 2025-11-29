/* -------------------------------
   script.js - All features
   (Mobile menu, theme toggle,
    scroll reveal, typing, smooth scroll)
   ------------------------------- */

/* ===== Selectors ===== */
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobile-panel');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = mobilePanel ? mobilePanel.querySelectorAll('.nav-link') : [];
const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

/* ===== Mobile menu open/close ===== */
function openMobile() {
  mobilePanel.classList.add('open');
  mobilePanel.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('active');
}
function closeMobile() {
  mobilePanel.classList.remove('open');
  mobilePanel.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('active');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (mobilePanel.classList.contains('open')) closeMobile();
    else openMobile();
  });
}
if (mobileClose) {
  mobileClose.addEventListener('click', closeMobile);
}
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobile);
});

/* Also close mobile when clicking a desktop nav-link in mobile panel context */
desktopLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove active state on mobile if present
    closeMobile();
  });
});

/* ===== Theme toggle (persist) ===== */
const preferred = localStorage.getItem('theme');
if (preferred === 'dark') body.classList.add('dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');
  });
}

/* ===== Scroll reveal (fade-in) ===== */
const scrollElements = document.querySelectorAll('.scroll-reveal');

const elementInView = (el, offset = 100) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight - offset);
};

const displayScrollElement = (el) => {
  el.classList.add('visible');
};

const hideScrollElement = (el) => {
  // optional: remove to allow repeated reveal - comment out if not needed
  // el.classList.remove('visible');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 120)) displayScrollElement(el);
    else hideScrollElement(el);
  });
};

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

/* ===== Typing effect ===== */
const typingText = document.querySelector('.typing-text');
const words = ["Full Stack Developer",  "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let typingSpeed = 90;

function typeEffect() {
  if (!typingText) return;
  if (charIndex < words[wordIndex].length) {
    typingText.innerHTML += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    setTimeout(deleteEffect, 900);
  }
}
function deleteEffect() {
  if (!typingText) return;
  if (charIndex > 0) {
    typingText.innerHTML = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteEffect, 50);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});

/* ===== Smooth scrolling for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // optionally close mobile nav after navigation
    closeMobile();
  });
});

/* ===== Optional: simple contact form prevention (no backend) ===== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple client-side confirmation - you can replace with AJAX submit later
    alert('Thanks! Your message was captured (demo mode). For real contact, wire a backend or email service.');
    contactForm.reset();
  });
}
