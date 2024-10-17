'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  nombre: String,
  email: String,
});

// Exportar el modelo para que se pueda usar en otras partes de la aplicación
module.exports = mongoose.model('User', userSchema);

