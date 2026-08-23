/* =====================================================
   NOKIA LOVE LETTER
===================================================== */

const CORRECT_PIN = "1234";

let pin = "";
let typingTimer = null;
let currentScreen = "screen-lock";


/* =====================================================
   MESSAGE
===================================================== */

const messageText =
`I've been thinking about you today ngl.

I miss you.

You've been on my mind a lot, and seeing your name pop up still makes me smile.

You're genuinely my favourite notification.

And I already know you looked cute today. You don't even have to tell me.`;


/* =====================================================
   CLOCK
===================================================== */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    minutes = minutes < 10
        ? "0" + minutes
        : minutes;

    hours = hours % 12 || 12;

    const time =
        `${hours}:${minutes}`;

    const clockIds = [
        "clock-lock",
        "clock-menu",
        "clock-inbox",
        "clock-letter",
        "clock-momo",
        "clock-love"
    ];

    clockIds.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = time;
        }

    });

    const lockTime =
        document.getElementById("lock-time");

    if (lockTime) {
        lockTime.textContent = time;
    }


    const date =
        document.getElementById("lock-date");

    if (date) {

        date.textContent =
            now.toLocaleDateString(
                "en-US",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );
    }
}

updateClock();

setInterval(updateClock, 1000);


/* =====================================================
   VIBRATION
===================================================== */

function vibrate(length = 35) {

    if ("vibrate" in navigator) {
        navigator.vibrate(length);
    }
}


/* =====================================================
   PIN
===================================================== */

function updatePinDisplay() {

    const display =
        document.getElementById("pin-display");

    let result = "";

    for (let i = 0; i < 4; i++) {

        if (i < pin.length) {
            result += "• ";
        } else {
            result += "_ ";
        }
    }

    display.textContent =
        result.trim();
}


function pressPin(key) {

    if (currentScreen !== "screen-lock") {
        return;
    }


    if (key === "clear") {

        pin = "";

        updatePinDisplay();

        vibrate();

        return;
    }


    if (key === "enter") {

        if (pin === CORRECT_PIN) {

            vibrate(80);

            pin = "";

            updatePinDisplay();

            switchScreen("screen-menu");

        } else {

            vibrate(180);

            const display =
                document.getElementById("pin-display");

            display.textContent =
                "WRONG";

            setTimeout(() => {

                pin = "";

                updatePinDisplay();

            }, 800);
        }

        return;
    }


    if (/^[0-9]$/.test(key) && pin.length < 4) {

        pin += key;

        updatePinDisplay();

        vibrate();
    }
}


/* =====================================================
   PHYSICAL KEYPAD
===================================================== */

function pressPhysical(key) {

    if (key === "*") {

        pressPin("clear");

        return;
    }

    if (key === "#") {

        pressPin("enter");

        return;
    }

    if (/^[0-9]$/.test(key)) {

        pressPin(key);
    }
}


function pressPhysicalEnter() {

    if (currentScreen === "screen-lock") {

        pressPin("enter");

        return;
    }

    if (currentScreen === "screen-menu") {

        goToInbox();

        return;
    }

    if (currentScreen === "screen-inbox") {

        openLetter();

        return;
    }

    if (currentScreen === "screen-letter") {

        showMomo();

        return;
    }

    if (currentScreen === "screen-momo") {

        showLove();

        return;
    }
}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener("keydown", event => {

    if (/^[0-9]$/.test(event.key)) {

        pressPhysical(event.key);
    }

    if (event.key === "*") {

        pressPhysical("*");
    }

    if (event.key === "#") {

        pressPhysical("#");
    }

    if (event.key === "Enter") {

        pressPhysicalEnter();
    }

});


/* =====================================================
   SCREEN SWITCHING
===================================================== */

function switchScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const target =
        document.getElementById(id);

    if (!target) return;

    target.classList.add("active");

    currentScreen = id;

    vibrate(20);
}


/* =====================================================
   MENU
===================================================== */

function goToInbox() {

    switchScreen("screen-inbox");
}


/* =====================================================
   OPEN LETTER
===================================================== */

function openLetter() {

    switchScreen("screen-letter");

    const textElement =
        document.getElementById("text-content");

    const cursor =
        document.getElementById("cursor");

    clearTimeout(typingTimer);

    textElement.textContent = "";

    cursor.style.display = "inline";

    let index = 0;


    function typeWriter() {

        if (index < messageText.length) {

            textElement.textContent +=
                messageText.charAt(index);

            index++;

            typingTimer =
                setTimeout(typeWriter, 32);

        } else {

            cursor.style.display = "inline";
        }
    }


    setTimeout(typeWriter, 350);
}


/* =====================================================
   MOMO SCREEN
===================================================== */

function showMomo() {

    clearTimeout(typingTimer);

    switchScreen("screen-momo");
}


/* =====================================================
   FINAL SCREEN
===================================================== */

function showLove() {

    switchScreen("screen-love");
}


/* =====================================================
   SOFT BUTTONS
===================================================== */

document
    .querySelector(".soft-button.left")
    .addEventListener("click", () => {

        if (currentScreen === "screen-lock") {

            const display =
                document.getElementById("pin-display");

            display.textContent =
                "1234";

            setTimeout(() => {
                updatePinDisplay();
            }, 900);

            return;
        }

        switchScreen("screen-menu");
    });


document
    .querySelector(".soft-button.right")
    .addEventListener("click", () => {

        if (currentScreen === "screen-menu") {

            switchScreen("screen-lock");

            return;
        }

        if (currentScreen === "screen-inbox") {

            switchScreen("screen-menu");

            return;
        }

        if (currentScreen === "screen-letter") {

            switchScreen("screen-inbox");

            return;
        }

        if (currentScreen === "screen-momo") {

            switchScreen("screen-letter");

            return;
        }

    });


/* =====================================================
   INITIAL STATE
===================================================== */

updatePinDisplay();
