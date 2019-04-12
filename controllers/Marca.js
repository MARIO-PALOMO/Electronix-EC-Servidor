var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarMarcas: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM marca", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarMarcasCombo: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT marca.idMarca AS 'valor', marca.nombre AS 'texto' FROM marca", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarMarca: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `marca` (`nombre`) VALUES (?)", [req.body.nombre], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarMarca: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `marca` SET `nombre`=? WHERE (`idMarca`=?)", [req.body.nombre, req.body.idMarca], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarMarca: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `marca` WHERE (`idMarca`=?)", [req.query.idMarca], function (err, rows, fields) {
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