document.addEventListener('DOMContentLoaded', function() {
    const entries = document.querySelectorAll('.entry:not(.hidden)');
    
    // Start with Mitch's animation
    const mitchEntry = entries[0];
    const mitchHeight = parseInt(mitchEntry.dataset.height);
    
    setTimeout(() => {
        animateCounter(mitchEntry.querySelector('.height'), mitchHeight);
    }, 1500);
    
    // Start Sophie's animation before Mitch finishes (2 seconds after Mitch starts)
    const sophieEntry = entries[1];
    const sophieHeight = parseInt(sophieEntry.dataset.height);
    
    setTimeout(() => {
        animateCounter(sophieEntry.querySelector('.height'), sophieHeight, () => {
            // After Sophie reaches 50, show DIED and start fade sequence
            setTimeout(() => {
                sophieEntry.classList.add('died');
                sophieEntry.querySelector('.height').textContent = 'DIED';
                
                setTimeout(() => {
                    // Fade out Sophie's entire entry
                    sophieEntry.style.animation = 'fadeOut 1s ease-out forwards';
                    
                    setTimeout(() => {
                        // Remove Sophie
                        sophieEntry.style.display = 'none';
                        
                        // Update places for remaining entries
                        document.querySelector('[data-name="Tim"]').querySelector('.place').textContent = '2nd';
                        document.querySelector('[data-name="Kimberly"]').querySelector('.place').textContent = '3rd';
                        document.querySelector('[data-name="Kristi"]').querySelector('.place').textContent = '4th';
                        
                        // Show Sharon in 5th place
                        const sharonEntry = document.querySelector('[data-name="Sharon"]');
                        sharonEntry.classList.remove('hidden');
                        sharonEntry.style.display = 'flex';
                        sharonEntry.style.animation = 'fadeIn 1s ease-out forwards';
                        
                    }, 1000);
                }, 500);
            }, 300);
        });
    }, 3000);
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

function getOrdinal(num) {
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th'];
    return ordinals[num - 1] || num + 'th';
}
