// ========================
// Header Scroll & Hide Effect
// ========================
const header = document.querySelector('.header');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // 1. Efek Background saat Di-scroll (Logika Asli)
  header.classList.toggle('scrolled', window.scrollY > 50);

  // 2. Efek Sembunyi Otomatis khusus Mode HP (Antigravity Mode)
  if (window.innerWidth <= 768) {
    // Jika menu garis 3 sedang tidak terbuka, jalankan efek sembunyi
    if (!navbar.classList.contains('open')) {
      if (scrollTop > lastScrollTop) {
        // Scroll ke bawah = Sembunyikan header
        header.style.top = '-100px';
      } else {
        // Scroll ke atas = Munculkan kembali header
        header.style.top = '0';
      }
    }
  } else {
    // Layar Desktop tetap normal selalu di atas
    header.style.top = '0';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================
// Mobile Menu Toggle
// ========================
menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// Close navbar on link click (mobile UX)
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    // Memastikan header langsung muncul kembali saat menu diklik
    header.style.top = '0';
  });
});

// ========================
// Portfolio Filter Logic
// ========================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.pf-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'block';
      } else if (card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ========================
// Scroll Reveal Animation
// ========================
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.about-card, .stat-item, .skill-card, .pf-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => observer.observe(el));
}

// ========================
// Skill Progress Bar Animation
// ========================
function setupSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(bar => observer.observe(bar));
}

// ========================
// Smooth Scroll for Anchor Links
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ========================
// Initialize on DOM Ready
// ========================
document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupSkillBars();
});