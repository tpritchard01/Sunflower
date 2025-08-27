document.addEventListener('DOMContentLoaded', function() {
    const entries = document.querySelectorAll('.entry');
    
    entries.forEach((entry, index) => {
        const heightElement = entry.querySelector('.height');
        const targetHeight = parseInt(entry.dataset.height);
        
        if (targetHeight > 0) {
            setTimeout(() => {
                animateCounter(heightElement, targetHeight);
            }, (index + 1) * 1000 + 500);
        }
    });
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '"';
    }, 50);
}
