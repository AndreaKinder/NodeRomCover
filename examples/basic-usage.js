const { createCover, supportedConsoles } = require('..');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Consolas soportadas:', supportedConsoles);
  console.log('\nEjemplo de uso de romcoverapi\n');

  // Ruta a una imagen de ejemplo (necesitarás proporcionar tu propia imagen)
  const imagePath = process.argv[2] || './my-game-image.jpg';
  const consoleType = process.argv[3] || 'gameboy';

  // Verificar que el tipo de consola es válido
  if (!supportedConsoles.includes(consoleType)) {
    console.error(`Error: "${consoleType}" no es un tipo de consola válido.`);
    console.log(`Consolas soportadas: ${supportedConsoles.join(', ')}`);
    process.exit(1);
  }

  // Verificar que la imagen existe
  if (!fs.existsSync(imagePath)) {
    console.error(`Error: La imagen "${imagePath}" no existe.`);
    console.log('\nUso: node basic-usage.js <ruta-a-imagen> <tipo-consola>');
    console.log('Ejemplo: node basic-usage.js ./my-game.jpg gameboy');
    process.exit(1);
  }

  try {
    console.log(`Generando carátula de ${consoleType} desde ${imagePath}...`);

    // Generar la carátula
    const buffer = await createCover(consoleType, imagePath);

    // Guardar el resultado
    const outputPath = `./cover-${consoleType}-${Date.now()}.png`;
    fs.writeFileSync(outputPath, buffer);

    console.log(`¡Carátula creada exitosamente! Guardada en: ${outputPath}`);
  } catch (error) {
    console.error('Error al generar la carátula:', error.message);
    process.exit(1);
  }
}

main();
