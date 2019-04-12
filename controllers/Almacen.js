var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarAlmacenes: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM almacen", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarAlmacenesCombo: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT almacen.idAlmacen AS 'valor', almacen.nombre AS 'texto' FROM almacen", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },
    guardarAlmacen: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `almacen` (`nombre`) VALUES (?)", [req.body.nombre], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarAlmacen: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `almacen` SET `nombre`=? WHERE (`idAlmacen`=?)", [req.body.nombre, req.body.idAlmacen], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarAlmacen: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `almacen` WHERE (`idAlmacen`=?)", [req.query.idAlmacen], function (err, rows, fields) {
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