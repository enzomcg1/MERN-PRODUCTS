const { Router } = require('express');
const { createUsu, getUsu, getUsuario, deleteUsu, updateUsu } = require('../controller/producto.controller.js');
const router = Router();

router.route('/')
    .get(getUsu)
    .post(createUsu);

router.route('/:id')
    .get(getUsuario)
    .delete(deleteUsu)
    .put(updateUsu);

module.exports = router;


