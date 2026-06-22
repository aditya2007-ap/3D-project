// Ensure Three.js is loaded
if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded. Please check your internet connection or CDN link.');
}

/* --- Three.js Environment Setup --- */
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.2, 5.2);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-3d').appendChild(renderer.domElement);

/* --- Lighting System --- */
const ambientLight = new THREE.AmbientLight(0x0e101f, 2.0);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(6, 12, 8);
keyLight.castShadow = true;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x3a6fff, 2.0);
fillLight.position.set(-6, 6, -4);
scene.add(fillLight);

const spotlight = new THREE.SpotLight(0xffffff, 6, 18, Math.PI / 5, 0.5, 1);
spotlight.position.set(0, 5, 2);
spotlight.target.position.set(0, 0, 0);
scene.add(spotlight);

// Underglow Point Light (Giallo Orion default yellow)
const underglow = new THREE.PointLight(0xffe100, 5, 3.5);
underglow.position.set(0, -0.25, 0);
scene.add(underglow);

/* --- Procedural 3D Yellow Aventador SV Sports Car --- */
const carGroup = new THREE.Group();
scene.add(carGroup);

// Materials Definitions
const carPaintMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffe100, // Giallo Orion (Yellow)
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
});

const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x07090e,
    metalness: 0.95,
    roughness: 0.05,
    transparent: true,
    opacity: 0.85
});

const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2c35,
    metalness: 0.85,
    roughness: 0.25
});

const trimMaterial = new THREE.MeshStandardMaterial({
    color: 0x111215,
    metalness: 0.5,
    roughness: 0.6
});

const rubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x141518,
    metalness: 0.1,
    roughness: 0.85
});

const lightMaterial = new THREE.MeshBasicMaterial({
    color: 0xe0f7ff
});

const tailLightMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1a3c
});

// 1. Chassis Base
const baseGeom = new THREE.BoxGeometry(1.25, 0.22, 2.7);
const baseMesh = new THREE.Mesh(baseGeom, carPaintMaterial);
baseMesh.position.y = 0.06;
carGroup.add(baseMesh);

// 2. Hood (Slanted Front Nose)
const hoodGeom = new THREE.BoxGeometry(1.21, 0.14, 0.85);
const hoodMesh = new THREE.Mesh(hoodGeom, carPaintMaterial);
hoodMesh.position.set(0, 0.02, -0.92);
hoodMesh.rotation.x = 0.14; // Angled front
carGroup.add(hoodMesh);

// 2b. Racing Stripe (Asymmetric Double Stripe - driver's side)
const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.65 });

// Thick main stripe
const thickStripeGeom = new THREE.BoxGeometry(0.09, 0.01, 1.15);
const thickStripeMesh = new THREE.Mesh(thickStripeGeom, stripeMaterial);
thickStripeMesh.position.set(0.16, 0.1, -0.65);
thickStripeMesh.rotation.x = 0.14;
carGroup.add(thickStripeMesh);

// Parallel thin stripe
const thinStripeGeom = new THREE.BoxGeometry(0.02, 0.01, 1.15);
const thinStripeMesh = new THREE.Mesh(thinStripeGeom, stripeMaterial);
thinStripeMesh.position.set(0.06, 0.1, -0.65);
thinStripeMesh.rotation.x = 0.14;
carGroup.add(thinStripeMesh);

// 3. Cabin (Roof & Windshield Structure)
const cabinGeom = new THREE.BoxGeometry(0.92, 0.38, 1.15);
const cabinMesh = new THREE.Mesh(cabinGeom, glassMaterial);
cabinMesh.position.set(0, 0.32, 0.12);
carGroup.add(cabinMesh);

// Matte Black Roof panel overlay (Carbon look)
const roofGeom = new THREE.BoxGeometry(0.84, 0.03, 0.82);
const roofMesh = new THREE.Mesh(roofGeom, trimMaterial);
roofMesh.position.set(0, 0.52, 0.15);
carGroup.add(roofMesh);

// 4. Side Fenders / Doors (Left and Right)
const fenderLGeom = new THREE.BoxGeometry(0.08, 0.3, 1.6);
const fenderL = new THREE.Mesh(fenderLGeom, carPaintMaterial);
fenderL.position.set(-0.62, 0.1, 0.12);
carGroup.add(fenderL);

const fenderRGeom = new THREE.BoxGeometry(0.08, 0.3, 1.6);
const fenderR = new THREE.Mesh(fenderRGeom, carPaintMaterial);
fenderR.position.set(0.62, 0.1, 0.12);
carGroup.add(fenderR);

// 4b. Aventador Side Air Intake Scoops (Carbon black)
const sideScoopLGeom = new THREE.BoxGeometry(0.08, 0.14, 0.4);
const sideScoopL = new THREE.Mesh(sideScoopLGeom, trimMaterial);
sideScoopL.position.set(-0.64, 0.1, 0.5);
sideScoopL.rotation.y = -0.16;
carGroup.add(sideScoopL);

