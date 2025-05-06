document.addEventListener('DOMContentLoaded', function() {
  // Gestion du thème automatique
  initTheme();

  // Gestion du menu hamburger
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownButtons = document.querySelectorAll('.dropdown > button');

  // Fonction pour basculer le menu mobile
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    
    // Gérer le défilement de la page
    if (navContainer.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
      // Fermer tous les sous-menus quand le menu principal s'ouvre
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    } else {
      document.body.style.overflow = '';
    }
  }

  // Fonction pour fermer le menu mobile
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navContainer.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Écouteur pour le bouton hamburger
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Fermer le menu quand on clique sur un lien
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 992) {
        closeMobileMenu();
      }
    });
  });

  // Gestion des sous-menus dropdown
  dropdownButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Empêcher le comportement par défaut seulement sur mobile
      if (window.innerWidth <= 992) {
        e.preventDefault();
      }
      
      const dropdown = this.parentElement;
      const isActive = dropdown.classList.contains('active');

      // Fermer tous les autres dropdowns
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });

      // Basculer l'état du dropdown actuel
      dropdown.classList.toggle('active', !isActive);
    });
  });

  // Fermer les dropdowns quand on clique ailleurs
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown') && window.innerWidth <= 992) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Gestion du changement de thème
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
});

/* ===================== */
/* GESTION DU THÈME */
/* ===================== */

// Détecter le thème du système
function detectSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Appliquer le thème
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

// Initialiser le thème
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = detectSystemTheme();
  
  // Appliquer le thème sauvegardé ou le thème système
  applyTheme(savedTheme || systemTheme);
  
  // Surveiller les changements de thème système
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Basculer entre les thèmes
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Mettre à jour l'icône du thème
function updateThemeIcon(theme) {
  const icon = document.querySelector('#dark-mode-toggle i');
  if (icon) {
    icon.classList.remove(theme === 'dark' ? 'fa-moon' : 'fa-sun');
    icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
  }
}