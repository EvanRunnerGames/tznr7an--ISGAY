let mouseX = 0;
let mouseY = 0;
let isMoving = false;
let trailColor = 'white'; // Default trail color

// Create custom cursor element
const customCursor = document.createElement('div');
customCursor.id = 'custom-cursor';
document.body.appendChild(customCursor);

// Initial invisible cursor style
Object.assign(customCursor.style, {
  position: 'fixed',
  pointerEvents: 'none',
  width: '20px',
  height: '20px',
  background: 'white',
  borderRadius: '50%',
  opacity: '0', // Invisible by default
  transition: 'width 0.2s, height 0.2s, opacity 0.2s',
  zIndex: '9999',
  transform: 'translate(-50%, -50%)'
});

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMoving = true;

  // Move custom cursor
  customCursor.style.left = `${mouseX}px`;
  customCursor.style.top = `${mouseY}px`;
});

// Hover effect for #purple
const purpleEl = document.getElementById('purple');
if (purpleEl) {
  purpleEl.addEventListener('mouseenter', () => {
    trailColor = 'linear-gradient(to left, #932eb8, #bf70db)';
  });

  purpleEl.addEventListener('mouseleave', () => {
    trailColor = 'white';
  });
}

// Hover effect for #discord
const discordEl = document.getElementById('discord');
if (discordEl) {
  discordEl.addEventListener('mouseenter', () => {
    trailColor = 'transparent'; // Make trail transparent
    customCursor.style.width = '40px';
    customCursor.style.height = '40px';
    customCursor.style.opacity = '0.5'; // Make it visible
  });

  discordEl.addEventListener('mouseleave', () => {
    trailColor = 'white'; // Reset trail
    customCursor.style.width = '20px';
    customCursor.style.height = '20px';
    customCursor.style.opacity = '0'; // Hide cursor again
  });
}

function createTrail() {
  if (isMoving) {
    const dot = document.createElement('div');
    dot.classList.add('trail');
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    dot.style.background = trailColor;

    Object.assign(dot.style, {
      position: 'fixed',
      borderRadius: '100%',
      pointerEvents: 'none',
      opacity: '1',
      zIndex: '9998',
      transform: 'translate(-50%, -50%)'
    });

    document.body.appendChild(dot);

    // Trigger fade out
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
    });

    // Remove after 4 seconds
    setTimeout(() => {
      dot.remove();
    }, 4000);
  }

  requestAnimationFrame(createTrail);
}

createTrail();