const sideScoopR = sideScoopL.clone();
sideScoopR.position.x = 0.64;
sideScoopR.rotation.y = 0.16;
carGroup.add(sideScoopR);

// 4c. Carbon Side Skirts (Lowers visual profile)
const skirtLGeom = new THREE.BoxGeometry(0.03, 0.04, 1.65);
const skirtL = new THREE.Mesh(skirtLGeom, trimMaterial);
skirtL.position.set(-0.63, -0.06, 0.12);
carGroup.add(skirtL);

const skirtR = skirtL.clone();
skirtR.position.x = 0.63;
carGroup.add(skirtR);

// 4d. SV Flank Decal Texture & Geometry
function createSVDecalTexture(isLeft) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#111115';
    ctx.font = 'bold 85px "Outfit", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Slant for italics
    ctx.transform(1, 0, isLeft ? -0.28 : 0.28, 1, 0, 0); 
    ctx.fillText('SV', 128, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

const svDecalMaterialL = new THREE.MeshStandardMaterial({
    map: createSVDecalTexture(true),
    transparent: true,
    roughness: 0.5
});
const svDecalMaterialR = new THREE.MeshStandardMaterial({
    map: createSVDecalTexture(false),
    transparent: true,
    roughness: 0.5
});

const svPanelGeom = new THREE.PlaneGeometry(0.3, 0.15);

const svPanelL = new THREE.Mesh(svPanelGeom, svDecalMaterialL);
svPanelL.position.set(-0.665, 0.12, 0.95);
svPanelL.rotation.y = -Math.PI / 2;
carGroup.add(svPanelL);

const svPanelR = new THREE.Mesh(svPanelGeom, svDecalMaterialR);
svPanelR.position.set(0.665, 0.12, 0.95);
svPanelR.rotation.y = Math.PI / 2;
carGroup.add(svPanelR);

// 4e. Sleek Side Mirrors
const mirrorStalkGeom = new THREE.BoxGeometry(0.12, 0.03, 0.03);
const mirrorStalkL = new THREE.Mesh(mirrorStalkGeom, trimMaterial);
mirrorStalkL.position.set(-0.52, 0.28, -0.4);
mirrorStalkL.rotation.y = -0.15;
carGroup.add(mirrorStalkL);

const mirrorCapGeom = new THREE.BoxGeometry(0.13, 0.06, 0.07);
const mirrorCapL = new THREE.Mesh(mirrorCapGeom, carPaintMaterial);
mirrorCapL.position.set(-0.60, 0.30, -0.42);
carGroup.add(mirrorCapL);

const mirrorStalkR = mirrorStalkL.clone();
mirrorStalkR.position.x = 0.52;
mirrorStalkR.rotation.y = 0.15;
carGroup.add(mirrorStalkR);

const mirrorCapR = mirrorCapL.clone();
mirrorCapR.position.x = 0.60;
carGroup.add(mirrorCapR);

// 5. Rear Wing (Spoiler - SV Carbon Trim)
const wingGeom = new THREE.BoxGeometry(1.36, 0.04, 0.34);
const wingMesh = new THREE.Mesh(wingGeom, trimMaterial);
wingMesh.position.set(0, 0.34, 1.35);
carGroup.add(wingMesh);

// Wing support struts
const strutLGeom = new THREE.BoxGeometry(0.04, 0.22, 0.08);
const strutL = new THREE.Mesh(strutLGeom, metalMaterial);
strutL.position.set(-0.45, 0.21, 1.35);
carGroup.add(strutL);

const strutR = strutL.clone();
strutR.position.x = 0.45;
carGroup.add(strutR);

// 6. Headlight Bars
const headlightLGeom = new THREE.BoxGeometry(0.2, 0.04, 0.04);
const headlightL = new THREE.Mesh(headlightLGeom, lightMaterial);
headlightL.position.set(-0.48, 0.03, -1.33);
headlightL.rotation.y = -0.22;
carGroup.add(headlightL);

const headlightR = headlightL.clone();
headlightR.position.x = 0.48;
headlightR.rotation.y = 0.22;
carGroup.add(headlightR);

// 6b. Bumper Front Air Scoops (Aventador style Vents)
const frontScoopLGeom = new THREE.BoxGeometry(0.24, 0.1, 0.12);
const frontScoopL = new THREE.Mesh(frontScoopLGeom, trimMaterial);
frontScoopL.position.set(-0.44, -0.05, -1.28);
frontScoopL.rotation.y = -0.22;
carGroup.add(frontScoopL);

const frontScoopR = frontScoopL.clone();
frontScoopR.position.x = 0.44;
frontScoopR.rotation.y = 0.22;
carGroup.add(frontScoopR);

// 7. Taillight Bar
const tailLightGeom = new THREE.BoxGeometry(1.05, 0.03, 0.03);
const tailLight = new THREE.Mesh(tailLightGeom, tailLightMaterial);
tailLight.position.set(0, 0.14, 1.36);
carGroup.add(tailLight);

// 8. Wheels Constructor
const wheelsArray = [];
const wheelRadius = 0.33;

function makeWheel(x, y, z) {
    const wheelPivot = new THREE.Group();
    wheelPivot.position.set(x, y, z);
    const isLeftWheel = x < 0;
    
    // Tire Rubber
    const tireGeom = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.24, 20);
    tireGeom.rotateZ(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeom, rubberMaterial);
    wheelPivot.add(tire);
    
    // Black Rim Hub (Sporty Matte Black)
    const rimGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.26, 16);
    rimGeom.rotateZ(Math.PI / 2);
    const darkRimMaterial = new THREE.MeshStandardMaterial({
        color: 0x141416,
        metalness: 0.4,
        roughness: 0.5
    });
    const rim = new THREE.Mesh(rimGeom, darkRimMaterial);
    wheelPivot.add(rim);

    // Multispoke black spokes
    const spokeGeom = new THREE.BoxGeometry(0.025, 0.46, 0.04);
    for (let r = 0; r < 6; r++) {
        const spoke = new THREE.Mesh(spokeGeom, darkRimMaterial);
        spoke.rotation.x = (Math.PI / 6) * r;
        wheelPivot.add(spoke);
    }

    // Yellow outer rim pinstripe ring
    const ringGeom = new THREE.RingGeometry(0.235, 0.25, 32);
    ringGeom.rotateY(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffe100, side: THREE.DoubleSide });
    const pinstripe = new THREE.Mesh(ringGeom, ringMat);
    pinstripe.position.x = isLeftWheel ? -0.131 : 0.131;
    wheelPivot.add(pinstripe);

    carGroup.add(wheelPivot);
    wheelsArray.push(wheelPivot);

    // Stationary Yellow Brake Caliper
    const caliperGeom = new THREE.BoxGeometry(0.05, 0.14, 0.08);
    const caliperMat = new THREE.MeshStandardMaterial({ color: 0xffe100, roughness: 0.3 });
    const caliper = new THREE.Mesh(caliperGeom, caliperMat);
    caliper.position.set(x + (isLeftWheel ? 0.051 : -0.051), y + 0.1, z - 0.05);
    caliper.rotation.z = isLeftWheel ? 0.15 : -0.15;
    carGroup.add(caliper);
}

