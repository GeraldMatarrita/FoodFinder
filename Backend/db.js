const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'dpg-cu83m2i3esus73aoufsg-a.oregon-postgres.render.com',
    database: 'foodfinder_2cfd',
    password: '4Gpjl73DbSfJleEp22site6jVXQY01Vn',
    port: 5432,
    ssl: { rejectUnauthorized: false } // Necesario para Render
});

pool.connect()
    .then(() => console.log("? Conectado a PostgreSQL"))
    .catch(err => console.error("? Error al conectar a PostgreSQL", err));

module.exports = pool;