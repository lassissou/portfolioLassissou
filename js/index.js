// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  
    // Initialiser Particles.js
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4361ee" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#4361ee", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  
    // Gestion du mode sombre
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
  
    if (currentTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  
    darkModeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  
    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  
    // Effet de typing
    const typingText = document.querySelector('.typing-text');
    const texts = ["Développeur Full Stack", "Spécialiste Mobile", "Créatif Passionné"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
  
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
  
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause à la fin
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause avant de recommencer
      }
  
      setTimeout(type, typingSpeed);
    }
  
    // Démarrer l'effet après un délai
    setTimeout(type, 1000);
  
    // Compétences
    const skillsData = [
      { name: 'React', level: 90, category: 'front', icon: 'fab fa-react' },
      { name: 'Node.js', level: 85, category: 'back', icon: 'fab fa-node-js' },
      { name: 'Flutter', level: 80, category: 'mobile', icon: 'fas fa-mobile-alt' },
      { name: 'TypeScript', level: 75, category: 'front', icon: 'fas fa-code' },
      { name: 'GraphQL', level: 70, category: 'back', icon: 'fas fa-project-diagram' },
      { name: 'Docker', level: 65, category: 'devops', icon: 'fab fa-docker' },
      { name: 'AWS', level: 60, category: 'devops', icon: 'fab fa-aws' },
      { name: 'Firebase', level: 75, category: 'back', icon: 'fas fa-fire' }
    ];
  
    const skillsGrid = document.querySelector('.skills-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');
  
    function renderSkills(category = 'all') {
      skillsGrid.innerHTML = '';
      const filteredSkills = category === 'all' 
        ? skillsData 
        : skillsData.filter(skill => skill.category === category);
  
      filteredSkills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
          <i class="${skill.icon} skill-icon"></i>
          <h4 class="skill-name">${skill.name}</h4>
          <div class="skill-level">
            <div class="skill-progress" style="width: ${skill.level}%"></div>
          </div>
          <span>${skill.level}%</span>
        `;
        skillsGrid.appendChild(skillCard);
      });
    }
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderSkills(button.dataset.category);
      });
    });
  
    // Projets
    const projectsData = [
      { 
        title: 'Application Météo', 
        category: 'mobile', 
        image: './images/pd4.avif' 
      },
      { 
        title: 'Plateforme E-commerce', 
        category: 'fullstack', 
        image: './images/pd4.avif' 
      },
      { 
        title: 'Dashboard Analytics', 
        category: 'web', 
        image: './images/pd6.jpg' 
      },
      { 
        title: 'Réseau Social', 
        category: 'fullstack', 
        image: './images/ph1.jpg' 
      },
      { 
        title: 'Jeu Mobile', 
        category: 'mobile', 
        image: './images/ph2.avif' 
      },
      { 
        title: 'Site Vitrine', 
        category: 'web', 
        image: './images/logo.jpg' 
      }
    ];
  
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
  
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
              <a href="projet.html" class="btn btn-primary">Détails</a>
              <a href="#" class="btn btn-secondary">Demo</a>
            </div>
          </div>
        `;
        projectsGrid.appendChild(projectCard);
      });
    }
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProjects(button.dataset.filter);
      });
    });
  
    // Blog
    const blogData = [
      {
        title: "Optimisation des performances React",
        excerpt: "Découvrez comment j'ai amélioré les performances d'une application de 40%.",
        category: "Performance",
        date: "15 Mars 2023",
        image: "./images/pc2.jpg"
      },
      {
        title: "Introduction à Flutter",
        excerpt: "Pourquoi j'ai choisi Flutter pour le développement cross-platform.",
        category: "Mobile",
        date: "28 Février 2023",
        image: "./images/ima2.avif"
      },
      {
        title: "Architecture Microservices",
        excerpt: "Comment structurer une application scalable avec Node.js et Docker.",
        category: "Backend",
        date: "10 Janvier 2023",
        image: "./images/logo.jpg"
      }
    ];
  
    const blogGrid = document.querySelector('.blog-grid');
  
    function renderBlog() {
      blogGrid.innerHTML = '';
      blogData.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="blog-img">
          <div class="blog-content">
            <div class="blog-meta">
              <span>${post.date}</span>
              <span class="blog-category">${post.category}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="#" class="blog-link">
              Lire l'article <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        `;
        blogGrid.appendChild(blogCard);
      });
    }
  
    // Témoignages
    const testimonialData = [
      {
        name: "Marie Dupont",
        role: "CEO @Startup",
        text: "Le travail accompli a dépassé nos attentes. Livraison avant la deadline avec une qualité exceptionnelle.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5
      },
      {
        name: "Jean Martin",
        role: "CTO @TechCorp",
        text: "Développeur extrêmement compétent et professionnel. Je recommande sans hésitation.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4
      },
      {
        name: "Sophie Leroy",
        role: "Product Manager",
        text: "Collaboration fluide et résultats impressionnants. Nous retravaillerons ensemble avec plaisir.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5
      }
    ];
  
    const testimonialTrack = document.querySelector('.testimonial-track');
    const carouselDots = document.querySelector('.carousel-dots');
    let currentSlide = 0;
  
    function renderTestimonials() {
      testimonialTrack.innerHTML = '';
      carouselDots.innerHTML = '';
      
      testimonialData.forEach((testimonial, index) => {
        // Créer le slide
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.innerHTML = `
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="client-avatar">
          <div class="client-rating">
            ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
          </div>
          <p class="client-testimonial">"${testimonial.text}"</p>
          <h4 class="client-name">${testimonial.name}</h4>
          <p class="client-role">${testimonial.role}</p>
        `;
        testimonialTrack.appendChild(slide);
  
        // Créer les dots
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
      });
    }
  
    function goToSlide(index) {
      currentSlide = index;
      testimonialTrack.scrollTo({
        left: testimonialTrack.clientWidth * index,
        behavior: 'smooth'
      });
      updateDots();
    }
  
    function updateDots() {
      document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
  
    document.querySelector('.carousel-next').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonialData.length;
      goToSlide(currentSlide);
    });
  
    document.querySelector('.carousel-prev').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + testimonialData.length) % testimonialData.length;
      goToSlide(currentSlide);
    });
  
    // Initialiser le carousel
    testimonialTrack.addEventListener('scroll', () => {
      const slideWidth = testimonialTrack.clientWidth;
      currentSlide = Math.round(testimonialTrack.scrollLeft / slideWidth);
      updateDots();
    });
  
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Rendre les éléments initiaux
    renderSkills();
    renderProjects();
    renderBlog();
    renderTestimonials();
  });
  // Ajoutez ceci à votre fichier JS
document.querySelectorAll('.blog-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
  });
});