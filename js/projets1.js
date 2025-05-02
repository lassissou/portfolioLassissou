document.addEventListener('DOMContentLoaded', function() {
    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) rotateX(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) rotateX(30deg)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Pagination
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('active')) return;
        
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Here you would typically load new content
        // For demo purposes, we'll just animate the existing cards
        projectCards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transitionDelay = `${index * 0.1}s`;
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 300 + index * 100);
        });
      });
    });
    
    // Dark mode toggle (if not already in main.js)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    
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
  });