// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.padding = '0.6rem 4%';
  } else {
    nav.style.padding = '1rem 4%';
  }
});

// Form submission
document.querySelector('.btn-submit').addEventListener('click', function () {
  const name = document.querySelector('input[placeholder="Full name"]').value;
  const phone = document.querySelector('input[placeholder="+91 XXXXX XXXXX"]').value;
  const business = document.querySelector('input[placeholder="Shop / Firm name"]').value;
  const location = document.querySelector('input[placeholder="Your city / district"]').value;
  const products = document.querySelector('textarea').value;

  if (!name || !phone) {
    this.textContent = '⚠️ Please fill Name & Phone';
    setTimeout(() => { this.textContent = '🤝 Submit Inquiry'; }, 2000);
    return;
  }

  const message = `*New Inquiry*\n\n👤 Name: ${name}\n🏪 Business: ${business}\n📞 Phone: ${phone}\n📍 Location: ${location}\n🌾 Products: ${products}`;
  const whatsappURL = `https://wa.me/919991689999?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
});

// Slideshow
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
let current = 0;
let timer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');

  // Pause old video if any
  const oldVideo = slides[current].querySelector('video');
  if (oldVideo) oldVideo.pause();

  current = (n + slides.length) % slides.length;

  slides[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');

  // Play new video if any
  const newVideo = slides[current].querySelector('video');
  if (newVideo) newVideo.play();

  resetTimer();
}

function changeSlide(dir) { goToSlide(current + dir); }

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => goToSlide(current + 1), 5000);
}

resetTimer();