// Instantiate 4 wheels at precise offsets
makeWheel(-0.66, -0.08, -0.8);  // FL
makeWheel(0.66, -0.08, -0.8);   // FR
makeWheel(-0.66, -0.08, 0.85);  // RL
makeWheel(0.66, -0.08, 0.85);   // RR

// Set initial car group position
carGroup.position.set(1.8, 0.4, -1.5);
carGroup.rotation.set(0, -Math.PI * 0.6, 0);

// --- Rival Car Constructor (Stealth matte black replica for racing scene) ---
const rivalPaintMaterial = new THREE.MeshStandardMaterial({
    color: 0x141416, // Matte Stealth Black
    roughness: 0.65,
    metalness: 0.2
});

const carGroup2 = carGroup.clone();
carGroup2.traverse((child) => {
    if (child.isMesh) {
        // Swap paint material to Matte Black
        if (child.material === carPaintMaterial) {
            child.material = rivalPaintMaterial;
        }
        // Swap yellow accents (pinstripe, calipers) to hot red for a menacing rival look
        if (child.material.color && child.material.color.getHex() === 0xffe100) {
            child.material = new THREE.MeshBasicMaterial({ color: 0xb30909 });
        }
    }
});
carGroup2.visible = false;
scene.add(carGroup2);

// --- Web Audio API V12 Synthesized Sound System ---
let audioCtx = null;
let engineOsc1 = null;
let engineOsc2 = null;
let engineFilter = null;
let engineGain = null;

