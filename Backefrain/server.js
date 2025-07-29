
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { poolConnect } = require('./config/db'); // Importa la conexión del pool

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET no está definida en las variables de entorno.');
  process.exit(1);
}
// Verificar variables de entorno
if (!process.env.RECAPTCHA_SECRET_KEY) {
  console.error('Error: RECAPTCHA_SECRET_KEY no está definida.');
  process.exit(1);
}

// Rutas
const contactoRoutes = require('./routes/contacto.routes.js');

const authRoutes = require('./routes/auth.routes.js'); 
const leadsRoutes = require('./routes/leads.routes.js');

app.use('/api', contactoRoutes);
app.use('/api/auth', authRoutes) 
app.use('/api/leads', leadsRoutes);

const PORT = process.env.PORT || 3000;

// Iniciar servidor después de conectar a la BD

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    
  });



  
