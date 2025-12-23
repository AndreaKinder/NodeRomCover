const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '../assets');

// Configuración para cada tipo de carátula
const consoleConfigs = {
    gameboy: {
        logo: 'gameboy-logo.png',
        cropAspectRatio: 1 / 1, // width / height (cuadrado)
        logoWidth: 80,
        placement: 'side',
    },
    nes: {
        logo: 'nes-logo.png',
        cropAspectRatio: 0.85, // Retrato
        logoWidth: 90,
        placement: 'side',
    },
    snes: {
        logo: 'snes-logo.png',
        cropAspectRatio: 0.7, // Retrato más ancho
        logoWidth: 100,
        placement: 'side',
    },
    n64: {
        logo: 'n64-logo.png',
        cropAspectRatio: 1 / 1, // Cuadrado
        logoWidth: 80,
        placement: 'side',
    },
    gamecube: {
        logo: 'gamecube-logo.png',
        cropAspectRatio: 0.7, // Retrato
        logoWidth: 100,
        placement: 'side',
    },
    ps1: {
        logo: 'ps1-logo.png',
        cropAspectRatio: 1 / 1, // Cuadrado
        logoWidth: 0, // Las de PS1 no tienen franja lateral en este formato
        placement: 'none',
    },
};

/**
 * Crea una carátula de juego combinando una imagen de juego con un logo de consola.
 * @param {string} consoleType - El tipo de consola (ej. 'gameboy', 'nes').
 * @param {string} imagePath - La ruta a la imagen del juego.
 * @returns {Promise<Buffer>} Un buffer con la imagen PNG generada.
 */
async function createCover(consoleType, imagePath) {
    const config = consoleConfigs[consoleType];
    if (!config) {
        throw new Error(`Tipo de consola no válido: ${consoleType}`);
    }

    const logoPath = path.join(ASSETS_DIR, config.logo);
    if (!fs.existsSync(logoPath)) {
        throw new Error(`No se encontró el logo para la consola: ${config.logo}`);
    }

    // 1. Cargar imágenes
    const gameImage = await loadImage(imagePath);
    const logoImage = await loadImage(logoPath);

    // 2. Calcular dimensiones del recorte según el aspect ratio
    let cropWidth, cropHeight;
    if ((gameImage.width / gameImage.height) > config.cropAspectRatio) {
        // La imagen es más ancha que el aspect ratio, recortar los lados
        cropHeight = gameImage.height;
        cropWidth = cropHeight * config.cropAspectRatio;
    } else {
        // La imagen es más alta, recortar arriba y abajo
        cropWidth = gameImage.width;
        cropHeight = cropWidth / config.cropAspectRatio;
    }

    const sourceX = (gameImage.width - cropWidth) / 2;
    const sourceY = (gameImage.height - cropHeight) / 2;
    
    // El tamaño final de la imagen del juego será de 500px en su lado más largo
    const finalHeight = 500;
    const finalWidth = finalHeight * config.cropAspectRatio;


    // 3. Crear el canvas final
    const canvas = createCanvas(finalWidth + config.logoWidth, finalHeight);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Dibujar la imagen del juego recortada
    ctx.drawImage(
        gameImage,
        sourceX, sourceY, cropWidth, cropHeight, // Origen (recorte)
        0, 0, finalWidth, finalHeight            // Destino (en canvas)
    );

    // 5. Dibujar el logo si corresponde
    if (config.placement === 'side' && config.logoWidth > 0) {
        ctx.drawImage(logoImage, finalWidth, 0, config.logoWidth, finalHeight);
    }

    return canvas.toBuffer('image/png');
}

module.exports = { createCover, consoleConfigs };
