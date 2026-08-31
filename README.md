# Joyería & Relojería Neny — Sitio Web Oficial (v0.1.0)

> [!CAUTION]
> ### ⚠️ AVISO IMPORTANTE: VERSIÓN BETA EN DESARROLLO Y PRUEBAS
> Este proyecto y su código fuente se encuentran actualmente en **fase de creación activa, pruebas y desarrollo beta (v0.1.0)**. **NO ES UNA VERSIÓN FINAL NI PUBLICADA**. Está prohibida su distribución, copia, despliegue público o utilización sin la autorización expresa y por escrito de los titulares de los derechos.

---

## 💎 Sobre el Proyecto

Sitio web oficial, catálogo interactivo y catálogo digital para **Joyería y Relojería Neny**, boutique y taller de alta orfebrería y concesionario oficial de la prestigiosa firma suiza **Festina** en la ciudad de Talca, Región del Maule, Chile.

El proyecto ha sido diseñado bajo una estética editorial de lujo contemporáneo (*Quiet Luxury*), priorizando la velocidad de carga, la elegancia tipográfica (estilo *Wispr Flow* / *LandingFolio*), animaciones fluidas con aceleración por hardware y una integración directa con cotizaciones vía **WhatsApp Business**.

---

## 🚀 Registro de Versión: `v0.1.0` (Estado Inicial Completo)

> **Todo el desarrollo, estructura, código, animaciones y módulos creados hasta el momento corresponden en su totalidad a la versión `0.1.0`.**

### Características y Módulos Incluidos en v0.1.0:

1. **Hero Section Editorial Dinámico**:
   - Fondo interactivo con partículas y símbolos vectoriales flotantes (alianzas, diamantes y relojes de pulsera rediseñados) animados en bucle infinito con **Anime.js**.
   - Tipografía monumental con contraste *Serif* (*Cormorant Garamond*) y *Sans* (*Plus Jakarta Sans* / *Outfit*).
   - Adaptación completa a `100dvh` para pantallas móviles con tipografía imponente y espaciado expansivo.

2. **Navegación & Header Flotante**:
   - Logotipo vectorizado y extraído en alta resolución con fondo 100% transparente.
   - **Menú Móvil Modal Translúcido (*Glassmorphism*)**: tarjeta centrada con desenfoque de cristal (`backdrop-blur-2xl bg-royal-dark/80`), botón de cierre y enlaces táctiles.

3. **Sección "Sobre Nosotros" (*Dashcom UI Adapted*)**:
   - Tarjetas métricas de distinción (15+ Años de Tradición, 100% Garantía Oficial, 160+ Modelos Festina, 1K+ Clientes Felices).
   - Tipografía centrada y tarjetas con elevación 3D sutil.

4. **Galería Collage de Orfebrería (*Joyería Exclusiva*)**:
   - Disposición asimétrica en marcos circulares flotantes de diferentes proporciones para anillos de compromiso, collares y aros finos.
   - Calibración especial para que los círculos mantengan márgenes holgados en smartphones sin tocar los bordes.
   - Botón de llamada a la acción consolidado: *"Consulta disponibilidad y cotiza"*.

5. **Showcase Catálogo Festina (*Ambassador Minimalist*)**:
   - Vitrina de relojería destacada (Chrono Bike, Ceramic, Boyfriend) sobre fondo Azul Rey profundo con marca de agua histórica (*1902*).
   - Acceso al catálogo completo mediante botón universal píldora (`btn-pill-primary`).

6. **Experiencias & Testimonios de Clientes (*Webhound Showcase*)**:
   - 3 tarjetas de reseñas con calificación 5 estrellas (★★★★★), avatares en gradiente, insignias de producto y ubicación en la Región del Maule.

7. **Servicios & Formulario de Cotización WhatsApp**:
   - Asesoría personalizada, mantención y cotización a medida.
   - Formulario que genera y abre automáticamente mensajes estructurados de WhatsApp listos para enviar.
   - Botón flotante persistente con el icono oficial de WhatsApp.

8. **Página de Catálogo Festina Dedicada (`catalogo.html`)**:
   - Motor de búsqueda y filtrado en tiempo real por colecciones (*Chrono Bike, Ceramic, Titanium, Automatic, Boyfriend, Retro, Clásicos*).
   - Visualización de 16 modelos iniciales con especificaciones técnicas y botón de cotización directa con el nombre del modelo pre-cargado.

9. **Simulador Móvil Integrado (`simulator.html`)**:
   - Herramienta interactiva para previsualizar y probar el sitio en iPhone 15 Pro, Galaxy S24, iPhone SE y Tablets.
   - Selector de orientación (vertical/horizontal), cambio de páginas y vista en tiempo real.

---

## 🛠️ Stack Tecnológico

- **Estructura**: HTML5 Semántico.
- **Estilos**: Tailwind CSS + CSS Vanilla Personalizado (`css/style.css`).
- **Animaciones**: Anime.js (v3.2.1) con bucles recursivos y staggered reveals.
- **Tipografías**: Google Fonts (*Cormorant Garamond*, *Plus Jakarta Sans*).
- **Iconografía**: SVG puro con optimización de paths.
- **Herramientas de Tratamiento Gráfico**: Scripts de procesamiento en Python (OpenCV / PIL).

---

## 📁 Estructura del Directorio

```text
JOYAS NENI/
├── index.html              # Landing Page principal
├── catalogo.html           # Catálogo interactivo de relojes Festina
├── simulator.html          # Simulador de dispositivos móviles
├── README.md               # Documentación general y técnica
├── LICENSE                 # Términos de licencia y propiedad intelectual
├── css/
│   └── style.css           # Estilos personalizados y variables de diseño
├── js/
│   ├── main.js             # Lógica de animaciones, menú móvil y formulario
│   └── catalogo.js         # Base de datos de modelos y motor de filtrado
└── img/
    ├── joyas-neny-logo.png        # Logotipo principal en alta resolución
    ├── joyas-neny-logo-white.png  # Logotipo en blanco para fondos oscuros
    ├── joyas-neny-favicon.png     # Isologo para favicon (diamante + anillo)
    └── joyas-neny-favicon-white.png
```

---

## ⚖️ Propiedad Intelectual y Derechos de Autor

**TODOS LOS DERECHOS RESERVADOS. PROHIBIDO SU USO COMERCIAL, COPIA O REDISTRIBUCIÓN.**

- **Identidad de Marca, Nombre Comercial y Material**:  
  Todos los nombres comerciales, marcas registradas, imagotipos, información corporativa y materiales de marca pertenecen exclusivamente a **Joyería y Relojería Neny**.

- **Creación, Código Fuente, Animaciones y Diseño**:  
  La arquitectura de software, código fuente (HTML, CSS, JavaScript), animaciones, diseño de componentes y desarrollos interactivos son propiedad intelectual y autoría de **Samuel Valenzuela Díaz**.

Para más detalles, consulta el archivo [LICENSE](file:///Users/samuelvalenzuela/Desktop/WEB%20DEVELOP/JOYAS%20NENI/LICENSE).
