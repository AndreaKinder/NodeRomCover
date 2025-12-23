# RomCover API

Una biblioteca y API para crear carátulas de juegos retro.

Este paquete puede usarse como una API web o como un módulo de Node.js para generar carátulas de juegos que imitan el estilo de varias consolas clásicas. La herramienta toma una imagen, la recorta según el aspect ratio de la caja original y le añade una franja lateral con el logo de la consola.

## Consolas Soportadas

- `gameboy`
- `nes`
- `snes`
- `n64`
- `gamecube`
- `ps1`

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd RomCoverApi
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Uso como API Web

El proyecto incluye un servidor de Express de ejemplo para usar la funcionalidad a través de HTTP.

### Ejecución del Servidor

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm run start:server
```

El servidor se iniciará en `http://localhost:3000`.

### Cómo usar la API

Para generar una carátula, debes enviar una petición `POST` al siguiente endpoint, especificando la consola en la URL:

`http://localhost:3000/api/create/:console`

La petición debe ser de tipo `multipart/form-data` y contener un campo llamado `gameImage` con el archivo de tu imagen.

#### Ejemplo de uso con `curl`

Puedes usar `curl` para probar. Para este ejemplo, crearemos una carátula de **NES**:

```bash
curl -X POST \
  http://localhost:3000/api/create/nes \
  -F "gameImage=@mi-juego.jpg" \
  --output caratula-nes-generada.png
```

- Reemplaza `nes` con cualquier otra consola soportada (`gameboy`, `snes`, etc.).
- `--output caratula-nes-generada.png`: Guarda la imagen de respuesta en un archivo.

## Uso como Paquete de NPM

También puedes importar y usar la función principal directamente en tu proyecto de Node.js.

### Ejemplo de uso en código

```javascript
const { createCover } = require('romcoverapi'); // Asumiendo que el paquete se llama así en npm
const fs = require('fs');

const imagePath = './ruta/a/mi-imagen.jpg';
const consoleType = 'n64';

createCover(consoleType, imagePath)
  .then(buffer => {
    fs.writeFileSync('caratula-n64.png', buffer);
    console.log('¡Carátula de N64 creada!');
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
```