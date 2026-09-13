# Joyas Neny - Web Oficial (v1.0.1) 💍✨

Plataforma oficial de **Joyas Neny**, joyería y relojería con más de 14 años de trayectoria en la ciudad de Talca. Este sitio web sirve como un escaparate digital premium, catálogo oficial de relojes Festina, y plataforma automatizada para cotizaciones a través de WhatsApp.

## 🚀 Changelog

### Versión 1.0.1 - Optimización SEO y Google Shopping
- **Estructura SEO Técnica:** Implementación de `sitemap.xml` con variantes de dominio y `robots.txt` para rastreo.
- **Microformatos:** Inyección dinámica de `Schema.org` (JSON-LD) para e-commerce. Los más de 160 relojes Festina ahora declaran metadatos estructurados de "Producto" (precio, marca, stock), haciéndolos elegibles para Google Shopping. 
- **Social Metadata:** Etiquetas *Open Graph* y *Twitter Cards* optimizadas para que al compartir por WhatsApp o redes sociales, el enlace se visualice con formato de tarjeta enriquecida.
- **Métricas:** Configuración inicial del bloque de Google Analytics (GA4).
- **Página de Error:** Nueva vista personalizada de `404.html` para enlaces rotos.

### Versión 1.0.0 - Lanzamiento a Producción

El sitio ha salido de su fase beta y está completamente certificado y auditado. Las últimas novedades de la **versión 1.0.0** incluyen:

- **Catálogo Dinámico e Interactivo**: Integración de filtrado de productos por precio y popularidad.
- **Sistema Inteligente de Cupones**: Pop-up inmersivo de bienvenida por "Lanzamiento Web" que ofrece un 15% de descuento en la colección Festina. El cupón queda indexado en el navegador (caché local) y auto-aplica los precios con descuento visualmente en toda la colección.
- **Integración fluida con WhatsApp Business**:
  - Los formularios detectan automáticamente si la consulta es de Relojes o Argollas.
  - Los cupones se adjuntan exclusivamente en los mensajes de cotización sobre "Relojes Festina".
  - Todos los botones apuntan al número oficial en producción (`+56 9 9623 4090`).
- **Accesibilidad y SEO mejorados**: Landmarks (`<main>`, `<h1>`), `aria-labels` en todos los enlaces no textuales y mejora del contraste.
- **Auditoría Superada**: Sistema automatizado con `@playwright/test` validando *Performance*, *Accesibilidad (Axe Core)*, integridad de *imágenes y enlaces*, y validación visual multi-dispositivo sin errores.

## 🛠️ Stack Tecnológico

- **Estructura**: HTML5 Semántico
- **Estilos**: Tailwind CSS (mediante CDN o build)
- **Interactividad**: Vanilla JavaScript
- **Testing (QA)**: Playwright (Desktop y Mobile) + Axe Core Accessibility

## 📦 Uso en Desarrollo

Para ejecutar este proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone git@github.com:sxmenotes/NENYJOYAS.git
   ```
2. Instala las dependencias (Playwright y testing tools):
   ```bash
   npm install
   ```
3. Ejecuta el servidor local:
   ```bash
   npx serve .
   ```

### 🧪 Tests
Para ejecutar la suite de auditoría:
```bash
npx playwright test
```

## 🔐 Licencia y Derechos
© 2026 Joyas Neny. Todos los derechos reservados.
Desarrollado para potenciar el comercio de joyería en la ciudad de Talca.
