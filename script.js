document.addEventListener('DOMContentLoaded', () => {
    const replyKey = document.querySelector('.key-right');
    const textContainer = document.querySelector('.text-content');
    
    // Save the original HTML for typing effect
    const originalHTML = textContainer.innerHTML;
    textContainer.innerHTML = '';

    let charIndex = 0;
    const typingSpeed = 18; // Adjust this to make it slower or faster

    function typeWriter() {
        if (charIndex < originalHTML.length) {
            textContainer.innerHTML += originalHTML.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Add blinking cursor at the end
            textContainer.innerHTML += `<span style="display:inline-block; animation: blink 1s step-end infinite;">_</span>`;
        }
    }

    // Wait 0.8 seconds then start typing
    setTimeout(typeWriter, 800);

    // Reply button easter egg
    replyKey.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(150);
        alert("📳 *vibrates*\n\nShe just got your message. You're a legend, Bigduggmustfall.");
    });
});
