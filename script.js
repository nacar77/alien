document.addEventListener('DOMContentLoaded', function () {
    // Function to create bubbles
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        document.querySelector('.bubbles').appendChild(bubble);

        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDuration = Math.random() * 10 + 5 + 's';

        setTimeout(() => {
            bubble.remove();
        }, 15000);
    }

    // Create bubbles every second
    setInterval(createBubble, 1000);

    // Function to handle page turning
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');

    function updatePages() {
        pages.forEach((page, index) => {
            page.style.transform = `translateX(${(index - currentPage) * 100}%)`;
            page.style.zIndex = pages.length - Math.abs(index - currentPage);
        });
    }

    function nextPage() {
        currentPage = (currentPage + 1) % pages.length;
        updatePages();
    }

    function prevPage() {
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        updatePages();
    }

    // Attach event listeners to the buttons
    document.getElementById('nextButton').addEventListener('click', nextPage);
    document.getElementById('prevButton').addEventListener('click', prevPage);

    // Initialize the book with the first page shown
    updatePages();
});
