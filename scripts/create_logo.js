const { createCanvas } = require('canvas');
const fs = require('fs');

function createLogoPlaceholder(text, outputPath, width = 200, height = 1500) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Fondo gris oscuro
    ctx.fillStyle = '#444444';
    ctx.fillRect(0, 0, width, height);

    // Texto
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    
    // Ajustar tamaño de fuente según la longitud del texto
    let fontSize = 120;
    if (text.length > 6) {
        fontSize = 70;
    } else if (text.length > 4) {
        fontSize = 90;
    }

    ctx.font = `bold ${fontSize}px "Arial"`;
    ctx.fillText(text.toUpperCase(), 0, 35);
    ctx.restore();

    // Guardar
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Created placeholder logo: ${outputPath}`);
}

// --- Main ---
// Este script ahora es un módulo o puede ser ejecutado con argumentos
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Uso: node create_logo.js <TEXTO_LOGO> <RUTA_SALIDA>');
        process.exit(1);
    }
    createLogoPlaceholder(args[0], args[1]);
}

module.exports = { createLogoPlaceholder };
