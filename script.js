/* =========================================================
   MHLUNGU NICE ❤️
   3D FLOWER GARDEN + 3D BOUQUET
========================================================= */

const opening = document.getElementById("opening");
const garden = document.getElementById("garden");
const bouquet = document.getElementById("bouquet");

const enterBtn = document.getElementById("enterBtn");

const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const song = document.getElementById("song");

const flowerCount = document.getElementById("flowerCount");
const viewBouquetBtn =
  document.getElementById("viewBouquetBtn");

const instruction =
  document.getElementById("instruction");

const backBtn =
  document.getElementById("backBtn");

const topBtn =
  document.getElementById("topBtn");

const bouquetHint =
  document.getElementById("bouquetHint");

const noteCard =
  document.getElementById("noteCard");

const sealBtn =
  document.getElementById("sealBtn");

const sealInitial =
  document.getElementById("sealInitial");

const letterBody =
  document.getElementById("letterBody");

const letterSignature =
  document.getElementById("letterSignature");

const fireflies =
  document.getElementById("fireflies");

const emberField =
  document.getElementById("emberField");


/* =========================================================
   FLOWER TYPES
========================================================= */

const FLOWERS = {

  red: {
    name: "Red rose",
    petal: 0xb72f3b,
    center: 0x741621,
    stem: 0x285c36,
    leaf: 0x347246
  },

  pink: {
    name: "Pink rose",
    petal: 0xe783a3,
    center: 0xa94063,
    stem: 0x285c36,
    leaf: 0x347246
  },

  white: {
    name: "White rose",
    petal: 0xf4eee4,
    center: 0xbda98f,
    stem: 0x285c36,
    leaf: 0x347246
  },

  yellow: {
    name: "Yellow rose",
    petal: 0xe7bd4c,
    center: 0xa77b18,
    stem: 0x285c36,
    leaf: 0x347246
  },

  orange: {
    name: "Orange rose",
    petal: 0xe27b3f,
    center: 0x9c421e,
    stem: 0x285c36,
    leaf: 0x347246
  },

  purple: {
    name: "Purple rose",
    petal: 0x9b70c5,
    center: 0x633c86,
    stem: 0x285c36,
    leaf: 0x347246
  }

};


/* =========================================================
   STATE
========================================================= */

const picked = [];

let gardenScene;
let gardenCamera;
let gardenRenderer;
let gardenClock;

let bouquetScene;
let bouquetCamera;
let bouquetRenderer;
let bouquetClock;

let gardenFlowers = [];
let bouquetFlowers = [];

let gardenRaycaster;
let gardenMouse;

let bouquetRaycaster;
let bouquetMouse;

let selectedFlower = null;

let bouquetRotationY = 0;
let bouquetRotationX = 0;

let draggingBouquet = false;
let previousPointerX = 0;
let previousPointerY = 0;

let topView = false;


/* =========================================================
   OPENING
========================================================= */

createEmbers();
createFireflies();

if (sealInitial) {
  sealInitial.textContent = "M";
}

if (letterSignature) {
  letterSignature.innerHTML =
    "— Bigduggmustfall ❤️";
}

if (letterBody) {

  letterBody.innerHTML = `
    <p>Hey Mhlungu Nice,</p>

    <p>
      I know this week has been a lot,
      so I just wanted to leave you
      something small.
    </p>

    <p>
      If your day is getting hectic or heavy,
      breathe a little slower.
      And if it's good, smile a little longer.
    </p>

    <p>
      I never really find words enough
      to describe how I feel about you.
    </p>

    <p>
      And I didn't see you today,
      but I already know you looked so cute. 😭❤️
    </p>
  `;

}


enterBtn.addEventListener("click", () => {

  opening.classList.add("hidden");

  garden.classList.remove("hidden");

  setTimeout(() => {

    createGarden();

    startMusic();

  }, 100);

});


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

  if (!song) {
    return;
  }

  song.volume = 0.45;

  song.play()
    .then(() => {

      if (musicLabel) {
        musicLabel.textContent = "325";
      }

      musicBtn.setAttribute(
        "aria-pressed",
        "true"
      );

    })
    .catch(() => {

      if (musicLabel) {
        musicLabel.textContent =
          "play 325";
      }

    });

}


