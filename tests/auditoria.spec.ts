import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToTest = ['/', '/catalogo.html'];

test.describe('Auditoría General de Joyas Neni', () => {

  for (const path of pagesToTest) {
    test.describe(`Página: ${path}`, () => {
      
      test('Sin errores de consola de JavaScript', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        await page.goto(path);
        // Esperamos un momento para que se ejecute JS
        await page.waitForTimeout(1000);
        expect(errors).toEqual([]);
      });

      test('Tiempo de carga aceptable (< 3 segundos)', async ({ page }) => {
        const start = Date.now();
        await page.goto(path, { waitUntil: 'networkidle' });
        const loadTime = Date.now() - start;
        // Solo como warning si es lento
        expect(loadTime).toBeLessThan(3000);
      });

      test('Validación de links e imágenes sin errores (sin 404)', async ({ page }) => {
        const failedRequests: string[] = [];
        page.on('response', response => {
          // Ignoramos Google Analytics/Tag Manager/Whatsapp
          const url = response.url();
          if (url.includes('google') || url.includes('wa.me')) return;
          if (response.status() >= 400 && response.status() !== 999) {
            failedRequests.push(`Status ${response.status()}: ${url}`);
          }
        });
        await page.goto(path, { waitUntil: 'networkidle' });
        
        // Revisamos manualmente todos los href locales por si acaso
        const locs = await page.$$eval('a', links => links.map(a => a.href));
        for (const link of locs) {
            if(link.startsWith('http://localhost') && !link.includes('#')) {
                const res = await page.request.get(link);
                expect(res.ok()).toBeTruthy();
            }
        }
        expect(failedRequests).toEqual([]);
      });

      test('Captura visual Full Page', async ({ page }) => {
        await page.goto(path, { waitUntil: 'networkidle' });
        // Cerramos modal si aparece
        const closePromoBtn = page.locator('#closePromoBtn');
        if (await closePromoBtn.isVisible()) {
          await closePromoBtn.click();
        }
        const name = path === '/' ? 'homepage' : 'catalogo';
        await expect(page).toHaveScreenshot(`${name}-full.png`, { fullPage: true });
      });

      test('Accesibilidad Básica (Axe Core)', async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.length).toBe(0);
      });
    });
  }

  test('Validación Formulario de Contacto (WhatsApp URL)', async ({ page, context }) => {
    await page.goto('/');
    
    // Cerrar promo
    const closePromoBtn = page.locator('#closePromoBtn');
    if (await closePromoBtn.isVisible()) {
      await closePromoBtn.click();
    }

    await page.fill('#formName', 'Juan Perez');
    await page.fill('#formPhone', '987654321');
    await page.click('#btnSelectRelojes');
    await page.fill('#formMessage', 'Prueba automatizada');

    // Interceptar la nueva pestaña que se abre
    const pagePromise = context.waitForEvent('page');
    await page.click('button[type="submit"]');
    const newPage = await pagePromise;
    
    const waUrl = newPage.url();
    expect(waUrl).toContain('wa.me/56996234090');
    expect(waUrl).toContain('Juan%20Perez');
    await newPage.close();
  });

});
