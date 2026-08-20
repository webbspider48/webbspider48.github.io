// --- REAL TIME CLOCK ---
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = hours + ':' + minutes + ' ' + ampm;
    
    // Update all clock elements
    document.querySelectorAll('.live-clock').forEach(el => el.innerText = timeString);
    document.getElementById('lock-time-big').innerText = timeString;
    
    // Update date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('lock-date').innerText = now.toLocaleDateString('en-US', options);
}
setInterval(updateClock, 1000);
updateClock();

// --- PIN LOGIC ---
let pin = "";
const CORRECT_PIN = "1234";

function pressPin(key) {
    const display = document.getElementById("pin-display");
    if (key === "clear") {
        pin = "";
        display.innerText = "____";
    } else if (key === "enter") {
        if (pin === CORRECT_PIN) {
            switchScreen("screen-menu");
            pin = "";
            display.innerText = "____";
        } else {
            display.innerText = "____";
            pin = "";
            if (navigator.vibrate) navigator.vibrate(100);
        }
    } else {
        if (pin.length < 4) {
            pin += key;
            display.innerText = pin.replace(/./g, "*");
        }
    }
}

// --- SCREEN SWITCHING ---
function switchScreen(id) {
    document.querySelectorAll(".screen-view").forEach(el => el.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// --- NAVIGATION ---
function goToInbox() { switchScreen("screen-inbox"); }

// --- TYPING EFFECT ---
let isTyping = false;
let charIndex = 0;
const typingSpeed = 30;

function openLetter() {
    switchScreen("screen-letter");
    if (isTyping) return;
    isTyping = true;
    
    const textEl = document.getElementById("text-content");
    const originalText = textEl.innerText;
    textEl.innerText = "";
    
    setTimeout(() => {
        function typeWriter() {
            if (charIndex < originalText.length) {
                textEl.innerText += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        typeWriter();
    }, 500);
}

// --- DONE BUTTON FLOW ---
document.getElementById("done-btn").addEventListener("click", function() {
    switchScreen("screen-momo");
});

document.getElementById("done-momo").addEventListener("click", function() {
    switchScreen("screen-love");
});

// --- UNLOCK BUTTON (visual only, since PIN is used) ---
document.querySelector("#screen-lock .soft-keys span:last-child").addEventListener("click", function() {
    // If she clicks Unlock instead of using PIN, hint at PIN
    if (navigator.vibrate) navigator.vibrate(50);
});
