var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarProveedores: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM proveedor", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarProveedoresCombo: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT proveedor.idProveedor AS 'valor', proveedor.nombre AS 'texto' FROM proveedor", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarProveedor: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `proveedor`(`identificacion`, `nombre`, `direccion`, `telefono`) VALUES (?,?,?,?)", [req.body.identificacion, req.body.nombre, req.body.direccion, req.body.telefono], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarProveedor: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `proveedor` SET `identificacion` = ?, `nombre` = ?, `direccion` = ?, `telefono` = ? WHERE `idProveedor` = ?", [req.body.identificacion, req.body.nombre, req.body.direccion, req.body.telefono, req.body.idProveedor], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarProveedor: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `proveedor` WHERE (`idProveedor`=?)", [req.query.idProveedor], function (err, rows, fields) {
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