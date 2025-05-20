require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ineRoutes = require('./routes/ineRoutes.js'); // ✅ Agregado .js explícitamente

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas del microservicio
app.use('/api', ineRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
