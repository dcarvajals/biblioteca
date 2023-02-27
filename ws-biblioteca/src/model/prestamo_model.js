const cnn = require('../data_static/conectionDB');

prestamo_controller = {
    insert: async (jsonparam) => {
        const response = await cnn.query("insert into prestamos (id_estudiante, id_ejemplar, fecha_prestamo, fecha_entrega, " +
            "estado) values ("+jsonparam.id_estudiante+", "+jsonparam.id_ejemplar+", '"+jsonparam.fecha_prestamo+"', " +
            "'"+jsonparam.fecha_entrega+"', 'P')");
        return response;
    },
    select: async () => {
        const response = await cnn.query("select p.id, e.id as id_estudiante, e.cedula, e2.id as id_ejemplar, e2.codigo,\n" +
            "       p.fecha_prestamo, p.fecha_entrega, p.fecha_devolucion, p.estado\n" +
            "from estudiante as e inner join prestamos p on e.id = p.id_estudiante\n" +
            "inner join ejemplar e2 on e2.id = p.id_ejemplar;");
        return response.rows;
    },
    devolucion: async (jsonparam) => {
        console.log("PARAMETROS DEVOLUCION ", jsonparam);
      const response = await  cnn.query("select devolucion ("+jsonparam.id+", "+jsonparam.id_estudiante+", true, '"+jsonparam.fecha_devolucion+"');")
        return response;
    },
    prestamosRealizadosLR: async (jsonparam) => {
        const response = await  cnn.query("select count(*) as cantidad_prestamos\n" +
            "from prestamos as p inner join ejemplar e on e.id = p.id_ejemplar where e.tipo = '"+jsonparam.tipo+"';");
        return response.rows;
    },
    porcentajePorCategoria: async () => {
        const response = await cnn.query("select (count(c.id) * 100) / (select count(*) from prestamos) as porcentaje,\n" +
            "       c.nombre as categoria from categoria as c inner join ejemplar e on c.id = e.id_categoria\n" +
            "INNER JOIN prestamos p on e.id = p.id_ejemplar group by c.id;");
        return response.rows;
    },
    estudiantesSancionados: async () => {
        const response = await cnn.query("select count(*) from estudiante where  date_part('day', now() - fecha_sancion) <= 15;");
        return response.rows;
    },
    prestamosPorGenero: async () => {
        const response = await cnn.query ("select count(e.id) as cantidad, e.sexo\n" +
            "from estudiante as e inner join prestamos p on e.id = p.id_estudiante\n" +
            "group by e.sexo;");
        return response.rows;
    }
}

module.exports = prestamo_controller;