if (musicBtn) {

  musicBtn.addEventListener("click", () => {

    if (!song) {
      return;
    }

    if (song.paused) {

      song.play();

      musicBtn.setAttribute(
        "aria-pressed",
        "true"
      );

      if (musicLabel) {
        musicLabel.textContent = "325";
      }

    } else {

      song.pause();

      musicBtn.setAttribute(
        "aria-pressed",
        "false"
      );

      if (musicLabel) {
        musicLabel.textContent = "325";
      }

    }

  });

}


/* =========================================================
   CREATE EMBERS
========================================================= */

function createEmbers() {

  if (!emberField) {
    return;
  }

  for (let i = 0; i < 35; i++) {

    const ember =
      document.createElement("span");

    ember.style.left =
      Math.random() * 100 + "%";

    ember.style.setProperty(
      "--duration",
      5 + Math.random() * 7 + "s"
    );

    ember.style.setProperty(
      "--delay",
      Math.random() * 8 + "s"
    );

    ember.style.setProperty(
      "--drift",
      -40 + Math.random() * 80 + "px"
    );

    emberField.appendChild(ember);

  }

}


/* =========================================================
   CREATE FIREFLIES
========================================================= */

function createFireflies() {

  if (!fireflies) {
    return;
  }

  for (let i = 0; i < 28; i++) {

    const firefly =
      document.createElement("span");

    firefly.style.left =
      Math.random() * 100 + "%";

    firefly.style.top =
      Math.random() * 75 + "%";

    firefly.style.setProperty(
      "--duration",
      5 + Math.random() * 6 + "s"
    );

    firefly.style.setProperty(
      "--delay",
      Math.random() * 5 + "s"
    );

    fireflies.appendChild(firefly);

  }

}


/* =========================================================
   GARDEN
========================================================= */

function createGarden() {

  const container =
    document.getElementById("garden3d");

  if (!container) {
    console.error(
      "garden3d container missing"
    );

    return;
  }

  if (gardenRenderer) {
    return;
  }

  gardenScene =
    new THREE.Scene();

  gardenScene.background =
    new THREE.Color(0x1b1320);

  gardenCamera =
    new THREE.PerspectiveCamera(
      45,
      container.clientWidth /
      container.clientHeight,
      0.1,
      100
    );

  gardenCamera.position.set(
    0,
    3.2,
    10
  );

  gardenCamera.lookAt(
    0,
    2,
    0
  );


  gardenRenderer =
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

  gardenRenderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );

  gardenRenderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  gardenRenderer.outputEncoding =
    THREE.sRGBEncoding;

  container.innerHTML = "";

  container.appendChild(
    gardenRenderer.domElement
  );


  gardenClock =
    new THREE.Clock();


  /* LIGHTING */

  const ambient =
    new THREE.AmbientLight(
      0xffffff,
      1.8
    );

  gardenScene.add(ambient);


  const moonLight =
    new THREE.DirectionalLight(
      0xffe7c2,
      2
    );

  moonLight.position.set(
    -4,
    8,
    5
  );

  gardenScene.add(
    moonLight
  );


  const pinkLight =
    new THREE.PointLight(
      0xd35c78,
      2,
      15
    );

  pinkLight.position.set(
    4,
    4,
    3
  );

  gardenScene.add(
    pinkLight
  );


  /* GROUND */

  const groundGeometry =
    new THREE.CircleGeometry(
      9,
      64
    );

  const groundMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x17251b,
      roughness: 1
    });

  const ground =
    new THREE.Mesh(
      groundGeometry,
      groundMaterial
    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.position.y =
    -0.03;

  gardenScene.add(
    ground
  );


  /* FLOWERS */

  createGardenFlowers();


  /* RAYCASTING */

  gardenRaycaster =
    new THREE.Raycaster();

  gardenMouse =
    new THREE.Vector2();


  gardenRenderer.domElement.addEventListener(
    "pointerdown",
    handleGardenClick
  );


  window.addEventListener(
    "resize",
    resizeGarden
  );


  animateGarden();

}


/* =========================================================
   CREATE GARDEN FLOWERS
========================================================= */

