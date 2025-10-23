// Pac-Man Ghost 3D (fits fully inside the 250x250 box)

(function () {
  // Load Three.js (no modules)
  const threeSrc = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  const gltfSrc  = "https://cdn.jsdelivr.net/npm/three@0.128/examples/js/loaders/GLTFLoader.js";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  (async () => {
    const container = document.getElementById("container3D");
    if (!container) { console.error("container3D not found"); return; }

    await loadScript(threeSrc);
    await loadScript(gltfSrc);

    const scene   = new THREE.Scene();
    const camera  = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(3, 5, 5);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load(
      "pacman_ghost/scene.gltf",
      (gltf) => {
        const ghost = gltf.scene;
        scene.add(ghost);

        // --- Center & fit to view ---
        const box = new THREE.Box3().setFromObject(ghost);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        // Move model so its center is at the origin
        ghost.position.sub(sphere.center);

        // Optionally normalize scale (keeps similar size regardless of model units)
        const targetRadius = 1.0; // “desired” radius in scene units
        const scale = targetRadius / sphere.radius;
        ghost.scale.setScalar(scale);

        // Compute camera distance so the whole sphere fits vertically
        function updateCameraToFit() {
          const w = container.clientWidth  || 250;
          const h = container.clientHeight || 250;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();

          // d >= r / tan(fov/2)
          const fov = THREE.MathUtils.degToRad(camera.fov);
          const r = targetRadius;
          const d = r / Math.tan(fov / 2);

          camera.position.set(0, 0, d * 1.25); // a little extra room
          camera.lookAt(0, 0, 0);
        }
        updateCameraToFit();
        window.addEventListener("resize", updateCameraToFit);

        // Animate
        function animate() {
          requestAnimationFrame(animate);
          ghost.rotation.y += 0.01;
          ghost.position.y = Math.sin(Date.now() * 0.002) * 0.08; // gentle hover
          renderer.render(scene, camera);
        }
        animate();
      },
      (xhr) => {
        // progress (optional)
        // console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
      },
      (err) => console.error("Ghost load error:", err)
    );
  })();
})();
