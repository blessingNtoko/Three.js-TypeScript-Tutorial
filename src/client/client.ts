import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

// a scene is a tree like structure of Meshes, Lights, Groups, 3D Positions, Cameras(optional)
const scene: THREE.Scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));
// a camera describes the view boundaries of the scene within the Frustum dimensions
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer takes all the data from the scene and camera and puts it on as HTML canvas
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry();
const torusKnotGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry();

const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
//   wireframe: false,
  wireframe: true,
});
// const material: THREE.MeshBasicMaterial = new THREE.MeshNormalMaterial();

const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);

const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 3;
scene.add(sphere);

const icosahedron: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 0;
scene.add(icosahedron);

const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
scene.add(plane);

const torusKnot: THREE.Mesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = -5;
scene.add(torusKnot);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
});

const stats: Stats = Stats();
document.body.appendChild(stats.dom);

// const options = {
//     side: {
//         "FrontSide": THREE.FrontSide,
//         "BackSide": THREE.BackSide,
//         "DoubleSide": THREE.DoubleSide,
//     }
// }

const gui: GUI = new GUI();
const materialFolder: GUI = gui.addFolder("THREE.Material");
// materialFolder.add(material, "transparent").onChange(() => material.needsUpdate = true);
// materialFolder.add(material, "opacity", 0, 1, .01);
// materialFolder.add(material, "depthTest");
// materialFolder.add(material, "depthWrite");
// materialFolder.add(material, "alphaTest", 0, 1, .01).onChange(() => updateMaterial());
// materialFolder.add(material, "visible");
// materialFolder.add(material, "side", options.side).onChange(() => updateMaterial());
materialFolder.open();

function updateMaterial(): void {
    material.side = Number(material.side);
    material.needsUpdate = true;
}

function animate(): void {
  //   controls.update();
  render();
  stats.update();
  requestAnimationFrame(animate);
}

function render(): void {
  renderer.render(scene, camera);
}

animate();
// render();
