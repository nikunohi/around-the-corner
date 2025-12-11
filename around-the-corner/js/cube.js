
// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
cssRenderer.domElement.style.left = '0';
cssRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(cssRenderer.domElement);




// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models



// ~~~~~~~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const occlusionTestObjects = [];


const cubeText = document.createElement('div');
cubeText.textContent = "lorem ipsum";
cubeText.style.color = 'white';
cubeText.style.fontSize = '.05rem';


const textObject = new CSS3DObject(cubeText);

textObject.position.set(0.51, 0, 0);
cube.add(textObject);




const raycaster = new THREE.Raycaster();
const worldP = new THREE.Vector3();
const camP = new THREE.Vector3();
const dir = new THREE.Vector3();


const faceNormalLocal = new THREE.Vector3(1, 0, 0); 
const faceNormalWorld = new THREE.Vector3();
const camDir = new THREE.Vector3();

function textOcclusion() {
    textObject.getWorldPosition(worldP);

    faceNormalWorld.copy(faceNormalLocal).applyQuaternion(cube.quaternion).normalize();

    camDir.subVectors(camera.position, worldP).normalize();

    const faceFacingCamera = faceNormalWorld.dot(camDir) > 0;

    if (!faceFacingCamera) {
        return true;
    }

    if (occlusionTestObjects.length > 0) {
        camP.copy(camera.position);
        dir.subVectors(worldP, camP).normalize();
        raycaster.set(camP, dir);

        const intersections = raycaster.intersectObjects(occlusionTestObjects, true);
        if (intersections.length > 0) {
            const hit = intersections[0];
            const distanceHit = hit.distance;
            const distanceOverall = camP.distanceTo(worldP);
            const epsilon = 1e-3;

            if (distanceHit + epsilon < distanceOverall) {
                return true;
            }
        }
    }

    return false;
}

function updateTextVisibility() {
    const isOccluded = textOcclusion();
    cubeText.style.display = isOccluded ? 'none' : 'block';
}

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    // camera.position.z += .03;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    updateTextVisibility();

    // always end animation loop with renderer
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
}

animate(); // execute animation function



window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    cssRenderer.setSize(width, height);
});
