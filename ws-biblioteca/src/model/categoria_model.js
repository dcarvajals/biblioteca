const cnn = require('../data_static/conectionDB');

categoriaMethods = {
    insert: async (jsonparam) => {
        const response = await cnn.query("insert into categoria (nombre) values('"+jsonparam.nombre+"')");
        return response;
    },
    select: async () => {
        const response = await cnn.query("select * from categoria order by id;");
        return response.rows;
    },
    update: async (jsonparam) => {
        const response = await cnn.query("update categoria set nombre = '"+jsonparam.nombre+"' " +
            "where id = "+jsonparam.id+"");
        return response;
    },
    delete: async (jsonparam) => {
        const response = await cnn.query("delete from categoria where id = "+jsonparam.id+"");
        return response;
    }
}

module.exports = categoriaMethods;