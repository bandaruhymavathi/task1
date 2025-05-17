document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                preloader.style.display = 'none';
            }
        });
    });

    // Navigation
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Hero section animations
    const heroTitleLines = document.querySelectorAll('.title-line');
    
    heroTitleLines.forEach((line, index) => {
        gsap.from(line, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out"
        });
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
    });
    
    gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.hero-scroll', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: "power3.out"
    });

    // Scroll animations with ScrollTrigger
    gsap.utils.toArray('section').forEach(section => {
        if (section.id !== 'home') {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    });
    
    // Animate skill bars on scroll
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        ScrollTrigger.create({
            trigger: bar,
            start: "top 80%",
            onEnter: () => {
                gsap.to(bar, {
                    width: width + '%',
                    duration: 1.5,
                    ease: "power3.out"
                });
            }
        });
    });

    // Work filter
    // Work filter - Modified version without images
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = [
        {
            title: "E-commerce Platform",
            category: "web",
            description: "Developed a full-stack e-commerce solution with React and Node.js",
            tags: ["React", "Node.js", "MongoDB", "Redux"]
        },
        {
            title: "Mobile Fitness App",
            category: "app",
            description: "Designed and built a cross-platform fitness tracking application",
            tags: ["React Native", "Firebase", "UI Design"]
        },
        {
            title: "Corporate Branding",
            category: "branding",
            description: "Created comprehensive brand identity for tech startup",
            tags: ["Logo Design", "Style Guide", "Brand Strategy"]
        },
        {
            title: "Analytics Dashboard",
            category: "web",
            description: "Interactive data visualization dashboard for business metrics",
            tags: ["D3.js", "Express", "Chart.js"]
        },
        {
            title: "Travel Planner App",
            category: "app",
            description: "Mobile application for itinerary planning and travel organization",
            tags: ["Flutter", "Google Maps API", "Firestore"]
        },
        {
            title: "Product Packaging",
            category: "branding",
            description: "Packaging design system for organic skincare line",
            tags: ["Packaging", "Illustration", "Typography"]
        }
    ];
    
    const workGrid = document.querySelector('.work-grid');
    
    function renderProjects(filter = 'all') {
        workGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projectItems 
            : projectItems.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = `project-item ${project.category}`;
            
            // Create tags HTML
            const tagsHTML = project.tags.map(tag => 
                `<span class="project-tag">${tag}</span>`
            ).join('');
            
            projectItem.innerHTML = `
                <div class="project-content">
                    <h4 class="project-title">${project.title}</h4>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">${tagsHTML}</div>
                    <div class="project-category">${project.category}</div>
                </div>
            `;
            
            workGrid.appendChild(projectItem);
            
            // GSAP animation for hover effect
            projectItem.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(this.querySelector('.project-title'), {
                    color: 'var(--primary-color)',
                    duration: 0.3
                });
            });
            
            projectItem.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(this.querySelector('.project-title'), {
                    color: 'var(--dark-color)',
                    duration: 0.3
                });
            });
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
    
    // Initial render
    renderProjects();

    // Three.js Background Animation
    const canvasContainer = document.getElementById('canvas-container');
    
    if (canvasContainer) {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasContainer.appendChild(renderer.domElement);

        // Camera position
        camera.position.z = 5;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;

        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3)
        );

        // Particle material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x6c5ce7,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Create particle system
        const particlesMesh = new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );
        scene.add(particlesMesh);

        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate particles
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;

            // Mouse interaction
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    }

    // Three.js Skills Sphere
    const skillsSphere = document.getElementById('skills-sphere');
    
    if (skillsSphere) {
        // Scene setup
        const sphereScene = new THREE.Scene();
        const sphereCamera = new THREE.PerspectiveCamera(
            75,
            skillsSphere.clientWidth / skillsSphere.clientHeight,
            0.1,
            1000
        );
        const sphereRenderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        sphereRenderer.setSize(skillsSphere.clientWidth, skillsSphere.clientHeight);
        skillsSphere.appendChild(sphereRenderer.domElement);

        // Camera position
        sphereCamera.position.z = 5;

        // Create sphere
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6c5ce7,
            transparent: true,
            opacity: 0.8,
            wireframe: true,
            shininess: 100
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphereScene.add(sphere);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        sphereScene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        sphereScene.add(pointLight);

        // Animation loop
        function animateSphere() {
            requestAnimationFrame(animateSphere);

            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.005;

            sphereRenderer.render(sphereScene, sphereCamera);
        }

        // Handle container resize
        const resizeObserver = new ResizeObserver(() => {
            sphereCamera.aspect = skillsSphere.clientWidth / skillsSphere.clientHeight;
            sphereCamera.updateProjectionMatrix();
            sphereRenderer.setSize(skillsSphere.clientWidth, skillsSphere.clientHeight);
        });

        resizeObserver.observe(skillsSphere);

        animateSphere();
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#00b894';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 2000);
        });
    }
});