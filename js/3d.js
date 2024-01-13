import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, scene, renderer;
let object;

const startWidth = 300;

init();

function init() {
  camera = new THREE.PerspectiveCamera(45, startWidth / 610, 0.1, 20);
  camera.position.z = 2.5;

  // scene

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 15);
  camera.add(pointLight);
  scene.add(camera);

  // manager

  function loadModel() {
    object.position.y = 0;
    object.scale.setScalar(0.2);

    scene.add(object);

    animate(); // Start animation loop
  }

  const manager = new THREE.LoadingManager(loadModel);

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(
        "model " + percentComplete.toFixed(2) + "% downloaded",
      );
    }
  }

  function onError() { }

  const loader = new OBJLoader(manager);
  loader.load(
    "../assets/models/kijkgat_old.obj",
    function (obj) {
      object = obj;
    },
    onProgress,
    onError,
  );

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(new THREE.Color("#FFFDF4")); // Set background color
  renderer.setSize(startWidth, 610);

  const kijkgat = document.getElementById("kijkgat");

  if (kijkgat) {
    kijkgat.appendChild(renderer.domElement);
  }

  //

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2;
  controls.maxDistance = 5;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.addEventListener("change", render);

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Add a small rotation to the object
  if (object) {
    object.rotation.y += 0.005;
  }

  render();
}

function render() {
  renderer.render(scene, camera);
}