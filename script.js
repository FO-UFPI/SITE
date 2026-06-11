document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────
  // 1. SCROLL REVEAL
  // ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));


  // ─────────────────────────────────────────
  // 2. ANIMATION ILLUSTRATION HERO (bulles SVG)
  // ─────────────────────────────────────────
  const svgBulles = document.querySelectorAll('.reveal-svg');

  svgBulles.forEach((el, i) => {
    const delay = parseFloat(el.style.animationDelay || '0');
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 600 + (i * 700));
  });


  // ─────────────────────────────────────────
  // 3. FAQ ACCORDÉON
  // ─────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ─────────────────────────────────────────
  // 4. HEADER — ombre au scroll
  // ─────────────────────────────────────────
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 60
      ? '0 4px 28px rgba(0,0,0,0.10)'
      : '0 2px 12px rgba(0,0,0,0.05)';
  }, { passive: true });


  // ─────────────────────────────────────────
  // 5. NAV ACTIVE AU SCROLL
  // ─────────────────────────────────────────
  const navLinks = document.querySelectorAll('.header-nav a');
  const sections = document.querySelectorAll('section[id]');

  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--red)' : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => secObs.observe(s));


  // ─────────────────────────────────────────
  // 6. HOVER 3D LÉGER sur les cartes d'action
  // ─────────────────────────────────────────
  const actionCards = document.querySelectorAll('.action-card');

  actionCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-5px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.08s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s ease, box-shadow 0.3s ease';
    });
  });


  // ─────────────────────────────────────────
  // 7. SMOOTH SCROLL ancres
  // ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ─────────────────────────────────────────
  // 8. ANIMATION ENTRÉE des rep-row (bordure couleur)
  // ─────────────────────────────────────────
  const repRows = document.querySelectorAll('.rep-row');

  const repObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, delay);
        repObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  repRows.forEach(row => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    repObs.observe(row);
  });

});
