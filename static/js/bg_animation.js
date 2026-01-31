const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;

const fontSize = 16;
let columns;
let drops = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Recalculate columns based on new width
    columns = Math.floor(width / fontSize);

    // Re-initialize drops to fill the new width
    // Preserve existing drops if possible to avoid full reset flicker, or just reset for simplicity
    // For a cleaner resize experience, we'll reset.
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const alphabet = katakana + latin;

window.addEventListener('resize', resize);
resize();

function draw() {
    // Dynamic color fetching from CSS variables for easy theming
    const computedStyle = getComputedStyle(document.body);
    const matrixColor = computedStyle.getPropertyValue('--matrix-color').trim() || '#4d88ff';
    const matrixBg = computedStyle.getPropertyValue('--matrix-bg').trim() || 'rgba(2, 12, 27, 0.1)';

    ctx.fillStyle = matrixBg;
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        // Varying colors for depth
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#FFF'; // Default white glint
        } else {
            ctx.fillStyle = matrixColor; // Use the CSS variable color
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 33);
