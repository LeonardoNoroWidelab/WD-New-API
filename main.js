import * as THREE from 'three';

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

let container;
let scene, renderer, mesh;
let cameraRig;
let cameraOrtho;
const frustumSize = 600;
let mouseX, mouseY;

init();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();

  //
  cameraOrtho = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    150,
    1000
  );

  // By default, Three.js cameras look down the negative Z-axis, but depending on how the camera rig is set up,
  // the scene or objects may be oriented differently. Rotating the orthographic camera by Math.PI around the Y-axis
  // ensures that the camera's forward direction matches the intended scene orientation, effectively flipping its view
  // to align with the rest of the scene.

  cameraOrtho.rotation.y = Math.PI;

  cameraRig = new THREE.Group();

  cameraRig.add(cameraOrtho);

  scene.add(cameraRig);

  // This mesh is used as a target for camera movement and is intentionally invisible.
  mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({ color: 0x000000, visible: false })
  );
  scene.add(mesh);

  // Cria o fundo estrelado, colocando pontos aleatórios no meio do espaço

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i < 10000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
  }

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0x888888 })
  );
  scene.add(particles);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.setAnimationLoop(render);
  container.appendChild(renderer.domElement);

  // Debounce the resize event handler to improve performance
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(onWindowResize, 150);
  });
}

//

function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  cameraOrtho.left = (frustumSize * aspect) / -2;
  cameraOrtho.right = (frustumSize * aspect) / 2;
  cameraOrtho.top = frustumSize / 2;
  cameraOrtho.bottom = frustumSize / -2;
  cameraOrtho.updateProjectionMatrix();
}

let lastMouseX, lastMouseY;

function render() {
  const r = Date.now() * 0.0001;

  lastMouseX =
    lastMouseX !== mouseX && mouseX > 50 ? mouseX / 2 : 700 * Math.cos(r);
  lastMouseY = lastMouseY !== mouseY && mouseY > 50 ? mouseY / 2 : 0;

  mesh.position.x = lastMouseX;
  mesh.position.z = 700 * Math.sin(r);
  mesh.position.y = lastMouseY;

  cameraOrtho.far = mesh.position.length();
  cameraOrtho.updateProjectionMatrix();

  cameraRig.lookAt(mesh.position);

  // renderer.setClearColor(0x000000, 1);
  // renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.render(scene, cameraOrtho);
}

onmousemove = function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
};
