var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarUbicaciones: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT "
        +" ubicacion.idUbicacion, "
        +" ubicacion.lugar, "
        +" almacen.nombre, "
        +" ubicacion.idAlmacen "
        +" FROM "
        +" almacen "
        +" INNER JOIN ubicacion ON ubicacion.idAlmacen = almacen.idAlmacen", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarUbicacionesCombo: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT ubicacion.idUbicacion AS 'valor', ubicacion.lugar AS 'texto' FROM ubicacion INNER JOIN almacen ON ubicacion.idAlmacen = almacen.idAlmacen WHERE "
        +" almacen.idAlmacen = ?",[req.query.idAlmacen], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },
    
    guardarUbicacion: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `ubicacion` (`lugar`, `idAlmacen`) VALUES (?,?)", [req.body.lugar, req.body.idAlmacen], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarUbicacion: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `ubicacion` SET `lugar`=?, `idAlmacen`=? WHERE (`idUbicacion`=?)", [req.body.lugar, req.body.idAlmacen, req.body.idUbicacion], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarUbicacion: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `ubicacion` WHERE (`idUbicacion`=?)", [req.query.idUbicacion], function (err, rows, fields) {
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