document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // 2. Typing Effect (Optimized for long names)
    // We increase speed significantly to avoid "bugged" feeling
    const textToType = "ADRIAN NAVARRO ESCUDERO"; // Full Name
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;
    const typingSpeed = 50; // Much faster (was 250ms)

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Typing finished
            document.querySelector('.cursor').style.display = 'none';
            const title = document.querySelector('h1');
            title.classList.add('typing-done');

            // Start Hacking/Scramble Effect
            let originalText = title.innerText.replace('|', '');
            let iterations = 0;
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

            const interval = setInterval(() => {
                title.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    title.innerText = originalText;
                }

                iterations += 3; // Much faster scramble (resolves 3 chars per tick)
            }, 20); // Faster updates (was 30ms)
        }
    }
    // Start typing
    setTimeout(typeWriter, 500);

    // 3. 3D Tilt Effect
    const cards = document.querySelectorAll('.card[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// 4. Copy Email & Toast Notification
const contactBtn = document.getElementById('contact-button');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const emailText = document.getElementById('email-text').innerText;

        // Use standard clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(emailText).then(() => {
                showToast("¡Correo Copiado al Portapapeles!");
            }).catch(err => {
                fallbackCopyText(emailText);
            });
        } else {
            fallbackCopyText(emailText);
        }
    });
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast("¡Correo Copiado al Portapapeles!");
        } else {
            showToast("Error al copiar :(");
        }
    } catch (err) {
        showToast("Error al copiar :(");
    }
    document.body.removeChild(textArea);
}

// Custom Toast Notification Function
function showToast(message) {
    // Check if toast already exists
    const existingToast = document.querySelector('.cyber-toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'cyber-toast';
    toast.innerText = message;

    // Add Glitch/Scanline effect
    toast.setAttribute('data-text', message);

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

// 5. SECURITY: Frame Buster & Console Warning
if (window.self !== window.top) {
    window.top.location = window.self.location;
}

console.log('%c¡DETENTE!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px black;');
console.log('%cEsta es una zona segura. System Monitor: Active.', 'font-size: 18px; color: #4d88ff;');
