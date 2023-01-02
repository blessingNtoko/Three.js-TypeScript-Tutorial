import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// a scene is a tree like structure of Meshes, Lights, Groups, 3D Positions, Cameras(optional)
const scene = new THREE.Scene();
// a camera describes the view boundaries of the scene within the Frustum dimensions
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    .1,
    1000
);
camera.position.z = 2;

// Renderer takes all the data from the scene and camera and puts it on as HTML canvas
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
});

function animate() {
    cube.rotation.x += .01;
    cube.rotation.y += .01;

    render();
    requestAnimationFrame(animate);
}

function render() {
    renderer.render(scene, camera);
}

animate();