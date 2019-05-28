var mysql = require("mysql");
var config = require(".././database/database.js");
var jwt = require("jsonwebtoken");

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '029ed796347d74733f44f418e6e21894a1';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  iniciarSesion: function(req, res, next) {

    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      +" usuario.idUsuario, "
      +" usuario.email, "
      +" usuario.rol, "
      +" vendedor.idVendedor, "
      +" vendedor.nombre AS 'nombreVendedor', "
      +" vendedor.foto AS 'fotoVendedor', "
      +" vendedor.fotoLugar AS 'fotoLugarVendedor', "
      +" cliente.idCliente, "
      +" cliente.nombre AS 'nombreCliente', "
      +" cliente.foto AS 'fotoCliente', "
      +" cliente.fotoLugar AS 'fotoLugarCliente' "
      +" FROM "
      +" usuario "
      +" LEFT JOIN vendedor ON vendedor.idUsuario = usuario.idUsuario "
      +" LEFT JOIN cliente ON cliente.idUsuario = usuario.idUsuario "
      +" WHERE "
      +" usuario.idUsuario = (SELECT UsuarioGestion(?, ?))",
      [req.body.email, encrypt(req.body.contrasena)],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          var data = JSON.stringify(rows[0]);

          if (data == undefined) {
            res.send(false);
          } else {
            var usuario = JSON.parse(data);
            var token = jwt.sign(usuario, "fpcfullcomputador", {
              expiresIn: 60 * 60 * 24
            });

            res.send({ usuario: usuario, token: token });
          }
        }
      }
    );
  },

  comprobarExistenciaUsuario: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT usuario.idUsuario FROM usuario WHERE usuario.email = ?", [req.query.email], function(err, rows, fields) {
      if (err) {
        console.log(err);
        db.end();
      } else {
        db.end();
        res.send(rows);
      }
    });
  },

  buscarUsuario: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "SELECT "
      +" usuario.idUsuario, "
      +" usuario.email, "
      +" usuario.rol, "
      +" vendedor.idVendedor, "
      +" vendedor.nombre AS 'nombreVendedor', "
      +" vendedor.foto AS 'fotoVendedor', "
      +" vendedor.fotoLugar AS 'fotoLugarVendedor', "
      +" cliente.idCliente, "
      +" cliente.nombre AS 'nombreCliente', "
      +" cliente.foto AS 'fotoCliente', "
      +" cliente.fotoLugar AS 'fotoLugarCliente' "
      +" FROM "
      +" usuario "
      +" LEFT JOIN vendedor ON vendedor.idUsuario = usuario.idUsuario "
      +" LEFT JOIN cliente ON cliente.idUsuario = usuario.idUsuario "
      +" WHERE "
      +" usuario.idUsuario = ?", [req.query.idUsuario], function(err, rows, fields) {
      if (err) {
        console.log(err);
        db.end();
      } else {
        db.end();
        var usuario = JSON.stringify(rows[0])

        var token = jwt.sign(JSON.parse(usuario), "fpcfullcomputador", {
          expiresIn: 60 * 60 * 24
        });

        res.send({ usuario: rows[0], token: token });
      }
    });
  },

  buscarUsuarios: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT usuario.idUsuario, usuario.email, usuario.rol, usuario.estado FROM usuario", function(err, rows, fields) {
      if (err) {
        console.log(err);
        db.end();
      } else {
        db.end();
        res.send(rows);
      }
    });
  },

  guardarUsuario: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `sistema_ventas`.`usuario`(`email`, `contrasena`, `rol`, `estado`, `plataforma`) VALUES (?,?,?,?,?)",
      [
        req.body.email,
        encrypt(req.body.contrasena),
        req.body.rol,
        1,
        req.body.plataforma
      ],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
          res.status(500).send(err);
        } else {
          db.end();
          res.send(rows);
        }
      }
    );
  },

  modificarUsuario: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();
    
    db.query(
      "UPDATE `sistema_ventas`.`usuario` SET `email` = ?, `rol` = ? WHERE `idUsuario` = ?",
      [
        req.body.email,
        req.body.rol,
        req.body.idUsuario
      ],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();
          res.send(rows);
        }
      }
    );
  },

  eliminarUsuario: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `sistema_ventas`.`usuario` SET `estado` = 0 WHERE `idUsuario` = ?",
      [req.query.idUsuario],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();
          res.send(rows);
        }
      }
    );
  },

  reestablecerUsuario: function(req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "UPDATE `sistema_ventas`.`usuario` SET `estado` = 1 WHERE `idUsuario` = ?",
      [req.query.idUsuario],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();
          res.send(rows);
        }
      }
    );
  },

  seguridad: function(req, res, next) {
    var token = req.headers["authorization"];
    if (!token) {
      res.send(false);
      return;
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, "fpcfullcomputador", function(err, user) {
      if (err) {
        res.send(false);
      } else {
        return next();
      }
    });
  }
};
