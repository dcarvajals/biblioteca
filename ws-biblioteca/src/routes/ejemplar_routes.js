const express = require('express');
const router = express.Router();

// ejemplares
const ejemplar_controller = require('../controller/ejemplar_controller');

//routes ejemplares
router.get('/get', ejemplar_controller.get);
router.post('/insert', ejemplar_controller.insert);
router.post('/update', ejemplar_controller.update);
router.post('/delete', ejemplar_controller.delete);

module.exports = router;