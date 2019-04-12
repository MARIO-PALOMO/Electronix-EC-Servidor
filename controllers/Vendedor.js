var mysql = require('mysql');
var config = require('.././database/database.js');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '029ed796347d74733f44f418e6e21894a1';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports = {
    buscarVendedores: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM vendedor", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    guardarVendedor: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `usuario` (`email`, `contrasena`, `rol`, `estado`, `foto`, `fotoLugar`) VALUES (?,?,?,?,?,?)", 
        [req.body.email, encrypt(req.body.identificacion), 'VENDEDOR', '1', "user-profile.png", "ELECTRONIX"], function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                
                var datos = JSON.stringify(rows);
                var idUsuario = JSON.parse(datos);

                db.query("INSERT INTO `vendedor` (`identificacion`, `nombre`, `telefono`, `direccion`, `idUsuario`, `foto`, `fotoLugar`) VALUES (?,?,?,?,?,?,?)", 
                [req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, idUsuario.insertId, "user-profile.png", "ELECTRONIX"], function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        db.end();
                    } else {
                        db.end();
                        res.send(rows);
                    }
                });
            }
        });
    },

    modificarVendedor: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `vendedor` SET `identificacion`=?, `nombre`=?, `telefono`=?, `direccion`=? WHERE (`idVendedor`=?)", [req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, req.body.idVendedor], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    modificarVendedorFoto: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("UPDATE `vendedor` SET `foto`=?, `fotoLugar`=? WHERE (`idVendedor`=?)", 
        [req.body.foto, req.body.fotoLugar, req.body.idVendedor], function (err, rows, fields) {
            if (err) {  
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }
        });
    },

    eliminarVendedor: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("DELETE FROM `vendedor` WHERE (`idVendedor`=?)", [req.query.idVendedor], function (err, rows, fields) {
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