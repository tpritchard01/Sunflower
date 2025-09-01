document.addEventListener('DOMContentLoaded', function() {
    const entries = document.querySelectorAll('.entry:not(.hidden)');
    
    // Start all animations at the same time
    setTimeout(() => {
        entries.forEach(entry => {
            const height = parseInt(entry.dataset.height);
            const heightElement = entry.querySelector('.height');
            
            if (entry.dataset.name === 'Sophie') {
                // Sophie gets special treatment with death sequence
                animateCounter(heightElement, height, () => {
                    // After Sophie reaches 35, show DIED and start fade sequence
                    setTimeout(() => {
                        entry.classList.add('died');
                        heightElement.textContent = 'DIED';
                        
                        setTimeout(() => {
                            // Fade out Sophie's entire entry
                            entry.style.animation = 'fadeOut 1s ease-out forwards';
                            
                            setTimeout(() => {
                                // Remove Sophie
                                entry.style.display = 'none';
                                
                                // Update places for remaining entries
                                document.querySelector('[data-name="Sharon"]').querySelector('.place').textContent = '4th';
                                
                                // Show Tim in 5th place
                                const timEntry = document.querySelector('[data-name="Tim"]');
                                timEntry.classList.remove('hidden');
                                timEntry.style.display = 'flex';
                                timEntry.style.animation = 'fadeIn 1s ease-out forwards';
                                
                                // Animate Tim's counter
                                const timHeight = parseInt(timEntry.dataset.height);
                                animateCounter(timEntry.querySelector('.height'), timHeight);
                                
                            }, 1000);
                        }, 300);
                    }, 200);
                });
            } else {
                // Everyone else just counts normally
                animateCounter(heightElement, height);
            }
        });
    }, 1500);
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
