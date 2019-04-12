var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {
    buscarClientes: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM cliente", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    buscarCliente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM cliente WHERE cliente.idCliente = ?", [req.query.idCliente], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarCliente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `cliente` (`identificacion`, `nombre`, `telefono`, `direccion`, `foto`) VALUES (?,?,?,?,?,?)", 
        [req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, "user-profile.png", "ELECTRONIX"], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarClienteUsuario: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `cliente` (`identificacion`, `nombre`, `telefono`, `direccion`, `idUsuario`, `foto`, `fotoLugar`) VALUES (?,?,?,?,?,?,?)", 
        [req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, req.body.idUsuario, "user-profile.png", "ELECTRONIX"], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarCliente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `cliente` SET `identificacion`=?, `nombre`=?, `telefono`=?, `direccion`=? WHERE (`idCliente`=?)", 
        [req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, req.body.idCliente], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarClienteFoto: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `cliente` SET `foto`=?, `fotoLugar`=?  WHERE (`idCliente`=?)", 
        [req.body.foto, req.body.fotoLugar, req.body.idCliente], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarCliente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `cliente` WHERE (`idCliente`=?)", [req.query.idCliente], function (err, rows, fields) {
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