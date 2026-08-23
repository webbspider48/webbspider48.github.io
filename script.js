/* =========================
   REAL TIME CLOCK
========================= */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    minutes =
        minutes < 10
            ? "0" + minutes
            : minutes;

    const time =
        `${hours}:${minutes} ${ampm}`;


    document
        .querySelectorAll(".live-clock")
        .forEach(clock => {

            clock.textContent = time;

        });


    document
        .getElementById("lock-time-big")
        .textContent = time;


    const dateOptions = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    document
        .getElementById("lock-date")
        .textContent =
            now.toLocaleDateString(
                "en-ZA",
                dateOptions
            );


    document
        .getElementById("calendar-day")
        .textContent =
            now.getDate();


    const calendarOptions = {

        month: "long",

        year: "numeric"

    };


    document
        .getElementById("calendar-date")
        .textContent =
            now.toLocaleDateString(
                "en-ZA",
                calendarOptions
            );

}


updateClock();

setInterval(
    updateClock,
    1000
);



/* =========================
   SCREEN SYSTEM
========================= */

let currentScreen =
    "screen-lock";


function switchScreen(screenId) {

    document
        .querySelectorAll(".screen-view")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const screen =
        document.getElementById(screenId);


    if (screen) {

        screen.classList.add("active");

        currentScreen =
            screenId;

    }

}



/* =========================
   HOME / BACK
========================= */

function goHome() {

    switchScreen(
        "screen-menu"
    );

}


function goBack() {

    if (
        currentScreen === "screen-menu"
    ) {

        switchScreen(
            "screen-lock"
        );

        return;

    }


    if (
        currentScreen === "screen-inbox" ||
        currentScreen === "screen-contacts" ||
        currentScreen === "screen-calendar" ||
        currentScreen === "screen-services"
    ) {

        goHome();

        return;

    }


    if (
        currentScreen === "screen-letter"
    ) {

        goToInbox();

        return;

    }


    if (
        currentScreen === "screen-momo"
    ) {

        openLetter();

        return;

    }


    if (
        currentScreen === "screen-love"
    ) {

        goToMomo();

    }

}



/* =========================
   PIN SYSTEM
========================= */

let enteredPin = "";

const correctPin =
    "1234";


function updatePinDisplay() {

    const display =
        document.getElementById(
            "pin-display"
        );


    let visible =
        enteredPin
            .split("")
            .map(() => "•")
            .join(" ");


    let remaining =
        4 - enteredPin.length;


    for (
        let i = 0;
        i < remaining;
        i++
    ) {

        visible +=
            (visible ? " " : "")
            + "_";

    }


    display.textContent =
        visible;

}


function handlePin(key) {

    if (
        key === "#"
    ) {

        enteredPin = "";

        updatePinDisplay();

        return;

    }


    if (
        enteredPin.length < 4
    ) {

        enteredPin += key;

        updatePinDisplay();

    }


    if (
        enteredPin.length === 4
    ) {

        setTimeout(() => {

            if (
                enteredPin === correctPin
            ) {

                enteredPin = "";

                updatePinDisplay();

                goHome();

            }

            else {

                enteredPin = "";

                updatePinDisplay();


                const display =
                    document.getElementById(
                        "pin-display"
                    );


                display.textContent =
                    "WRONG";


                setTimeout(() => {

                    updatePinDisplay();

                }, 700);


                if (
                    navigator.vibrate
                ) {

                    navigator.vibrate(
                        100
                    );

                }

            }

        }, 250);

    }

}



/* =========================
   NAVIGATION
========================= */

function goToInbox() {

    switchScreen(
        "screen-inbox"
    );

}


function goToContacts() {

    switchScreen(
        "screen-contacts"
    );

}


function goToCalendar() {

    switchScreen(
        "screen-calendar"
    );

}


function goToServices() {

    switchScreen(
        "screen-services"
    );

}


function unlockHint() {

    const display =
        document.getElementById(
            "pin-display"
        );


    display.textContent =
        "ENTER PIN";


    setTimeout(() => {

        updatePinDisplay();

    }, 1000);

}



/* =========================
   LETTER
========================= */

const messageText =
`I've been thinking about you today ngl.

I miss you.

I know I've been a little inconsistent lately since I deleted my Instagram, and I'm really sorry about that.

You've been on my mind a lot though, and seeing your name pop up still makes me smile.

You're genuinely my favourite notification 😂❤️

And I already know you looked cute today. You don't even have to tell me.`;


let typingStarted =
    false;


let typingFinished =
    false;


function openLetter() {

    switchScreen(
        "screen-letter"
    );


    const textElement =
        document.getElementById(
            "text-content"
        );


    if (
        typingFinished
    ) {

        textElement.textContent =
            messageText;

        return;

    }


    if (
        typingStarted
    ) {

        return;

    }


    typingStarted =
        true;


    textElement.textContent =
        "";


    let index =
        0;


    function typeWriter() {

        if (
            index <
            messageText.length
        ) {

            textElement.textContent +=
                messageText.charAt(
                    index
                );


            index++;


            setTimeout(
                typeWriter,
                25
            );

        }

        else {

            typingFinished =
                true;

        }

    }


    setTimeout(
        typeWriter,
        350
    );

}



/* =========================
   MOMO / LOVE FLOW
========================= */

function goToMomo() {

    switchScreen(
        "screen-momo"
    );

}


function goToLove() {

    switchScreen(
        "screen-love"
    );

}



/* =========================
   PHYSICAL KEYPAD
========================= */

function pressKey(key) {

    /*
        LOCK SCREEN
    */

    if (
        currentScreen ===
        "screen-lock"
    ) {

        if (
            /^[0-9]$/.test(key)
        ) {

            handlePin(key);

        }

        return;

    }


    /*
        GLOBAL KEYS

        * = HOME

        # = BACK
    */

    if (
        key === "*"
    ) {

        goHome();

        return;

    }


    if (
        key === "#"
    ) {

        goBack();

        return;

    }


    /*
        MAIN MENU

        1 = Messages
        2 = Contacts
        3 = Calendar
        4 = Services
    */

    if (
        currentScreen ===
        "screen-menu"
    ) {

        if (
            key === "1"
        ) {

            goToInbox();

        }

        if (
            key === "2"
        ) {

            goToContacts();

        }

        if (
            key === "3"
        ) {

            goToCalendar();

        }

        if (
            key === "4"
        ) {

            goToServices();

        }

        return;

    }


    /*
        INBOX

        1 = Open message
    */

    if (
        currentScreen ===
        "screen-inbox"
    ) {

        if (
            key === "1" ||
            key === "0"
        ) {

            openLetter();

        }

        return;

    }


    /*
        LETTER

        0 = Next
    */

    if (
        currentScreen ===
        "screen-letter"
    ) {

        if (
            key === "0"
        ) {

            goToMomo();

        }

        return;

    }


    /*
        MOMO

        0 = Next
    */

    if (
        currentScreen ===
        "screen-momo"
    ) {

        if (
            key === "0"
        ) {

            goToLove();

        }

        return;

    }

}



/* =========================
   CENTER NAVIGATION BUTTON
========================= */

function selectCurrent() {

    if (
        currentScreen ===
        "screen-lock"
    ) {

        unlockHint();

    }


    else if (
        currentScreen ===
        "screen-menu"
    ) {

        goToInbox();

    }


    else if (
        currentScreen ===
        "screen-inbox"
    ) {

        openLetter();

    }


    else if (
        currentScreen ===
        "screen-letter"
    ) {

        goToMomo();

    }


    else if (
        currentScreen ===
        "screen-momo"
    ) {

        goToLove();

    }

}
