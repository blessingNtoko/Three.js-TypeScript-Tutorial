import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { DragControls } from "three/examples/jsm/controls/DragControls";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight();
light.position.set(2.5, 7.5, 15);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const material = new THREE.MeshNormalMaterial();

const modelArray = ["models/monke2.obj", "models/cube.obj", "models/monke.obj"];

const objLoader = new OBJLoader();

for (let i = -3, j = 0; i <= 3; i += 3, j++) {
  objLoader.load(
    modelArray[j],
    (object) => {
      console.log("3D Object :: ", object);
      object.position.x = i;
      object.traverse(function (child) {
        console.log("Traversing | child :: ", child);
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = material;
        }
      });

      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );
}

// objLoader.load(
//   "models/monke2.obj",
//   (object) => {
//     console.log("Monke Object :: ", object);
//     const dragControls = new DragControls([object], camera, renderer.domElement);

//     dragControls.addEventListener("dragstart", () => {
//       controls.enabled = false;
//     });
//     dragControls.addEventListener("dragend", () => {
//       controls.enabled = true;
//     });

//     // (object.children[0] as THREE.Mesh).material = material;
//     // object.traverse(function (child) {
//     //   console.log("Traversing | child :: ", child);
//     //   if ((child as THREE.Mesh).isMesh) {
//     //     (child as THREE.Mesh).material = material;
//     //   }
//     // });
//     scene.add(object);
//   },
//   (xhr) => {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   (error) => {
//     console.log(error);
//   }
// );

console.log("Async example, the 3D object will be after me.");

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

function animate(): void {
  requestAnimationFrame(animate);

  controls.update();

  render();

  stats.update();
}

function render(): void {
  renderer.render(scene, camera);
}

animate();
