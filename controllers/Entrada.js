var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    buscarEntradas: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query(`SELECT
        entrada.idEntrada,
        entrada.codigo,
        entrada.formaPago,
        entrada.fecha,
        entrada.subtotal,
        entrada.iva,
        entrada.total,
        proveedor.nombre,
        proveedor.idProveedor
        FROM
        proveedor
        INNER JOIN entrada ON entrada.idProveedor = proveedor.idProveedor`, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },

    buscarEntradasCombo: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT entrada.idEntrada AS 'valor', entrada.codigo AS 'texto' FROM entrada", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarEntrada: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `entrada`(`codigo`, `formaPago`, `fecha`, `subtotal`, `iva`, `total`, `idProveedor`) VALUES (?,?,?,?,?,?,?)",
            [req.body.codigo,
            req.body.formaPago,
            req.body.fecha,
            req.body.subtotal,
            req.body.iva,
            req.body.total,
            req.body.idProveedor],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },

    modificarEntrada: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `entrada` SET `codigo` = ?, `formaPago` = ?, `fecha` = ?, `subtotal` = ?, `iva` = ?, `total` = ?, `idProveedor` = ? WHERE `idEntrada` = ?",
            [req.body.codigo,
            req.body.formaPago,
            req.body.fecha,
            req.body.subtotal,
            req.body.iva,
            req.body.total,
            req.body.idProveedor,
            req.body.idEntrada],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    db.end();
                } else {
                    db.end();
                    res.send(rows);
                }
            });
    },

    eliminarEntrada: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `entrada` WHERE (`idEntrada`=?)", [req.query.idEntrada], function (err, rows, fields) {
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