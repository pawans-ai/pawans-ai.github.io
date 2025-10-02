// Minimal Three.js hero using existing page colors
(function(){
  const canvas = document.getElementById('hero3d');
  if(!canvas) return;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 4);
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(2,3,4); scene.add(light);
  const geo = new THREE.TorusKnotGeometry(1, 0.32, 160, 32);
  const accent = getComputedStyle(document.body).getPropertyValue('--bs-dark') || '#333333';
  const mat = new THREE.MeshStandardMaterial({color: accent.trim() || '#333333', roughness: 0.3, metalness: 0.6, wireframe:false});
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.008;
    renderer.render(scene, camera);
  }
  animate();
})();