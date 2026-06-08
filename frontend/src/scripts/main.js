// =============================================
// TRÚC TỰ — Main JavaScript
// =============================================

// --- Header scroll effect ---
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });


// --- Intersection Observer for scroll animations ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
    observer.observe(el);
});


// --- Feature card hover ripple effect ---
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease';
    });
});


// --- CTA button click effects ---
const btnPrimary = document.querySelector('.btn-primary');
if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
        btnPrimary.style.transform = 'scale(0.97)';
        setTimeout(() => {
            btnPrimary.style.transform = '';
        }, 150);
    });
}


// --- Random floating hearts spawner ---
function spawnHeart() {
    const mascotWrapper = document.querySelector('.mascot-wrapper');
    if (!mascotWrapper) return;

    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.cssText = `
        position: absolute;
        font-size: ${14 + Math.random() * 16}px;
        color: ${Math.random() > 0.5 ? '#F06292' : '#F5A03A'};
        left: ${20 + Math.random() * 60}%;
        top: ${10 + Math.random() * 60}%;
        opacity: 0;
        pointer-events: none;
        z-index: 10;
        transition: none;
        animation: none;
    `;

    mascotWrapper.appendChild(heart);

    // Animate with keyframes via JS
    const startY = parseFloat(heart.style.top);
    const startX = parseFloat(heart.style.left);
    let progress = 0;
    let startTime = null;
    const duration = 2000 + Math.random() * 1000;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        progress = (timestamp - startTime) / duration;

        if (progress >= 1) {
            mascotWrapper.removeChild(heart);
            return;
        }

        const eased = Math.sin(progress * Math.PI);
        heart.style.opacity = eased * 0.75;
        heart.style.top = `${startY - progress * 30}%`;
        heart.style.left = `${startX + Math.sin(progress * Math.PI * 2) * 3}%`;
        heart.style.transform = `scale(${0.6 + eased * 0.6}) rotate(${Math.sin(progress * 10) * 10}deg)`;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// Spawn hearts periodically
setInterval(spawnHeart, 1800);
setTimeout(spawnHeart, 500);