function createGardenFlowers() {

  const positions = [

    [-4.5, 0, 0.3],
    [-2.8, 0, 1.0],
    [-1.1, 0, 0.2],
    [1.0, 0, 0.9],
    [2.8, 0, 0.1],
    [4.4, 0, 0.8]

  ];

  const types = [
    "red",
    "pink",
    "white",
    "yellow",
    "orange",
    "purple"
  ];


  positions.forEach(
    (position, index) => {

      const flower =
        create3DRose(
          types[index]
        );

      flower.position.set(
        position[0],
        position[1],
        position[2]
      );

      flower.rotation.y =
        (Math.random() - 0.5)
        * 0.35;

      flower.userData = {
        type: types[index],
        picked: false,
        growth: 0,
        targetGrowth: 1
      };

      gardenScene.add(
        flower
      );

      gardenFlowers.push(
        flower
      );

    }
  );

}


/* =========================================================
   CREATE 3D ROSE
========================================================= */

function create3DRose(type) {

  const data =
    FLOWERS[type];

  const flower =
    new THREE.Group();


  /* STEM */

  const stemGeometry =
    new THREE.CylinderGeometry(
      0.045,
      0.065,
      4.2,
      12
    );

  const stemMaterial =
    new THREE.MeshStandardMaterial({
      color: data.stem,
      roughness: 0.8
    });

  const stem =
    new THREE.Mesh(
      stemGeometry,
      stemMaterial
    );

  stem.position.y =
    2.1;

  flower.add(
    stem
  );


  /* LEAVES */

  createLeaf(
    flower,
    data.leaf,
    -0.35,
    1.35,
    -0.2,
    -0.55
  );

  createLeaf(
    flower,
    data.leaf,
    0.35,
    2.0,
    0.1,
    0.55
  );


  /* ROSE HEAD */

  const bloom =
    new THREE.Group();

  bloom.position.y =
    4.2;

  flower.add(
    bloom
  );


  /*
   * Build the rose using
   * multiple curved petal-like
   * meshes.
   */

  const petalMaterial =
    new THREE.MeshStandardMaterial({
      color: data.petal,
      roughness: 0.72,
      side: THREE.DoubleSide
    });


  const centerMaterial =
    new THREE.MeshStandardMaterial({
      color: data.center,
      roughness: 0.8
    });


  /* OUTER PETALS */

  for (let i = 0; i < 12; i++) {

    const angle =
      (i / 12) *
      Math.PI *
      2;

    const petal =
      createPetal(
        petalMaterial,
        1.0,
        0.82
      );

    petal.position.set(
      Math.cos(angle) * 0.48,
      0,
      Math.sin(angle) * 0.48
    );

    petal.rotation.y =
      angle;

    petal.rotation.x =
      -0.3;

    bloom.add(
      petal
    );

  }


  /* MIDDLE PETALS */

  for (let i = 0; i < 9; i++) {

    const angle =
      (i / 9) *
      Math.PI *
      2;

    const petal =
      createPetal(
        petalMaterial,
        0.78,
        0.72
      );

    petal.position.set(
      Math.cos(angle) * 0.3,
      0.18,
      Math.sin(angle) * 0.3
    );

    petal.rotation.y =
      angle + 0.35;

    petal.rotation.x =
      -0.55;

    bloom.add(
      petal
    );

  }


  /* INNER PETALS */

  for (let i = 0; i < 6; i++) {

    const angle =
      (i / 6) *
      Math.PI *
      2;

    const petal =
      createPetal(
        petalMaterial,
        0.58,
        0.55
      );

    petal.position.set(
      Math.cos(angle) * 0.16,
      0.34,
      Math.sin(angle) * 0.16
    );

    petal.rotation.y =
      angle;

    petal.rotation.x =
      -0.8;

    bloom.add(
      petal
    );

  }


  /* CENTER */

  const centerGeometry =
    new THREE.SphereGeometry(
      0.22,
      16,
      16
    );

  const center =
    new THREE.Mesh(
      centerGeometry,
      centerMaterial
    );

  center.position.y =
    0.38;

  bloom.add(
    center
  );


  bloom.scale.set(
    0.01,
    0.01,
    0.01
  );


  flower.userData.bloom =
    bloom;


  return flower;

}


/* =========================================================
   PETAL
========================================================= */

