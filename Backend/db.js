const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: ,
    ssl: { rejectUnauthorized: false } // Necesario para Render
});

pool.connect()
    .then(() => console.log("? Conectado a PostgreSQL"))
    .catch(err => console.error("? Error al conectar a PostgreSQL", err));

module.exports = pool;
