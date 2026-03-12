/* ═══════════════════════════════════════════════════
   AMRITA AGRO INDUSTRIES — script.js
   ═══════════════════════════════════════════════════ */

const WA_NUMBER = '919991689999';

document.addEventListener('DOMContentLoaded', function () {

  /* ── Init Lucide icons ─────────────────────────── */
  if (window.lucide) lucide.createIcons();

  /* ── Scroll reveal ─────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { revealObs.observe(el); });

  /* ── Active nav on scroll ──────────────────────── */
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var scrollObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var active = document.querySelector('.nav-link[href="#' + e.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(function (s) { scrollObs.observe(s); });

  /* ── Header scroll shadow ──────────────────────── */
  var header = document.getElementById('main-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,.35)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  /* ── Hamburger ─────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var mainNav   = document.getElementById('main-nav');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('.nav-link').forEach(function (l) {
    l.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
    });
  });

  /* ── Main Hero Slider ──────────────────────────── */
  var slides      = document.querySelectorAll('.hero-slider .slide');
  var dots        = document.querySelectorAll('.sl-dots .dot');
  var thumbItems  = document.querySelectorAll('.thumb-item');
  var current     = 0;
  var autoTimer   = null;

  function getVideo(slide) {
    return slide.querySelector('video.slide-video');
  }

  function goToSlide(idx) {
    var prevSlide = slides[current];
    var prevVideo = getVideo(prevSlide);
    if (prevVideo) {
      prevVideo.pause();
      prevVideo.currentTime = 0;
    }
    prevSlide.classList.remove('active');
    dots[current].classList.remove('active');
    if (thumbItems[current]) thumbItems[current].classList.remove('active');

    current = (idx + slides.length) % slides.length;

    var nextSlide = slides[current];
    var nextVideo = getVideo(nextSlide);
    nextSlide.classList.add('active');
    dots[current].classList.add('active');
    if (thumbItems[current]) thumbItems[current].classList.add('active');

    if (nextVideo) {
      nextVideo.load();
      var playPromise = nextVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Autoplay blocked — that's fine, video will show first frame
        });
      }
      // Auto advance after video ends (or fall back to timer if duration unknown)
      nextVideo.onended = function () { goToSlide(current + 1); startAuto(); };
      clearInterval(autoTimer);
      return; // don't restart auto-timer while video is playing
    }
  }

  function startAuto() {
    clearInterval(autoTimer);
    // Don't auto-advance while a video slide is active and playing
    var currentVideo = getVideo(slides[current]);
    if (currentVideo && !currentVideo.paused) return;
    autoTimer = setInterval(function () { goToSlide(current + 1); }, 4500);
  }

  document.getElementById('slider-prev').addEventListener('click', function () {
    goToSlide(current - 1); startAuto();
  });
  document.getElementById('slider-next').addEventListener('click', function () {
    goToSlide(current + 1); startAuto();
  });
  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      goToSlide(parseInt(d.dataset.index)); startAuto();
    });
  });
  thumbItems.forEach(function (t) {
    t.addEventListener('click', function () {
      goToSlide(parseInt(t.dataset.slide)); startAuto();
    });
  });

  /* Touch swipe on hero slider */
  var sliderEl = document.getElementById('hero-slider');
  var touchX0 = null;
  sliderEl.addEventListener('touchstart', function (e) { touchX0 = e.touches[0].clientX; }, { passive: true });
  sliderEl.addEventListener('touchend', function (e) {
    if (touchX0 === null) return;
    var dx = e.changedTouches[0].clientX - touchX0;
    if (Math.abs(dx) > 40) { goToSlide(dx < 0 ? current + 1 : current - 1); startAuto(); }
    touchX0 = null;
  });

  startAuto();

  /* ── Highlight invalid field ───────────────────── */
  function highlight(el) {
    if (!el) return;
    el.style.borderColor = '#e53e3e';
    el.focus();
    setTimeout(function () { el.style.borderColor = ''; }, 2000);
  }

  /* ── Main contact form ─────────────────────────── */
  var sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var name        = document.getElementById('f-name').value.trim();
      var phone       = document.getElementById('f-phone').value.trim();
      var business    = (document.getElementById('f-business')     || {}).value || '';
      var location    = (document.getElementById('f-location')     || {}).value || '';
      var email       = (document.getElementById('f-email')        || {}).value || '';
      var inquiryType = (document.getElementById('f-inquiry-type') || {}).value || '';
      var product     = (document.getElementById('f-product')      || {}).value || '';
      if (!name)  { highlight(document.getElementById('f-name'));  return; }
      if (!phone) { highlight(document.getElementById('f-phone')); return; }
      var text =
        'Hello Amrita Agro Industries,\n\n' +
        'Name: '    + name  + '\n' +
        'Phone: '   + phone + '\n' +
        (business    ? 'Business: '     + business    + '\n' : '') +
        (location    ? 'Location: '     + location    + '\n' : '') +
        (email       ? 'Email: '        + email        + '\n' : '') +
        (inquiryType ? 'Inquiry Type: ' + inquiryType + '\n' : '') +
        (product     ? 'Product: '      + product     + '\n' : '') +
        '\nPlease get in touch. Thank you.';
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

  /* ── Modal (product card enquiry) ─────────────── */
  var modal       = document.getElementById('enquiry-modal');
  var modalClose  = document.getElementById('modal-close');
  var modalSendBtn= document.getElementById('modal-send-btn');
  var modalProdNote = document.getElementById('modal-prod-note');
  var currentProduct = '';

  window.openEnquiry = function (productName) {
    currentProduct = productName || '';
    modalProdNote.textContent = productName ? 'Enquiring about: ' + productName : '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  };

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (modalClose)   modalClose.addEventListener('click', closeModal);
  if (modal)        modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  if (modalSendBtn) {
    modalSendBtn.addEventListener('click', function () {
      var name  = (document.getElementById('m-name')  || {}).value.trim();
      var phone = (document.getElementById('m-phone') || {}).value.trim();
      var msg   = (document.getElementById('m-msg')   || {}).value.trim();
      if (!name)  { highlight(document.getElementById('m-name'));  return; }
      if (!phone) { highlight(document.getElementById('m-phone')); return; }
      var text =
        'Hello Amrita Agro Industries,\n\n' +
        'Name: '  + name  + '\n' +
        'Phone: ' + phone + '\n' +
        (currentProduct ? 'Product: ' + currentProduct + '\n' : '') +
        (msg ? 'Message: ' + msg + '\n' : '') +
        '\nPlease get in touch. Thank you.';
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

});
