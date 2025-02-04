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

const pool = require('./db'); // Importa la conexión a PostgreSQL
var cors = require('cors');

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
app.use(cors());

//Rutas
app.use('/', routes);
app.use('/users', users);


//ENDPOINTS
/* ===========================
   Añadir restaurante a los favoritos
   Endpoint: POST /api/favoritos
============================= */
app.post('/api/favoritos', async (req, res) => {
    const { id_usuario, id_restaurante } = req.body;

    // Validación de parámetros
    if (!id_usuario || !id_restaurante) {
        return res.status(400).json({ error: 'Faltan parámetros: id_usuario y id_restaurante son requeridos.' });
    }

    try {
        // Ejecutar la función de agregar favorito
        const result = await pool.query('SELECT agregar_favorito($1, $2) AS codigo;', [id_usuario, id_restaurante]);

        if (result.rows[0].codigo === 0) {
            res.status(200).json({ codigo: 0 });  // Ya estaba en favoritos
        } else {
            res.status(200).json({ codigo: 1 });  // Favorito añadido correctamente
        }
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
        return res.status(400).json({ error: 'Falta el parámetro name' });
    }
    try {
        const result = await pool.query('SELECT * FROM buscar_restaurante_por_nombre($1);', [name]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al buscar restaurante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/cambiar-estado-usuario', async (req, res) => {
    const { id_usuario, estado } = req.body;

    // Validación de parámetros
    if (!id_usuario || !estado) {
        return res.status(400).json({ error: 'Faltan parámetros: id_usuario y estado son requeridos.' });
    }

    try {
        // Ejecutar la función de cambiar el estado del usuario
        const result = await pool.query('SELECT cambiar_estado_usuario($1, $2) AS codigo;', [id_usuario, estado]);

        if (result.rows[0].codigo === 1) {
            res.status(200).json({ codigo: 1 });  // Operación exitosa
        } else {
            res.status(400).json({ codigo: 0 });  // Error al cambiar el estado
        }
    } catch (err) {
        console.error('Error al cambiar el estado del usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

app.post('/api/reportar-resena', async (req, res) => {
    const { id_usuario, id_resena, motivo, comentario } = req.body;

    if (!id_usuario || !id_resena || !motivo || !comentario) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
    }

    try {
        const result = await pool.query('SELECT crear_reporte_resena($1, $2, $3, $4);', [id_usuario, id_resena, motivo, comentario]);

        if (result.rows[0].crear_reporte_resena === 1) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, message: 'Error al crear el reporte de reseña' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

app.post('/api/reportar-restaurante', async (req, res) => {
    const { id_usuario, id_restaurante, motivo, comentario } = req.body;

    if (!id_usuario || !id_restaurante || !motivo || !comentario) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
    }

    try {
        const result = await pool.query('SELECT crear_reporte_restaurante($1, $2, $3, $4);', [id_usuario, id_restaurante, motivo, comentario]);

        if (result.rows[0].crear_reporte_restaurante === 1) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, message: 'Error al crear el reporte de restaurante' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

app.post('/api/editar-usuario', async (req, res) => {
    const { id_usuario, nombre, correo, contrasena, rol } = req.body;

    // Validación de parámetros
    if (!id_usuario || !nombre || !correo || !contrasena || !rol) {
        return res.status(400).json({ error: 'Faltan parámetros: id_usuario, nombre, correo, contraseña y rol son requeridos.' });
    }

    try {
        // Ejecutar la función de editar los datos del usuario
        const result = await pool.query('SELECT editar_usuario($1, $2, $3, $4, $5) AS codigo;', [id_usuario, nombre, correo, contrasena, rol]);

        if (result.rows[0].codigo === 1) {
            res.status(200).json({ codigo: 1 });  // Operación exitosa
        } else {
            res.status(400).json({ codigo: 0 });  // Error al editar el usuario
        }
    } catch (err) {
        console.error('Error al editar los datos del usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

app.post('/api/enviar-solicitud-restaurante', async (req, res) => {
    const { nombre, horario, descripcion, rangoprecio, imagenes, id_usuario, id_tipocomida, id_ubicacion } = req.body;

    try {
        await pool.query('SELECT enviar_solicitud_restaurante($1, $2, $3, $4, $5, $6, $7, $8);',
            [nombre, horario, descripcion, rangoprecio, imagenes, id_usuario, id_tipocomida, id_ubicacion]);

        res.status(200).json({ success: true, message: 'Solicitud de restaurante enviada correctamente' });
    } catch (err) {
        console.error('Error al enviar la solicitud de restaurante:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

app.post('/api/gestionar-resenas', async (req, res) => {
    const { id_reporteresena, codigo } = req.body;

    try {
        await pool.query('SELECT gestionar_reseñas($1, $2);', [id_reporteresena, codigo]);
        res.status(200).json({ success: true, message: 'Reseña gestionada correctamente' });
    } catch (err) {
        console.error('Error al gestionar la reseña:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

app.post('/api/gestionar-solicitud-restaurante', async (req, res) => {
    const { id_solicitud, codigo } = req.body;

    try {
        await pool.query('SELECT gestionar_solicitudes_restaurante($1, $2);', [id_solicitud, codigo]);
        res.status(200).json({ success: true, message: 'Solicitud gestionada correctamente' });
    } catch (err) {
        console.error('Error al gestionar la solicitud de restaurante:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

//Falta fk atributo usuario.id en restaurante
app.post('/api/obtener-restaurantes-usuario', async (req, res) => {
    const { id_usuario } = req.body;

    try {
        const result = await pool.query('SELECT * FROM obtener_restaurantes_usuario($1);', [id_usuario]);
        res.status(200).json({ success: true, restaurantes: result.rows });
    } catch (err) {
        console.error('Error al obtener los restaurantes del usuario:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
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
        return res.status(400).json({ error: 'Falta el parámetro provinciaId' });
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
        return res.status(400).json({ error: 'Falta el parámetro cantonId' });
    }
    try {
        const result = await pool.query('SELECT * FROM get_distritos_by_canton($1);', [cantonId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener distritos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/nueva-resena', async (req, res) => {
    const { id_usuario, id_restaurante, calificacion, comentario, estado } = req.body;

    // Validación de parámetros
    if (!id_usuario || !id_restaurante || !calificacion || !comentario || !estado) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: id_usuario, id_restaurante, calificacion, comentario, estado.' });
    }

    try {
        // Ejecutar la función de agregar una nueva reseña
        const result = await pool.query('SELECT nueva_resena($1, $2, $3, $4, $5) AS codigo;', [id_usuario, id_restaurante, calificacion, comentario, estado]);

        if (result.rows[0].codigo === 0) {
            res.status(200).json({ codigo: 0 });  // El usuario ya dejó una reseña
        } else {
            res.status(200).json({ codigo: 1 });  // Reseña agregada correctamente
        }
    } catch (err) {
        console.error('Error al agregar reseña:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
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
   Obtener toda la información de un restaurante
   Endpoint: GET /api/restaurant-info/:id
============================= */
app.get('/api/restaurant-info', async (req, res) => {
    const { id } = req.query;
    const restauranteId = parseInt(id, 10);
    if (isNaN(restauranteId)) {
        return res.status(400).json({ error: 'El id del restaurante debe ser un número válido' });
    }

    try {
        const result = await pool.query('SELECT * FROM obtener_info_restaurante($1);', [restauranteId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Restaurante no encontrado' });
        }
    } catch (err) {
        console.error('Error al obtener la información del restaurante:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener todos los reportes de reseña
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
   Obtener todas las reseñas de un restaurante
   Endpoint: GET /api/reviews/:id
============================= */
app.get('/api/reviews', async (req, res) => {
    const { id } = req.query;
    const restauranteId = parseInt(id, 10);

    if (isNaN(restauranteId)) {
        return res.status(400).json({ error: 'El id del restaurante debe ser un número válido' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM obtener_reviews_restaurante($1);',
            [restauranteId]
        );

        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ error: 'No se encontraron reseñas para este restaurante' });
        }
    } catch (err) {
        console.error('Error al obtener las reseñas del restaurante:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/* ============================
   Obtener restaurantes según tipo de comida
   Endpoint: GET /api/restaurants?food=...
=============================== */
app.get('/api/restaurants', async (req, res) => {
    const { food } = req.query;

    // Validar que food sea un número
    const foodId = parseInt(food, 10);
    if (isNaN(foodId)) {
        return res.status(400).json({ error: 'El parámetro food debe ser un número' });
    }

    try {
        const result = await pool.query('SELECT * FROM obtener_restaurantes_por_tipo($1);', [foodId]);
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

app.get('/api/allrestaurantes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM obtener_todos_restaurantes();');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener los restaurantes:', err);
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
   Body: { "nombre": "...", "email": "...", "password": "..." }
=============================== */
app.post('/api/signup', async (req, res) => {
    const { nombre, email, password } = req.body; // Corrección del orden
    try {
        const result = await pool.query('SELECT * FROM registrar_usuario($1, $2, $3);', [nombre, email, password]);

        if (result.rows.length > 0 && result.rows[0].codigo === 1) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

/* ============================
   Login: Verificar usuario
   Endpoint: POST /api/login
   Body: { "email": "correo", "password": "contraseña" }
=============================== */
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM verificar_usuario_log_in($1, $2);', [email, password]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (user.codigo === 1) {
                res.json({ success: true, user });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }
        } else {
            res.status(500).json({ success: false, message: 'Error inesperado' });
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