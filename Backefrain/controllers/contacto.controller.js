// controllers/contacto.controller.js
const  db  = require('../config/db');
const axios = require('axios');
const emailjs = require('@emailjs/nodejs'); // Asegúrate de instalar emailjs-com si no lo has hecho

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

exports.crearContacto = async (req, res) => {
  const { nombreCompleto, correo, telefono, mensaje, recaptchaToken } = req.body;

  if (!nombreCompleto || !correo || !telefono || !mensaje || !recaptchaToken) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // 1. Verificar reCAPTCHA
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaResponse = await axios.post(recaptchaUrl);
    
    if (!recaptchaResponse.data.success) {
      return res.status(403).json({ error: 'Verificación reCAPTCHA fallida.' });
    }

    // 2. Insertar en la base de datos usando el pool
     const { nombreCompleto, correo, telefono, mensaje } = req.body;
        const queryText = 'INSERT INTO Contactos (NombreCompleto, Correo, Telefono, Mensaje) VALUES ($1, $2, $3, $4)';
        await db.query(queryText, [nombreCompleto, correo, telefono, mensaje]);

     try {
      const templateParams = {
        nombre_completo: nombreCompleto,
        correo: correo,
        telefono: telefono,
        mensaje: mensaje,
      };
       const emailjsKeys = {
        publicKey: EMAILJS_PUBLIC_KEY,   // <-- Llave pública requerida
        privateKey: EMAILJS_PRIVATE_KEY, // <-- Llave privada para la autenticación
      };
      
       await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        emailjsKeys // <-- Pasar el objeto de llaves corregido
      );
      console.log('Notificación por correo enviada con éxito.');

    } catch (emailError) {
      console.error('Lead guardado en BD, pero falló el envío de correo:', emailError);
    }

    res.status(201).json({ message: 'Formulario guardado y notificación enviada.' });
  } catch (err) {
    console.error('Error al procesar la solicitud:', err);
    res.status(500).json({ error: 'Error del servidor', details: err.message });
  }
};