function createPetal(
  material,
  width,
  height
) {

  const geometry =
    new THREE.SphereGeometry(
      1,
      18,
      12
    );

  const petal =
    new THREE.Mesh(
      geometry,
      material
    );

  petal.scale.set(
    width,
    height,
    0.22
  );

  return petal;

}


/* =========================================================
   LEAF
========================================================= */

function createLeaf(
  flower,
  color,
  x,
  y,
  z,
  rotation
) {

  const geometry =
    new THREE.SphereGeometry(
      1,
      12,
      8
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.9,
      side: THREE.DoubleSide
    });

  const leaf =
    new THREE.Mesh(
      geometry,
      material
    );

  leaf.scale.set(
    0.5,
    0.12,
    0.22
  );

  leaf.position.set(
    x,
    y,
    z
  );

  leaf.rotation.y =
    rotation;

  flower.add(
    leaf
  );

}


/* =========================================================
   GARDEN CLICK
========================================================= */

function handleGardenClick(event) {

  const rect =
    gardenRenderer
      .domElement
      .getBoundingClientRect();


  gardenMouse.x =
    (
      (event.clientX - rect.left)
      / rect.width
    ) * 2 - 1;


  gardenMouse.y =
    -(
      (event.clientY - rect.top)
      / rect.height
    ) * 2 + 1;


  gardenRaycaster.setFromCamera(
    gardenMouse,
    gardenCamera
  );


  const hits =
    gardenRaycaster.intersectObjects(
      gardenFlowers,
      true
    );


  if (!hits.length) {
    return;
  }


  let flower =
    hits[0].object;


  while (
    flower.parent &&
    !gardenFlowers.includes(flower)
  ) {

    flower =
      flower.parent;

  }


  if (
    !gardenFlowers.includes(flower)
  ) {
    return;
  }


  pickFlower(
    flower
  );

}


/* =========================================================
   PICK FLOWER
========================================================= */

function pickFlower(flower) {

  if (
    flower.userData.picked
  ) {
    return;
  }


  flower.userData.picked =
    true;


  const type =
    flower.userData.type;


  picked.push(type);


  flower.userData.targetGrowth =
    0;


  flower.userData.pickTime =
    performance.now();


  flower.userData.picking =
    true;


  flowerCount.textContent =
    picked.length;


  updateGardenMessage();


  if (
    picked.length >= 1
  ) {

    viewBouquetBtn.disabled =
      false;

  }

}


/* =========================================================
   GARDEN MESSAGE
========================================================= */

function updateGardenMessage() {

  if (picked.length === 1) {

    instruction.textContent =
      "That one looked like you.";

  }

  else if (
    picked.length === 2
  ) {

    instruction.textContent =
      "Okay... I see your taste.";

  }

  else if (
    picked.length === 3
  ) {

    instruction.textContent =
      "Yeah. Now we're making something.";

  }

  else {

    instruction.textContent =
      "Keep picking the ones you like.";

  }

}


/* =========================================================
   GARDEN ANIMATION
========================================================= */

function animateGarden() {

  requestAnimationFrame(
    animateGarden
  );


  if (!gardenRenderer) {
    return;
  }


  const time =
    gardenClock.getElapsedTime();


  gardenFlowers.forEach(
    (flower, index) => {

      const bloom =
        flower.userData.bloom;


      if (
        flower.userData.picking
      ) {

        const elapsed =
          performance.now() -
          flower.userData.pickTime;


        const progress =
          Math.min(
            elapsed / 650,
            1
          );


        const eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );


        flower.scale.set(
          1 - eased,
          1 - eased,
          1 - eased
        );


        flower.position.y =
          -eased * 2.5;


        flower.rotation.z =
          eased * 0.6;

      }


      else {

        const sway =
          Math.sin(
            time * 1.2 +
            index
          ) * 0.035;

        flower.rotation.z =
          sway;

      }


      if (bloom) {

        if (
          !flower.userData.picking
        ) {

          const target =
            flower.userData.targetGrowth;

          const current =
            bloom.scale.x;

          const next =
            THREE.MathUtils.lerp(
              current,
              target,
              0.08
            );

          bloom.scale.set(
            next,
            next,
            next
          );

        }

      }

    }
  );


  gardenRenderer.render(
    gardenScene,
    gardenCamera
  );

}


