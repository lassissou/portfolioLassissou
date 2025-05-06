document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // Animate progress bars
  const progressItems = document.querySelectorAll('.progress-item');
  
  function animateProgressBars() {
    progressItems.forEach(item => {
      const fill = item.querySelector('.progress-fill');
      const percent = item.querySelector('span').textContent;
      fill.style.width = '0'; // Reset to 0 before animating
      
      setTimeout(() => {
        fill.style.width = percent;
        fill.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
      }, 100);
    });
  }

  // Improved counter animation with easing
  const counters = document.querySelectorAll('[data-count]');
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.dataset.count;
      const duration = 2000;
      let start = null;
      
      const easeOutQuad = (t) => t * (2 - t);
      
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const value = Math.floor(easedProgress * target);
        
        counter.textContent = value.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    });
  }

  // Intersection Observer with better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('about-skills')) {
          animateProgressBars();
        }
        if (entry.target.classList.contains('about-funfacts')) {
          animateCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe sections
  const skillsSection = document.querySelector('.about-skills');
  const funfactsSection = document.querySelector('.about-funfacts');
  
  if (skillsSection) observer.observe(skillsSection);
  if (funfactsSection) observer.observe(funfactsSection);

  // Enhanced 3D effect with GSAP-like easing
  const imageWrapper = document.querySelector('.image-wrapper');
  
  if (imageWrapper) {
    let animationFrame;
    
    const handleMove = (e) => {
      cancelAnimationFrame(animationFrame);
      
      animationFrame = requestAnimationFrame(() => {
        const rect = imageWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 25;
        const angleY = (centerX - x) / 25;
        
        imageWrapper.style.transform = `
          perspective(1000px) 
          rotateX(${angleX}deg) 
          rotateY(${angleY}deg) 
          scale(1.03)
        `;
        imageWrapper.style.transition = 'transform 0.1s ease-out';
      });
    };
    
    const handleLeave = () => {
      cancelAnimationFrame(animationFrame);
      imageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      imageWrapper.style.transition = 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    };
    
    imageWrapper.addEventListener('mousemove', handleMove);
    imageWrapper.addEventListener('mouseleave', handleLeave);
  }

  // Enhanced Theme Toggler with smooth transitions
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;
  
  if (darkModeToggle) {
    // Disable transitions during initial load
    html.classList.add('no-transition');
    
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      html.setAttribute('data-theme', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.setAttribute('aria-label', 'Passer en mode clair');
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      darkModeToggle.setAttribute('aria-label', 'Passer en mode sombre');
    }
    
    // Re-enable transitions after load
    setTimeout(() => {
      html.classList.remove('no-transition');
    }, 100);
    
    // Toggle theme with smooth transition
    darkModeToggle.addEventListener('click', () => {
      // Start transition
      html.style.transition = 'background-color 0.5s ease, color 0.3s ease';
      
      if (html.hasAttribute('data-theme')) {
        html.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('aria-label', 'Passer en mode sombre');
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.setAttribute('aria-label', 'Passer en mode clair');
        localStorage.setItem('theme', 'dark');
      }
      
      // Remove transition after animation completes
      setTimeout(() => {
        html.style.transition = '';
      }, 500);
    });
  }
});

