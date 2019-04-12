var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarCategorias: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM categoria", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarCategoriasCombo: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT categoria.idCategoria AS 'valor', categoria.nombre AS 'texto' FROM categoria", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarCategoria: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `categoria` (`nombre`) VALUES (?)", [req.body.nombre], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarCategoria: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `categoria` SET `nombre`=? WHERE (`idCategoria`=?)", [req.body.nombre, req.body.idCategoria], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarCategoria: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `categoria` WHERE (`idCategoria`=?)", [req.query.idCategoria], function (err, rows, fields) {
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