// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the message box
    const messageBox = document.querySelector('.message-box');
    
    // Select the "Reply" soft key text
    const replyKey = document.querySelector('.key-right');

    // Add a little typing effect when the page opens
    const textElement = document.querySelector('.text');
    const originalText = textElement.innerHTML;
    textElement.innerHTML = '';
    
    let charIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    function typeWriter() {
        if (charIndex < originalText.length) {
            textElement.innerHTML += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Start typing effect after a tiny delay
    setTimeout(typeWriter, 500);

    // Optional: Make the "Reply" button clickable
    replyKey.addEventListener('click', () => {
        // Classic Nokia vibrating notification popup
        alert("📳 *vibrate* \n\nYou just sent her a reply!");
        // You can redirect her to another page here if you want
        // window.location.href = "reply.html";
    });
});
