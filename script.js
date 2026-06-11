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
  // 2. BULLES ANIMÉES — apparition progressive
  // ─────────────────────────────────────────
  const bubbles = document.querySelectorAll('.bubble');

  bubbles.forEach((bubble, i) => {
    setTimeout(() => {
      bubble.style.opacity = '1';
      bubble.style.transition = 'opacity 0.5s ease';
    }, 300 + i * 250);
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
  // 4. MODALE BUREAU
  // ─────────────────────────────────────────
  const members = [
    {
      name: 'Prénom Nom',
      role: 'Secrétaire Général',
      email: 'prenom.nom@fo-energie.fr',
      phone: '06 XX XX XX XX',
      bio: 'Texte de présentation à compléter. Décrivez ici le parcours, les missions et l\'engagement de ce membre du bureau au sein de FO Énergie UFPI.'
    },
    {
      name: 'Prénom Nom',
      role: 'Secrétaire Général Adjoint',
      email: 'prenom.nom@fo-energie.fr',
      phone: '06 XX XX XX XX',
      bio: 'Texte de présentation à compléter. Décrivez ici le parcours, les missions et l\'engagement de ce membre du bureau au sein de FO Énergie UFPI.'
    },
    {
      name: 'Prénom Nom',
      role: 'Trésorier',
      email: 'prenom.nom@fo-energie.fr',
      phone: '06 XX XX XX XX',
      bio: 'Texte de présentation à compléter. Décrivez ici le parcours, les missions et l\'engagement de ce membre du bureau au sein de FO Énergie UFPI.'
    },
    {
      name: 'Prénom Nom',
      role: 'Secrétaire',
      email: 'prenom.nom@fo-energie.fr',
      phone: '06 XX XX XX XX',
      bio: 'Texte de présentation à compléter. Décrivez ici le parcours, les missions et l\'engagement de ce membre du bureau au sein de FO Énergie UFPI.'
    }
  ];

  const overlay   = document.getElementById('modalOverlay');
  const closeBtn  = document.getElementById('modalClose');
  const modalName  = document.getElementById('modalName');
  const modalRole  = document.getElementById('modalRole');
  const modalBio   = document.getElementById('modalBio');
  const modalEmail = document.getElementById('modalEmail');
  const modalEmailText = document.getElementById('modalEmailText');
  const modalPhone = document.getElementById('modalPhone');
  const modalPhoneText = document.getElementById('modalPhoneText');

  function openModal(index) {
    const m = members[index];
    modalName.textContent       = m.name;
    modalRole.textContent       = m.role;
    modalBio.textContent        = m.bio;
    modalEmailText.textContent  = m.email;
    modalPhoneText.textContent  = m.phone;
    modalEmail.href = 'mailto:' + m.email;
    modalPhone.href = 'tel:' + m.phone.replace(/\s/g, '');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Clic sur les cartes bureau
  document.querySelectorAll('.bureau-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.member);
      openModal(idx);
    });
    // Accessibilité clavier
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.dataset.member);
        openModal(idx);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // ─────────────────────────────────────────
  // 5. HEADER — ombre au scroll
  // ─────────────────────────────────────────
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 60
      ? '0 4px 28px rgba(0,0,0,0.10)'
      : '0 2px 12px rgba(0,0,0,0.05)';
  }, { passive: true });


  // ─────────────────────────────────────────
  // 6. NAV ACTIVE AU SCROLL
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
  }, { threshold: 0.4 });

  sections.forEach(s => secObs.observe(s));


  // ─────────────────────────────────────────
  // 7. HOVER 3D LÉGER sur les cartes d'action
  // ─────────────────────────────────────────
  document.querySelectorAll('.action-card').forEach(card => {
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
  // 8. ANIMATION ENTRÉE des rep-row
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


  // ─────────────────────────────────────────
  // 9. SMOOTH SCROLL ancres
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

});
