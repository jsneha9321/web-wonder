// page loader
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => { loader.classList.add('loaded'); }, 900);
  });

  // offer popup
  const offerOverlay = document.getElementById('offerOverlay');
  const offerClose = document.getElementById('offerClose');
  const offerDismiss = document.getElementById('offerDismiss');
  const offerCta = document.getElementById('offerCta');
  let offerShown = false;
  function showOffer(){
    if (offerShown) return;
    offerShown = true;
    offerOverlay.classList.add('show');
  }
  function hideOffer(){
    offerOverlay.classList.remove('show');
  }
  window.addEventListener('load', () => { setTimeout(showOffer, 4000); });
  offerClose.addEventListener('click', hideOffer);
  offerDismiss.addEventListener('click', hideOffer);
  offerCta.addEventListener('click', hideOffer);
  offerOverlay.addEventListener('click', (e) => { if (e.target === offerOverlay) hideOffer(); });

  // sticky header shadow
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // mobile menu
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // scroll progress bar
  const progress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  });

  // cursor glow (desktop / fine-pointer only)
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.opacity = '1';
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
    window.addEventListener('mouseleave', () => glow.style.opacity = '0');
  }

  // active nav link highlight
  const sections = ['about','services','work','pricing','testimonials','contact'];
  const navAnchors = document.querySelectorAll('#navLinks a');
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {threshold:0.4});
  sections.forEach(id => { const el = document.getElementById(id); if (el) sectionIO.observe(el); });

  // subtle 3D tilt on service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
