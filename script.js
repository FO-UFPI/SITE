/* ═══════════════════════════════════════════
   script.js — FO Énergie UFPI
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────
  // 1. SCROLL REVEAL (Intersection Observer)
  // ─────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─────────────────────────────────────────
  // 2. COMPTEURS ANIMÉS (stat-bubble)
  // ─────────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }

        // Déclencher après l'apparition du bouclier
        setTimeout(() => requestAnimationFrame(update), 3000);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));


  // ─────────────────────────────────────────
  // 3. FAQ ACCORDÉON
  // ─────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fermer tous les autres
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Ouvrir celui-ci si il était fermé
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ─────────────────────────────────────────
  // 4. HEADER — effet au scroll
  // ─────────────────────────────────────────
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 32px rgba(0,0,0,0.14)';
    } else {
      header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
    }
  }, { passive: true });


  // ─────────────────────────────────────────
  // 5. NAVIGATION ACTIVE AU SCROLL
  // ─────────────────────────────────────────
  const navLinks = document.querySelectorAll('.header-nav a');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--red)'
            : '';
        });
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(s => sectionObserver.observe(s));


  // ─────────────────────────────────────────
  // 6. ANIMATION TIMELINE — barre de progression
  // ─────────────────────────────────────────
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const icon = entry.target.querySelector('.timeline-icon');
        const connector = entry.target.querySelector('.timeline-connector');
        if (icon) {
          icon.style.transform = 'scale(1)';
          icon.style.opacity = '1';
        }
        if (connector) {
          connector.style.height = 'calc(100% + 48px - 56px)';
        }
      }
    });
  }, { threshold: 0.3 });

  // Init icons
  timelineItems.forEach(item => {
    const icon = item.querySelector('.timeline-icon');
    if (icon) {
      icon.style.transform = 'scale(0.5)';
      icon.style.opacity = '0';
      icon.style.transition = 'transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s ease';
    }
    timelineObserver.observe(item);
  });


  // ─────────────────────────────────────────
  // 7. HOVER MICRO-INTERACTION — cartes
  // ─────────────────────────────────────────
  const cards = document.querySelectorAll('.rep-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
    });
  });


  // ─────────────────────────────────────────
  // 8. SMOOTH SCROLL pour les ancres
  // ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
