document.addEventListener('DOMContentLoaded', function() {
    const entries = document.querySelectorAll('.entry');
    
    // Start all animations at the same time
    setTimeout(() => {
        entries.forEach(entry => {
            const height = parseInt(entry.dataset.height);
            const heightElement = entry.querySelector('.height');
            animateCounter(heightElement, height);
        });
    }, 1500);
    
    // Show pending and perished sections after main entries have faded in
    setTimeout(() => {
        document.querySelector('.pending-section').classList.add('show');
    }, 4500); // After main entries (3s) + delay
    
    setTimeout(() => {
        document.querySelector('.perished-section').classList.add('show');
    }, 5000); // Slightly after pending section
});

function animateCounter(element, target, callback) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.textContent = Math.floor(current) + '"';
            if (callback) callback();
        } else {
            element.textContent = Math.floor(current) + '"';
        }
    }, 50);
}

function togglePending() {
    const button = document.querySelector('.pending-toggle');
    const list = document.getElementById('pendingList');
    
    button.classList.toggle('expanded');
    list.classList.toggle('expanded');
}

function togglePerished() {
    const button = document.querySelector('.perished-toggle');
    const list = document.getElementById('perishedList');
    
    button.classList.toggle('expanded');
    list.classList.toggle('expanded');
}

function getOrdinal(num) {
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th'];
    return ordinals[num - 1] || num + 'th';
}
