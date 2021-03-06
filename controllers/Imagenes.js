var mysql = require("mysql");
var config = require(".././database/database.js");
var fs = require("fs");

module.exports = {
  subirImagenes: function (req, res, next) {
    for (var x = 0; x < req.files.length; x++) {
      fs.createReadStream("./productos/" + req.files[x].filename).pipe(
        fs.createWriteStream("./public/images/products/" + req.files[x].originalname)
      );
      res.send({ 'imagen': req.files[x].originalname });
    }
  },

  guardarImagenes: function (req, res, next) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query(
      "INSERT INTO `imagen_producto`(`url`, `estado`, `idProducto`) VALUES (?,?,?)",
      ["images/products/" + req.query.nombre, 1, req.query.idProducto],
      function (err, rows, fields) {
        if (err) {
          console.log(err);
          db.end();
        } else {
          db.end();
          res.send(rows);
        }
      }
    );
  }
};
