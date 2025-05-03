document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Initialize syntax highlighting
  hljs.highlightAll();

  // Comment reply functionality
  const replyButtons = document.querySelectorAll('.comment-reply');
  
  replyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const comment = this.closest('.comment');
      const commentForm = document.querySelector('.comment-form');
      const commentAuthor = comment.querySelector('h4').textContent;
      
      comment.insertAdjacentElement('afterend', commentForm);
      
      const textarea = commentForm.querySelector('textarea');
      textarea.placeholder = `Réponse à ${commentAuthor}...`;
      textarea.focus();
      
      commentForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Mobile dropdown functionality
  document.querySelectorAll('.dropdown > button').forEach(button => {
    button.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = this.closest('.dropdown');
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    }
  });
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
  
  // Toggle body scroll when menu is open
  if (navContainer.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
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

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 992) {
      const hamburger = document.querySelector('.hamburger');
      const navContainer = document.querySelector('.nav-container');
      hamburger.classList.remove('active');
      navContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});