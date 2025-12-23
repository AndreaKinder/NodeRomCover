# Ejemplos de Uso

Esta carpeta contiene ejemplos de cómo usar la librería `romcoverapi`.

## basic-usage.js

Un ejemplo simple que muestra cómo usar la librería para generar una carátula desde la línea de comandos.

### Uso

```bash
npm run example:basic -- <ruta-imagen> <tipo-consola>
```

### Ejemplo

```bash
npm run example:basic -- ./mi-juego.jpg gameboy
```

Esto generará un archivo `cover-gameboy-[timestamp].png` en el directorio actual.

### Consolas soportadas

- `gameboy`
- `nes`
- `snes`
- `n64`
- `gamecube`
- `ps1`

## api-server.js

Un servidor Express de ejemplo que expone la funcionalidad de la librería a través de una API HTTP.

### Uso

```bash
npm run example:api
```

El servidor se iniciará en `http://localhost:3000`.

### Endpoint

**POST** `/api/create/:console`

- `:console` - El tipo de consola (gameboy, nes, snes, n64, gamecube, ps1)
- Body: `multipart/form-data` con un campo `gameImage` que contiene la imagen

### Ejemplo con curl

```bash
curl -X POST \
  http://localhost:3000/api/create/n64 \
  -F "gameImage=@./mi-imagen.jpg" \
  --output caratula-n64.png
```

### Ejemplo con JavaScript (fetch)

```javascript
const formData = new FormData();
formData.append('gameImage', fileInput.files[0]);

fetch('http://localhost:3000/api/create/gameboy', {
  method: 'POST',
  body: formData
})
  .then(response => response.blob())
  .then(blob => {
    // Usar el blob de la imagen generada
    const url = URL.createObjectURL(blob);
    img.src = url;
  });
```
