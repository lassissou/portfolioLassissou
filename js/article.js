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
      button.addEventListener('click', function() {
        const comment = this.closest('.comment');
        const commentForm = document.querySelector('.comment-form');
        const commentAuthor = comment.querySelector('h4').textContent;
        
        // Move the form after the comment
        comment.insertAdjacentElement('afterend', commentForm);
        
        // Update textarea placeholder
        const textarea = commentForm.querySelector('textarea');
        textarea.placeholder = `Réponse à ${commentAuthor}...`;
        textarea.focus();
        
        // Smooth scroll to the form
        commentForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  