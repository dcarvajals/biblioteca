const cnn = require('../data_static/conectionDB');

ejemplarMethods = {
    insert: async (jsonparam) => {
        const response = await cnn.query("insert into ejemplar (id_categoria, codigo, editorial, nombre, autor,"
            + "anio_publicacion, tipo, estado) values("+jsonparam.id_categoria+",'"+jsonparam.codigo+"',"
            +"'"+jsonparam.editorial+"', '" + jsonparam.nombre+"','" + jsonparam.autor + "', "+jsonparam.anio_publicacion+", " +
            "'"+jsonparam.tipo+"', 'D')");
        return response;
    },
    select: async () => {
        const response = await cnn.query("select ej.*, c.id as id_categoria, c.nombre as nom_cat\n" +
            "from ejemplar as ej inner join categoria as c on ej.id_categoria = c.id\n" +
            "where ej.id not in (select  p.id_ejemplar from prestamos  as p where p.estado = 'P')\n" +
            " order by ej.id;");
        return response.rows;
    },
    update: async (jsonparam) => {
        const response = await cnn.query("update ejemplar set id_categoria = "+jsonparam.id_categoria+", codigo = '"+jsonparam.codigo+"'," +
            "editorial = '"+jsonparam.editorial+"', nombre='"+jsonparam.nombre+"', autor='"+jsonparam.autor+"', anio_publicacion = "+jsonparam.anio_publicacion+", " +
            "tipo='"+jsonparam.tipo+"', estado='"+jsonparam.estado+"' where id = "+jsonparam.id+";");
        return response.rows;
    },
    delete: async (jsonparam) => {
        const response = await cnn.query("delete from ejemplar where id = " + jsonparam.id);
        return response.rows;
    }
}

module.exports = ejemplarMethods;