function initEngineSound() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playEngineSound() {
    try {
        initEngineSound();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        stopEngineSound();

        engineOsc1 = audioCtx.createOscillator();
        engineOsc2 = audioCtx.createOscillator();
        engineFilter = audioCtx.createBiquadFilter();
        engineGain = audioCtx.createGain();

        // Osc 1: Sawtooth exhaust tone
        engineOsc1.type = 'sawtooth';
        engineOsc1.frequency.setValueAtTime(45, audioCtx.currentTime);

        // Osc 2: Triangle resonance
        engineOsc2.type = 'triangle';
        engineOsc2.frequency.setValueAtTime(90, audioCtx.currentTime);

        // Filter: acoustics shaper
        engineFilter.type = 'lowpass';
        engineFilter.frequency.setValueAtTime(180, audioCtx.currentTime);
        engineFilter.Q.setValueAtTime(3.5, audioCtx.currentTime);

        engineGain.gain.setValueAtTime(0.001, audioCtx.currentTime);

        engineOsc1.connect(engineFilter);
        engineOsc2.connect(engineFilter);
        engineFilter.connect(engineGain);
        engineGain.connect(audioCtx.destination);

        engineOsc1.start();
        engineOsc2.start();

        const now = audioCtx.currentTime;

        // Pitch/Volume sweep profiles
        engineGain.gain.exponentialRampToValueAtTime(0.35, now + 0.5);
        engineOsc1.frequency.exponentialRampToValueAtTime(140, now + 0.5);
        engineOsc2.frequency.exponentialRampToValueAtTime(280, now + 0.5);
        engineFilter.frequency.exponentialRampToValueAtTime(700, now + 0.5);

        engineOsc1.frequency.setValueAtTime(85, now + 0.6);
        engineOsc2.frequency.setValueAtTime(170, now + 0.6);
        engineOsc1.frequency.exponentialRampToValueAtTime(290, now + 1.8);
        engineOsc2.frequency.exponentialRampToValueAtTime(580, now + 1.8);
        engineFilter.frequency.exponentialRampToValueAtTime(1600, now + 1.8);
        engineGain.gain.linearRampToValueAtTime(0.48, now + 1.8);

        engineOsc1.frequency.exponentialRampToValueAtTime(110, now + 2.5);
        engineOsc2.frequency.exponentialRampToValueAtTime(220, now + 2.5);
        engineFilter.frequency.exponentialRampToValueAtTime(450, now + 2.5);
        engineGain.gain.linearRampToValueAtTime(0.25, now + 2.5);

        engineGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

        setTimeout(() => {
            stopEngineSound();
        }, 3300);
    } catch (err) {
        console.warn('Web Audio synthesis not supported or blocked: ', err);
    }
}

function stopEngineSound() {
    try {
        if (engineOsc1) {
            engineOsc1.stop();
            engineOsc1.disconnect();
            engineOsc1 = null;
        }
        if (engineOsc2) {
            engineOsc2.stop();
            engineOsc2.disconnect();
            engineOsc2 = null;
        }
        if (engineGain) {
            engineGain.disconnect();
            engineGain = null;
        }
    } catch (e) {}
}

/* --- Grid & Atmosphere --- */
const gridHelper = new THREE.GridHelper(50, 45, 0x444444, 0x1f2025);
gridHelper.position.y = -0.41;
scene.add(gridHelper);

// Floating Neon Dust Particles (Yellow Giallo Orion matching theme)
const particleCount = 150;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 25;     // X
    particlePositions[i + 1] = Math.random() * 6 - 1;      // Y
    particlePositions[i + 2] = (Math.random() - 0.5) * 25; // Z
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffe100,
    size: 0.04,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

/* --- Responsive Resize Handler --- */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* --- Scroll and Position Layout Logic --- */
const scrollContainer = document.querySelector('.scroll-container');
const panels = document.querySelectorAll('.panel');
const navLinks = document.querySelectorAll('.nav-link');
const dots = document.querySelectorAll('.dot');
const progressBars = document.querySelectorAll('.progress-bar');
const configColorInput = document.getElementById('config-color');
const selectedColorName = document.getElementById('selected-color-name');

let activeSection = 0;
let lastScrollY = 0;
let deltaScroll = 0;

// Racing state
let raceActive = false;
let raceTime = 0;
const raceDuration = 3.2; // seconds
const clock = new THREE.Clock();

function startRaceAnimation() {
    raceActive = true;
    raceTime = 0;
    if (carGroup2) {
        carGroup2.visible = true;
    }
    playEngineSound();
}

// Transforms configuration dictionary for each section index
const sectionTransforms = [
    // 0. Home: Right side, far back, angled
    { posX: 1.8, posY: 0.22, posZ: -1.5, rotX: 0, rotY: -Math.PI * 0.6, rotZ: 0, scale: 0.95 },
    // 1. Specs: Slightly right-centered, showcasing profile
    { posX: 1.1, posY: 0.22, posZ: 0.4, rotX: 0.1, rotY: -Math.PI * 0.35, rotZ: 0, scale: 1.1 },
    // 2. Features Carousel: Placed down/back, showing sideways profile
    { posX: 0, posY: -0.42, posZ: -1.5, rotX: 0.08, rotY: -Math.PI * 0.5, rotZ: 0, scale: 0.8 },
    // 3. 3D View: Centered, larger, fully facing forward (interactive)
    { posX: 0, posY: 0.3, posZ: 0.8, rotX: 0, rotY: 0, rotZ: 0, scale: 1.25 },
    // 4. Customizer: Shifted left to open up customizer swatches space
    { posX: -1.1, posY: 0.22, posZ: 0.4, rotX: 0.1, rotY: Math.PI * 0.35, rotZ: 0, scale: 1.1 },
    // 5. Booking: Drives off screen left
    { posX: -4.0, posY: 0.28, posZ: -2.5, rotX: 0, rotY: Math.PI * 0.52, rotZ: 0, scale: 0.9 }
];