/* =========================================================
   RESIZE GARDEN
========================================================= */

function resizeGarden() {

  const container =
    document.getElementById(
      "garden3d"
    );

  if (
    !container ||
    !gardenRenderer
  ) {
    return;
  }


  gardenCamera.aspect =
    container.clientWidth /
    container.clientHeight;


  gardenCamera.updateProjectionMatrix();


  gardenRenderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

}


/* =========================================================
   VIEW BOUQUET
========================================================= */

viewBouquetBtn.addEventListener(
  "click",
  () => {

    if (
      picked.length === 0
    ) {
      return;
    }


    garden.classList.add(
      "hidden"
    );

    bouquet.classList.remove(
      "hidden"
    );


    createBouquet();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================================
   BOUQUET
========================================================= */

function createBouquet() {

  const container =
    document.getElementById(
      "bouquet3d"
    );

  if (!container) {

    console.error(
      "bouquet3d container missing"
    );

    return;

  }


  if (
    bouquetRenderer
  ) {

    rebuildBouquet();

    return;

  }


  bouquetScene =
    new THREE.Scene();


  bouquetScene.background =
    new THREE.Color(
      0xe7d9cf
    );


  bouquetCamera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth /
      container.clientHeight,
      0.1,
      100
    );


  bouquetCamera.position.set(
    0,
    4.2,
    12
  );


  bouquetCamera.lookAt(
    0,
    2.7,
    0
  );


  bouquetRenderer =
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });


  bouquetRenderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  bouquetRenderer.setSize(
    container.clientWidth,
    container.clientHeight
  );


  bouquetRenderer.outputEncoding =
    THREE.sRGBEncoding;


  container.innerHTML = "";

  container.appendChild(
    bouquetRenderer.domElement
  );


  bouquetClock =
    new THREE.Clock();


  /* LIGHTS */

  const ambient =
    new THREE.AmbientLight(
      0xffffff,
      2
    );

  bouquetScene.add(
    ambient
  );


  const key =
    new THREE.DirectionalLight(
      0xfff0dd,
      3
    );

  key.position.set(
    -5,
    9,
    6
  );

  bouquetScene.add(
    key
  );


  const fill =
    new THREE.DirectionalLight(
      0xffb8c5,
      1.5
    );

  fill.position.set(
    5,
    4,
    -4
  );

  bouquetScene.add(
    fill
  );


  /* TABLE */

  const tableGeometry =
    new THREE.CircleGeometry(
      8,
      64
    );

  const tableMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xd8c5b6,
      roughness: 0.95
    });

  const table =
    new THREE.Mesh(
      tableGeometry,
      tableMaterial
    );

  table.rotation.x =
    -Math.PI / 2;

  table.position.y =
    -0.1;

  bouquetScene.add(
    table
  );


  bouquetRaycaster =
    new THREE.Raycaster();

  bouquetMouse =
    new THREE.Vector2();


  rebuildBouquet();


  /* DRAG */

  bouquetRenderer.domElement.addEventListener(
    "pointerdown",
    startBouquetDrag
  );

  bouquetRenderer.domElement.addEventListener(
    "pointermove",
    moveBouquetDrag
  );

  bouquetRenderer.domElement.addEventListener(
    "pointerup",
    endBouquetDrag
  );

  bouquetRenderer.domElement.addEventListener(
    "pointercancel",
    endBouquetDrag
  );


  window.addEventListener(
    "resize",
    resizeBouquet
  );


  animateBouquet();

}


/* =========================================================
   BUILD BOUQUET
========================================================= */

function rebuildBouquet() {

  bouquetFlowers.forEach(
    flower => {

      bouquetScene.remove(
        flower
      );

    }
  );


  bouquetFlowers = [];


  const total =
    picked.length;


  picked.forEach(
    (type, index) => {

      const flower =
        create3DRose(
          type
        );


      const center =
        (total - 1) / 2;


      const distance =
        index - center;


      flower.position.x =
        distance * 0.9;


      flower.position.z =
        Math.abs(distance)
        * 0.18;


      flower.position.y =
        0;


      flower.rotation.z =
        distance * 0.12;


      flower.rotation.y =
        distance * 0.08;


      flower.userData.targetGrowth =
        1;


      flower.userData.growth =
        0;


      flower.scale.set(
        0.01,
        0.01,
        0.01
      );


      bouquetScene.add(
        flower
      );


      bouquetFlowers.push(
        flower
      );

    }
  );


  bouquetHint.textContent =
    total === 1
      ? "one flower. still pretty."
      : "drag the bouquet around.";

}


