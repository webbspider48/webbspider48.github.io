/* =========================
   CLOCK + DATE
========================= */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    minutes =
        minutes < 10
            ? "0" + minutes
            : minutes;

    const timeString =
        hours + ":" + minutes + " " + ampm;


    document
        .querySelectorAll(".live-clock")
        .forEach(clock => {

            clock.textContent =
                timeString;

        });


    document.getElementById(
        "lock-time-big"
    ).textContent = timeString;


    const dateOptions = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    const fullDate =
        now.toLocaleDateString(
            "en-ZA",
            dateOptions
        );


    document.getElementById(
        "lock-date"
    ).textContent = fullDate;


    document.getElementById(
        "calendar-date"
    ).textContent = fullDate;

}


setInterval(
    updateClock,
    1000
);

updateClock();



/* =========================
   SCREEN SYSTEM
========================= */

let currentScreen =
    "screen-lock";


function switchScreen(screenId) {

    document
        .querySelectorAll(".screen-view")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    const nextScreen =
        document.getElementById(
            screenId
        );


    nextScreen.classList.add(
        "active"
    );


    currentScreen =
        screenId;


    resetSelection();

}



/* =========================
   MENU NAVIGATION
========================= */

let selectedIndex = 0;


const menuScreens = {

    "screen-menu": [

        "screen-inbox",

        "screen-contacts",

        "screen-calendar",

        "screen-services"

    ]

};


function getSelectableItems() {

    const activeScreen =
        document.querySelector(
            ".screen-view.active"
        );


    return activeScreen.querySelectorAll(
        ".menu-item"
    );

}


function resetSelection() {

    selectedIndex = 0;


    const items =
        getSelectableItems();


    items.forEach(
        item =>
            item.classList.remove(
                "selected"
            )
    );


    if (
        items.length > 0
    ) {

        items[0].classList.add(
            "selected"
        );

    }

}


function moveSelection(direction) {

    const items =
        getSelectableItems();


    if (
        items.length === 0
    ) return;


    items[
        selectedIndex
    ].classList.remove(
        "selected"
    );


    selectedIndex += direction;


    if (
        selectedIndex < 0
    ) {

        selectedIndex =
            items.length - 1;

    }


    if (
        selectedIndex >= items.length
    ) {

        selectedIndex = 0;

    }


    items[
        selectedIndex
    ].classList.add(
        "selected"
    );



    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            20
        );

    }

}



/* =========================
   SELECT BUTTON
========================= */

function selectCurrent() {

    if (
        currentScreen ===
        "screen-lock"
    ) {

        unlockPhone();

        return;

    }


    if (
        currentScreen ===
        "screen-menu"
    ) {

        const destinations =
            menuScreens[
                "screen-menu"
            ];


        switchScreen(
            destinations[
                selectedIndex
            ]
        );

        return;

    }


    if (
        currentScreen ===
        "screen-inbox"
    ) {

        openLetter();

        return;

    }


    if (
        currentScreen ===
        "screen-letter"
    ) {

        switchScreen(
            "screen-final"
        );

        return;

    }


    if (
        currentScreen ===
        "screen-services"
    ) {

        switchScreen(
            "screen-final"
        );

    }

}



/* =========================
   BACK BUTTON
========================= */

function goBack() {

    if (
        currentScreen ===
        "screen-menu"
    ) {

        switchScreen(
            "screen-lock"
        );

    }


    else if (
        currentScreen ===
        "screen-inbox"
    ) {

        switchScreen(
            "screen-menu"
        );

    }


    else if (
        currentScreen ===
        "screen-letter"
    ) {

        switchScreen(
            "screen-inbox"
        );

    }


    else if (

        currentScreen ===
        "screen-contacts" ||

        currentScreen ===
        "screen-calendar" ||

        currentScreen ===
        "screen-services"

    ) {

        switchScreen(
            "screen-menu"
        );

    }


    else if (
        currentScreen ===
        "screen-final"
    ) {

        switchScreen(
            "screen-lock"
        );

    }

}



/* =========================
   PIN SYSTEM
========================= */

let pin = "";

