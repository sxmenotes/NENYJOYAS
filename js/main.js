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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName')?.value.trim() || '';
            const phone = document.getElementById('formPhone')?.value.trim() || '';
            const message = document.getElementById('formMessage')?.value.trim() || '';
            const type = formType ? formType.value : '';

            let typeText = type ? `[Consulta sobre: ${type}] ` : '';
            let waText = `Hola Joyería Neny, mi nombre es ${name} (Tel: ${phone}). ${typeText}Quisiera consultar lo siguiente: ${message}`;

            const waUrl = `https://wa.me/56996234090?text=${encodeURIComponent(waText)}`;
            window.open(waUrl, '_blank');
            contactForm.reset();
            resetTypeSelectors();
            if (formType) formType.value = '';
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

// ==========================================
// 7. SISTEMA MULTI-GALERÍA INTERACTIVA & LIGHTBOX MINIMALISTA (ORFEBRERÍA)
// ==========================================
(function initOrfebreriaInteractiveSystem() {
    if (typeof joyasCatalog === 'undefined' || typeof joyasCategories === 'undefined') return;

    const PAGE_SIZE = 12;
    let activeCategoryId = 'destacados';
    let activeItems = [];
    let visibleCount = PAGE_SIZE;

    // Estado de la Triple Vitrina Dinámica (Bento Trio)
    let showcaseIdx = 0;
    let showcaseTimer = null;

    // Estado del Lightbox
    let lightboxIdx = 0;
    let touchStartX = 0;

    // Referencias DOM — Explorador y Categorías
    const tabsContainer = document.getElementById('joyasCategoryTabs');
    const gridContainer = document.getElementById('joyasInteractiveGrid');
    const loadMoreBtn = document.getElementById('joyasLoadMoreBtn');
    const loadMoreText = document.getElementById('joyasLoadMoreText');
    const collapseBtn = document.getElementById('joyasCollapseBtn');

    // Referencias DOM — Vitrina Bento Trio
    const gcSub1 = document.getElementById('gc-secondary-1');
    const gcSub2 = document.getElementById('gc-secondary-2');
    const mainSlidesEl = document.getElementById('showcaseMainSlides');
    const sub1SlidesEl = document.getElementById('showcaseSub1Slides');
    const sub2SlidesEl = document.getElementById('showcaseSub2Slides');

    // Referencias DOM — Lightbox Modal Minimalista
    const lightbox = document.getElementById('jewelLightbox');
    const closeLightboxBtn = document.getElementById('closeJewelLightboxBtn');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');

    function getItemsForCategory(catId) {
        if (catId === 'destacados') {
            return joyasCatalog.filter(item => item.featured);
        }
        return joyasCatalog.filter(item => item.category === catId);
    }

    // 1. Renderizar Pestañas de Categorías (Limpias)
    function renderCategoryTabs() {
        if (!tabsContainer) return;
        tabsContainer.innerHTML = '';

        joyasCategories.forEach(cat => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('aria-pressed', cat.id === activeCategoryId ? 'true' : 'false');
            btn.className = `joya-tab-btn ${cat.id === activeCategoryId ? 'is-active' : ''}`;
            btn.textContent = cat.shortName;
            btn.addEventListener('click', () => {
                if (activeCategoryId === cat.id) return;
                selectCategory(cat.id, true);
            });
            tabsContainer.appendChild(btn);
        });
    }

    // 2. Actualizar imagen con crossfade suave en una vitrina
    function crossfadeSlide(containerEl, item, eager) {
        if (!containerEl || !item) return;
        const existingImgs = containerEl.querySelectorAll('img.gc-slide');
        const newImg = document.createElement('img');
        newImg.src = item.src;
        newImg.alt = 'Joyería Neny';
        newImg.className = 'gc-slide';
        newImg.loading = eager ? 'eager' : 'lazy';
        newImg.decoding = 'async';
        newImg.style.opacity = '0';

        containerEl.appendChild(newImg);

        requestAnimationFrame(() => {
            newImg.style.opacity = '1';
            existingImgs.forEach(oldImg => {
                oldImg.style.opacity = '0';
                setTimeout(() => {
                    if (oldImg.parentNode === containerEl) {
                        containerEl.removeChild(oldImg);
                    }
                }, 850);
            });
        });
    }

    function getSubIndices(baseIdx, total) {
        if (total <= 1) return [0, 0];
        const offset1 = Math.max(1, Math.floor(total / 3));
        const offset2 = Math.max(2, Math.floor((total * 2) / 3));
        const idx1 = (baseIdx + offset1) % total;
        let idx2 = (baseIdx + offset2) % total;
        if (idx2 === idx1 && total > 2) {
            idx2 = (idx1 + 1) % total;
        }
        return [idx1, idx2];
    }

    // 3. Actualizar las 3 Vitrinas Dinámicas (Bento Trio sin textos ni controles)
    function updateBentoShowcase() {
        if (!activeItems.length) return;
        const total = activeItems.length;
        showcaseIdx = ((showcaseIdx % total) + total) % total;

        const mainItem = activeItems[showcaseIdx];
        const [sub1Idx, sub2Idx] = getSubIndices(showcaseIdx, total);
        const sub1Item = activeItems[sub1Idx];
        const sub2Item = activeItems[sub2Idx];

        crossfadeSlide(mainSlidesEl, mainItem, true);
        crossfadeSlide(sub1SlidesEl, sub1Item, false);
        crossfadeSlide(sub2SlidesEl, sub2Item, false);
    }

    function restartShowcaseTimer() {
        if (showcaseTimer) clearInterval(showcaseTimer);
        showcaseTimer = setInterval(() => {
            showcaseIdx = (showcaseIdx + 1) % Math.max(1, activeItems.length);
            updateBentoShowcase();
        }, 4200);
    }

    // 4. Renderizar la Galería Interactiva (Únicamente Fotografías Limpias)
    function renderInteractiveGrid(animateNewFrom = 0) {
        if (!gridContainer) return;
        const slice = activeItems.slice(0, visibleCount);

        if (animateNewFrom === 0) {
            gridContainer.innerHTML = '';
        }

        slice.forEach((item, index) => {
            if (index < animateNewFrom) return;

            const card = document.createElement('div');
            card.className = 'joya-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Ver fotografía en tamaño completo');
            card.innerHTML = `
                <img src="${item.src}" alt="Joyería Neny" class="joya-card__img" loading="${index < 8 ? 'eager' : 'lazy'}" decoding="async" />
            `;

            const openHandler = () => openLightbox(index);
            card.addEventListener('click', openHandler);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openHandler();
                }
            });

            gridContainer.appendChild(card);
        });

        const shown = Math.min(visibleCount, activeItems.length);

        if (loadMoreBtn && loadMoreText) {
            const remaining = activeItems.length - shown;
            if (remaining > 0) {
                loadMoreBtn.classList.remove('hidden');
                loadMoreText.textContent = 'Ver más fotografías';
            } else {
                loadMoreBtn.classList.add('hidden');
            }
        }

        if (collapseBtn) {
            if (shown > PAGE_SIZE) {
                collapseBtn.classList.remove('hidden');
            } else {
                collapseBtn.classList.add('hidden');
            }
        }

        if (typeof anime !== 'undefined') {
            const allCards = Array.from(gridContainer.children);
            const targetCards = allCards.slice(animateNewFrom);
            if (targetCards.length) {
                anime({
                    targets: targetCards,
                    opacity: [0, 1],
                    translateY: [14, 0],
                    delay: anime.stagger(35),
                    duration: 420,
                    easing: 'easeOutCubic'
                });
            }
        }
    }

    // 5. Seleccionar Categoría
    function selectCategory(catId, resetShowcase = true) {
        activeCategoryId = catId;
        activeItems = getItemsForCategory(catId);
        visibleCount = PAGE_SIZE;

        renderCategoryTabs();
        renderInteractiveGrid(0);

        if (resetShowcase) {
            showcaseIdx = 0;
            updateBentoShowcase();
            restartShowcaseTimer();
        }
    }

    // 6. Lightbox Minimalista con Transición Suave
    function updateLightboxImage(animateFade = false) {
        if (!activeItems.length || !lightboxImg) return;
        const total = activeItems.length;
        lightboxIdx = ((lightboxIdx % total) + total) % total;
        const item = activeItems[lightboxIdx];

        if (!animateFade) {
            lightboxImg.src = item.src;
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
            return;
        }

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            };
        }, 140);
    }

    function openLightbox(index) {
        if (!lightbox || !activeItems.length) return;
        lightboxIdx = index;
        updateLightboxImage(false);
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (mainSlidesEl) {
        mainSlidesEl.addEventListener('click', () => openLightbox(showcaseIdx));
        mainSlidesEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(showcaseIdx);
            }
        });
    }

    if (gcSub1) {
        const openSub1 = () => {
            const [sub1Idx] = getSubIndices(showcaseIdx, activeItems.length);
            openLightbox(sub1Idx);
        };
        gcSub1.addEventListener('click', openSub1);
        gcSub1.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openSub1();
            }
        });
    }

    if (gcSub2) {
        const openSub2 = () => {
            const [, sub2Idx] = getSubIndices(showcaseIdx, activeItems.length);
            openLightbox(sub2Idx);
        };
        gcSub2.addEventListener('click', openSub2);
        gcSub2.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openSub2();
            }
        });
    }

    // Eventos de Paginación
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const prevCount = visibleCount;
            visibleCount = Math.min(activeItems.length, visibleCount + PAGE_SIZE);
            renderInteractiveGrid(prevCount);
        });
    }

    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            visibleCount = PAGE_SIZE;
            renderInteractiveGrid(0);
            const explorerEl = document.getElementById('joyas-catalogo-interactivo');
            if (explorerEl) explorerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Eventos del Lightbox
    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('jewel-lightbox__stage')) {
                closeLightbox();
            }
        });
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        lightbox.addEventListener('touchend', (e) => {
            const deltaX = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(deltaX) > 45) {
                if (deltaX < 0) {
                    lightboxIdx = (lightboxIdx + 1) % activeItems.length;
                } else {
                    lightboxIdx = (lightboxIdx - 1 + activeItems.length) % activeItems.length;
                }
                updateLightboxImage(true);
            }
        }, { passive: true });
    }

    if (lightboxPrevBtn) {
        lightboxPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxIdx = (lightboxIdx - 1 + activeItems.length) % activeItems.length;
            updateLightboxImage(true);
        });
    }

    if (lightboxNextBtn) {
        lightboxNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxIdx = (lightboxIdx + 1) % activeItems.length;
            updateLightboxImage(true);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            lightboxIdx = (lightboxIdx - 1 + activeItems.length) % activeItems.length;
            updateLightboxImage(true);
        }
        if (e.key === 'ArrowRight') {
            lightboxIdx = (lightboxIdx + 1) % activeItems.length;
            updateLightboxImage(true);
        }
    });

    // Inicializar con la categoría 'destacados'
    selectCategory('destacados', true);
})();