/* =========================================================
   BOUQUET ANIMATION
========================================================= */

function animateBouquet() {

  requestAnimationFrame(
    animateBouquet
  );


  if (
    !bouquetRenderer
  ) {
    return;
  }


  bouquetFlowers.forEach(
    (flower, index) => {

      const current =
        flower.scale.x;


      const next =
        THREE.MathUtils.lerp(
          current,
          1,
          0.055
        );


      flower.scale.set(
        next,
        next,
        next
      );


      const bloom =
        flower.userData.bloom;


      if (bloom) {

        const currentBloom =
          bloom.scale.x;


        const nextBloom =
          THREE.MathUtils.lerp(
            currentBloom,
            1,
            0.06
          );


        bloom.scale.set(
          nextBloom,
          nextBloom,
          nextBloom
        );

      }


      if (!draggingBouquet) {

        flower.rotation.z +=
          Math.sin(
            performance.now() * 0.001 +
            index
          ) * 0.00003;

      }

    }
  );


  bouquetRenderer.render(
    bouquetScene,
    bouquetCamera
  );

}


/* =========================================================
   BOUQUET DRAG
========================================================= */

function startBouquetDrag(event) {

  draggingBouquet = true;

  previousPointerX =
    event.clientX;

  previousPointerY =
    event.clientY;


  bouquetRenderer
    .domElement
    .setPointerCapture(
      event.pointerId
    );

}


function moveBouquetDrag(event) {

  if (
    !draggingBouquet ||
    topView
  ) {
    return;
  }


  const deltaX =
    event.clientX -
    previousPointerX;


  const deltaY =
    event.clientY -
    previousPointerY;


  bouquetRotationY +=
    deltaX * 0.008;


  bouquetRotationX +=
    deltaY * 0.006;


  bouquetRotationX =
    Math.max(
      -0.5,
      Math.min(
        1.15,
        bouquetRotationX
      )
    );


  bouquetFlowers.forEach(
    flower => {

      flower.rotation.y =
        bouquetRotationY;

      flower.rotation.x =
        bouquetRotationX;

    }
  );


  previousPointerX =
    event.clientX;

  previousPointerY =
    event.clientY;

}


function endBouquetDrag() {

  draggingBouquet =
    false;

}


/* =========================================================
   TOP VIEW
========================================================= */

topBtn.addEventListener(
  "click",
  () => {

    topView = true;

    bouquetHint.textContent =
      "top view.";


    bouquetFlowers.forEach(
      flower => {

        flower.rotation.x =
          Math.PI * 0.72;

        flower.rotation.y =
          0;

      }
    );


    setTimeout(
      () => {

        topView = false;

        bouquetHint.textContent =
          "drag the bouquet around.";

      },
      2500
    );

  }
);


/* =========================================================
   BACK TO GARDEN
========================================================= */

backBtn.addEventListener(
  "click",
  () => {

    bouquet.classList.add(
      "hidden"
    );

    garden.classList.remove(
      "hidden"
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================================
   RESIZE BOUQUET
========================================================= */

function resizeBouquet() {

  const container =
    document.getElementById(
      "bouquet3d"
    );


  if (
    !container ||
    !bouquetRenderer
  ) {
    return;
  }


  bouquetCamera.aspect =
    container.clientWidth /
    container.clientHeight;


  bouquetCamera.updateProjectionMatrix();


  bouquetRenderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

}


/* =========================================================
   LOVE LETTER
========================================================= */

if (sealBtn) {

  sealBtn.addEventListener(
    "click",
    () => {

      if (
        noteCard.classList.contains(
          "opened"
        )
      ) {
        return;
      }


      sealBtn.classList.add(
        "cracking"
      );


      setTimeout(
        () => {

          noteCard.classList.add(
            "opened"
          );

        },
        250
      );

    }
  );

}
