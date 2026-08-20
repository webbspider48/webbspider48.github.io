// PIN Logic
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

// Screen switching
function switchScreen(id) {
    document.querySelectorAll(".screen-view").forEach(el => el.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// Go to inbox
function goToInbox() { switchScreen("screen-inbox"); }

// Open letter with typing effect
let isTyping = false;
let charIndex = 0;
const typingSpeed = 25;

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
            } else {
                // After letter finishes, show Man to Momo
                setTimeout(() => {
                    switchScreen("screen-momo");
                    // Then after Momo, show Love always
                    setTimeout(() => {
                        switchScreen("screen-love");
                    }, 3000);
                }, 3000);
            }
        }
        typeWriter();
    }, 500);
}

// Reply button easter egg
document.querySelectorAll(".soft-keys span:last-child").forEach(btn => {
    btn.addEventListener("click", () => {
        if (navigator.vibrate) navigator.vibrate(150);
        alert("📳 *vibrate*\n\nShe just read everything. You're a real one, Bigduggmustfall.");
    });
});
