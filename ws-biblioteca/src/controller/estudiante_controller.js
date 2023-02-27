const { request } = require('express');
const cnn = require('../data_static/conectionDB');

const estudianteModel = require("../model/estudiante_model");

var query = "";
var response = { "status": 4, "information": "", "data": [] };

const estudiante_controller = {
    get: (req, res) => {
        estudianteModel.select().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Estudiantes cargadas exitosamente";
            response.data = response_cat;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = response_cat;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    },
    insert: (req, res) => {
        console.log(req.body);
        estudianteModel.insert(req.body).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Estudiante insertado exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    update: (req, res) => {
        console.log(req.body);
        estudianteModel.update(req.body).then((response_server) => {
            console.log(response_server);
            response.status = 2;
            response.information = "Estudiante editado exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    delete: (req, res) => {
        console.log(req.body);
        estudianteModel.delete(req.body).then((response_server) => {
            console.log(response_server);
            response.status = 2;
            response.information = "Estudiante eliminado exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    }
}

module.exports = estudiante_controller;