const CORRECT_PIN =
    "1234";


function updatePinDisplay() {

    const display =
        document.getElementById(
            "pin-display"
        );


    let dots = "";


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        dots +=
            i < pin.length
                ? "● "
                : "_ ";

    }


    display.textContent =
        dots.trim();

}


function handleNumber(
    number
) {

    if (
        currentScreen !==
        "screen-lock"
    ) return;


    if (
        pin.length < 4
    ) {

        pin += number;

        updatePinDisplay();

    }

}


function unlockPhone() {

    if (
        currentScreen !==
        "screen-lock"
    ) return;


    if (
        pin === CORRECT_PIN
    ) {

        pin = "";

        updatePinDisplay();

        switchScreen(
            "screen-menu"
        );

    }

    else {

        if (
            pin.length === 4
        ) {

            pin = "";

            updatePinDisplay();


            if (
                navigator.vibrate
            ) {

                navigator.vibrate(
                    150
                );

            }

        }

    }

}



/* =========================
   BIRTHDAY LETTER
========================= */

const birthdayMessage =

`Happy Birthday, Momo Smiles 😊🎂❤️.

Ukhule ulinganenami uze ungidlule😭😂.

It's not something you can unwrap, but it's something I made specifically for you.

I hope today reminds you how special you are, how beautiful your smile is, and how much happiness you deserve.

I hope this new year of your life brings you more laughs, more peace, more beautiful moments, and everything you've been hoping for.

Enjoy your day, birthday girl ❤️

And just so you know...

HAPPY BIRTHDAY BEYONCE!!!! 😂❤️.`;


let letterOpened =
    false;


function openLetter() {

    switchScreen(
        "screen-letter"
    );


    if (
        letterOpened
    ) return;


    letterOpened = true;


    const textElement =
        document.getElementById(
            "text-content"
        );


    textElement.textContent =
        "";


    let character = 0;


    function typeLetter() {

        if (
            character <
            birthdayMessage.length
        ) {

            textElement.textContent +=
                birthdayMessage.charAt(
                    character
                );


            character++;


            setTimeout(
                typeLetter,
                22
            );

        }

    }


    setTimeout(
        typeLetter,
        400
    );

}



/* =========================
   PHYSICAL NAVIGATION
========================= */

document
    .getElementById(
        "btn-up"
    )
    .addEventListener(
        "click",
        () => moveSelection(-1)
    );


document
    .getElementById(
        "btn-down"
    )
    .addEventListener(
        "click",
        () => moveSelection(1)
    );


document
    .getElementById(
        "btn-select"
    )
    .addEventListener(
        "click",
        selectCurrent
    );


document
    .getElementById(
        "btn-left"
    )
    .addEventListener(
        "click",
        selectCurrent
    );


document
    .getElementById(
        "btn-right"
    )
    .addEventListener(
        "click",
        goBack
    );



/* =========================
   NUMBER KEYPAD
========================= */

document
    .querySelectorAll(
        ".keypad button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset.key;


                    if (
                        key === "*"
                    ) {

                        pin =
                            pin.slice(
                                0,
                                -1
                            );

                        updatePinDisplay();

                        return;

                    }


                    if (
                        /^[0-9]$/.test(
                            key
                        )
                    ) {

                        handleNumber(
                            key
                        );

                    }

                }
            );

        }
    );



/* =========================
   COMPUTER KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "ArrowUp"
        ) {

            moveSelection(-1);

        }


        if (
            event.key ===
            "ArrowDown"
        ) {

            moveSelection(1);

        }


        if (

            event.key ===
            "Enter"

            ||

            event.key ===
            " "

        ) {

            selectCurrent();

        }


        if (
            event.key ===
            "Escape"
        ) {

            goBack();

        }


        if (
            /^[0-9]$/.test(
                event.key
            )
        ) {

            handleNumber(
                event.key
            );

        }


        if (
            event.key ===
            "Backspace"
        ) {

            pin =
                pin.slice(
                    0,
                    -1
                );

            updatePinDisplay();

        }

    }
);



/* =========================
   START
========================= */

updatePinDisplay();
