const bubblesContainer = document.querySelector('.bubbles');

for (let i = 0; i < 50; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
    bubblesContainer.appendChild(bubble);

}
