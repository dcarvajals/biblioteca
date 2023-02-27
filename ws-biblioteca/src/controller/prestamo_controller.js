const { request } = require('express');
const cnn = require('../data_static/conectionDB');

const prestamoModel = require("../model/prestamo_model");

var query = "";
var response = { "status": 4, "information": "", "data": [] };

const prestamo_controller = {
    get: (req, res) => {
        prestamoModel.select().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Prestamos cargadas exitosamente";
            response.data = response_cat;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = err;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    },
    insert: (req, res) => {
        console.log(req.body);
        prestamoModel.insert(req.body).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Prestamo insertado exitosamente.";
            res.json(response);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    devolucion: (req, res) => {
        console.log(req.body);
        prestamoModel.devolucion(req.body).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Prestamo devuelto exitosamente.";
            res.json(response);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    prestamosRealizadosLR: (req, res) => {
        prestamoModel.prestamosRealizadosLR(req.body).then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Consulta cargada exitosamente";
            response.data = response_cat;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = err;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    },
    porcentajePorCategoria: (req, res) => {
        prestamoModel.porcentajePorCategoria().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Porcentajes cargados exitosamente";
            response.data = response_cat;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = err;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    },
    estudiantesSancionados: (req, res) => {
        prestamoModel.estudiantesSancionados().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Estudiantes sancionados cargados exitosamente";
            response.data = response_cat;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = err;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    },
    prestamosPorGenero: (req, res) => {
        prestamoModel.prestamosPorGenero().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Prestamos por genero cargados exitosamente";
            response.data = response_cat;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = err;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    }
}

module.exports = prestamo_controller;