var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la Base de Datos
require('./lib/connectDB');

// Cargamos el modelo
require('./models/Anuncio');

/**
 * Rutas del API
 */
app.use('/api/anuncios', require('./routes/api/anuncios'));

/**
 * Rutas del website
 */
app.use('/anuncios', require('./routes/anuncios'));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    // comprobar si es un error de validación
    if (err.array) {
      const errorInfo = err.errors[0]; // err.array({ onlyFirstError: true })[0]
      console.log(errorInfo)
      err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`;
      err.status = 422;
    }
  
    res.status(err.status || 500);
  
    // si lo que ha fallado es una petición al API
    // responder con un error en formato JSON
    if (req.originalUrl.startsWith('/api/')) {
      res.json({ error: err.message });
      return;
    }
  
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.render('error');
  });
  
  module.exports = app;