document.addEventListener('DOMContentLoaded', () => {
  
  const starsContainer = document.querySelector('.stars');
  const starCount = 150;

  function createStars() {
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 6;
      const duration = Math.random() * 10 + 15;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;
      
      starsContainer.appendChild(star);
    }
  }
  createStars();

  function spawnMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    const startX = Math.random() * window.innerWidth + 200;
    const startY = Math.random() * -200;
    
    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;
    
    document.body.appendChild(meteor);
    
    setTimeout(() => meteor.remove(), 2000);
  }

  setInterval(spawnMeteor, 4000);
  setTimeout(spawnMeteor, 1000);

  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  const revealElements = document.querySelectorAll(
    '.card, .dash-card, .content-section, .section-header, .punchline, .future-section'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  const dashValues = document.querySelectorAll('.dash-value');
  const dashFills = document.querySelectorAll('.dash-fill');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          
          const current = target * easeProgress;
          
          if (isDecimal) {
            el.textContent = current.toFixed(1);
          } else {
            el.textContent = Math.floor(current).toLocaleString();
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            if (isDecimal) {
              el.textContent = target.toFixed(1);
            } else {
              el.textContent = target.toLocaleString();
            }
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  dashValues.forEach(el => counterObserver.observe(el));

  // Animate progress bars
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = width;
        }, 300);
        fillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  dashFills.forEach(el => fillObserver.observe(el));

  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // navbar height
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const aurora = document.querySelector('.aurora');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    aurora.style.transform = `translateY(${scrolled * 0.3}px)`;
  });

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.style.opacity = '1';
  }

  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const dustContainer = document.querySelector('.dust');
  
  function createDust() {
    for (let i = 0; i < 30; i++) {
      const dust = document.createElement('div');
      dust.style.position = 'absolute';
      dust.style.width = `${Math.random() * 3 + 1}px`;
      dust.style.height = dust.style.width;
      dust.style.background = 'rgba(255, 255, 255, 0.3)';
      dust.style.borderRadius = '50%';
      dust.style.left = `${Math.random() * 100}%`;
      dust.style.top = `${Math.random() * 100}%`;
      dust.style.pointerEvents = 'none';
      dust.style.animation = `drift ${Math.random() * 20 + 20}s linear infinite`;
      dust.style.animationDelay = `${Math.random() * 10}s`;
      dustContainer.appendChild(dust);
    }
  }
  createDust();

});
