document.addEventListener('DOMContentLoaded', () => {
    // Current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Data de 16 modelos Festina reales para el catálogo
    const watches = [
        {
            id: 1,
            photoNum: "Foto (1)",
            name: "Festina Chrono Bike F20641/1",
            category: "Hombre",
            subCategory: "Chronograph",
            description: "Esfera azul noche con subesferas de cronógrafo y bisel taquimétrico en acero inoxidable.",
            specs: ["10 ATM", "Cronógrafo", "Acero 316L"]
        },
        {
            id: 2,
            photoNum: "Foto (2)",
            name: "Festina Ceramic F20576/1",
            category: "Ceramic",
            subCategory: "Hombre",
            description: "Bisel y eslabones de cerámica de alta resistencia con cristal mineral endurecido.",
            specs: ["Cerámica", "Zafiro", "5 ATM"]
        },
        {
            id: 3,
            photoNum: "Foto (3)",
            name: "Festina Boyfriend Lady F20622/1",
            category: "Mujer",
            subCategory: "Ceramic",
            description: "Bisel engastado con cristales finos y brazalete de acero inoxidable pulido.",
            specs: ["5 ATM", "Cristales", "Acero Inox"]
        },
        {
            id: 4,
            photoNum: "Foto (4)",
            name: "Festina Titanium Sport F20436/2",
            category: "Titanium",
            subCategory: "Hombre",
            description: "Caja y brazalete de titanio ultra ligero, hipoalergénico y de alta durabilidad.",
            specs: ["Titanio", "10 ATM", "Ultra Ligero"]
        },
        {
            id: 5,
            photoNum: "Foto (5)",
            name: "Festina Timeless Chrono F20561/3",
            category: "Chronograph",
            subCategory: "Hombre",
            description: "Cronógrafo clásico vintage con correa de piel genuina pespunteada.",
            specs: ["Cuero", "5 ATM", "Cronógrafo"]
        },
        {
            id: 6,
            photoNum: "Foto (6)",
            name: "Festina Mademoiselle F20583/2",
            category: "Mujer",
            subCategory: "Retro",
            description: "Esfera de nácar natural con brillo sutil y detalles en tono oro rosa.",
            specs: ["Nácar", "Malla Milanesa", "3 ATM"]
        },
        {
            id: 7,
            photoNum: "Foto (7)",
            name: "Festina Retro Vintage F20571/1",
            category: "Retro",
            subCategory: "Hombre",
            description: "Inspiración años 50 con cristal abombado y segundero independiente a las 6.",
            specs: ["Cristal Curvo", "Piel", "5 ATM"]
        },
        {
            id: 8,
            photoNum: "Foto (8)",
            name: "Festina Prestige Gold F20618/1",
            category: "Chronograph",
            subCategory: "Hombre",
            description: "Acabado dorado integral con cronógrafo de alta precisión y bisel graduado.",
            specs: ["Acabado Gold", "10 ATM", "Cronógrafo"]
        },
        {
            id: 9,
            photoNum: "Foto (9)",
            name: "Festina Ceramic White F20516/1",
            category: "Ceramic",
            subCategory: "Mujer",
            description: "Contraste entre cerámica blanca pulida y detalles en acero quirúrgico.",
            specs: ["Cerámica Blanca", "5 ATM", "Zafiro"]
        },
        {
            id: 10,
            photoNum: "Foto (10)",
            name: "Festina Boyfriend Rose F20623/2",
            category: "Mujer",
            subCategory: "Chronograph",
            description: "Reloj multifunción con esferas auxiliares de día, fecha y formato 24 horas.",
            specs: ["Multifunción", "Oro Rosa", "5 ATM"]
        },
        {
            id: 11,
            photoNum: "Foto (11)",
            name: "Festina Chrono Sport Red F20541/1",
            category: "Chronograph",
            subCategory: "Hombre",
            description: "Línea deportiva de alto impacto con acentos rojos y pulsadores ergonómicos.",
            specs: ["10 ATM", "Cronómetro", "Acero"]
        },
        {
            id: 12,
            photoNum: "Foto (12)",
            name: "Festina Elegance Silver F20601/1",
            category: "Mujer",
            subCategory: "Retro",
            description: "Líneas puras y minimalismo con malla milanesa ajustable.",
            specs: ["Malla Milanesa", "Perfil Slim", "3 ATM"]
        },
        {
            id: 13,
            photoNum: "Foto (13)",
            name: "Festina Titanium Automatic F20478/4",
            category: "Titanium",
            subCategory: "Hombre",
            description: "Movimiento automático visible a través del fondo de cristal transparente.",
            specs: ["Automático", "Titanio", "10 ATM"]
        },
        {
            id: 14,
            photoNum: "Foto (14)",
            name: "Festina Swiss Extra F20347/2",
            category: "Retro",
            subCategory: "Hombre",
            description: "Homenaje a la colección clásica de 1948 con diseño limpio y refinado.",
            specs: ["Edición 1948", "Piel Vintage", "5 ATM"]
        },
        {
            id: 15,
            photoNum: "Foto (15)",
            name: "Festina Ceramic Diamond F20499/1",
            category: "Ceramic",
            subCategory: "Mujer",
            description: "Detalle de piedras finas en índices horarios y bisel de cerámica zafiro.",
            specs: ["Índices Brillantes", "Cerámica", "5 ATM"]
        },
        {
            id: 16,
            photoNum: "Foto (16)",
            name: "Festina Classic Blue Dial F20552/3",
            category: "Hombre",
            subCategory: "Retro",
            description: "Esfera con efecto 'sunray' azul profundo y brazalete de 5 eslabones.",
            specs: ["Esfera Azul", "Acero Macizo", "5 ATM"]
        }
    ];

    const grid = document.getElementById('catalogGrid');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resultsCount = document.getElementById('resultsCount');
    const emptyState = document.getElementById('emptyState');
    const resetSearchBtn = document.getElementById('resetSearchBtn');

    let currentCategory = 'Todos';
    let currentSearchTerm = '';

    // Función de Renderizado
    const renderWatches = (data) => {
        grid.innerHTML = '';

        if (data.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');

            data.forEach((watch) => {
                const card = document.createElement('div');
                card.className = 'editorial-card p-4 sm:p-5 flex flex-col justify-between anime-card';
                card.style.opacity = '0';

                // Spec badges
                const specsHtml = watch.specs.map(spec => 
                    `<span class="text-[10px] font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">${spec}</span>`
                ).join('');

                card.innerHTML = `
                    <div>
                        <div class="photo-placeholder aspect-[4/3] w-full mb-4">
                            <span class="badge-num">${watch.photoNum}</span>
                            <span class="sub-label">${watch.name}</span>
                        </div>
                        
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] uppercase font-bold tracking-wider text-royal-blue bg-royal-light px-2.5 py-0.5 rounded-full">${watch.category}</span>
                            <span class="text-[11px] text-gray-400 font-sans">Festina Oficial</span>
                        </div>

                        <h3 class="font-serif text-lg font-bold text-charcoal mb-1.5 line-clamp-1">
                            ${watch.name}
                        </h3>

                        <p class="text-xs text-muted-gray mb-3.5 line-clamp-2 leading-relaxed font-sans">
                            ${watch.description}
                        </p>

                        <div class="flex flex-wrap gap-1.5 mb-5">
                            ${specsHtml}
                        </div>
                    </div>

                    <a href="https://wa.me/56900000000?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20este%20reloj%20Festina:%20${encodeURIComponent(watch.name)}" 
                       target="_blank" 
                       class="w-full btn-pill-blue text-center text-xs py-2.5 mt-auto">
                        Cotizar este modelo
                    </a>
                `;
                grid.appendChild(card);
            });

            // Animación suave de entrada con Anime.js
            anime({
                targets: '.anime-card',
                opacity: [0, 1],
                translateY: [15, 0],
                delay: anime.stagger(25),
                duration: 450,
                easing: 'easeOutQuad'
            });
        }

        if (resultsCount) {
            resultsCount.textContent = data.length;
        }
    };

    // Lógica de Filtrado y Búsqueda
    const filterData = () => {
        let filtered = watches;

        if (currentCategory !== 'Todos') {
            filtered = filtered.filter(w => 
                w.category === currentCategory || 
                w.subCategory === currentCategory
            );
        }

        if (currentSearchTerm) {
            const term = currentSearchTerm.toLowerCase();
            filtered = filtered.filter(w => 
                w.name.toLowerCase().includes(term) || 
                w.description.toLowerCase().includes(term) ||
                w.category.toLowerCase().includes(term) ||
                (w.specs && w.specs.some(s => s.toLowerCase().includes(term)))
            );
        }

        renderWatches(filtered);
    };

    // Buscador
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            if (clearSearchBtn) {
                if (currentSearchTerm.length > 0) {
                    clearSearchBtn.classList.remove('hidden');
                } else {
                    clearSearchBtn.classList.add('hidden');
                }
            }
            filterData();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = '';
            clearSearchBtn.classList.add('hidden');
            filterData();
            searchInput.focus();
        });
    }

    // Botones de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-royal-blue', 'text-white');
                b.classList.add('bg-white', 'text-gray-700');
            });
            btn.classList.remove('bg-white', 'text-gray-700');
            btn.classList.add('bg-royal-blue', 'text-white');

            currentCategory = btn.dataset.category;
            filterData();
        });
    });

    // Reset botón
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            currentCategory = 'Todos';
            currentSearchTerm = '';
            if (searchInput) searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            filterBtns.forEach(b => {
                b.classList.remove('bg-royal-blue', 'text-white');
                b.classList.add('bg-white', 'text-gray-700');
            });
            const firstBtn = document.querySelector('[data-category="Todos"]');
            if (firstBtn) {
                firstBtn.classList.remove('bg-white', 'text-gray-700');
                firstBtn.classList.add('bg-royal-blue', 'text-white');
            }
            filterData();
        });
    }

    // Render inicial
    setTimeout(() => {
        renderWatches(watches);
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
});
