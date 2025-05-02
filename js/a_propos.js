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
        fill.style.width = percent;
      });
    }
  
    // Animate counters
    const counters = document.querySelectorAll('[data-count]');
    
    function animateCounters() {
      counters.forEach(counter => {
        const target = +counter.dataset.count;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      });
    }
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    // Observe sections
    observer.observe(document.querySelector('.about-skills'));
    observer.observe(document.querySelector('.about-funfacts'));
  
    // 3D effect for profile image
    const imageWrapper = document.querySelector('.image-wrapper');
    
    if (imageWrapper) {
      imageWrapper.addEventListener('mousemove', (e) => {
        const x = e.clientX - imageWrapper.getBoundingClientRect().left;
        const y = e.clientY - imageWrapper.getBoundingClientRect().top;
        const centerX = imageWrapper.offsetWidth / 2;
        const centerY = imageWrapper.offsetHeight / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        imageWrapper.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
      });
      
      imageWrapper.addEventListener('mouseleave', () => {
        imageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    }
  
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        html.toggleAttribute('data-theme');
        const isDark = html.hasAttribute('data-theme');
        darkModeToggle.innerHTML = `<i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>`;
        localStorage.setItem('darkMode', isDark);
      });
      
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'true') {
        html.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    }
  });