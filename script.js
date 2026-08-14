const opening =
  document.getElementById("opening");

const garden =
  document.getElementById("garden");

const bouquet =
  document.getElementById("bouquet");


const enterBtn =
  document.getElementById("enterBtn");

const musicBtn =
  document.getElementById("musicBtn");

const song =
  document.getElementById("song");


const flowers =
  [...document.querySelectorAll(".flower")];

const flowerCount =
  document.getElementById("flowerCount");

const viewBouquetBtn =
  document.getElementById("viewBouquetBtn");

const bouquetFlowers =
  document.getElementById("bouquetFlowers");

const backBtn =
  document.getElementById("backBtn");

const topBtn =
  document.getElementById("topBtn");

const bouquetStage =
  document.getElementById("bouquetStage");

const bouquetHint =
  document.getElementById("bouquetHint");

const instruction =
  document.getElementById("instruction");


/*
=========================
FLOWERS SHE PICKED
=========================
*/

const picked = [];


/*
=========================
OPEN WEBSITE
=========================
*/

enterBtn.addEventListener(
  "click",
  () => {

    opening.classList.add(
      "hidden"
    );

    garden.classList.remove(
      "hidden"
    );


    /*
    Browser-friendly
    music start.
    */

    song.volume = 0.45;

    song.play()
      .then(() => {

        musicBtn.textContent =
          "♫ playing";

      })
      .catch(() => {

        musicBtn.textContent =
          "♫ play 325";

      });

  }
);


/*
=========================
MUSIC
=========================
*/

musicBtn.addEventListener(
  "click",
  () => {

    if (song.paused) {

      song.play();

      musicBtn.textContent =
        "♫ playing";

    }

    else {

      song.pause();

      musicBtn.textContent =
        "♫ 325";

    }

  }
);


/*
=========================
PICK FLOWERS
=========================
*/

flowers.forEach(
  (flower) => {

    flower.addEventListener(
      "click",
      () => {

        /*
        Don't allow
        picking the same
        flower twice.
        */

        if (
          flower.classList.contains(
            "picked"
          )
        ) {

          return;

        }


        const type =
          flower.dataset.flower;


        /*
        Save flower
        */

        picked.push(type);


        /*
        Animate flower
        */

        flower.classList.add(
          "picked"
        );


        /*
        Update counter
        */

        flowerCount.textContent =
          picked.length;


        /*
        Small human message
        */

        if (
          picked.length === 1
        ) {

          instruction.textContent =
            "That one's yours. Keep going if you want.";

        }


        if (
          picked.length === 2
        ) {

          instruction.textContent =
            "Okay... I see your taste.";

        }


        if (
          picked.length >= 3
        ) {

          instruction.textContent =
            "Yeah, now we're making a bouquet.";

          viewBouquetBtn.disabled =
            false;

          viewBouquetBtn.textContent =
            "view your bouquet →";

        }

      }
    );

  }
);


/*
=========================
VIEW BOUQUET
=========================
*/

viewBouquetBtn.addEventListener(
  "click",
  () => {

    garden.classList.add(
      "hidden"
    );

    bouquet.classList.remove(
      "hidden"
    );


    buildBouquet();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/*
=========================
BACK TO GARDEN
=========================
*/

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


/*
=========================
BUILD BOUQUET
=========================
*/

function buildBouquet() {

  bouquetFlowers.innerHTML = "";


  /*
  Spread flowers
  depending on how
  many she picked.
  */

  const spacing =
    picked.length === 1
      ? 0
      : 24;


  picked.forEach(
    (type, index) => {

      const flower =
        document.createElement(
          "div"
        );


      flower.className =
        `bouquet-flower rose-${type}`;


      /*
      Position flowers
      naturally.
      */

      const spread =
        (
          index -
          (picked.length - 1) / 2
        ) * spacing;


      const height =
        Math.abs(
          index -
          (picked.length - 1) / 2
        ) * 5;


      const rotation =
        (
          index % 2 === 0
            ? -1
            : 1
        ) *
        (
          5 +
          index * 1.5
        );


      flower.style.transform =
        `
        translateX(
          calc(
            -50% +
            ${spread}px
          )
        )

        translateY(
          ${height}px
        )

        rotate(
          ${rotation}deg
        )
        `;


      /*
      Create flower.
      */

      flower.innerHTML = `

        <span class="stem"></span>

        <span
          class="leaf leaf-left">
        </span>

        <span
          class="leaf leaf-right">
        </span>

        <span class="bloom"></span>

      `;


      bouquetFlowers.appendChild(
        flower
      );

    }
  );


  if (picked.length === 1) {

    bouquetHint.textContent =
      "one flower, still pretty.";

  }

  else {

    bouquetHint.textContent =
      "drag it around.";

  }

}


/*
=========================
BOUQUET ROTATION
=========================
*/

let dragging =
  false;

let startX =
  0;

let rotationY =
  0;


bouquetStage.addEventListener(
  "pointerdown",
  (event) => {

    dragging = true;

    startX =
      event.clientX;

    bouquetStage.setPointerCapture(
      event.pointerId
    );

  }
);


bouquetStage.addEventListener(
  "pointermove",
  (event) => {

    if (!dragging) {
      return;
    }


    const delta =
      event.clientX -
      startX;


    rotationY +=
      delta * 0.45;


    bouquetFlowers.style.transform =
      `
      rotateX(4deg)
      rotateY(${rotationY}deg)
      `;


    startX =
      event.clientX;

  }
);


bouquetStage.addEventListener(
  "pointerup",
  () => {

    dragging = false;

  }
);


bouquetStage.addEventListener(
  "pointercancel",
  () => {

    dragging = false;

  }
);


/*
=========================
TOP VIEW
=========================
*/

topBtn.addEventListener(
  "click",
  () => {

    bouquetFlowers.style.transform =
      `
      rotateX(72deg)
      rotateY(0deg)
      translateY(-15px)
      `;


    bouquetHint.textContent =
      "top view.";


    setTimeout(
      () => {

        bouquetFlowers.style.transform =
          `
          rotateX(4deg)
          rotateY(0deg)
          `;

        bouquetHint.textContent =
          "drag it around.";

      },

      2200
    );

  }
);
