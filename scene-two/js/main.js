// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const container = document.getElementById("three-container");
const target = new THREE.Vector3(0, 0, 0);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100vw";
renderer.domElement.style.height = "100vh";
renderer.domElement.style.zIndex = "0";



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models



// ~~~~~~~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~
const geometry = new THREE.BoxGeometry(1, .5, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const material2 = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const cube2 = new THREE.Mesh(geometry, material2);
cube2.position.set(1, 2, 0);
// scene.add(cube2);



// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~

renderer.setClearColor(0x000000, 0);
camera.position.set(0, 13, 13);
camera.lookAt(new THREE.Vector3(0, 0, 0));




gsap.to(camera.position, {
    delay: 0,
    duration: 6,
    x: 0.0001,
    y: .7,
    z: .7,
    ease: "expo.out",
    onUpdate: () => camera.lookAt(target)
});

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    renderer.setPixelRatio(window.devicePixelRatio);
});

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    // camera.position.z += .03;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;



    // always end animation loop with renderer
    renderer.render(scene, camera);
}

animate(); // execute animation function

setTimeout(() => {
    window.location.replace("/scene-three");
}, 20000);