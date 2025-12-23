const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { createCover, consoleConfigs } = require('./generator');

// --- Configuration ---
const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// --- Express App Setup ---
const app = express();

// Crear directorio de subidas si no existe
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// --- Multer Setup (para subida de archivos) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('El archivo no es una imagen!'), false);
    }
  },
});

// --- API Endpoint ---
app.post('/api/create/:console', upload.single('gameImage'), async (req, res) => {
  const { console } = req.params;
  
  if (!Object.keys(consoleConfigs).includes(console)) {
    return res.status(400).send({ 
      error: 'Tipo de consola no válido.',
      available_consoles: Object.keys(consoleConfigs) 
    });
  }
  
  if (!req.file) {
    return res.status(400).send({ error: 'No se ha subido ninguna imagen.' });
  }

  const tempPath = req.file.path;

  try {
    const buffer = await createCover(console, tempPath);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error procesando la imagen:', error);
    res.status(500).send({ error: `Hubo un error al generar la carátula: ${error.message}` });
  } finally {
    // Limpiar el archivo subido
    fs.unlink(tempPath, (err) => {
      if (err) {
        console.error('Error eliminando el archivo temporal:', err);
      }
    });
  }
});

// --- Server ---
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log('Endpoint de ejemplo: POST http://localhost:3000/api/create/gameboy');
});