/* ============================================================
   SCRIPT.JS — Abhinav Mishra Portfolio
   Handles: tsParticles, Typed.js, AOS, Custom Cursor,
            Navbar scroll/active, Hamburger, Skill Bars,
            Contact Form, Smooth interactions
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. CUSTOM CURSOR
  ---------------------------------------------------------- */
  const dot     = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Lag the outline for a trailing effect
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    outline.style.left = outlineX + 'px';
    outline.style.top  = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    dot.style.display     = 'none';
    outline.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ----------------------------------------------------------
     2. TSPARTICLES — Neural Network Background
  ---------------------------------------------------------- */
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      fpsLimit: 60,
      background: { color: { value: 'transparent' } },
      particles: {
        number: {
          value: 80,
          density: { enable: true, area: 900 }
        },
        color: { value: ['#00f5ff', '#a855f7', '#3b82f6'] },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
        },
        size: {
          value: { min: 1, max: 2.5 },
          animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false }
        },
        links: {
          enable: true,
          distance: 130,
          color: '#00f5ff',
          opacity: 0.12,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' }
        }
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick:  { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.35 } },
          push: { quantity: 3 }
        }
      },
      detectRetina: true
    });
  }

  /* ----------------------------------------------------------
     3. TYPED.JS — Typewriter Effect
  ---------------------------------------------------------- */
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-output', {
      strings: [
        'Full Stack Developer',
        'Data Analyst',
        'Problem Solver',
        'CSE Student @ LPU'
      ],
      typeSpeed:    55,
      backSpeed:    30,
      backDelay:    2000,
      startDelay:   500,
      loop:         true,
      showCursor:   true,
      cursorChar:   '_'
    });
  }

  /* ----------------------------------------------------------
     4. AOS — Scroll Animations
  ---------------------------------------------------------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing:   'ease-out-cubic',
      once:     false,
      offset:   80,
      delay:    50
    });
  }

  /* ----------------------------------------------------------
     5. NAVBAR — Scroll Styling & Active Section Highlight
  ---------------------------------------------------------- */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  const updateActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
    animateSkillBars();
  }, { passive: true });

  updateNavbar();
  updateActiveLink();

  /* ----------------------------------------------------------
     6. HAMBURGER MENU
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  /* ----------------------------------------------------------
     7. SKILL BAR ANIMATION (on scroll into view)
  ---------------------------------------------------------- */
  let skillsBarsAnimated = false;

  function animateSkillBars() {
    if (skillsBarsAnimated) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.85;

    if (isInView) {
      skillsBarsAnimated = true;
      document.querySelectorAll('.skill-bar').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        // Small stagger
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, Math.random() * 300);
      });
    }
  }

  // Also try on load
  setTimeout(animateSkillBars, 500);

  /* ----------------------------------------------------------
     8. CONTACT FORM
  ---------------------------------------------------------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
      btn.style.background = 'var(--violet)';
      btn.style.borderColor = 'var(--violet)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  /* ----------------------------------------------------------
     9. SMOOTH SCROLL for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ----------------------------------------------------------
     10. PROFILE IMAGE — hover pulse
  ---------------------------------------------------------- */
  const profileImg = document.querySelector('.profile-ring-wrapper');
  if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
      profileImg.style.transform = 'scale(1.04)';
      profileImg.style.transition = 'transform 0.4s ease';
    });
    profileImg.addEventListener('mouseleave', () => {
      profileImg.style.transform = 'scale(1)';
    });
  }

  /* ----------------------------------------------------------
     11. INTERSECTION OBSERVER — refresh AOS on re-entry
  ---------------------------------------------------------- */
  if ('IntersectionObserver' in window && typeof AOS !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          AOS.refresh();
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(s => observer.observe(s));
  }

});
