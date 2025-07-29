// controllers/leads.controller.js
const db = require('../config/db');

exports.getAllLeads = async (req, res) => {
    try {
                
        const queryText = 'SELECT * FROM contactos ORDER BY fecharegistro DESC';
        const { rows } = await db.query(queryText);

        res.json(rows);
        
        
    } catch (error) {
        console.error('Error al obtener los leads:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};
exports.updateLeadStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const validos = ['nuevo', 'contactado', 'descartado'];
    if (!validos.includes(estado)) {
        return res.status(400).json({ error: 'Estado no válido.' });
    }

    try {
        const queryText = 'UPDATE contactos SET estado = $1 WHERE id = $2';
        await db.query(queryText, [estado, id]);
        
        // Añadimos 'return' para asegurar que la función termine aquí
        return res.json({ message: 'Estado del lead actualizado con éxito.' });

    } catch (error) {
        console.error('Error al actualizar el estado del lead:', error);
        
        // Añadimos 'return' aquí también
        return res.status(500).json({ error: 'Error del servidor.' });
    }
};