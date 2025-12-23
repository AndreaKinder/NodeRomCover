# RomCover

Una librería de Node.js para crear carátulas de juegos retro.

Esta librería genera carátulas de juegos que imitan el estilo de varias consolas clásicas. Toma una imagen, la recorta según el aspect ratio de la caja original y le añade una franja lateral con el logo de la consola.

## Consolas Soportadas

- `gameboy` - Game Boy
- `nes` - Nintendo Entertainment System
- `snes` - Super Nintendo Entertainment System
- `n64` - Nintendo 64
- `gamecube` - GameCube
- `ps1` - PlayStation 1

## Instalación

```bash
npm install node-romcover
```

## Uso Básico

```javascript
const { createCover } = require('node-romcover');
const fs = require('fs');

async function generateCover() {
  try {
    // Generar una carátula de Game Boy
    const buffer = await createCover('gameboy', './mi-imagen.jpg');

    // Guardar la carátula generada
    fs.writeFileSync('caratula-gameboy.png', buffer);
    console.log('¡Carátula creada!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateCover();
```

## API

### `createCover(consoleType, imagePath)`

Genera una carátula de juego en el estilo de la consola especificada.

**Parámetros:**
- `consoleType` (string): El tipo de consola. Valores válidos: `'gameboy'`, `'nes'`, `'snes'`, `'n64'`, `'gamecube'`, `'ps1'`
- `imagePath` (string): La ruta al archivo de imagen que se usará como base

**Retorna:**
- `Promise<Buffer>`: Un buffer con la imagen PNG generada

**Ejemplo:**
```javascript
const buffer = await createCover('n64', './cover-art.jpg');
```

### `supportedConsoles`

Un array con todas las consolas soportadas.

**Ejemplo:**
```javascript
const { supportedConsoles } = require('node-romcover');
console.log(supportedConsoles); // ['gameboy', 'nes', 'snes', 'n64', 'gamecube', 'ps1']
```

### `consoleConfigs`

Un objeto con la configuración de cada consola (logos, aspect ratios, etc.).

**Ejemplo:**
```javascript
const { consoleConfigs } = require('node-romcover');
console.log(consoleConfigs.gameboy);
// { logo: 'gameboy-logo.png', cropAspectRatio: 1, logoWidth: 80, placement: 'side' }
```

## Ejemplos

### Generar múltiples carátulas

```javascript
const { createCover, supportedConsoles } = require('node-romcover');
const fs = require('fs');

async function generateAllCovers(imagePath) {
  for (const console of supportedConsoles) {
    const buffer = await createCover(console, imagePath);
    fs.writeFileSync(`cover-${console}.png`, buffer);
    console.log(`Carátula de ${console} creada`);
  }
}

generateAllCovers('./my-game-art.jpg');
```

### Usar con diferentes formatos de imagen

La librería acepta cualquier formato de imagen soportado por el paquete `canvas` de Node.js (JPEG, PNG, etc.).

```javascript
const { createCover } = require('node-romcover');
const fs = require('fs');

// Funciona con JPG
const jpgBuffer = await createCover('snes', './game.jpg');
fs.writeFileSync('cover-snes.png', jpgBuffer);

// También funciona con PNG
const pngBuffer = await createCover('nes', './game.png');
fs.writeFileSync('cover-nes.png', pngBuffer);
```

## Ejemplos de Uso Avanzado

El repositorio incluye ejemplos adicionales en la carpeta `examples/`:

### Ejemplo Básico

```bash
npm run example:basic -- ./tu-imagen.jpg gameboy
```

### Ejemplo de API Web (opcional)

Si deseas usar la librería como una API web, hay un servidor de Express de ejemplo:

```bash
npm run example:api
```

Luego puedes hacer peticiones POST:

```bash
curl -X POST \
  http://localhost:3000/api/create/nes \
  -F "gameImage=@mi-juego.jpg" \
  --output caratula-nes.png
```

## Desarrollo

### Instalación para desarrollo

```bash
git clone <URL_DEL_REPOSITORIO>
cd RomCoverApi
npm install
```

### Ejecutar tests

```bash
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Requisitos

- Node.js >= 14
- La librería `canvas` requiere dependencias nativas. Consulta la [documentación de node-canvas](https://github.com/Automattic/node-canvas#compiling) para más información sobre la instalación en tu sistema operativo.

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.
