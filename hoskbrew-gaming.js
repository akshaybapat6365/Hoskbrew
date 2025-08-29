// HOSKBREW RETRO GAMING INTERACTIVE EFFECTS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Create CRT overlay effect
    const crtOverlay = document.createElement('div');
    crtOverlay.className = 'crt-overlay';
    document.body.appendChild(crtOverlay);
    
    // Create particle system
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Generate floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 25000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
    for(let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 100);
    }
    
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const message = document.createElement('div');
        message.innerHTML = '🎮 POWER UP ACTIVATED! 🎮';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: bold;
            color: #00ffff;
            text-shadow: 0 0 30px #00ffff;
            z-index: 10000;
            animation: bounce 1s ease infinite;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
        }, 3000);
    }
    
    // Add glitch effect to headings
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
        heading.setAttribute('data-text', heading.textContent);
        heading.classList.add('glitch');
    });
    
    // Cursor trail effect
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #00ffff, #ff00ff);
            border-radius: 50%;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.5s ease;
            box-shadow: 0 0 10px #00ffff;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
        
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
        }, 100);
        
        setTimeout(() => {
            dot.remove();
            trail.shift();
        }, 600);
        
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }
    });
    
    // Sound effects system
    const sounds = {
        hover: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
        click: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='
    };
    
    // Add hover sound to buttons
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mouseenter', () => {
            // const audio = new Audio(sounds.hover);
            // audio.volume = 0.1;
            // audio.play().catch(() => {});
            
            element.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
    
    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.retro-grid');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Console theme switcher
    const themes = ['nintendo-theme', 'playstation-theme', 'xbox-theme', 'sega-theme', 'atari-theme'];
    let currentTheme = 0;
    
    function switchTheme() {
        document.body.classList.remove(...themes);
        document.body.classList.add(themes[currentTheme]);
        currentTheme = (currentTheme + 1) % themes.length;
    }
    
    // Type writer effect for hero text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Matrix rain effect
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.1;
            z-index: 0;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = '01';
        const matrixArray = matrix.split('');
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 35);
    }
    
    // Initialize matrix effect
    createMatrixRain();
    
    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Add rainbow animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes pixelate {
            0%, 100% { filter: contrast(100%) brightness(100%); }
            50% { filter: contrast(200%) brightness(150%); }
        }
    `;
    document.head.appendChild(style);
    
    // Add retro TV static effect on page load
    const staticOverlay = document.createElement('div');
    staticOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23000"/><rect width="1" height="1" x="50" y="50" fill="%23fff" opacity="0.5"/></svg>');
        background-size: 2px 2px;
        opacity: 0.05;
        pointer-events: none;
        z-index: 9997;
        animation: static 0.2s infinite;
    `;
    
    // Add static animation
    const staticStyle = document.createElement('style');
    staticStyle.textContent = `
        @keyframes static {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-1px, -1px); }
            20% { transform: translate(1px, -1px); }
            30% { transform: translate(-1px, 1px); }
            40% { transform: translate(1px, 1px); }
            50% { transform: translate(-1px, 0); }
            60% { transform: translate(1px, 0); }
            70% { transform: translate(0, -1px); }
            80% { transform: translate(0, 1px); }
            90% { transform: translate(-1px, -1px); }
        }
    `;
    document.head.appendChild(staticStyle);
    document.body.appendChild(staticOverlay);
    
    // Power button effect
    console.log('🎮 HOSKBREW GAMING SYSTEM INITIALIZED 🎮');
    console.log('Press ↑↑↓↓←→←→BA for a surprise!');
});

// Utility function for smooth scroll
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}