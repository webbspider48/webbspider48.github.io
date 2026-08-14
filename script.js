/* =====================================================
   MHLUNGU NICE — LITTLE LOVE LETTER
===================================================== */


/* =========================
   ELEMENTS
========================= */

const openingPage =
  document.getElementById("openingPage");

const letterPage =
  document.getElementById("letterPage");

const openButton =
  document.getElementById("openButton");

const musicButton =
  document.getElementById("musicButton");

const particles =
  document.getElementById("particles");

const reveals =
  [...document.querySelectorAll(".reveal")];


/* =========================
   CREATE BACKGROUND PARTICLES
========================= */

function createParticles() {

  for (let i = 0; i < 32; i++) {

    const particle =
      document.createElement("span");

    particle.className =
      "particle";

    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.animationDuration =
      `${7 + Math.random() * 8}s`;

    particle.style.animationDelay =
      `${Math.random() * 8}s`;

    particle.style.opacity =
      `${0.2 + Math.random() * 0.5}`;

    particles.appendChild(
      particle
    );
  }
}

createParticles();


/* =========================
   OPEN LETTER
========================= */

openButton.addEventListener(
  "click",
  () => {

    openingPage.classList.add(
      "hidden"
    );

    letterPage.classList.remove(
      "hidden"
    );

    letterPage.classList.add(
      "page-enter"
    );

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    revealLetter();

    createHeartBurst();

  }
);


/* =========================
   LETTER REVEAL
========================= */

function revealLetter() {

  reveals.forEach(
    (element, index) => {

      setTimeout(
        () => {

          element.classList.add(
            "visible"
          );

        },
        250 + index * 550
      );

    }
  );

}


/* =========================
   HEART BURST
========================= */

function createHeartBurst() {

  const hearts = [
    "❤️",
    "♡",
    "♥",
    "❤️",
    "♡",
    "♥",
    "❤️"
  ];

  hearts.forEach(
    (heart, index) => {

      setTimeout(
        () => {

          const element =
            document.createElement("span");

          element.className =
            "floating-heart";

          element.textContent =
            heart;

          const angle =
            Math.random() * Math.PI * 2;

          const distance =
            100 + Math.random() * 180;

          const x =
            Math.cos(angle) * distance;

          const y =
            Math.sin(angle) * distance;

          element.style.setProperty(
            "--x",
            `${x}px`
          );

          element.style.setProperty(
            "--y",
            `${y}px`
          );

          element.style.setProperty(
            "--rotation",
            `${-30 + Math.random() * 60}deg`
          );

          element.style.setProperty(
            "--size",
            `${12 + Math.random() * 13}px`
          );

          element.style.setProperty(
            "--duration",
            `${1.5 + Math.random() * 1.3}s`
          );

          document.body.appendChild(
            element
          );

          setTimeout(
            () => {
              element.remove();
            },
            3000
          );

        },
        index * 120
      );

    }
  );

}


/* =========================
   MUSIC BUTTON
========================= */

/*
  Spotify does not expose a normal MP3 URL
  that can simply be placed inside <audio>.

  Therefore the button opens Spotify in a new
  tab rather than pretending to stream the song
  through the website.
*/

musicButton.addEventListener(
  "click",
  () => {

    const spotifySearch =
      "https://open.spotify.com/search/325%20Something%20Soweto";

    window.open(
      spotifySearch,
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* =========================
   SUBTLE PARALLAX
========================= */

document.addEventListener(
  "pointermove",
  (event) => {

    const x =
      (event.clientX /
        window.innerWidth) -
      0.5;

    const y =
      (event.clientY /
        window.innerHeight) -
      0.5;

    const glowOne =
      document.querySelector(
        ".glow-one"
      );

    const glowTwo =
      document.querySelector(
        ".glow-two"
      );

    glowOne.style.transform =
      `translate(${x * 18}px, ${y * 12}px)`;

    glowTwo.style.transform =
      `translate(${x * -15}px, ${y * -10}px)`;

  }
);
