const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'data.json');
const IMG_DIR = path.join(__dirname, 'img', 'relojes');
const OUTPUT_FILE = path.join(__dirname, 'js', 'relojes-data.js');

async function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => reject(err));
        });
    });
}

function extractModel(name) {
    const match = name.match(/F\d+\/[A-Z0-9]/i);
    return match ? match[0] : '';
}

async function processCatalog() {
    console.log('Reading data.json...');
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const items = data.items;
    
    console.log(`Found ${items.length} items. Processing...`);
    
    const formattedWatches = [];
    let processed = 0;

    for (const item of items) {
        const modelNum = extractModel(item.nombre);
        const imgExt = path.extname(item.fotoUrl) || '.jpg';
        const imgName = `${item.id}${imgExt}`;
        const destPath = path.join(IMG_DIR, imgName);

        console.log(`Downloading ${item.fotoUrl} -> ${imgName}`);
        
        try {
            await downloadImage(item.fotoUrl, destPath);
        } catch (e) {
            console.error(`Error downloading image for ${item.nombre}:`, e.message);
            // Will continue anyway
        }

        const specs = [];
        if (item.descripcion.toLowerCase().includes('acero')) specs.push('Acero Inoxidable');
        if (item.descripcion.toLowerCase().includes('zafiro')) specs.push('Cristal Zafiro');
        else if (item.descripcion.toLowerCase().includes('mineral')) specs.push('Cristal Mineral');
        if (item.descripcion.toLowerCase().includes('caucho')) specs.push('Correa Caucho');
        if (item.descripcion.toLowerCase().includes('titanio')) specs.push('Titanio');
        if (item.descripcion.toLowerCase().includes('piel')) specs.push('Correa Piel');

        if (specs.length === 0) specs.push('Calidad Festina');

        formattedWatches.push({
            id: item.id,
            name: item.nombre,
            photoNum: modelNum || 'FESTINA',
            price: item.precio,
            description: item.descripcion,
            specs: specs,
            imagePath: `img/relojes/${imgName}`
        });

        processed++;
    }

    console.log(`Downloaded ${processed} images.`);

    const outputJs = `const watches = ${JSON.stringify(formattedWatches, null, 4)};`;
    
    fs.writeFileSync(OUTPUT_FILE, outputJs, 'utf8');
    console.log(`Generated ${OUTPUT_FILE} successfully.`);
}

processCatalog().catch(err => {
    console.error('Fatal error:', err);
});
