var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarProductos: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscarProducto()", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows[0]);
            }
        });
    },


    guardarProducto: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `producto`(`codigo`, `serie`, `modelo`, `ensamblador`, `precioEntrada`, `precioSalida`, `descripcion`, `estado`, `idCategoria`, `idMarca`, `idUbicacion`, `idEntrada`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
        [
            req.body.codigo, 
            req.body.serie, 
            req.body.modelo, 
            req.body.ensamblador,
            req.body.precioEntrada,
            req.body.precioSalida,
            req.body.descripcion,
            req.body.estado,
            req.body.idCategoria,
            req.body.idMarca,
            req.body.idUbicacion,
            req.body.idEntrada
        ], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarProducto: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `producto` SET `codigo` = ?, `serie` = ?, `modelo` = ?, `ensamblador` = ?, `precioEntrada` = ?, `precioSalida` = ?, `descripcion` = ?, `estado` = ?, `idCategoria` = ?, `idMarca` = ?, `idUbicacion` = ? WHERE `idProducto` = ?", 
        [
            req.body.codigo, 
            req.body.serie, 
            req.body.modelo, 
            req.body.ensamblador,
            req.body.precioEntrada,
            req.body.precioSalida,
            req.body.descripcion,
            req.body.estado,
            req.body.idCategoria,
            req.body.idMarca,
            req.body.idUbicacion,
            req.body.idEntrada,
            req.body.idProducto
        ], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarProducto: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `producto` WHERE (`idProducto`=?)", [req.query.idProducto], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },
}