// Scroll detection & section tracking
scrollContainer.addEventListener('scroll', () => {
    const currentScrollY = scrollContainer.scrollTop;
    deltaScroll = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    const viewportHeight = scrollContainer.clientHeight;
    const index = Math.round(currentScrollY / viewportHeight);
    
    if (index !== activeSection && index >= 0 && index < sectionTransforms.length) {
        activeSection = index;
        updateUIState(activeSection);
    }
});

// Update indicators, navigation highlights, and meter animations
function updateUIState(index) {
    // Nav bar active highlights
    navLinks.forEach((link) => {
        const id = link.getAttribute('href').substring(1);
        if (id === panels[index].id) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Side navigation dot active highlights
    dots.forEach((dot, idx) => {
        if (idx === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Toggle active-section class on panels to trigger entry transitions
    panels.forEach((panel, idx) => {
        if (idx === index) {
            panel.classList.add('active-section');
        } else {
            panel.classList.remove('active-section');
        }
    });

    // Animate specs indicators when scroll triggers specs panel
    if (index === 1) {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress');
        });
    } else {
        progressBars.forEach(bar => {
            bar.style.width = '0';
        });
    }

    // Racing Transition Trigger on Section 3 (3D Experience)
    if (index === 3) {
        startRaceAnimation();
    } else {
        raceActive = false;
        if (carGroup2) {
            carGroup2.visible = false;
        }
        stopEngineSound();
    }
}

// Navigation Link Anchors Click Scrolling
function setupNavigationScroll(elements) {
    elements.forEach(item => {
        item.addEventListener('click', (e) => {
            const id = item.getAttribute('href');
            if (id && id.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(id);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
setupNavigationScroll(navLinks);
setupNavigationScroll(dots);

// Mobile Hamburger Menu Trigger
const hamburger = document.querySelector('.hamburger');
const navLinksGroup = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksGroup.classList.toggle('active-menu');
        hamburger.classList.toggle('active');
    });
}

/* --- Cursor Parallax Tracker --- */
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

/* --- Color Configuration Setup --- */
const swatches = document.querySelectorAll('.swatch');
swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');

        const colorHex = swatch.getAttribute('data-color');
        
        // 1. Update Three.js Metallic body material paint
        carPaintMaterial.color.set(colorHex);

        // 2. Update CSS Custom properties
        document.documentElement.style.setProperty('--accent-color', colorHex);
        document.documentElement.style.setProperty('--accent-glow', hexToRgbGlow(colorHex, 0.4));

        // 3. Select name labels
        let colorName = 'Rosso Anteros';
        if (colorHex === '#ffe100') colorName = 'Giallo Orion';
        if (colorHex === '#ff5500') colorName = 'Arancio Argos';
        if (colorHex === '#0055ff') colorName = 'Blu Nethuns';
        if (colorHex === '#24e064') colorName = 'Verde Mantis';
        if (colorHex === '#1c1c1e') colorName = 'Nero Noctis';
        
        selectedColorName.textContent = colorName;
        configColorInput.value = `${colorName} Edition`;

        // Match neon lights & dust colors to paint choice
        underglow.color.set(colorHex);
        particleMaterial.color.set(colorHex);

        // Activate corresponding underglow glow swatch
        const matchingGlow = document.querySelector(`.glow-swatch[data-glow="${colorHex}"]`);
        if (matchingGlow) {
            document.querySelectorAll('.glow-swatch').forEach(gs => gs.classList.remove('active'));
            matchingGlow.classList.add('active');
        }
    });
});

// Underglow Swatch selectors
const glowSwatches = document.querySelectorAll('.glow-swatch');
glowSwatches.forEach(glowSwatch => {
    glowSwatch.addEventListener('click', () => {
        glowSwatches.forEach(s => s.classList.remove('active'));
        glowSwatch.classList.add('active');

        const glowHex = glowSwatch.getAttribute('data-glow');
        
        underglow.color.set(glowHex);
        particleMaterial.color.set(glowHex);
    });
});

// Hex Helper to transparent RGB
function hexToRgbGlow(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* --- Render Loop --- */
let currentX = sectionTransforms[0].posX;
let currentY = sectionTransforms[0].posY;
let currentZ = sectionTransforms[0].posZ;
let currentRotX = sectionTransforms[0].rotX;
let currentRotY = sectionTransforms[0].rotY;
let currentRotZ = sectionTransforms[0].rotZ;
let currentScale = sectionTransforms[0].scale;

function render() {
    requestAnimationFrame(render);

    const dt = clock.getDelta();

    if (raceActive) {
        raceTime += dt;
        const progress = Math.min(raceTime / raceDuration, 1.0);
        
        if (progress >= 1.0) {
            raceActive = false;
            if (carGroup2) {
                carGroup2.visible = false;
            }
        }

        // 1. Calculate Yellow Car positions (Weaving in/out)
        let mainZ, mainX, mainRotY;
        if (progress < 0.8) {
            let p = progress / 0.8;
            mainZ = -35 + 35.8 * Math.pow(p, 3);
            mainX = -0.5 + Math.sin(p * Math.PI * 2.5) * 0.35;
            mainRotY = Math.sin(p * Math.PI * 2.5) * 0.15;
        } else {
            let p = (progress - 0.8) / 0.2;
            mainZ = 0.8;
            mainX = -0.1 * (1 - p);
            mainRotY = 0;
        }
        
        carGroup.position.set(mainX, 0.3, mainZ);
        carGroup.rotation.set(0, mainRotY, 0);
        carGroup.scale.set(1.25, 1.25, 1.25);

        // 2. Calculate Rival Car positions (Accelerates past, zooms by camera)
        let rivalZ, rivalX, rivalRotY;
        if (progress < 0.9) {
            let p = progress / 0.9;
            rivalZ = -35 + 55 * Math.pow(p, 3.5);
            rivalX = 0.5 - Math.sin(p * Math.PI * 2.0) * 0.25;
            rivalRotY = -Math.sin(p * Math.PI * 2.0) * 0.1;
        } else {
            rivalZ = 20;
            rivalX = 0.5;
            rivalRotY = 0;
        }

        if (carGroup2) {
            carGroup2.position.set(rivalX, 0.3, rivalZ);
            carGroup2.rotation.set(0, rivalRotY, 0);
            carGroup2.scale.set(1.25, 1.25, 1.25);
        }

        // Fast wheel spin during race
        wheelsArray.forEach((wheel) => {
            wheel.rotation.x += 0.6 * (1.0 - progress * 0.4);
        });

        // Fast grid movement
        gridHelper.position.z += 0.6 * (1.0 - progress * 0.4);
        if (gridHelper.position.z > 1.1) {
            gridHelper.position.z = 0;
        }

        // Match current state values so normal inspection takes over smoothly
        currentX = carGroup.position.x;
        currentY = carGroup.position.y;
        currentZ = carGroup.position.z;
        currentRotX = carGroup.rotation.x;
        currentRotY = carGroup.rotation.y;
        currentRotZ = carGroup.rotation.z;
        currentScale = carGroup.scale.x;

    } else {
        const targetTransform = sectionTransforms[activeSection];
        
        // Smooth positions lerp
        currentX += (targetTransform.posX - currentX) * 0.05;
        currentY += (targetTransform.posY - currentY) * 0.05;
        currentZ += (targetTransform.posZ - currentZ) * 0.05;
        
        carGroup.position.set(currentX, currentY, currentZ);

        // Smooth scaling lerp
        currentScale += (targetTransform.scale - currentScale) * 0.05;
        carGroup.scale.set(currentScale, currentScale, currentScale);

        // Spin wheels on scroll triggers
        const spinSpeed = Math.abs(deltaScroll) * 0.015;
        deltaScroll *= 0.92; // Decay speed factor
        
        wheelsArray.forEach((wheel) => {
            wheel.rotation.x += spinSpeed + 0.005;
        });

        // Animate grid helper moving backwards based on wheel movement
        gridHelper.position.z += (spinSpeed + 0.005);
        if (gridHelper.position.z > 1.1) {
            gridHelper.position.z = 0;
        }

        // Gentle float floating animation
        const timeSec = Date.now() * 0.0016;
        carGroup.position.y += Math.sin(timeSec) * 0.012;

        // Interactive mouse rotation triggers
        let destRotX = targetTransform.rotX;
        let destRotY = targetTransform.rotY;
        let destRotZ = targetTransform.rotZ;

        if (activeSection === 3) {
            destRotX = mouseY * 0.25;
            destRotY = mouseX * 0.55;
            destRotZ = -mouseX * 0.05;
        } else {
            destRotX = targetTransform.rotX + mouseY * 0.04;
            destRotY = targetTransform.rotY + mouseX * 0.06;
        }

        // Smooth rotation lerp
        currentRotX += (destRotX - currentRotX) * 0.05;
        currentRotY += (destRotY - currentRotY) * 0.05;
        currentRotZ += (destRotZ - currentRotZ) * 0.05;
        
        carGroup.rotation.set(currentRotX, currentRotY, currentRotZ);
    }

    // Toggle 3D Car visibility to remove (hide) the car from the first page (Hero section)
    // As soon as the user scrolls to Section 1 (Specs) or higher, it smoothly materializes and slides into view!
    carGroup.visible = (activeSection > 0 || raceActive);

    // Animate atmospheric points falling
    const posArr = particles.geometry.attributes.position.array;
    for (let j = 1; j < posArr.length; j += 3) {
        posArr[j] -= 0.006;
        if (posArr[j] < -1) {
            posArr[j] = 5;
        }
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += 0.0006;

    renderer.render(scene, camera);
}

render();
updateUIState(0);

/* --- 3D HTML Card Carousel Logic --- */
const featuresData = [
    {
        title: "V12 Powerhouse",
        desc: "Naturally aspirated 6.5L V12 engine screaming up to 8,500 RPM, delivering 770 HP of pure raw adrenaline.",
        specs: "RPM Limit: 8,700 | Sound Level: 115 dB",
        icon: `<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-color)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
    },
    {
        title: "LDVI Brain",
        desc: "Lamborghini Dinamica Veicolo Integrata coordinate system that anticipates and adapts the car's setup to the driver's actions in real-time.",
        specs: "Processing: Real-time feed | Sensor Rate: 50Hz",
        icon: `<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-color)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`
    },
    {
        title: "Active Aero",
        desc: "Specially designed aerodynamic underbody, front splitter, and elevated rear outlet exhausts that increase downforce by 7x.",
        specs: "Downforce: +700% | Drag Coeff: 0.32",
        icon: `<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-color)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`
    },
    {
        title: "HMI Cockpit",
        desc: "An 8.4-inch multi-touch screen in the center console manages car setup, connectivity, and telemetry dynamically.",
        specs: "Screen Size: 8.4 Inch | Telemetry: Dual camera",
        icon: `<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-color)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
    },
    {
        title: "All-Wheel Steering",
        desc: "Combines dynamic steering with active rear-wheel steering for unmatched high-speed stability and low-speed cornering agility.",
        specs: "Steering Angle: +/- 3° | Turn Radius: 10.5m",
        icon: `<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-color)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path></svg>`
    }
];

const spinner = document.querySelector('.carousel-spinner');
const cards = document.querySelectorAll('.carousel-card');
const infoPanel = document.getElementById('feature-info-panel');
const infoPanelTitle = document.getElementById('info-panel-title');
const infoPanelDesc = document.getElementById('info-panel-desc');
const infoPanelSpecs = document.getElementById('info-panel-specs');
const infoPanelIcon = document.getElementById('info-panel-icon');

let carouselAngle = 0;
let isHoveringCard = false;
let selectedCardIndex = 0;

function showFeatureInfo(index) {
    if (index === selectedCardIndex && infoPanel.classList.contains('active')) return;
    selectedCardIndex = index;
    
    // Slide out side info panel
    infoPanel.classList.remove('active');
    
    setTimeout(() => {
        const data = featuresData[index];
        infoPanelTitle.textContent = data.title;
        infoPanelDesc.textContent = data.desc;
        infoPanelSpecs.textContent = data.specs;
        infoPanelIcon.innerHTML = data.icon;
        
        // Slide back in with fresh data
        infoPanel.classList.add('active');
    }, 250);

    // Update active highlight on cards
    cards.forEach((card, idx) => {
        if (idx === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function updateCarouselSpin() {
    if (!isHoveringCard) {
        carouselAngle -= 0.15; // slow spin
        spinner.style.transform = `rotateY(${carouselAngle}deg)`;
    } else {
        // Rotate the carousel to bring selected card to front
        const destAngle = -selectedCardIndex * 72;
        let diff = destAngle - (carouselAngle % 360);
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        carouselAngle += diff * 0.08;
        spinner.style.transform = `rotateY(${carouselAngle}deg)`;
    }
    requestAnimationFrame(updateCarouselSpin);
}

// Bind mouse actions to cards
cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
        isHoveringCard = true;
        showFeatureInfo(idx);
    });
    
    card.addEventListener('mouseleave', () => {
        isHoveringCard = false;
    });
    
    card.addEventListener('click', () => {
        isHoveringCard = true;
        showFeatureInfo(idx);
        // Lock hover active for click preview
        setTimeout(() => { isHoveringCard = false; }, 2000);
    });
});

// Run Carousel Loop
updateCarouselSpin();

/* --- Booking Form Submission Database Integration --- */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = bookingForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        const nameVal = document.getElementById('name').value;
        const emailVal = document.getElementById('email').value;
        const carModelVal = document.getElementById('car-model').value;
        const configColorVal = document.getElementById('config-color').value;
        const locationVal = document.getElementById('location').value;
        
        // Disable button & show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering Request...';
        submitBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        submitBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        submitBtn.style.color = '#a0a5b5';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    car_model: carModelVal,
                    config_color: configColorVal,
                    location: locationVal
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success UI state
                submitBtn.textContent = 'Registered Successfully!';
                submitBtn.style.backgroundColor = '#24e064';
                submitBtn.style.borderColor = '#24e064';
                submitBtn.style.color = '#000';
                
                showToast(result.message, true);
                bookingForm.reset();
                
                // Restore default configuration text since reset clears fields
                document.getElementById('config-color').value = `${selectedColorName.textContent} Edition`;
                
                // Reset button style after 4 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                }, 4000);
            } else {
                throw new Error(result.message || 'Database error occurred.');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            submitBtn.textContent = 'Submission Failed';
            submitBtn.style.backgroundColor = '#e02447';
            submitBtn.style.borderColor = '#e02447';
            submitBtn.style.color = '#fff';
            
            showToast(`Error: ${error.message || 'Unable to connect to database server. Is server.js running?'}`, false);
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
            }, 4000);
        }
    });
}

