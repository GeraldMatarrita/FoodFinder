'use strict';
//var debug = require('debug')('my express app');
//var favicon = require('serve-favicon');
//var bodyParser = require('body-parser');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

const pool = require('./db'); // Importa la conexi�n a PostgreSQL

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/', routes);
app.use('/users', users);


//ENDPOINTS
/* ===========================
   A�adir restaurante a los favoritos
   Endpoint: POST /api/favoritos
============================= */
app.post('/api/favoritos', async (req, res) => {
    const { id_usuario, id_restaurante } = req.body;

    // Validaci�n de par�metros
    if (!id_usuario || !id_restaurante) {
        return res.status(400).json({ error: 'Faltan par�metros: id_usuario y id_restaurante son requeridos.' });
    }

    try {
        // Ejecutar la funci�n de agregar favorito
        await pool.query('SELECT agregar_favorito($1, $2);', [id_usuario, id_restaurante]);

        res.status(200).json({ message: 'Restaurante a�adido a favoritos correctamente.' });
    } catch (err) {
        console.error('Error al agregar restaurante a favoritos:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/* ============================
   Buscar restaurante por nombre
   Endpoint: GET /api/restaurant-search?name=...
=============================== */
app.get('/api/restaurant-search', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Falta el par�metro name' });
    }
    try {
        const result = await pool.query('SELECT * FROM buscar_restaurante_por_nombre($1);', [name]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al buscar restaurante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Enviar solicitud para crear nuevo restaurante
   Endpoint: POST /api/restaurant-request
   Body:
   {
      "userId": number,
      "nombre": "Nombre del restaurante",
      "horario": "Hora apertura - cierre",
      "descripcion": "Descripci�n",
      "rangoprecio": "Rango de precio",
      "imagenes": "URL o nombre de la imagen",
      "tipocomida": "Nombre del tipo de comida",
      "id_provincia": number,
      "id_canton": number,
      "id_distrito": number
   }
=============================== */
app.post('/api/restaurant-request', async (req, res) => {
    const { userId, nombre, horario, descripcion, rangoprecio, imagenes, tipocomida, id_provincia, id_canton, id_distrito } = req.body;
    try {
        const result = await pool.query(
            'SELECT enviar_solicitud_restaurante($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) as message;',
            [userId, nombre, horario, descripcion, rangoprecio, imagenes, tipocomida, id_provincia, id_canton, id_distrito]
        );
        const message = result.rows[0].message;
        res.json({ success: true, message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

/* ==================================================
   Obtener todas las provincias
   URL: GET /api/provincias
================================================== */
app.get('/api/provincias', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM get_all_provinces();');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener provincias:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ==================================================
   Obtener cantones por id_provincia
   URL: GET /api/cantones?provinciaId=...
================================================== */
app.get('/api/cantones', async (req, res) => {
    const provinciaId = req.query.provinciaId;
    if (!provinciaId) {
        return res.status(400).json({ error: 'Falta el par�metro provinciaId' });
    }
    try {
        const result = await pool.query('SELECT * FROM get_cantones_by_provincia($1);', [provinciaId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener cantones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ==================================================
   Obtener distritos por id_canton
   URL: GET /api/distritos?cantonId=...
================================================== */
app.get('/api/distritos', async (req, res) => {
    const cantonId = req.query.cantonId;
    if (!cantonId) {
        return res.status(400).json({ error: 'Falta el par�metro cantonId' });
    }
    try {
        const result = await pool.query('SELECT * FROM get_distritos_by_canton($1);', [cantonId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener distritos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener favoritos de un usuario
   Endpoint: GET /api/favorites?userId=...
=============================== */
app.get('/api/favorites', async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await pool.query('SELECT * FROM obtener_favoritos_usuario($1);', [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ===========================
   Obtener toda la informaci�n de un restaurante
   Endpoint: GET /api/restaurant-info/:id
============================= */
app.get('/api/restaurant-info', async (req, res) => {
    const restauranteId = parseInt(req.params.id);
    if (isNaN(restauranteId)) {
        return res.status(400).json({ error: 'El id del restaurante debe ser un n�mero v�lido' });
    }

    try {
        const result = await pool.query('SELECT * FROM obtener_info_restaurante($1);', [restauranteId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Restaurante no encontrado' });
        }
    } catch (err) {
        console.error('Error al obtener la informaci�n del restaurante:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener todos los reportes de rese�a
   Endpoint: GET /api/reportes-resena
=============================== */
app.get('/api/reportes-resena', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM obtener_reportes_resenas();');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ===========================
   Obtener todas las rese�as de un restaurante
   Endpoint: GET /api/reviews/:id
============================= */
app.get('/api/reviews', async (req, res) => {
    const restauranteId = parseInt(req.params.id);
    if (isNaN(restauranteId)) {
        return res.status(400).json({ error: 'El id del restaurante debe ser un n�mero v�lido' });
    }

    try {
        const result = await pool.query('SELECT * FROM obtener_rese�as_restaurante($1);', [restauranteId]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ error: 'No se encontraron rese�as para este restaurante' });
        }
    } catch (err) {
        console.error('Error al obtener las rese�as del restaurante:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener restaurantes seg�n tipo de comida
   Endpoint: GET /api/restaurants?food=...
=============================== */
app.get('/api/restaurants', async (req, res) => {
    const { food } = req.query;
    try {
        const result = await pool.query('SELECT * FROM obtener_restaurantes_por_tipo($1);', [food]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener todas las solicitudes de restaurante
   Endpoint: GET /api/solicitudes-restaurante
=============================== */
app.get('/api/solicitudes-restaurante', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM obtener_solicitudes_restaurantes();');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener todos los usuarios
   Endpoint: GET /api/users
=============================== */
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM obtener_todos_usuarios();');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Sign Up: Registrar usuario nuevo
   Endpoint: POST /api/signup
   Body: { "email": "...", "nombre": "...", "password": "..." }
=============================== */
app.post('/api/signup', async (req, res) => {
    const { email, nombre, password } = req.body;
    try {
        const result = await pool.query('SELECT registrar_usuario($1, $2, $3) as message;', [email, nombre, password]);
        const message = result.rows[0].message;
        if (message === 'User registered') {
            res.json({ success: true, message });
        } else {
            res.status(400).json({ success: false, message });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

/* ============================
   Login: Verificar usuario
   Endpoint: POST /api/login
   Body: { "email": "correo", "password": "contrase�a" }
=============================== */
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM verificar_usuario_log_in($1, $2);', [email, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inv�lidas' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});




app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 5001);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});