const pages = {
  opening: document.getElementById("opening"),
  garden: document.getElementById("garden"),
  bouquet: document.getElementById("bouquet")
};

const enterBtn = document.getElementById("enterBtn");
const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("song");

const flowers = [...document.querySelectorAll(".flower")];
const flowerCount = document.getElementById("flowerCount");
const viewBouquetBtn = document.getElementById("viewBouquetBtn");
const bouquetFlowers = document.getElementById("bouquetFlowers");

const backBtn = document.getElementById("backBtn");
const topBtn = document.getElementById("topBtn");
const bouquetStage = document.getElementById("bouquetStage");
const bouquetHint = document.getElementById("bouquetHint");
const instruction = document.getElementById("instruction");

const noteCard = document.getElementById("noteCard");
const sealBtn = document.getElementById("sealBtn");

const picked = [];

let rotationY = 0;
let dragging = false;
let startX = 0;


/* =========================================
   PAGE CONTROL
========================================= */

function showPage(page) {

  Object.values(pages).forEach(pageElement => {
    pageElement.classList.add("hidden");
  });

  page.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =========================================
   OPENING
========================================= */

enterBtn.addEventListener("click", () => {

  showPage(pages.garden);

  song.volume = 0.45;

  song.play()
    .then(() => {
      musicBtn.setAttribute("aria-pressed", "true");
      document.getElementById("musicLabel").textContent = "325";
    })
    .catch(() => {
      document.getElementById("musicLabel").textContent = "play 325";
    });

});


/* =========================================
   MUSIC
========================================= */

musicBtn.addEventListener("click", () => {

  if (song.paused) {

    song.play();

    musicBtn.setAttribute("aria-pressed", "true");

  } else {

    song.pause();

    musicBtn.setAttribute("aria-pressed", "false");

  }

});


/* =========================================
   CREATE PETALS
========================================= */

function createPetals(x, y, type) {

  for (let i = 0; i < 7; i++) {

    const petal = document.createElement("span");

    petal.className = `picked-petal petal-${type}`;

    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;

    petal.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 160}px`
    );

    petal.style.setProperty(
      "--y",
      `${Math.random() * 100 + 30}px`
    );

    petal.style.setProperty(
      "--rotate",
      `${Math.random() * 360}deg`
    );

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 1200);
  }

}


/* =========================================
   PICK FLOWER
========================================= */

flowers.forEach(flower => {

  flower.addEventListener("click", event => {

    if (flower.classList.contains("picked")) {
      return;
    }

    const type = flower.dataset.flower;

    picked.push(type);

    const rect = flower.getBoundingClientRect();

    createPetals(
      rect.left + rect.width / 2,
      rect.top + 45,
      type
    );

    flower.classList.add("picked");

    flower.style.pointerEvents = "none";

    flowerCount.textContent = picked.length;

    if (picked.length === 1) {

      instruction.textContent =
        "That one's yours.";

    }

    else if (picked.length === 2) {

      instruction.textContent =
        "Okay... I see your taste.";

    }

    else if (picked.length === 3) {

      instruction.textContent =
        "Now we're getting somewhere.";

    }

    else if (picked.length >= 4) {

      instruction.textContent =
        "Okay Mhlungu... you're building a whole garden.";

    }

    viewBouquetBtn.disabled = false;

    viewBouquetBtn.textContent =
      "view your bouquet →";

  });

});


/* =========================================
   VIEW BOUQUET
========================================= */

viewBouquetBtn.addEventListener("click", () => {

  if (picked.length === 0) {
    return;
  }

  buildBouquet();

  showPage(pages.bouquet);

});


/* =========================================
   BACK TO GARDEN
========================================= */

backBtn.addEventListener("click", () => {

  showPage(pages.garden);

});


/* =========================================
   BOUQUET
========================================= */

function buildBouquet() {

  bouquetFlowers.innerHTML = "";

  rotationY = 0;

  bouquetFlowers.style.transform =
    "rotateX(4deg) rotateY(0deg)";


  picked.forEach((type, index) => {

    const flower =
      document.createElement("div");

    flower.className =
      `bouquet-flower rose-${type}`;


    const total = picked.length;

    const middle =
      (total - 1) / 2;

    const distance =
      index - middle;


    const spread =
      distance * 34;


    const rotation =
      distance * 7;


    const height =
      Math.abs(distance) * 5;


    flower.style.setProperty(
      "--spread",
      `${spread}px`
    );

    flower.style.setProperty(
      "--rotation",
      `${rotation}deg`
    );

    flower.style.setProperty(
      "--height",
      `${height}px`
    );


    flower.innerHTML = `

      <div class="bouquet-stem"></div>

      <div class="bouquet-leaf left"></div>

      <div class="bouquet-leaf right"></div>

      <div class="bouquet-bloom">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <div class="flower-center"></div>

      </div>

    `;


    bouquetFlowers.appendChild(flower);

  });


  bouquetHint.textContent =
    picked.length === 1
      ? "one flower. still pretty."
      : "drag the bouquet around.";

  setTimeout(() => {

    document.getElementById("ribbonBow")
      .classList.add("tied");

  }, 450);

}


/* =========================================
   DRAG BOUQUET
========================================= */

bouquetStage.addEventListener("pointerdown", event => {

  dragging = true;

  startX = event.clientX;

  bouquetStage.setPointerCapture(
    event.pointerId
  );

});


bouquetStage.addEventListener("pointermove", event => {

  if (!dragging) {
    return;
  }

  const delta =
    event.clientX - startX;

  rotationY += delta * 0.5;

  bouquetFlowers.style.transform =
    `
      rotateX(4deg)
      rotateY(${rotationY}deg)
    `;

  startX = event.clientX;

});


bouquetStage.addEventListener("pointerup", () => {

  dragging = false;

});


bouquetStage.addEventListener("pointercancel", () => {

  dragging = false;

});


/* =========================================
   TOP VIEW
========================================= */

topBtn.addEventListener("click", () => {

  bouquetFlowers.style.transform =
    `
      rotateX(70deg)
      rotateY(0deg)
      translateY(-20px)
    `;

  bouquetHint.textContent =
    "top view.";

});


/* =========================================
   WAX SEAL
========================================= */

sealBtn.addEventListener("click", () => {

  if (noteCard.classList.contains("opened")) {
    return;
  }

  sealBtn.classList.add("cracking");

  setTimeout(() => {

    noteCard.classList.add("opened");

  }, 350);

});


/* =========================================
   FIRELIES
========================================= */

function createFireflies() {

  const container =
    document.getElementById("fireflies");

  for (let i = 0; i < 25; i++) {

    const fly =
      document.createElement("span");

    fly.style.left =
      `${Math.random() * 100}%`;

    fly.style.top =
      `${30 + Math.random() * 55}%`;

    fly.style.setProperty(
      "--dur",
      `${5 + Math.random() * 6}s`
    );

    fly.style.animationDelay =
      `${Math.random() * 5}s`;

    container.appendChild(fly);

  }

}


/* =========================================
   EMBERS
========================================= */

function createEmbers() {

  const container =
    document.getElementById("emberField");

  for (let i = 0; i < 35; i++) {

    const ember =
      document.createElement("span");

    ember.style.left =
      `${Math.random() * 100}%`;

    ember.style.animationDuration =
      `${5 + Math.random() * 8}s`;

    ember.style.animationDelay =
      `${Math.random() * 8}s`;

    ember.style.setProperty(
      "--drift",
      `${(Math.random() - 0.5) * 100}px`
    );

    container.appendChild(ember);

  }

}


createFireflies();
createEmbers();
