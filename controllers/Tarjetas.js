var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {
    buscarTarjeta: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscarTarjeta(" + req.query.idCliente + ")", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarTarjeta: function (req, res, next) {
        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `tarjeta`(`propietario`, `numero`, `mesExpiracion`, `anioExpiracion`, `marca`, `idCliente`) VALUES (?,?,?,?,?,?)",
            [req.body.tarjeta.cardholderName, req.body.tarjeta.cardNumber, req.body.tarjeta.expiryMonth, req.body.tarjeta.expiryYear, req.body.tarjeta.cardType, req.body.cliente], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },

    modificarTarjeta: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `tarjeta` SET `propietario` = ?, `numero` = ?, `mesExpiracion` = ?, `anioExpiracion` = ?, `marca` = ? WHERE `idTarjeta` = ?",
            [req.body.propietario, req.body.numero, req.body.mesExpiracion, req.body.anioExpiracion, req.body.marca, req.body.idTarjeta], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },

    eliminarTarjeta: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `tarjeta` WHERE `idTarjeta` = ?", [req.query.idTarjeta], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    }
}