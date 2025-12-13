
// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';

const container = document.getElementById("three-container");


// Import add-ons
// import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~
const text = [
    {
        element: document.getElementById('cube-text-1'),
        localAnchor: new THREE.Vector3(0.5, 0, 0)
    },



    {
        element: document.getElementById('cube-text-2'),
        localAnchor: new THREE.Vector3(0, 0, -0.5)

    },

    {
        element: document.getElementById('cube-text-3'),
        localAnchor: new THREE.Vector3(-.5, 0, 0)
    }
];




const raycaster = new THREE.Raycaster();
const target = new THREE.Vector3(0, 0, 0);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
const cubeTwo = new THREE.Mesh(geometry, material);
// scene.add(cubeTwo);
scene.add(cube);

const occlusionTestObjects = [cube];

// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
// renderer.setClearColor(0x000000, 0);
camera.position.set(0, 5, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));


// gsap.to(camera.position, {
//     delay: 2,
//     duration: 6,
//     x: 0.0001,
//     y: .7,
//     z: .7,
//     ease: "power2.out",
//     onUpdate: () => camera.lookAt(target)
// });



function checkOcclusion(targetWorldPos) {
    const camPos = camera.position.clone();
    const dir = targetWorldPos.clone().sub(camPos).normalize();

    raycaster.set(camPos, dir);

    const intersections = raycaster.intersectObjects(occlusionTestObjects, true);

    if (intersections.length === 0) return false;

    const hit = intersections[0];

    const distToHit = hit.distance;
    const distToTarget = camPos.distanceTo(targetWorldPos);

    const epsilon = 1e-3;
    return distToHit + epsilon < distToTarget;
}


function updateLabel(labelConfig) {
    const { element, localAnchor } = labelConfig;

    const worldPos = localAnchor.clone().applyMatrix4(cube.matrixWorld);

    const projected = worldPos.clone();
    projected.project(camera);

    if (projected.z > 1 || projected.z < -1) {
        element.style.display = 'none';
        return;
    }
    const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    const isOccluded = checkOcclusion(worldPos);
    element.style.display = isOccluded ? 'none' : 'block';

}


window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    renderer.setPixelRatio(window.devicePixelRatio);
});


function animate() {


    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cubeTwo.position.set(1, 2, 0);
    cube.rotation.y -= 0.01;
    // cubeTwo.rotation.y += 0.01;


    renderer.render(scene, camera);
    text.forEach(updateLabel);
};
animate();



const mouse = new THREE.Vector2();

window.addEventListener('click', onClick, false);

let redirectScheduled = false;

function onClick(event) {


    if (redirectScheduled) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([cube]);
    gsap.to(camera.position, {
        delay: 1,
        duration: 1.5,
        x: 0.0001,
        y: .7,
        z: .7,
        ease: "power2.out",
        onUpdate: () => camera.lookAt(target)
    });

    if (intersects.length > 0) {
        console.log("cube clicked");
        const el = document.querySelector(".text-block");


        if (el) {
            void el.offsetWidth;
            el.classList.add("exit");
            el.addEventListener("animationend", function handler() {
                el.style.opacity = "0";
                el.style.pointerEvents = "none";


                el.removeEventListener("animationend", handler);
            });
        }

        redirectScheduled = true;

        setTimeout(() => {
            window.location.replace("./scene-two");
        }, 3000);
    }
}

