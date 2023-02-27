const { request } = require('express');
const cnn = require('../data_static/conectionDB');

const ejemplarModel = require("../model/ejemplar_model");

var query = "";
var response = { "status": 4, "information": "", "data": [] };

const ejemplar_controller = {
    get: (req, res) => {
        ejemplarModel.select().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Ejemplares cargadas exitosamente";
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
        ejemplarModel.insert(req.body).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Ejemplar insertada exitosamente.";
            res.json(response);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    update: (req, res) => {
        console.log(req.body);
        ejemplarModel.update(req.body).then((response_server) => {
            console.log(response_server);
            response.status = 2;
            response.information = "Ejemplar editada exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    delete: (req, res) => {
        console.log(req.body);
        ejemplarModel.delete(req.body).then((response_server) => {
            console.log(response_server);
            response.status = 2;
            response.information = "Ejemplar eliminada exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    }
}

module.exports = ejemplar_controller;