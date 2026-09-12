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
    const btnSelectArgollas = document.getElementById('btnSelectArgollas');
    const btnSelectRelojes = document.getElementById('btnSelectRelojes');
    const relojesWarning = document.getElementById('relojesWarning');
    const formType = document.getElementById('formType');

    const resetTypeSelectors = () => {
        if (btnSelectArgollas && btnSelectRelojes && relojesWarning) {
            btnSelectArgollas.classList.remove('bg-royal-blue', 'text-white', 'border-royal-blue');
            btnSelectArgollas.classList.add('bg-white', 'text-gray-600', 'border-gray-300');
            btnSelectRelojes.classList.remove('bg-royal-blue', 'text-white', 'border-royal-blue');
            btnSelectRelojes.classList.add('bg-white', 'text-gray-600', 'border-gray-300');
            relojesWarning.classList.add('hidden');
        }
    };

    if (btnSelectArgollas && btnSelectRelojes) {
        btnSelectArgollas.addEventListener('click', () => {
            resetTypeSelectors();
            btnSelectArgollas.classList.remove('bg-white', 'text-gray-600', 'border-gray-300');
            btnSelectArgollas.classList.add('bg-royal-blue', 'text-white', 'border-royal-blue');
            if (formType) formType.value = 'Argollas/Joyas';
        });

        btnSelectRelojes.addEventListener('click', () => {
            resetTypeSelectors();
            btnSelectRelojes.classList.remove('bg-white', 'text-gray-600', 'border-gray-300');
            btnSelectRelojes.classList.add('bg-royal-blue', 'text-white', 'border-royal-blue');
            if (formType) formType.value = 'Relojes Festina';
            if (relojesWarning) relojesWarning.classList.remove('hidden');
        });
    }

    if (contactForm) {
        // Auto-fill discount field if coupon was already claimed
        const formDiscount = document.getElementById('formDiscount');
        if (formDiscount && localStorage.getItem('claimedCouponNeny') === 'NENY2026') {
            formDiscount.value = 'NENY2026';
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName')?.value.trim() || '';
            const phone = document.getElementById('formPhone')?.value.trim() || '';
            const message = document.getElementById('formMessage')?.value.trim() || '';
            const type = formType ? formType.value : '';
            const couponClaimed = localStorage.getItem('claimedCouponNeny') === 'NENY2026';

            let typeText = type ? `[Consulta sobre: ${type}] ` : '';
            let waText = `Hola Joyería Neny, mi nombre es ${name} (Tel: ${phone}). ${typeText}Quisiera consultar lo siguiente: ${message}`;

            // Attach coupon ONLY for Relojes Festina inquiries
            if (couponClaimed && type === 'Relojes Festina') {
                waText += `\n\n🏷️ Cupón Activado: NENY2026 (El cliente tiene un 15% de descuento)`;
            }

            const waUrl = `https://wa.me/56996234090?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
            contactForm.reset();
            resetTypeSelectors();
            if (formType) formType.value = '';
            // Re-fill discount field after reset if coupon is claimed
            if (formDiscount && localStorage.getItem('claimedCouponNeny') === 'NENY2026') {
                formDiscount.value = 'NENY2026';
            }
        });
    }

    // ==========================================
    // PROMO MODAL LOGIC (NENY2026)
    // ==========================================
    const promoModal = document.getElementById('promoModal');
    if (promoModal) {
        const closePromoBtn = document.getElementById('closePromoBtn');
        const claimPromoBtn = document.getElementById('claimPromoBtn');
        const promoContent = document.getElementById('promoModalContent');

        const closePromo = () => {
            if (promoContent) {
                anime({ targets: promoContent, scale: [1, 0.95], opacity: [1, 0], duration: 300, easing: 'easeInQuad' });
            }
            anime({
                targets: promoModal,
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => promoModal.classList.add('hidden')
            });
        };

        const openPromo = () => {
            promoModal.classList.remove('hidden');
            anime({ targets: promoModal, opacity: [0, 1], duration: 400, easing: 'easeOutQuad' });
            if (promoContent) {
                anime({ targets: promoContent, scale: [0.92, 1], opacity: [0, 1], duration: 500, easing: 'easeOutBack' });
            }
        };

        // Show only if not claimed yet, 3 seconds after page load
        if (!localStorage.getItem('claimedCouponNeny')) {
            setTimeout(() => {
                openPromo();
            }, 3000);
        }

        if (closePromoBtn) closePromoBtn.addEventListener('click', closePromo);

        if (claimPromoBtn) {
            claimPromoBtn.addEventListener('click', () => {
                // Save coupon to localStorage (permanent until cleared)
                localStorage.setItem('claimedCouponNeny', 'NENY2026');

                // Auto-fill the discount field in the contact form
                const formDiscount = document.getElementById('formDiscount');
                if (formDiscount) formDiscount.value = 'NENY2026';

                // Celebratory button feedback
                claimPromoBtn.innerHTML = '<span class="text-xl">✅</span><span>¡Cupón Reclamado!</span>';
                claimPromoBtn.classList.add('bg-green-600');
                claimPromoBtn.classList.remove('bg-royal-blue', 'hover:bg-royal-dark');
                claimPromoBtn.disabled = true;

                setTimeout(() => closePromo(), 1800);
            });
        }

        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) closePromo();
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

    // ==========================================
    // 6. MODELOS DESTACADOS FESTINA ALEATORIOS (LANDING)
    // ==========================================
    function renderFeaturedWatches() {
        const container = document.getElementById('featuredWatchesGrid');
        if (!container) return;

        // Obtener relojes de la base global de datos
        const source = (typeof watches !== 'undefined' && Array.isArray(watches) && watches.length) 
            ? watches 
            : null;

        if (!source) return;

        // Mezclar aleatoriamente y tomar 3 modelos únicos
        const shuffled = [...source].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);

        container.innerHTML = '';
        selected.forEach((watch) => {
            const item = document.createElement('div');
            item.className = 'flex flex-col items-center text-center group';
            item.innerHTML = `
                <a href="catalogo.html" class="w-full flex flex-col items-center group cursor-pointer" title="Ver ${watch.name} en el catálogo">
                    <!-- Marco de Cristal con Fondo Blanco para el Reloj -->
                    <div class="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-[#FDFBF7] border border-white/15 p-6 mb-6 shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:border-blue-300/50 relative flex items-center justify-center overflow-hidden">
                        <img src="${watch.imagePath}" alt="${watch.name}" class="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <!-- Código o Referencia -->
                    <span class="text-[11px] font-sans font-bold tracking-[0.2em] text-blue-300 uppercase mb-1.5">
                        ${watch.photoNum || 'Festina'}
                    </span>

                    <!-- Únicamente Nombre de Modelo (Sin Precio) -->
                    <h3 class="text-xs sm:text-sm font-sans font-bold tracking-[0.15em] text-white uppercase line-clamp-2 max-w-[280px] group-hover:text-blue-200 transition-colors leading-snug">
                        ${watch.name}
                    </h3>

                    <!-- Enlace elegante a catálogo -->
                    <span class="mt-4 text-[11px] font-sans font-bold uppercase tracking-widest text-blue-300/75 group-hover:text-blue-200 transition-colors border-b border-blue-300/30 group-hover:border-blue-200 pb-0.5 flex items-center gap-1.5">
                        <span>Ver en catálogo</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </span>
                </a>
            `;
            container.appendChild(item);
        });

        if (typeof anime !== 'undefined') {
            anime({
                targets: '#featuredWatchesGrid > div',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 600,
                easing: 'easeOutQuad'
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderFeaturedWatches);
    } else {
        renderFeaturedWatches();
    }

