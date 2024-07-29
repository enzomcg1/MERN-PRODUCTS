const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true }

});

module.exports = model('Producto', usuarioSchema);
