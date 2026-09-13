document.addEventListener('DOMContentLoaded', () => {
    // Current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================================
    // MENÚ MÓVIL MODAL DE CRISTAL (GLASSMORPHISM)
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

    // Los datos provienen de js/relojes-data.js (variable global 'watches')
    const grid = document.getElementById('catalogGrid');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const resultsCount = document.getElementById('resultsCount');
    const emptyState = document.getElementById('emptyState');
    const resetSearchBtn = document.getElementById('resetFiltersBtn') || document.getElementById('resetSearchBtn');

    // Elementos de Paginación
    const paginationContainer = document.getElementById('paginationContainer');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageNumbersContainer = document.getElementById('pageNumbersContainer');
    const pageRangeStart = document.getElementById('pageRangeStart');
    const pageRangeEnd = document.getElementById('pageRangeEnd');
    const totalItemsCount = document.getElementById('totalItemsCount');

    // Elementos de Filtro y Ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    const genderBtns = document.querySelectorAll('.gender-btn');

    // Configuración de Paginación y Estado
    const ITEMS_PER_PAGE = 30;
    let currentPage = 1;
    let currentFilteredData = watches || [];
    let currentSearchTerm = '';
    let currentGender = 'all'; // 'all', 'Hombre', 'Mujer'
    let currentSort = 'default'; // 'default', 'hombre', 'mujer', 'price-desc', 'price-asc', 'alpha-asc', 'alpha-desc'

    // Actualizar estilos visuales de los botones de género
    const updateGenderPills = () => {
        genderBtns.forEach(btn => {
            const targetGender = btn.getAttribute('data-gender');
            if (targetGender === currentGender) {
                btn.className = 'gender-btn px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all duration-200 bg-royal-blue text-white shadow-2xs';
            } else {
                btn.className = 'gender-btn px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all duration-200 text-charcoal bg-gray-50 hover:bg-gray-100 hover:text-royal-blue border border-gray-200/60';
            }
        });
    };

    // Formateador de Precios en Pesos Chilenos
    const formatPrice = (price) => {
        if (!price) return '$0 CLP';
        const num = Number(price) * 1000;
        return `$${num.toLocaleString('es-CL')} CLP`;
    };

    // Actualizar Controles de Paginación
    const updatePaginationControls = () => {
        if (!paginationContainer) return;

        const totalItems = currentFilteredData.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        if (totalItems === 0) {
            paginationContainer.classList.add('hidden');
            return;
        }

        paginationContainer.classList.remove('hidden');

        // Textos descriptivos
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

        if (pageRangeStart) pageRangeStart.textContent = startIndex + 1;
        if (pageRangeEnd) pageRangeEnd.textContent = endIndex;
        if (totalItemsCount) totalItemsCount.textContent = totalItems;

        // Botones Anterior / Siguiente
        if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;

        // Botones numéricos de página
        if (pageNumbersContainer) {
            pageNumbersContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.type = 'button';
                pageBtn.textContent = i;
                
                if (i === currentPage) {
                    pageBtn.className = 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-sans font-bold bg-royal-blue text-white shadow-xs transition-all pointer-events-none';
                } else {
                    pageBtn.className = 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-sans font-semibold text-charcoal border border-gray-200 bg-white hover:bg-gray-50 hover:text-royal-blue transition-all';
                    pageBtn.addEventListener('click', () => {
                        goToPage(i);
                    });
                }

                pageNumbersContainer.appendChild(pageBtn);
            }
        }
    };

    // Cambiar de página con transición suave y scroll
    const goToPage = (pageNumber) => {
        currentPage = pageNumber;
        renderCurrentPage();

        if (grid) {
            const yOffset = -100;
            const y = grid.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
    };

    // Eventos de botones Anterior y Siguiente
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(currentFilteredData.length / ITEMS_PER_PAGE) || 1;
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    }

    // Renderizar la página actual de la grilla
    const renderCurrentPage = () => {
        grid.innerHTML = '';

        if (currentFilteredData.length === 0) {
            emptyState.classList.remove('hidden');
            if (paginationContainer) paginationContainer.classList.add('hidden');
            if (resultsCount) resultsCount.textContent = '0';
            return;
        }

        emptyState.classList.add('hidden');

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const pageItems = currentFilteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        pageItems.forEach((watch) => {
            const card = document.createElement('div');
            card.className = 'bg-white border border-gray-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group anime-card relative overflow-hidden cursor-pointer';
            card.style.opacity = '0';

            // Spec badges
            const specsHtml = watch.specs.map(spec => 
                `<span class="text-[10px] font-semibold px-2.5 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-200/80">${spec}</span>`
            ).join('');

            const isCouponClaimed = localStorage.getItem('claimedCouponNeny') === 'NENY2026';
            let displayPriceHtml = '';
            let discountBadgeHtml = '';
            let displayPriceForButton = watch.formattedPrice || formatPrice(watch.price);

            if (isCouponClaimed) {
                const discountedPrice = watch.price * 0.85;
                const formattedOriginal = watch.formattedPrice || formatPrice(watch.price);
                const formattedDiscounted = formatPrice(discountedPrice);
                displayPriceForButton = formattedDiscounted;
                
                displayPriceHtml = `
                    <div class="flex flex-col">
                        <span class="text-sm line-through text-gray-400 font-normal leading-none mb-1">${formattedOriginal}</span>
                        <span class="text-lg font-bold text-royal-blue leading-none">${formattedDiscounted}</span>
                    </div>
                `;
                discountBadgeHtml = `<span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md z-20 shadow-sm flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg> -15% NENY2026</span>`;
            } else {
                const displayPrice = watch.formattedPrice || formatPrice(watch.price);
                displayPriceHtml = `${displayPrice}`;
            }

            card.innerHTML = `
                <div class="relative z-10 flex flex-col h-full">
                    ${discountBadgeHtml}
                    <div class="w-full bg-[#FDFBF7] border border-gray-100 rounded-2xl aspect-[4/5] mb-5 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-royal-blue/30 transition-colors">
                        <img src="${watch.imagePath}" alt="${watch.name}" class="absolute inset-0 w-full h-full object-contain p-2 z-0 opacity-0 transition-opacity duration-500" onload="this.style.opacity=1" onerror="this.style.display='none'" />
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none z-10"></div>
                        <span class="text-[10px] font-sans font-bold text-white uppercase tracking-widest z-10 text-center mt-auto mb-2">${watch.photoNum}</span>
                    </div>
                    
                    <div class="flex items-center gap-2 mb-2.5">
                        <span class="text-[10px] uppercase font-bold tracking-widest text-royal-blue bg-royal-light/50 border border-royal-blue/10 px-2.5 py-0.5 rounded-full">Festina ${watch.gender || 'Oficial'}</span>
                    </div>

                    <h3 class="font-serif text-xl sm:text-2xl font-bold text-royal-blue mb-1 line-clamp-1 group-hover:text-royal-dark transition-colors">
                        ${watch.name}
                    </h3>

                    <div class="text-base font-bold text-charcoal font-sans mb-2.5">
                        ${displayPriceHtml}
                    </div>

                    <p class="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed font-sans flex-grow">
                        ${watch.description}
                    </p>

                    <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
                        ${specsHtml}
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openModal(watch));
            grid.appendChild(card);
        });

        // Animación suave de entrada con Anime.js
        anime({
            targets: '.anime-card',
            opacity: [0, 1],
            translateY: [15, 0],
            delay: anime.stagger(20),
            duration: 400,
            easing: 'easeOutQuad'
        });

        if (resultsCount) {
            resultsCount.textContent = currentFilteredData.length;
        }

        updatePaginationControls();
    };

    // Lógica Unificada de Filtrado y Ordenamiento
    const filterAndSortData = () => {
        let list = [...watches];

        // 1. Filtrado por género
        if (currentGender !== 'all') {
            list = list.filter(w => w.gender === currentGender);
        }

        // 2. Filtrado por búsqueda en tiempo real
        if (currentSearchTerm) {
            const term = currentSearchTerm.toLowerCase();
            list = list.filter(w => 
                w.name.toLowerCase().includes(term) || 
                w.description.toLowerCase().includes(term) ||
                (w.photoNum && w.photoNum.toLowerCase().includes(term)) ||
                (w.specs && w.specs.some(s => s.toLowerCase().includes(term)))
            );
        }

        // 3. Ordenamiento
        switch (currentSort) {
            case 'price-asc':
                list.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                list.sort((a, b) => b.price - a.price);
                break;
            case 'alpha-asc':
                list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
                break;
            case 'alpha-desc':
                list.sort((a, b) => b.name.localeCompare(a.name, 'es'));
                break;
            case 'hombre':
                list.sort((a, b) => (b.gender === 'Hombre' ? 1 : 0) - (a.gender === 'Hombre' ? 1 : 0));
                break;
            case 'mujer':
                list.sort((a, b) => (b.gender === 'Mujer' ? 1 : 0) - (a.gender === 'Mujer' ? 1 : 0));
                break;
            case 'default':
            default:
                // Conserva el orden original
                break;
        }

        currentFilteredData = list;
        currentPage = 1;
        renderCurrentPage();
    };

    // Selector Ordenar Por
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'hombre') {
                currentGender = 'Hombre';
                currentSort = 'default';
                updateGenderPills();
            } else if (val === 'mujer') {
                currentGender = 'Mujer';
                currentSort = 'default';
                updateGenderPills();
            } else if (val === 'default') {
                currentSort = 'default';
            } else {
                currentSort = val;
            }
            filterAndSortData();
        });
    }

    // Botones de Filtrado Rápido por Género (Todos, Hombre, Mujer)
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentGender = btn.getAttribute('data-gender') || 'all';
            updateGenderPills();

            if (sortSelect) {
                if (currentGender === 'Hombre') sortSelect.value = 'hombre';
                else if (currentGender === 'Mujer') sortSelect.value = 'mujer';
                else if (sortSelect.value === 'hombre' || sortSelect.value === 'mujer') sortSelect.value = 'default';
            }

            filterAndSortData();
        });
    });

    // Buscador
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim();
            if (clearSearchBtn) {
                if (currentSearchTerm.length > 0) {
                    clearSearchBtn.classList.remove('hidden');
                } else {
                    clearSearchBtn.classList.add('hidden');
                }
            }
            filterAndSortData();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = '';
            clearSearchBtn.classList.add('hidden');
            filterAndSortData();
            searchInput.focus();
        });
    }

    // Reset botón
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            currentSearchTerm = '';
            currentGender = 'all';
            currentSort = 'default';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            if (sortSelect) sortSelect.value = 'default';
            updateGenderPills();
            filterAndSortData();
        });
    }

    // Render inicial
    setTimeout(() => {
        filterAndSortData();
    }, 50);

    // Animación de entrada inicial
    anime({
        targets: '.anime-reveal',
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(60),
        duration: 650,
        easing: 'easeOutQuad'
    });

    // ==========================================
    // LÓGICA DEL MODAL DE PRODUCTO
    // ==========================================
    const modal = document.getElementById('productModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Elementos del modal
    const modalImage = document.getElementById('modalImage');
    const modalPhotoNum = document.getElementById('modalPhotoNum');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
    const readMoreBtn = document.getElementById('readMoreBtn');

    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            if (modalDescription.classList.contains('line-clamp-3')) {
                modalDescription.classList.remove('line-clamp-3');
                readMoreBtn.textContent = 'Ver menos';
            } else {
                modalDescription.classList.add('line-clamp-3');
                readMoreBtn.textContent = 'Leer más';
            }
        });
    }

    const openModal = (watch) => {
        const isCouponClaimed = localStorage.getItem('claimedCouponNeny') === 'NENY2026';
        let displayPriceForModal = watch.formattedPrice || formatPrice(watch.price);
        
        // Llenar datos
        modalImage.style.display = 'block';
        modalImage.src = watch.imagePath;
        modalImage.onerror = () => { modalImage.style.display = 'none'; };
        modalImage.alt = watch.name;
        modalPhotoNum.textContent = watch.photoNum;
        modalName.textContent = watch.name;
        
        if (modalPrice) {
            if (isCouponClaimed) {
                const discountedPrice = watch.price * 0.85;
                const formattedOriginal = watch.formattedPrice || formatPrice(watch.price);
                const formattedDiscounted = formatPrice(discountedPrice);
                displayPriceForModal = formattedDiscounted;
                modalPrice.innerHTML = `
                    <div class="flex items-baseline gap-3">
                        <span class="text-2xl font-bold text-royal-blue">${formattedDiscounted}</span>
                        <span class="text-base line-through text-gray-400 font-normal">${formattedOriginal}</span>
                        <span class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ml-2">Cupón Activado</span>
                    </div>
                `;
            } else {
                modalPrice.textContent = displayPriceForModal;
            }
        }

        modalDescription.textContent = watch.description;
        
        // Reset description clamp for mobile
        modalDescription.classList.add('line-clamp-3');
        if (readMoreBtn) {
            readMoreBtn.textContent = 'Leer más';
            if (watch.description.length > 90) {
                readMoreBtn.classList.remove('hidden');
            } else {
                readMoreBtn.classList.add('hidden');
            }
        }
        
        // Renderizar specs
        modalSpecs.innerHTML = watch.specs.map(spec => 
            `<span class="text-xs font-semibold px-3 py-1 bg-gray-50 text-gray-600 rounded-full border border-gray-200/80 shadow-xs">${spec}</span>`
        ).join('');
        
        // Link de Whatsapp con nombre y precio y cupón
        let whatsappCouponText = '';
        let priceContext = '';
        if (isCouponClaimed) {
            priceContext = ' - ¡15% de dcto ya aplicado al precio!';
            whatsappCouponText = '%0A%0A%F0%9F%8F%B7%EF%B8%8F%20Cup%C3%B3n%20Activado:%20NENY2026';
        }
        modalWhatsappBtn.href = `https://wa.me/56996234090?text=Hola,%20Joyer%C3%ADa%20Neny,%20me%20gustar%C3%ADa%20cotizar%20este%20reloj%20Festina:%20${encodeURIComponent(watch.name)}%20(${encodeURIComponent(displayPriceForModal)}${encodeURIComponent(priceContext)})${whatsappCouponText}`;
        
        // Mostrar modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animar entrada
        anime({
            targets: modalBackdrop,
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutSine'
        });
        
        anime({
            targets: modalContent,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 600,
            easing: 'easeOutExpo'
        });
    };

    const closeModal = () => {
        // Animar salida
        anime({
            targets: modalBackdrop,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInSine'
        });
        
        anime({
            targets: modalContent,
            opacity: [1, 0],
            translateY: [0, 20],
            duration: 300,
            easing: 'easeInSine',
            complete: () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    };

    // Eventos de cierre
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

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

        // Show only if not claimed yet, 3s after load
        if (!localStorage.getItem('claimedCouponNeny')) {
            setTimeout(() => {
                openPromo();
            }, 3000);
        }

        if (closePromoBtn) closePromoBtn.addEventListener('click', closePromo);

        if (claimPromoBtn) {
            claimPromoBtn.addEventListener('click', () => {
                // Persist coupon in localStorage
                localStorage.setItem('claimedCouponNeny', 'NENY2026');

                // Celebratory feedback on button
                claimPromoBtn.innerHTML = '<span class="text-xl">✅</span><span>¡Cupón Reclamado!</span>';
                claimPromoBtn.classList.add('bg-green-600');
                claimPromoBtn.classList.remove('bg-royal-blue', 'hover:bg-royal-dark');
                claimPromoBtn.disabled = true;

                // Re-render catalog cards to immediately show discount badges
                setTimeout(() => {
                    closePromo();
                    renderCurrentPage();
                }, 1800);
            });
        }

        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) closePromo();
        });
    }

    // ==========================================
    // SEO: GENERACIÓN DINÁMICA DE SCHEMA.ORG (PRODUCTOS)
    // ==========================================
    setTimeout(() => {
        if (typeof watches !== 'undefined' && watches.length > 0) {
            const schemaProducts = watches.map(watch => ({
                "@type": "Product",
                "name": watch.name,
                "image": `https://www.joyeriayrelojerianeny.cl/${watch.imagePath}`,
                "description": watch.description || `Reloj Festina modelo ${watch.name} para ${watch.gender}.`,
                "brand": {
                    "@type": "Brand",
                    "name": "Festina"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://www.joyeriayrelojerianeny.cl/catalogo.html`,
                    "priceCurrency": "CLP",
                    "price": watch.price * 1000,
                    "itemCondition": "https://schema.org/NewCondition",
                    "availability": "https://schema.org/InStock"
                }
            }));

            const schemaScript = document.createElement('script');
            schemaScript.type = 'application/ld+json';
            schemaScript.text = JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "ItemList",
                "itemListElement": schemaProducts.map((p, i) => ({
                    "@type": "ListItem",
                    "position": i + 1,
                    "item": p
                }))
            });
            document.head.appendChild(schemaScript);
        }
    }, 1000);
});


