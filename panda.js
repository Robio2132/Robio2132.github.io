/* ============================================================================
   Name: Robbie Bennett
   Class: CS321 - Software Engineering
   File: panda.js (originally meant to be a panda image, but got changed to pacman last second.)
   Purpose: Loads and renders a rotating 3D Pac-Man ghost model using Three.js.
   ============================================================================ */

// ===== 3D PAC-MAN GHOST INITIALIZATION =====
(function () {
  const threeSrc = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  const gltfSrc = "https://cdn.jsdelivr.net/npm/three@0.128/examples/js/loaders/GLTFLoader.js";

  // ===== SCRIPT LOADER UTILITY =====
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // ===== MAIN INITIALIZATION =====
  (async () => {
    const container = document.getElementById("container3D");
    if (!container) {
      console.error("container3D not found");
      return;
    }

    // Load Three.js and GLTFLoader dynamically
    await loadScript(threeSrc);
    await loadScript(gltfSrc);

    // ===== SCENE, CAMERA, RENDERER SETUP =====
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // ===== LIGHTING =====
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // ===== MODEL LOADING =====
    const loader = new THREE.GLTFLoader();
    loader.load(
      "pacman_ghost/scene.gltf",
      (gltf) => {
        const ghost = gltf.scene;
        scene.add(ghost);

        // ===== CENTER AND SCALE MODEL =====
        const box = new THREE.Box3().setFromObject(ghost);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        ghost.position.sub(sphere.center);

        const targetRadius = 1.0;
        const scale = targetRadius / sphere.radius;
        ghost.scale.setScalar(scale);

        // ===== CAMERA POSITIONING =====
        function updateCameraToFit() {
          const w = container.clientWidth || 250;
          const h = container.clientHeight || 250;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();

          const fov = THREE.MathUtils.degToRad(camera.fov);
          const d = targetRadius / Math.tan(fov / 2);
          camera.position.set(0, 0, d * 1.8);
          camera.lookAt(0, 0, 0);
        }

        updateCameraToFit();
        window.addEventListener("resize", updateCameraToFit);

        // ===== ANIMATION LOOP =====
        function animate() {
          requestAnimationFrame(animate);
          ghost.rotation.y += 0.01;
          ghost.position.y = Math.sin(Date.now() * 0.002) * 0.08;
          renderer.render(scene, camera);
        }

        animate();
      },
      null, 
      (err) => console.error("Ghost load error:", err)
    );
  })();
})();