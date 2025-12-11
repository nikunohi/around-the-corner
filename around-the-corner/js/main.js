
// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~
const text = document.getElementById('cube-text-1');

const text2 = document.getElementById('cube-text-2');


const text3 = document.getElementById('cube-text-3');

const cubeLocalAnchor1 = new THREE.Vector3(0.5, 0, 0);
const cubeLocalAnchor2 = new THREE.Vector3(0, 0, -0.5);
const cubeLocalAnchor3 = new THREE.Vector3(-.5, 0, 0);

const cubeWorldAnchor = new THREE.Vector3();
const projected = new THREE.Vector3();

const raycaster = new THREE.Raycaster();



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



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
renderer.setClearColor(0x000000, 0);
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



function updateTextPositionAndVisibility() {
    cubeWorldAnchor.copy(cubeLocalAnchor1).applyMatrix4(cube.matrixWorld);

    projected.copy(cubeWorldAnchor);
    projected.project(camera);

    if (projected.z > 1 || projected.z < -1) {

        text.style.display = 'none';
        return;
    }

    const x = (projected.x * .5 + .5) * window.innerWidth;
    const y = (- projected.y * .5 + .5) * window.innerHeight;


    text.style.left = `${x}px`;
    text.style.top = `${y}px`;

    const isOccluded = checkOcclusion(cubeWorldAnchor);
    text.style.display = isOccluded ? 'none' : 'block';

}

function updateTextPositionAndVisibility2() {
    cubeWorldAnchor.copy(cubeLocalAnchor2).applyMatrix4(cube.matrixWorld);

    projected.copy(cubeWorldAnchor);
    projected.project(camera);

    if (projected.z > 1 || projected.z < -1) {

        text2.style.display = 'none';

        return;
    }

    const x = (projected.x * .5 + .5) * window.innerWidth;
    const y = (- projected.y * .5 + .5) * window.innerHeight;


    text2.style.left = `${x}px`;
    text2.style.top = `${y}px`;


    const isOccluded = checkOcclusion(cubeWorldAnchor);

    text2.style.display = isOccluded ? 'none' : 'block';

}


function updateTextPositionAndVisibility3() {
    cubeWorldAnchor.copy(cubeLocalAnchor3).applyMatrix4(cube.matrixWorld);

    projected.copy(cubeWorldAnchor);
    projected.project(camera);

    if (projected.z > 1 || projected.z < -1) {

        text2.style.display = 'none';

        return;
    }

    const x = (projected.x * .5 + .5) * window.innerWidth;
    const y = (- projected.y * .5 + .5) * window.innerHeight;


    text3.style.left = `${x}px`;
    text3.style.top = `${y}px`;


    const isOccluded = checkOcclusion(cubeWorldAnchor);

    text3.style.display = isOccluded ? 'none' : 'block';

}


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
    if (distToHit + epsilon < distToTarget) {
        return true;

    }
    return false;
}

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)


// const target = new THREE.Vector3(0, 0, 0);

// camera.lookAt(target);


// let zoomStart = null;
// const zoomDelay = 2000;
// const zoomDuration = 2000;
// let animationStart = false;


// function animate() {
//     requestAnimationFrame(animate); 


//     const present = performance.now();


//     if (!animationStart && present > zoomDelay) {
//         zoomStart = present;
//         animationStart = true;
//     }


//     if (animationStart) {
//         const t = Math.min((present - zoomStart) / zoomDuration, 1);

//         const ease = 1-Math.pow(1 - t, 3);

//         const direction = new THREE.Vector3()
//             .subVectors(target, camera.position)
//             .normalize();

//         const zoomDistance = .03;

//         if (ease < 1) {
//             camera.position.addScaledVector(direction, zoomDistance * ease);
//             camera.lookAt(target);
//         }
//     }



//     cube.rotation.y -= 0.01;




//     camera.lookAt(target);

//     updateTextPositionAndVisibility();
//     updateTextPositionAndVisibility2();
//     updateTextPositionAndVisibility3();


//     renderer.render(scene, camera);
// }



function animate() {
    

    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cubeTwo.position.set(1, 2, 0);
    cube.rotation.y += 0.01;
    // cubeTwo.rotation.y += 0.01;

    updateTextPositionAndVisibility();
    updateTextPositionAndVisibility2();
    updateTextPositionAndVisibility3();

    renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    renderer.setPixelRatio(window.devicePixelRatio);
});


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
        delay: 2,
        duration: 1.5,
        x: 0.0001,
        y: .7,
        z: .7,
        ease: "power2.out",
        onUpdate: () => camera.lookAt(target)
    });

    if (intersects.length > 0) {
        console.log("cube clicked");

        redirectScheduled = true;

        setTimeout(() => {
            window.location.replace("../scene-two");
        }, 4500);
    }
}

