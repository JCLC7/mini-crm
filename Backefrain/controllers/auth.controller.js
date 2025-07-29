// controllers/auth.controller.js
const  db  = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// --- Controlador para registrar un nuevo usuario ---
// NOTA: En una aplicación real, este endpoint debería ser eliminado o protegido después de crear el primer admin.
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
    }

     try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const queryText = 'INSERT INTO Usuarios (Username, PasswordHash) VALUES ($1, $2)';
        await db.query(queryText, [req.body.username, hashedPassword]);
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        // Manejar el caso de que el username ya exista
        if (error.number === 2627) { // Código de error de SQL Server para violación de UNIQUE KEY
            return res.status(409).json({ error: 'El nombre de usuario ya existe.' });
        }
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};

// --- Controlador para iniciar sesión ---
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'El nombre de usuario y la contraseña son obligatorios.' });
    }

    try {
        // Buscar al usuario en la base de datos
        const queryText = 'SELECT * FROM Usuarios WHERE Username = $1';
        const { rows } = await db.query(queryText, [username]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Comparar la contraseña con el hash (usando el nombre de columna en minúsculas)
        const isMatch = await bcrypt.compare(password, user.passwordhash); // <-- CAMBIO AQUÍ

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Crear el token JWT (usando nombres de columna en minúsculas)
        const payload = {
            id: user.id,             // <-- CAMBIO AQUÍ
            username: user.username,   // <-- CAMBIO AQUÍ
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.json({
            message: 'Login exitoso.',
            token: token,
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};