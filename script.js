document.addEventListener('DOMContentLoaded', function() {
    const magicButton = document.getElementById('magicButton');
    const flowerContainer = document.getElementById('flowerContainer');
    const catContainer = document.getElementById('catContainer');
    
    // Array of flower emojis
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🏵️', '🌼', '🥀', '🌾'];
    
    // Array of heart emojis to mix in
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓', '💞'];
    
    let animationTimeout;
    
    magicButton.addEventListener('click', function() {
        // Create flower/heart rain
        createFlowerRain();
        
        // Show the orange cat with message after a short delay
        setTimeout(() => {
            catContainer.classList.remove('hidden');
        }, 500);
        
        // Add button click effect
        magicButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            magicButton.style.transform = '';
        }, 150);
        
        // Change button text temporarily
        const originalText = magicButton.innerHTML;
        magicButton.innerHTML = '✨ Magic! ✨';
        setTimeout(() => {
            magicButton.innerHTML = originalText;
        }, 2000);
    });
    
    function createFlowerRain() {
        // Clear any existing flowers
        flowerContainer.innerHTML = '';
        
        // Create multiple waves of flowers
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                createFlowerWave();
            }, wave * 800);
        }
    }
    
    function createFlowerWave() {
        const numberOfFlowers = 15 + Math.random() * 10; // 15-25 flowers per wave
        
        for (let i = 0; i < numberOfFlowers; i++) {
            setTimeout(() => {
                createSingleFlower();
            }, i * 100); // Stagger the flowers
        }
    }
    
    function createSingleFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Mix flowers and hearts
        const allSymbols = [...flowers, ...hearts];
        const randomSymbol = allSymbols[Math.floor(Math.random() * allSymbols.length)];
        flower.textContent = randomSymbol;
        
        // Random horizontal position
        flower.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration and delay
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        flower.style.animationDuration = duration + 's';
        flower.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Add some random rotation and size variation
        const rotation = Math.random() * 360;
        const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        flower.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        
        flowerContainer.appendChild(flower);
        
        // Remove flower after animation completes
        setTimeout(() => {
            if (flower.parentNode) {
                flower.parentNode.removeChild(flower);
            }
        }, (duration + 0.5) * 1000);
    }
    
    // Add some sparkle effects
    function createSparkles() {
        const sparkleContainer = document.createElement('div');
        sparkleContainer.style.position = 'fixed';
        sparkleContainer.style.top = '0';
        sparkleContainer.style.left = '0';
        sparkleContainer.style.width = '100vw';
        sparkleContainer.style.height = '100vh';
        sparkleContainer.style.pointerEvents = 'none';
        sparkleContainer.style.zIndex = '2';
        
        document.body.appendChild(sparkleContainer);
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + 'vw';
                sparkle.style.top = Math.random() * 100 + 'vh';
                sparkle.style.fontSize = '1rem';
                sparkle.style.animation = 'sparkle 2s ease-out forwards';
                sparkle.style.opacity = '0';
                
                // Add sparkle animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes sparkle {
                        0% { opacity: 0; transform: scale(0) rotate(0deg); }
                        50% { opacity: 1; transform: scale(1) rotate(180deg); }
                        100% { opacity: 0; transform: scale(0) rotate(360deg); }
                    }
                `;
                if (!document.querySelector('style[data-sparkle]')) {
                    style.setAttribute('data-sparkle', 'true');
                    document.head.appendChild(style);
                }
                
                sparkleContainer.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2000);
            }, i * 100);
        }
        
        // Clean up sparkle container
        setTimeout(() => {
            if (sparkleContainer.parentNode) {
                sparkleContainer.parentNode.removeChild(sparkleContainer);
            }
        }, 5000);
    }
    
    // Add sparkles when button is clicked
    magicButton.addEventListener('click', function() {
        setTimeout(createSparkles, 1000);
    });
    
    // Add some ambient floating flowers
    function createAmbientFlowers() {
        if (Math.random() < 0.3) { // 30% chance every interval
            createSingleFlower();
        }
    }
    
    // Create ambient flowers every 5 seconds
    setInterval(createAmbientFlowers, 5000);
    
    // Add hover effect to the cat
    catContainer.addEventListener('mouseenter', function() {
        const cat = catContainer.querySelector('.orange-cat');
        cat.style.transform = 'scale(1.1) rotate(5deg)';
        cat.style.transition = 'transform 0.3s ease';
    });
    
    catContainer.addEventListener('mouseleave', function() {
        const cat = catContainer.querySelector('.orange-cat');
        cat.style.transform = '';
    });
    
    // Make the cat occasionally meow
    function catMeow() {
        const cat = catContainer.querySelector('.orange-cat');
        const message = catContainer.querySelector('.love-message');
        
        if (!catContainer.classList.contains('hidden')) {
            // Add a temporary meow animation
            cat.style.animation = 'sway 3s ease-in-out infinite, meow 0.5s ease-in-out';
            message.style.animation = 'messageGlow 2s ease-in-out infinite, messageBounce 0.5s ease-in-out';
            
            // Add meow animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes meow {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.05) rotate(-2deg); }
                }
                @keyframes messageBounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `;
            if (!document.querySelector('style[data-meow]')) {
                style.setAttribute('data-meow', 'true');
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                cat.style.animation = 'sway 3s ease-in-out infinite';
                message.style.animation = 'messageGlow 2s ease-in-out infinite';
            }, 500);
        }
    }
    
    // Cat meows every 10-15 seconds
    setInterval(catMeow, 10000 + Math.random() * 5000);
    
    // Add keyboard shortcut (spacebar) to trigger the magic
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            magicButton.click();
        }
    });
    
    // Add some initial sparkles on page load
    setTimeout(() => {
        createSparkles();
    }, 1000);
});