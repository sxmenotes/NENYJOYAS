document.addEventListener('DOMContentLoaded', () => {
    // Año dinámico en footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================================
    // 1. MENÚ MÓVIL MODAL DE CRISTAL (GLASSMORPHISM)
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        const modalContent = mobileMenu.querySelector('div');

        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            anime({
                targets: mobileMenu,
                opacity: [0, 1],
                duration: 250,
                easing: 'easeOutQuad'
            });
            if (modalContent) {
                anime({
                    targets: modalContent,
                    scale: [0.92, 1],
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'easeOutBack'
                });
            }
        };

        const closeMenu = () => {
            if (modalContent) {
                anime({
                    targets: modalContent,
                    scale: [1, 0.92],
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeInQuad'
                });
            }
            anime({
                targets: mobileMenu,
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInQuad',
                complete: () => {
                    mobileMenu.classList.add('hidden');
                }
            });
        };

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('hidden')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        if (closeMobileMenuBtn) {
            closeMobileMenuBtn.addEventListener('click', closeMenu);
        }

        // Cerrar al hacer clic fuera de la tarjeta de cristal
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ==========================================
    // 2. ENTRADA SUAVE DEL HERO (ANIME.JS)
    // ==========================================
    anime({
        targets: '.anime-hero-text',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 800,
        easing: 'easeOutQuad',
        delay: 50
    });

    anime({
        targets: '.anime-hero-img',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 850,
        easing: 'easeOutQuad',
        delay: 150
    });

    // ==========================================
    // 3. SCROLL REVEAL SUAVE (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.anime-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [12, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 4. FORMULARIO DE CONTACTO -> WHATSAPP
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName')?.value.trim() || '';
            const phone = document.getElementById('formPhone')?.value.trim() || '';
            const message = document.getElementById('formMessage')?.value.trim() || '';

            const waText = `Hola Joyería Neny, mi nombre es ${name} (Tel: ${phone}). Quisiera consultar lo siguiente: ${message}`;
            const waUrl = `https://wa.me/56900000000?text=${encodeURIComponent(waText)}`;

            window.open(waUrl, '_blank');
            contactForm.reset();
        });
    }
});

    // ==========================================
    // 5. ANIMACIÓN DE FONDO DEL HERO (SILUETAS)
    // ==========================================
    const heroBg = document.getElementById('hero-animated-bg');
    if (heroBg) {
        const svgs = [
            // Diamante
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M6 3h12l4 6-10 13L2 9z"></path><path d="M12 22V9"></path><path d="M2 9h20"></path><path d="M6 3l6 6"></path><path d="M18 3l-6 6"></path></svg>`,
            // Anillo
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M8 8l4-4 4 4"></path><circle cx="12" cy="15" r="6"></circle></svg>`,
            // Brillo / Estrella (Sparkle)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path></svg>`,
            // Reloj (Rediseñado - Limpio y minimalista)
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect x="7" y="2" width="10" height="4" rx="1"></rect><rect x="7" y="18" width="10" height="4" rx="1"></rect><circle cx="12" cy="12" r="6"></circle><polyline points="12 9 12 12 14 12"></polyline></svg>`
        ];

        // Crear elementos aleatorios
        const numElements = 15; // Cantidad de siluetas flotantes
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < numElements; i++) {
            const el = document.createElement('div');
            // Estilos iniciales
            const size = Math.floor(Math.random() * 40) + 30; // 30px a 70px
            el.className = 'absolute text-royal-blue/40 flex items-center justify-center anime-floating-icon';
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            
            // Distribuir de izquierda a derecha uniformemente, con pequeña variación
            const leftPos = (i / numElements) * 100 + (Math.random() * 10 - 5);
            el.style.left = `${Math.max(0, Math.min(100, leftPos))}%`;
            el.style.top = `${Math.random() * 90 + 5}%`;
            
            // Inyectar SVG aleatorio
            el.innerHTML = svgs[Math.floor(Math.random() * svgs.length)];
            
            fragment.appendChild(el);
        }

        heroBg.appendChild(fragment);

        // Animar continuamente cada icono con valores nuevos
        function animateIcon(el) {
            anime({
                targets: el,
                translateX: anime.random(-300, 300),
                translateY: anime.random(-300, 300),
                rotate: anime.random(-180, 180),
                scale: anime.random(0.8, 1.5),
                opacity: [0, 1, 0],
                duration: anime.random(5000, 9000), // Movimiento fluido pero constante
                easing: 'easeInOutSine',
                complete: function() {
                    animateIcon(el); // Volver a animar con nuevos valores
                }
            });
        }

        // Iniciar animaciones con un delay aleatorio para que no partan todas igual
        document.querySelectorAll('.anime-floating-icon').forEach(icon => {
            setTimeout(() => animateIcon(icon), anime.random(0, 2000));
        });
    }
