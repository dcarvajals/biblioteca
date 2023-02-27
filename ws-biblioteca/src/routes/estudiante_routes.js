const express = require('express');
const router = express.Router();

// ejemplares
const estudiante_controller = require('../controller/estudiante_controller');

//routes ejemplares
router.get('/get', estudiante_controller.get);
router.post('/insert', estudiante_controller.insert);
router.post('/update', estudiante_controller.update);
router.post('/delete', estudiante_controller.delete);

module.exports = router;