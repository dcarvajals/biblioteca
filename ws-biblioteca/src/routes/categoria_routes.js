const express = require('express');
const router = express.Router();

// categorias
const categoria_controller = require('../controller/categoria_controller');

//routes categorias
router.get('/get', categoria_controller.get);
router.post('/insert', categoria_controller.insert);
router.post('/update', categoria_controller.update);
router.post('/delete', categoria_controller.delete);

module.exports = router;