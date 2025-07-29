
DROP TABLE IF EXISTS contactos;
DROP TABLE IF EXISTS usuarios;

-- Crear la tabla 'usuarios'
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    passwordhash VARCHAR(255) NOT NULL,
    fechacreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla 'contactos'
CREATE TABLE contactos (
    id SERIAL PRIMARY KEY,
    nombrecompleto VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    mensaje TEXT,
    fecharegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente' 
);