// --- Toast Notification Logic ---
function showToast(message, isSuccess = true) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.style.borderColor = isSuccess ? 'var(--accent-color)' : '#e02447';
    toast.style.boxShadow = isSuccess ? '0 10px 30px var(--accent-glow)' : '0 10px 30px rgba(224, 36, 71, 0.3)';
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// --- Search Overlay Logic ---
const searchTrigger = document.getElementById('search-trigger');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');
const searchQuery = document.getElementById('search-query');
const searchResultsList = document.getElementById('search-results-list');

const searchData = [
    { title: "V12 Engine (Aventador)", desc: "6.5L naturally aspirated V12 engine delivering 770 HP", section: "#specs", category: "Spec" },
    { title: "Top Speed", desc: "Max velocity of 350 km/h (>217 mph)", section: "#specs", category: "Spec" },
    { title: "Acceleration 0-100 km/h", desc: "Launches from 0 to 100 km/h in just 2.8 seconds", section: "#specs", category: "Spec" },
    { title: "Active Aero (ALA 2.0)", desc: "Aerodynamic system with active flaps for downforce", section: "#features", category: "Feature" },
    { title: "LDVI Brain", desc: "Lamborghini Dinamica Veicolo Integrata coordinate system", section: "#features", category: "Feature" },
    { title: "HMI Cockpit", desc: "8.4-inch multi-touch display screen with telemetry", section: "#features", category: "Feature" },
    { title: "All-Wheel Steering", desc: "Rear-wheel steering system for high-speed stability", section: "#features", category: "Feature" },
    { title: "Giallo Orion (Yellow)", desc: "Signature high-gloss metallic yellow paint", section: "#customizer", category: "Color", action: () => selectColorSwatch('#ffe100') },
    { title: "Arancio Argos (Orange)", desc: "Vibrant high-gloss metallic orange paint", section: "#customizer", category: "Color", action: () => selectColorSwatch('#ff5500') },
    { title: "Rosso Anteros (Red)", desc: "Deep high-gloss metallic red paint", section: "#customizer", category: "Color", action: () => selectColorSwatch('#e02447') },
    { title: "Blu Nethuns (Blue)", desc: "Rich high-gloss metallic blue paint", section: "#customizer", category: "Color", action: () => selectColorSwatch('#0055ff') },
    { title: "Verde Mantis (Green)", desc: "Bright high-gloss metallic green paint", section: "#customizer", category: "Color", action: () => selectColorSwatch('#24e064') },
    { title: "Nero Noctis (Black)", desc: "Deep high-gloss metallic black paint", section: "#customizer", category: "Color", action: () => selectColorSwatch('#1c1c1e') },
    { title: "Book a Viewing", desc: "Register inquiry for a test drive or showroom viewing", section: "#booking", category: "Booking" }
];

function selectColorSwatch(hex) {
    const swatch = document.querySelector(`.swatch[data-color="${hex}"]`);
    if (swatch) swatch.click();
}

if (searchTrigger && searchModal && searchClose) {
    searchTrigger.addEventListener('click', () => {
        searchModal.classList.add('active');
        searchQuery.value = '';
        searchResultsList.innerHTML = '';
        setTimeout(() => searchQuery.focus(), 100);
    });

    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });

    searchQuery.addEventListener('input', () => {
        const query = searchQuery.value.toLowerCase().trim();
        searchResultsList.innerHTML = '';

        if (!query) return;

        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResultsList.innerHTML = `<div class="search-no-results">No results found for "${escapeHTML(query)}"</div>`;
            return;
        }

        results.forEach(res => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <div class="result-main">
                    <span class="result-title">${res.title}</span>
                    <span class="result-desc">${res.desc}</span>
                </div>
                <span class="result-category">${res.category}</span>
            `;
            item.addEventListener('click', () => {
                searchModal.classList.remove('active');
                const sectionEl = document.querySelector(res.section);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth' });
                }
                if (res.action) {
                    setTimeout(res.action, 800);
                }
            });
            searchResultsList.appendChild(item);
        });
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
