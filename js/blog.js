document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library (plus doux)
  AOS.init({
    duration: 400, // Réduit la durée
    easing: 'ease-out', // Animation plus douce
    once: true,
    offset: 50 // Déclenchement plus tôt
  });

  // Initialize theme
  initTheme();

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  // Category filtering (version améliorée)
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  // Ajout des transitions CSS en JS pour plus de contrôle
  blogCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      
      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          // Utilisation de requestAnimationFrame pour une animation plus fluide
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translatex(10)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(0px)';
          // Masquer après l'animation
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Search functionality (optimisé)
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  
  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length < 2) {
      // Réinitialiser l'affichage si recherche trop courte
      blogCards.forEach(card => {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      return;
    }
    
    blogCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
      const category = card.querySelector('.blog-card-category').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // Délai pour éviter les recherches trop fréquentes
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  });
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') performSearch();
  });

  // Reset search when clicking on category
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      searchInput.value = '';
      const activeCategory = document.querySelector('.category-btn.active').dataset.category;
      if (activeCategory === 'all') {
        blogCards.forEach(card => {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }
    });
  });

  // Pagination functionality
  const paginationBtns = document.querySelectorAll('.pagination-btn:not(.next)');
  
  paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      paginationBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Dropdown functionality for mobile (optimisé)
  document.querySelectorAll('.dropdown > button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
        
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
      }
    });
  });

  // Fermer les dropdowns en cliquant ailleurs
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => {
        d.classList.remove('active');
      });
    }
  });
});

// =====================
// THEME FUNCTIONS
// =====================

function detectSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = detectSystemTheme();
  
  applyTheme(savedTheme || systemTheme);
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#dark-mode-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// =====================
// MOBILE MENU FUNCTIONS
// =====================

function toggleMobileMenu() {
  const navContainer = document.querySelector('.nav-container');
  const hamburger = document.querySelector('.hamburger');
  
  hamburger.classList.toggle('active');
  navContainer.classList.toggle('active');
  
  if (navContainer.classList.contains('active')) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile menu when clicking on a link (optimisé)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 992) {
      const navContainer = document.querySelector('.nav-container');
      const hamburger = document.querySelector('.hamburger');
      if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});