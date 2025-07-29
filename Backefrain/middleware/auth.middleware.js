// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = (req, res, next) => {
    let token;

    // El token se envía en los headers de la petición así: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraemos el token del header
            token = req.headers.authorization.split(' ')[1];

            // Verificamos el token con nuestra clave secreta
            const decoded = jwt.verify(token, JWT_SECRET);

            // Adjuntamos los datos del usuario decodificados a la petición (req)
            // para que las rutas protegidas puedan usarlos si es necesario
            req.user = decoded;

            // Si todo está bien, continuamos a la siguiente función (el controlador)
            next();
        } catch (error) {
            res.status(401).json({ error: 'No autorizado, el token falló.' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'No autorizado, no se encontró un token.' });
    }
};