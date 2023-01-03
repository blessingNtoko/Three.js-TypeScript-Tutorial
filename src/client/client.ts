import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';

// a scene is a tree like structure of Meshes, Lights, Groups, 3D Positions, Cameras(optional)
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(1));
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

const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', render);

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

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
const cubeRotationFolder = gui.addFolder("Rotation");
const cubePositionFolder = gui.addFolder("Position");
const cubeScaleFolder = gui.addFolder("Scale");
cubeFolder.add(cube, "visible");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubePositionFolder.add(cube.position, "x", -10, 10, 2);
cubePositionFolder.add(cube.position, "y", -10, 10, 2);
cubePositionFolder.add(cube.position, "z", -10, 10, 2);
cubeScaleFolder.add(cube.scale, "x", -5, 5, 2);
cubeScaleFolder.add(cube.scale, "y", -5, 5, 2);
cubeScaleFolder.add(cube.scale, "z", -5, 5, 2);
cubeFolder.open();
cubeRotationFolder.open();
cubePositionFolder.open();
cubeScaleFolder.open();

function animate() {
    // cube.rotation.x += .02;
    // cube.rotation.y += .02;

    render();
    requestAnimationFrame(animate);
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();
// render();
