// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});


function initThreeJS() {
    const heroContainer = document.getElementById('botAnimation');
    if (!heroContainer) return;

    heroContainer.innerHTML = '';

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    const camera = new THREE.PerspectiveCamera(
        70,
        heroContainer.clientWidth / heroContainer.clientHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    renderer.setClearColor(0x000000, 0);
    heroContainer.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(3, 5, 5);
    scene.add(ambientLight, pointLight);

    // Group for bot
    const botGroup = new THREE.Group();

    // Glass-like neon blue material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3B82F6,             // Bright cool blue
        emissive: 0x1E3A8A,          // Soft blue glow
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.55,
        roughness: 0.05,
        metalness: 0.7,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.95,
        ior: 1.45,
        reflectivity: 1.0
    });

    // Main body
    const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const body = new THREE.Mesh(bodyGeometry, glassMaterial);
    botGroup.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const head = new THREE.Mesh(headGeometry, glassMaterial);
    head.position.y = 1.6;
    botGroup.add(head);

    // Eyes (neon cyan)
    const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 1.7, 0.6);
    rightEye.position.set(0.25, 1.7, 0.6);
    botGroup.add(leftEye, rightEye);

    // Antenna (glowing rod)
    const antennaGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12);
    const antennaMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x60A5FA,
        emissive: 0x3B82F6,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.7
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 2.3, 0);
    botGroup.add(antenna);

    scene.add(botGroup);
    camera.position.set(0, 1, 5);

    // Interaction
    let autoRotate = true;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    renderer.domElement.style.cursor = 'pointer';
    renderer.domElement.addEventListener('click', () => {
        autoRotate = !autoRotate;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (autoRotate) {
            botGroup.rotation.y += 0.01;
            botGroup.rotation.x += 0.002;
        } else {
            botGroup.rotation.y = mouseX * Math.PI * 0.5;
            botGroup.rotation.x = mouseY * Math.PI * 0.25;
        }

        // Floating effect
        botGroup.position.y = Math.sin(Date.now() * 0.001) * 0.25;

        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = heroContainer.clientWidth / heroContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    });

    // Initialize showcase animation
    initShowcaseAnimation();
}

// ------------------------------------------------------
// 🌀 Showcase Section 3D Animation
// ------------------------------------------------------
function initShowcaseAnimation() {
    const showcaseContainer = document.getElementById('showcaseAnimation');
    if (!showcaseContainer) return;

    showcaseContainer.innerHTML = '';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // white background
// deep bluish background
    const camera = new THREE.PerspectiveCamera(
        75,
        showcaseContainer.clientWidth / showcaseContainer.clientHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(showcaseContainer.clientWidth, showcaseContainer.clientHeight);
    showcaseContainer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(4, 6, 5);
    scene.add(ambientLight, pointLight);

    const bots = [];
    const botCount = 8;

    for (let i = 0; i < botCount; i++) {
        const botGroup = new THREE.Group();
        const bodyGeometry = new THREE.SphereGeometry(0.35, 16, 16);
        const hue = (i / botCount);
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
       const material = new THREE.MeshPhongMaterial({
    color,
    transparent: true,
    opacity: 0.8,  // increase a bit for better visibility
    shininess: 80
});


        const body = new THREE.Mesh(bodyGeometry, material);
        botGroup.add(body);

        const radius = 2;
        const angle = (i / botCount) * Math.PI * 2;
        botGroup.position.set(
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 1,
            Math.sin(angle) * radius
        );

        botGroup.userData = {
            originalY: botGroup.position.y,
            speed: 0.5 + Math.random() * 0.5
        };

        scene.add(botGroup);
        bots.push(botGroup);
    }

    camera.position.z = 5;

    function animateShowcase() {
        requestAnimationFrame(animateShowcase);
        const time = Date.now() * 0.001;

        bots.forEach((bot, i) => {
            bot.position.y = bot.userData.originalY + Math.sin(time * bot.userData.speed + i) * 0.3;
            bot.rotation.y += 0.01;
        });

        camera.position.x = Math.sin(time * 0.1) * 5;
        camera.position.z = Math.cos(time * 0.1) * 5;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }

    animateShowcase();

    window.addEventListener('resize', function () {
        camera.aspect = showcaseContainer.clientWidth / showcaseContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(showcaseContainer.clientWidth, showcaseContainer.clientHeight);
    });
}

// ------------------------------------------------------
// 🌌 Background Particle Animation (Enhanced)
// ------------------------------------------------------
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 90, density: { enable: true, value_area: 900 } },
            color: { value: ["#3B82F6", "#60A5FA", "#93C5FD"] },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: 4, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#60A5FA",
                opacity: 0.35,
                width: 1.5
            },
            move: {
                enable: true,
                speed: 1.2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 120, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ------------------------------------------------------
// 🚀 Initialize Three.js When Page Loads
// ------------------------------------------------------
window.addEventListener('load', () => {
    setTimeout(initThreeJS, 100);
});
