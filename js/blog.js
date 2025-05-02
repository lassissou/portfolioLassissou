document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Category filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const category = this.dataset.category;
      
      // Filter blog cards
      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.length < 2) return;
    
    blogCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
      const category = card.querySelector('.blog-card-category').textContent.toLowerCase();
      
      if (title.includes(searchTerm)) {
        card.style.display = 'flex';
      } else if (excerpt.includes(searchTerm)) {
        card.style.display = 'flex';
      } else if (category.includes(searchTerm)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
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
      // In a real implementation, you would load the corresponding page here
    });
  });

  // Dark mode toggle (shared with other pages)
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  // Mobile menu toggle (shared with other pages)
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
});

// Shared functions
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = this.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('darkMode', 'disabled');
  }
}

function toggleMobileMenu() {
  const navContainer = document.querySelector('.nav-container');
  this.classList.toggle('active');
  navContainer.classList.toggle('active');
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  const icon = document.querySelector('#dark-mode-toggle i');
  if (icon) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}