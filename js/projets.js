// Données des projets enrichies
const projectsData = [
    { 
      title: 'Application Météo', 
      category: 'mobile', 
      image: './images/pd4.avif',
      description: 'Application mobile de prévisions météo en temps réel avec notifications push pour les alertes météo. Intègre des données de plusieurs sources et une interface utilisateur intuitive.',
      date: 'Janvier 2023',
      client: 'Client Privé',
      link: 'https://meteo-exemple.com',
      github: 'https://github.com/user/meteo-app',
      technologies: ['React Native', 'Redux', 'API REST', 'Firebase'],
      demo: 'https://demo.meteo-exemple.com'
    },
    { 
      title: 'Plateforme E-commerce', 
      category: 'fullstack', 
      image: './images/pd4.avif',
      description: 'Plateforme complète de e-commerce avec système de paiement, gestion de stocks, tableau de bord admin et recommandations personnalisées.',
      date: 'Mars 2023',
      client: 'Fashion Store',
      link: 'https://fashion-store-exemple.com',
      github: 'https://github.com/user/ecommerce-platform',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      demo: 'https://demo.fashion-store.com'
    },
    // ... (ajoutez les autres projets avec les mêmes détails)
  ];
  
  const projectsGrid = document.querySelector('.projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectModal = document.getElementById('projectModal');
  const closeModal = document.querySelector('.close-modal');
  
  function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    const filteredProjects = filter === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === filter);
  
    filteredProjects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-img">
        <div class="project-overlay">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category}</p>
          <div class="project-links">
            <button class="btn btn-primary view-details" data-project-id="${projectsData.indexOf(project)}">Détails</button>
            <a href="${project.demo}" target="_blank" class="btn btn-secondary">Demo</a>
          </div>
        </div>
      `;
      projectsGrid.appendChild(projectCard);
    });
  
    // Ajouter les événements pour les boutons de détails
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project-id');
        openProjectModal(projectId);
      });
    });
  }
  
  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    
    // Remplir le modal avec les données du projet
    document.getElementById('modalProjectImage').src = project.image;
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectCategory').textContent = project.category;
    document.getElementById('modalProjectDescription').textContent = project.description;
    document.getElementById('modalProjectDate').textContent = project.date;
    document.getElementById('modalProjectClient').textContent = project.client;
    document.getElementById('modalProjectLink').href = project.link;
    document.getElementById('liveDemoBtn').href = project.demo;
    document.getElementById('githubBtn').href = project.github;
    
    // Afficher les technologies
    const techTagsContainer = document.getElementById('techTags');
    techTagsContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      techTagsContainer.appendChild(tag);
    });
    
    // Afficher le modal
    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  // Fermer le modal
  closeModal.addEventListener('click', () => {
    projectModal.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  // Fermer quand on clique en dehors
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  // Filtres
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderProjects(button.dataset.filter);
    });
  });
  
  // Initialisation
  renderProjects();