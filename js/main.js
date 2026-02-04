/**
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Simple animation for the hamburger icon if desired
            const spans = menuToggle.querySelectorAll('span');
            // Logic can be added here for icon transformation
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close menu on mobile after click
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- Mouse Follow Animation (Hero) ---
    const hero = document.querySelector('.hero');
    const glow = document.querySelector('.hero-mouse-glow');

    if (hero && glow) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Move the glow directly to cursor position with a slight lag/smoothness via CSS transition or direct update
            // Using requestAnimationFrame for performance
            requestAnimationFrame(() => {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            });
        });

        // Optional: Hide glow when leaving hero
        hero.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
        hero.addEventListener('mouseenter', () => {
            glow.style.opacity = '1';
        });
    }

    // --- Typewriter Animation ---
    const typeTitle = document.getElementById('typewriter-text');
    if (typeTitle) {
        const fullTextRaw = typeTitle.getAttribute('data-text');
        // We use | as a separator for line breaks to handle semantic HTML <br>
        const lines = fullTextRaw.split('|');

        let typeSpeed = 50; // ms per char
        let lineIndex = 0;
        let charIndex = 0;

        typeTitle.innerHTML = '<span class="cursor"></span>'; // Start with cursor
        const cursor = typeTitle.querySelector('.cursor');

        function type() {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];

                if (charIndex < currentLine.length) {
                    // Insert char before cursor
                    const char = currentLine.charAt(charIndex);
                    const textNode = document.createTextNode(char);
                    cursor.before(textNode);
                    charIndex++;
                    setTimeout(type, typeSpeed);
                } else {
                    // End of line
                    lineIndex++;
                    charIndex = 0;
                    if (lineIndex < lines.length) {
                        cursor.before(document.createElement('br')); // Add visual break
                        setTimeout(type, 300); // Pause before next line
                    } else {
                        // Animation complete
                        // cursor.style.display = 'none'; // Optional: hide cursor at end
                    }
                }
            }
        }

        // Start typing after a small delay
        setTimeout(type, 500);
    }

    console.log('App initialized');
});
