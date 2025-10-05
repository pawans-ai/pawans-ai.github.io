/**
 * Main 3D Experience Controller
 * Manages scenes, camera, scroll interactions
 */

class Experience3D {
  constructor() {
    this.canvas = document.getElementById('canvas3d');
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingProgress = document.getElementById('loading-progress');
    this.sceneTitle = document.getElementById('scene-title');
    this.infoPanel = document.getElementById('info-panel');
    this.scrollHint = document.getElementById('scroll-hint');
    
    // Scene data
    this.scenes = [
      { name: 'WELCOME', title: 'Pawan Sharma', subtitle: 'Versatile Accountant | Tax Pro | Emerging CFO Leader' },
      { name: 'SKILLS', title: 'Software Proficiency', subtitle: 'Expert in 21+ financial tools' },
      { name: 'PROJECTS', title: 'My Work', subtitle: 'Innovative solutions & automation' },
      { name: 'EXPERIENCE', title: 'Career Journey', subtitle: '5+ years of excellence' },
      { name: 'CONTACT', title: 'Let\'s Connect', subtitle: 'Ready to collaborate' }
    ];
    
    this.currentScene = 0;
    this.scrollProgress = 0;
    
    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupCamera();
    this.setupLights();
    this.createScenes();
    this.setupEventListeners();
    this.startLoadingSequence();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 1);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15);
  }

  setupLights() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    
    // Key light
    this.keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.keyLight.position.set(5, 5, 5);
    
    // Rim light for depth
    this.rimLight = new THREE.DirectionalLight(0x39a0ff, 0.5);
    this.rimLight.position.set(-5, -3, -5);
  }

  createScenes() {
    // Initialize all 5 scenes
    this.sceneObjects = {
      intro: this.createIntroScene(),
      skills: this.createSkillsScene(),
      projects: this.createProjectsScene(),
      experience: this.createExperienceScene(),
      contact: this.createContactScene()
    };
  }

  createIntroScene() {
    const scene = new THREE.Scene();
    scene.add(this.ambientLight.clone());
    scene.add(this.keyLight.clone());
    scene.add(this.rimLight.clone());

    // Starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    scene.userData.stars = stars;

    // 3D Text (name) - using simple geometry for now
    const nameGroup = new THREE.Group();
    
    // Create glowing spheres to represent name (placeholder for 3D text)
    const letterMaterial = new THREE.MeshStandardMaterial({
      color: 0x39a0ff,
      emissive: 0x39a0ff,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    });

    for (let i = 0; i < 12; i++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        letterMaterial.clone()
      );
      sphere.position.x = (i - 5.5) * 1.2;
      sphere.position.y = 0;
      sphere.position.z = 0;
      sphere.userData.originalY = 0;
      sphere.userData.delay = i * 0.1;
      nameGroup.add(sphere);
    }
    
    nameGroup.position.z = -5;
    scene.add(nameGroup);
    scene.userData.nameGroup = nameGroup;

    return scene;
  }

  createSkillsScene() {
    const scene = new THREE.Scene();
    scene.add(this.ambientLight.clone());
    scene.add(this.keyLight.clone());
    scene.add(this.rimLight.clone());

    // Central sphere
    const centralSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x39a0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })
    );
    scene.add(centralSphere);
    scene.userData.centralSphere = centralSphere;

    // Orbiting skills (logos will be textured planes)
    const skillsGroup = new THREE.Group();
    const skillCount = 21; // Your 21 software logos
    
    for (let i = 0; i < skillCount; i++) {
      const angle = (i / skillCount) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      
      // Placeholder colored plane (replace with logo textures later)
      const skillPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 0.8),
        new THREE.MeshStandardMaterial({
          color: Math.random() * 0xffffff,
          side: THREE.DoubleSide,
          emissive: 0x39a0ff,
          emissiveIntensity: 0.2
        })
      );
      
      skillPlane.position.x = Math.cos(angle) * radius;
      skillPlane.position.z = Math.sin(angle) * radius;
      skillPlane.position.y = (Math.random() - 0.5) * 3;
      
      skillPlane.userData = {
        angle: angle,
        radius: radius,
        speed: 0.3 + Math.random() * 0.3,
        verticalOffset: skillPlane.position.y
      };
      
      skillsGroup.add(skillPlane);
    }
    
    scene.add(skillsGroup);
    scene.userData.skillsGroup = skillsGroup;

    return scene;
  }

  createProjectsScene() {
    const scene = new THREE.Scene();
    scene.add(this.ambientLight.clone());
    scene.add(this.keyLight.clone());
    scene.add(this.rimLight.clone());

    // Project cards (floating screens)
    const projectsGroup = new THREE.Group();
    const projectCount = 3;
    
    for (let i = 0; i < projectCount; i++) {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 2),
        new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          emissive: 0x39a0ff,
          emissiveIntensity: 0.1,
          side: THREE.DoubleSide
        })
      );
      
      card.position.x = (i - 1) * 4;
      card.position.y = 0;
      card.position.z = 0;
      
      // Add border glow
      const border = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 2.2),
        new THREE.MeshBasicMaterial({
          color: 0x39a0ff,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        })
      );
      border.position.z = -0.01;
      card.add(border);
      
      card.userData.index = i;
      projectsGroup.add(card);
    }
    
    scene.add(projectsGroup);
    scene.userData.projectsGroup = projectsGroup;

    return scene;
  }

  createExperienceScene() {
    const scene = new THREE.Scene();
    scene.add(this.ambientLight.clone());
    scene.add(this.keyLight.clone());
    scene.add(this.rimLight.clone());

    // Timeline path
    const timelinePath = new THREE.Group();
    const milestones = 5;
    
    // Create path line
    const pathPoints = [];
    for (let i = 0; i < milestones; i++) {
      pathPoints.push(new THREE.Vector3(
        (i - 2) * 3,
        Math.sin(i * 0.8) * 1.5,
        0
      ));
    }
    
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMaterial = new THREE.LineBasicMaterial({
      color: 0x39a0ff,
      linewidth: 2
    });
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);
    timelinePath.add(pathLine);
    
    // Add milestone nodes
    pathPoints.forEach((point, i) => {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshStandardMaterial({
          color: 0x39a0ff,
          emissive: 0x39a0ff,
          emissiveIntensity: 0.5
        })
      );
      node.position.copy(point);
      timelinePath.add(node);
    });
    
    scene.add(timelinePath);
    scene.userData.timelinePath = timelinePath;

    return scene;
  }

  createContactScene() {
    const scene = new THREE.Scene();
    scene.add(this.ambientLight.clone());
    scene.add(this.keyLight.clone());
    scene.add(this.rimLight.clone());

    // Portal/Gateway effect
    const portal = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.3, 32, 100),
      new THREE.MeshStandardMaterial({
        color: 0x39a0ff,
        emissive: 0x39a0ff,
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.2
      })
    );
    portal.rotation.x = Math.PI / 2;
    scene.add(portal);
    scene.userData.portal = portal;

    // Floating contact orbs
    const contactGroup = new THREE.Group();
    const contactMethods = ['Email', 'LinkedIn', 'Phone'];
    
    contactMethods.forEach((method, i) => {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0x39a0ff,
          emissiveIntensity: 0.3,
          metalness: 0.8,
          roughness: 0.2
        })
      );
      
      const angle = (i / contactMethods.length) * Math.PI * 2;
      orb.position.x = Math.cos(angle) * 5;
      orb.position.z = Math.sin(angle) * 5;
      orb.userData.angle = angle;
      
      contactGroup.add(orb);
    });
    
    scene.add(contactGroup);
    scene.userData.contactGroup = contactGroup;

    return scene;
  }

  startLoadingSequence() {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        setTimeout(() => this.finishLoading(), 500);
      }
      this.loadingProgress.textContent = Math.floor(progress) + '%';
    }, 100);
  }

  finishLoading() {
    this.loadingScreen.classList.add('hidden');
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
    }, 800);
    
    this.showSceneTitle(0);
    this.animate();
  }

  setupEventListeners() {
    // Scroll
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    
    // Resize
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    
    // Navigation dots
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
      dot.addEventListener('click', () => this.scrollToScene(index));
    });
  }

  onScroll() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.getElementById('scroll-container').offsetHeight - window.innerHeight;
    this.scrollProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
    
    // Determine current scene (0-4)
    const newScene = Math.floor(this.scrollProgress * 5);
    if (newScene !== this.currentScene && newScene < 5) {
      this.currentScene = newScene;
      this.onSceneChange(newScene);
    }
    
    // Hide scroll hint after first scroll
    if (scrollTop > 50 && this.scrollHint.style.display !== 'none') {
      gsap.to(this.scrollHint, { opacity: 0, duration: 0.3, onComplete: () => {
        this.scrollHint.style.display = 'none';
      }});
    }
    
    this.updateCamera();
  }

  onSceneChange(sceneIndex) {
    this.showSceneTitle(sceneIndex);
    this.updateNavigationDots(sceneIndex);
  }

  showSceneTitle(sceneIndex) {
    const scene = this.scenes[sceneIndex];
    this.sceneTitle.textContent = scene.title;
    this.sceneTitle.classList.add('visible');
    
    setTimeout(() => {
      this.sceneTitle.classList.remove('visible');
    }, 2000);
  }

  updateNavigationDots(sceneIndex) {
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === sceneIndex);
    });
  }

  scrollToScene(sceneIndex) {
    const scrollHeight = document.getElementById('scroll-container').offsetHeight - window.innerHeight;
    const targetScroll = (sceneIndex / 5) * scrollHeight;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }

  updateCamera() {
    // Camera movement based on scroll
    const t = this.scrollProgress * 4; // 0 to 4 (5 scenes)
    
    // Different camera positions for each scene
    if (t < 1) {
      // Scene 0: Intro - fly forward
      this.camera.position.z = 15 - t * 10;
      this.camera.position.y = 0;
    } else if (t < 2) {
      // Scene 1: Skills - orbit around
      const angle = (t - 1) * Math.PI * 0.5;
      this.camera.position.x = Math.sin(angle) * 8;
      this.camera.position.z = Math.cos(angle) * 8;
      this.camera.position.y = 2;
    } else if (t < 3) {
      // Scene 2: Projects - pan across
      this.camera.position.x = (t - 2) * 6 - 3;
      this.camera.position.z = 8;
      this.camera.position.y = 0;
    } else if (t < 4) {
      // Scene 3: Experience - follow timeline
      this.camera.position.x = (t - 3) * 8 - 4;
      this.camera.position.y = 2;
      this.camera.position.z = 6;
    } else {
      // Scene 4: Contact - center on portal
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 10;
    }
    
    this.camera.lookAt(0, 0, 0);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    const time = performance.now() * 0.001;
    
    // Animate current scene objects
    this.animateScene(this.currentScene, time);
    
    // Render the appropriate scene
    const sceneKeys = ['intro', 'skills', 'projects', 'experience', 'contact'];
    const currentSceneObj = this.sceneObjects[sceneKeys[this.currentScene]];
    
    this.renderer.render(currentSceneObj, this.camera);
  }

  animateScene(sceneIndex, time) {
    const sceneKeys = ['intro', 'skills', 'projects', 'experience', 'contact'];
    const scene = this.sceneObjects[sceneKeys[sceneIndex]];
    
    switch(sceneIndex) {
      case 0: // Intro
        if (scene.userData.stars) {
          scene.userData.stars.rotation.y = time * 0.05;
        }
        if (scene.userData.nameGroup) {
          scene.userData.nameGroup.children.forEach((sphere, i) => {
            sphere.position.y = Math.sin(time * 2 + i * 0.5) * 0.3;
          });
        }
        break;
        
      case 1: // Skills
        if (scene.userData.centralSphere) {
          scene.userData.centralSphere.rotation.y = time * 0.3;
          scene.userData.centralSphere.rotation.x = Math.sin(time * 0.2) * 0.3;
        }
        if (scene.userData.skillsGroup) {
          scene.userData.skillsGroup.children.forEach(skill => {
            skill.userData.angle += skill.userData.speed * 0.01;
            skill.position.x = Math.cos(skill.userData.angle) * skill.userData.radius;
            skill.position.z = Math.sin(skill.userData.angle) * skill.userData.radius;
            skill.lookAt(this.camera.position);
          });
        }
        break;
        
      case 2: // Projects
        if (scene.userData.projectsGroup) {
          scene.userData.projectsGroup.children.forEach((card, i) => {
            card.position.y = Math.sin(time + i) * 0.2;
            card.rotation.y = Math.sin(time * 0.5) * 0.1;
          });
        }
        break;
        
      case 3: // Experience
        if (scene.userData.timelinePath) {
          scene.userData.timelinePath.rotation.y = Math.sin(time * 0.3) * 0.1;
        }
        break;
        
      case 4: // Contact
        if (scene.userData.portal) {
          scene.userData.portal.rotation.z = time * 0.5;
        }
        if (scene.userData.contactGroup) {
          scene.userData.contactGroup.children.forEach(orb => {
            orb.userData.angle += 0.01;
            orb.position.x = Math.cos(orb.userData.angle) * 5;
            orb.position.z = Math.sin(orb.userData.angle) * 5;
            orb.position.y = Math.sin(time * 2 + orb.userData.angle) * 0.5;
          });
        }
        break;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Experience3D();
  });
} else {
  new Experience3D();
}