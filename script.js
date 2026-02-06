const noButton = document.getElementById('noButton');

const messages = [
    "Why :(",
    "Stop.",
    "No more."
];

let messageIndex = 0;

noButton.addEventListener('mousemove', (e) => {
    const rect = noButton.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If cursor is within 100px of the button center, move the button away
    if (distance < 100) {
        const angle = Math.atan2(distanceY, distanceX);
        const moveDistance = 150;
        
        // Calculate new position
        let newX = buttonCenterX - Math.cos(angle) * moveDistance;
        let newY = buttonCenterY - Math.sin(angle) * moveDistance;
        
        // Keep button within viewport bounds with padding to avoid corners
        const padding = 50;
        const maxX = window.innerWidth - rect.width - padding;
        const maxY = window.innerHeight - rect.height - padding;
        
        newX = Math.max(padding, Math.min(newX, maxX));
        newY = Math.max(padding, Math.min(newY, maxY));
        
        // If button would be in a corner, move it to a random safe position
        const inCorner = (newX <= padding || newX >= maxX) && (newY <= padding || newY >= maxY);
        if (inCorner) {
            newX = Math.random() * (window.innerWidth - rect.width - 2 * padding) + padding;
            newY = Math.random() * (window.innerHeight - rect.height - 2 * padding) + padding;
        }
        
        noButton.style.position = 'fixed';
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
    }
});

// Change text and prevent navigation when clicked
noButton.addEventListener('click', (e) => {
    e.preventDefault();
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
});
