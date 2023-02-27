const { request } = require('express');
const cnn = require('../data_static/conectionDB');

const categoriaModel = require("../model/categoria_model");

var query = "";
var response = { "status": 4, "information": "", "data": [] };

const categoria_controller = { 
    get: (req, res) => {
        categoriaModel.select().then(response_cat => {
            console.log(response_cat);
            response.status = 2;
            response.information = "Categorias cargadas exitosamente";
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
        categoriaModel.insert(req.body).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Categoria insertada exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    update: (req, res) => {
        console.log(req.body);
        categoriaModel.update(req.body).then((response_server) => {
            console.log(response_server);
            response.status = 2;
            response.information = "Categoria editada exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    delete: (req, res) => {
        console.log(req.body);
        categoriaModel.delete(req.body).then((response_server) => {
            console.log(response_server);
            response.status = 2;
            response.information = "Categoria eliminada exitosamente.";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    }
}

module.exports = categoria_controller;