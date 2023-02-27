const cnn = require('../data_static/conectionDB');

estudiante_controller = {
    insert: async (jsonparam) => {
        const response = await cnn.query("insert into estudiante (cedula, nombres, apellidos, sexo, fecha_nacimiento,"
            + "estado) values("+jsonparam.cedula+",'"+jsonparam.nombres+"','"+jsonparam.apellidos+"', '" + jsonparam.sexo+"', " +
            "'" + jsonparam.fecha_nacimiento + "', 'D')");
        return response;
    },
    select: async () => {
        const response = await cnn.query("select *, date_part('day', now() - fecha_sancion) as dias_sancion from estudiante");
        return response.rows;
    },
    update: async (jsonparam) => {
        const response = await cnn.query("update estudiante set cedula = '"+jsonparam.cedula+"', nombres = '"+jsonparam.nombres+"', " +
            "apellidos = '"+jsonparam.apellidos+"', sexo='"+jsonparam.sexo+"', fecha_nacimiento='"+jsonparam.fecha_nacimiento+"', " +
            "estado = '"+jsonparam.estado+"' where id = "+jsonparam.id+";");
        return response.rows;
    },
    delete: async (jsonparam) => {
        const response = await cnn.query("delete from estudiante where id = " + jsonparam.id);
        return response.rows;
    }
}

module.exports = estudiante_controller;