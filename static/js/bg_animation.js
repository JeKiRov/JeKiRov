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
    // Semi-transparent black to create trail effect
    // Very dark navy fade to prevent gray wash and match theme
    ctx.fillStyle = 'rgba(2, 12, 27, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#4d88ff'; // Light Navy Blue
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        // Varying colors for depth - mostly Cyberpunk Blue/Cyan
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#FFF'; // White glint
        } else {
            ctx.fillStyle = 'rgba(77, 136, 255, 0.5)'; // Light Navy Blue
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
