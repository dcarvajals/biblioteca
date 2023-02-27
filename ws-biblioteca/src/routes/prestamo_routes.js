const express = require('express');
const router = express.Router();

// ejemplares
const prestamo_controller = require('../controller/prestamo_controller');

//routes ejemplares
router.get('/get', prestamo_controller.get);
router.post('/insert', prestamo_controller.insert);
router.post('/devolucion', prestamo_controller.devolucion);
router.post('/prestamosRealizadosLR', prestamo_controller.prestamosRealizadosLR);
router.get('/porcentajesPorCategoria', prestamo_controller.porcentajePorCategoria);
router.get('/estudiantesSancionados', prestamo_controller.estudiantesSancionados);
router.get('/prestamosPorGenero', prestamo_controller.prestamosPorGenero);

module.exports = router;