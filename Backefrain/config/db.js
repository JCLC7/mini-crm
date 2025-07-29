// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    // La cadena de conexión se tomará de las variables de entorno.
    // Render nos la proporcionará automáticamente en producción.
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos PostgreSQL.');
});

pool.on('error', (err) => {
    console.error('Error inesperado en el cliente de la base de datos', err);
    process.exit(-1);
});

module.exports = {
    // Exportamos una función 'query' que usa el pool
    query: (text, params) => pool.query(text, params),
};