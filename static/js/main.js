document.addEventListener('DOMContentLoaded', () => {
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

    // Typing Effect
    const textToType = "AdriÃ¡n Navarro Escudero"; // Placeholder for user's name
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            typingElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 250); // Medium typing speed (250ms)
        } else {
            // Typing finished
            document.querySelector('.cursor').style.display = 'none';
            const title = document.querySelector('h1');
            title.classList.add('typing-done');

            // Start Hacking/Scramble Effect
            let originalText = title.textContent.replace('|', ''); // Remove cursor char if present
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
                    title.innerText = originalText; // Ensure final text is clean
                }

                iterations += 1 / 3;
            }, 30);
        }
    }

    // Start typing after a slight delay
    setTimeout(typeWriter, 500);

    // 3D Tilt Effect
    const cards = document.querySelectorAll('.card[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

    // Contact Button Copy Functionality
    const contactBtn = document.getElementById('contact-button');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const emailText = document.getElementById('email-text').innerText;
            const hint = document.querySelector('.copy-hint');

            // Fallback for file:// protocol or incompatible browsers
            if (navigator.clipboard) {
                navigator.clipboard.writeText(emailText).then(() => {
                    showCopied(hint);
                }).catch(err => {
                    fallbackCopyText(emailText, hint);
                });
            } else {
                fallbackCopyText(emailText, hint);
            }
        });
    }

    function fallbackCopyText(text, hintElement) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed'; // Avoid scrolling
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopied(hintElement);
            } else {
                hintElement.innerText = 'Error al copiar';
            }
        } catch (err) {
            hintElement.innerText = 'Error al copiar';
            console.error('Fallback verify failed', err);
        }

        document.body.removeChild(textArea);
    }

    function showCopied(element) {
        const originalText = element.innerText;
        element.style.color = '#4d88ff'; // Feedback color
        element.innerText = '¡Copiado!';
        setTimeout(() => {
            element.innerText = originalText; // Restore original text
            element.style.color = '';
        }, 2000);
    }


    // ANTI-CLICKJACKING & SECURITY (Frame Buster)
    // Protege contra ataques donde meten tu web en un iframe invisible
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }

    // CONSOLE WARNING
    // Disuade a curiosos de pegar scripts maliciosos (Self-XSS)
    console.log('%c¡DETENTE!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px black;');
    console.log('%cEsta es una zona segura. Si alguien te ha dicho que pegues código aquí, es un ataque.', 'font-size: 18px; color: white;');
    console.log('%cSystem Monitor: Active. All interactions logged.', 'font-size: 12px; color: #4d88ff;');

