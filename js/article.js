document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des animations AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // Highlight.js pour les blocs de code
  hljs.highlightAll();

  // Gestion du thème sombre/clair
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;
  const themeKey = 'portfolio-theme';

  // Fonction pour appliquer le thème
  function applyTheme(isDark) {
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.setAttribute('aria-label', 'Passer en mode clair');
    } else {
      html.removeAttribute('data-theme');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      darkModeToggle.setAttribute('aria-label', 'Passer en mode sombre');
    }
    localStorage.setItem(themeKey, isDark ? 'dark' : 'light');
  }

  // Vérification du thème sauvegardé ou de la préférence système
  const savedTheme = localStorage.getItem(themeKey);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    applyTheme(true);
  }

  // Gestion du clic sur le toggle
  darkModeToggle.addEventListener('click', () => {
    const isDark = !html.hasAttribute('data-theme');
    applyTheme(isDark);
  });

  // Gestion du menu hamburger
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navContainer = document.querySelector('.nav-container');

  hamburger.addEventListener('click', function() {
    // Basculer l'état du menu
    this.classList.toggle('active');
    navContainer.classList.toggle('active');
    
    // Forcer le style noir sur blanc pour le sous-menu mobile
    if (navContainer.classList.contains('active')) {
      navLinks.style.backgroundColor = '#fff';
      navLinks.style.color = '#000';
      
      // Appliquer le style aux liens
      const mobileLinks = navLinks.querySelectorAll('.nav-link');
      mobileLinks.forEach(link => {
        link.style.color = '#000';
      });
      
      // Style spécifique pour le dropdown mobile
      const dropdownContent = document.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.style.backgroundColor = '#fff';
        dropdownContent.style.color = '#000';
        dropdownContent.querySelectorAll('a').forEach(a => {
          a.style.color = '#000';
        });
      }
    } else {
      // Réinitialiser les styles quand le menu est fermé
      navLinks.style.backgroundColor = '';
      navLinks.style.color = '';
      
      const mobileLinks = navLinks.querySelectorAll('.nav-link');
      mobileLinks.forEach(link => {
        link.style.color = '';
      });
      
      const dropdownContent = document.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.style.backgroundColor = '';
        dropdownContent.style.color = '';
        dropdownContent.querySelectorAll('a').forEach(a => {
          a.style.color = '';
        });
      }
    }
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navContainer.classList.remove('active');
    });
  });

  // Gestion du dropdown CV
  const dropdownBtn = document.querySelector('.btn-download');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Fermer le dropdown quand on clique ailleurs
    document.addEventListener('click', () => {
      dropdownContent.style.display = 'none';
    });
  }
});