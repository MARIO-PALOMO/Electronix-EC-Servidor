/*
 Navicat Premium Data Transfer

 Source Server         : MariaDBLocal
 Source Server Type    : MariaDB
 Source Server Version : 100313
 Source Host           : localhost:3307
 Source Schema         : sistema_ventas

 Target Server Type    : MariaDB
 Target Server Version : 100313
 File Encoding         : 65001

 Date: 12/04/2019 14:25:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for almacen
-- ----------------------------
DROP TABLE IF EXISTS `almacen`;
CREATE TABLE `almacen`  (
  `idAlmacen` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idAlmacen`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of almacen
-- ----------------------------
INSERT INTO `almacen` VALUES (2, 'G7005D');
INSERT INTO `almacen` VALUES (3, 'G7001D');

-- ----------------------------
-- Table structure for calificacion
-- ----------------------------
DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE `calificacion`  (
  `idCalificacion` int(11) NOT NULL AUTO_INCREMENT,
  `valor` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`idCalificacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for calificacion_producto
-- ----------------------------
DROP TABLE IF EXISTS `calificacion_producto`;
CREATE TABLE `calificacion_producto`  (
  `idCalificacionProducto` int(11) NOT NULL AUTO_INCREMENT,
  `idCalificacion` int(11) NULL DEFAULT NULL,
  `idProducto` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idCalificacionProducto`) USING BTREE,
  INDEX `idCalificacion`(`idCalificacion`) USING BTREE,
  INDEX `idProducto`(`idProducto`) USING BTREE,
  CONSTRAINT `calificacion_producto_ibfk_1` FOREIGN KEY (`idCalificacion`) REFERENCES `calificacion` (`idCalificacion`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `calificacion_producto_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for categoria
-- ----------------------------
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria`  (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idCategoria`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categoria
-- ----------------------------
INSERT INTO `categoria` VALUES (1, 'MOTHERBOARDS');
INSERT INTO `categoria` VALUES (2, 'TECLADOS');
INSERT INTO `categoria` VALUES (4, 'PROCESADORES');

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(13) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `telefono` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `direccion` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `idUsuario` int(11) NULL DEFAULT NULL,
  `foto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `fotoLugar` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idCliente`) USING BTREE,
  INDEX `idUsuario`(`idUsuario`) USING BTREE,
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (4, '178452365456', 'NOMBRE 4', '2222222', 'DIR 4', NULL, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (18, '1724395536', 'FERNANDO PALOMO', '0979212157', 'AV LOS LIBERTADORES', 3, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (27, '213123213', 'lklñklñklñ', 'klñk', 'ñlkñlñkñl', NULL, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (28, '1710017625', 'NOMBRE', 'TELEFONO', 'DIRECCION', NULL, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (29, '99999999999', 'NOSE', 'NOSE', 'NOSE', NULL, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (41, '0', 'MARIO PALOMO', '0', '0', 80, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (42, '0', 'ABIGAIL PALOMO', '0', '0', 81, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `cliente` VALUES (44, '0', 'Fernando Palomo', '0', '0', 83, 'https://firebasestorage.googleapis.com/v0/b/electronix-ec.appspot.com/o/Clientes%2F44.jpeg?alt=media&token=0c4d2f56-cced-486e-baf9-2145c366ed17', 'FIREBASE');

-- ----------------------------
-- Table structure for detalle_salida
-- ----------------------------
DROP TABLE IF EXISTS `detalle_salida`;
CREATE TABLE `detalle_salida`  (
  `idDetalleVenta` int(11) NOT NULL AUTO_INCREMENT,
  `idProducto` int(11) NULL DEFAULT NULL,
  `cantidad` int(11) NULL DEFAULT NULL,
  `subtotal` float NULL DEFAULT NULL,
  `idSalida` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idDetalleVenta`) USING BTREE,
  INDEX `idProducto`(`idProducto`) USING BTREE,
  INDEX `idSalida`(`idSalida`) USING BTREE,
  CONSTRAINT `detalle_salida_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detalle_salida_ibfk_2` FOREIGN KEY (`idSalida`) REFERENCES `salida` (`idSalida`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for entrada
-- ----------------------------
DROP TABLE IF EXISTS `entrada`;
CREATE TABLE `entrada`  (
  `idEntrada` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `formaPago` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `fecha` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `subtotal` float NULL DEFAULT NULL,
  `iva` float NULL DEFAULT NULL,
  `total` float NULL DEFAULT NULL,
  `idProveedor` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idEntrada`) USING BTREE,
  INDEX `idProveedor`(`idProveedor`) USING BTREE,
  CONSTRAINT `entrada_ibfk_1` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of entrada
-- ----------------------------
INSERT INTO `entrada` VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for imagen_producto
-- ----------------------------
DROP TABLE IF EXISTS `imagen_producto`;
CREATE TABLE `imagen_producto`  (
  `idImagen` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idProducto` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idImagen`) USING BTREE,
  INDEX `idProducto`(`idProducto`) USING BTREE,
  CONSTRAINT `imagen_producto_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagen_producto
-- ----------------------------
INSERT INTO `imagen_producto` VALUES (1, 'images/productos/GTX2080.jpg', '1', 4);
INSERT INTO `imagen_producto` VALUES (2, 'images/productos/H60.jpg', '1', 6);
INSERT INTO `imagen_producto` VALUES (3, 'images/productos/TridentZ.jpg', '1', 10);
INSERT INTO `imagen_producto` VALUES (4, 'images/productos/TridentZ2.jpg', '1', 10);
INSERT INTO `imagen_producto` VALUES (15, '2.png', '1', 10);
INSERT INTO `imagen_producto` VALUES (16, 'Equipayment - copia.png', '1', 10);
INSERT INTO `imagen_producto` VALUES (17, 'Equipayment.png', '1', 10);

-- ----------------------------
-- Table structure for marca
-- ----------------------------
DROP TABLE IF EXISTS `marca`;
CREATE TABLE `marca`  (
  `idMarca` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idMarca`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of marca
-- ----------------------------
INSERT INTO `marca` VALUES (1, 'ASUS');
INSERT INTO `marca` VALUES (2, 'CORSAIR');
INSERT INTO `marca` VALUES (4, 'GIGABYTE');

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `serie` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `modelo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ensamblador` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `precioEntrada` float NULL DEFAULT NULL,
  `precioSalida` float NULL DEFAULT NULL,
  `descripcion` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `estado` tinyint(4) NULL DEFAULT NULL,
  `idCategoria` int(11) NULL DEFAULT NULL,
  `idMarca` int(11) NULL DEFAULT NULL,
  `idUbicacion` int(11) NULL DEFAULT NULL,
  `idEntrada` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idProducto`) USING BTREE,
  UNIQUE INDEX `codigo`(`codigo`) USING BTREE,
  INDEX `idCategoria`(`idCategoria`) USING BTREE,
  INDEX `idMarca`(`idMarca`) USING BTREE,
  INDEX `idUbicacion`(`idUbicacion`) USING BTREE,
  INDEX `idEntrada`(`idEntrada`) USING BTREE,
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`idMarca`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`idUbicacion`) REFERENCES `ubicacion` (`idUbicacion`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `producto_ibfk_4` FOREIGN KEY (`idEntrada`) REFERENCES `entrada` (`idEntrada`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (4, '2109082310928', '98ASD89012S', 'GTX 2080', 'NVIDIA', 1099.99, 1299.99, 'Tarjeta Grafica de alto rendimiento', 1, 1, 1, 5, NULL);
INSERT INTO `producto` VALUES (6, '2109082310929', '98ASD89012S', 'H60', 'CORSAIR', 90, 120, 'Teclado RGB', 0, 1, 1, 4, NULL);
INSERT INTO `producto` VALUES (10, 'MR0001', 'MRRGB0001', 'Trident Z RGB DDR4 3200 PC4-25600 16GB 2x8GB CL16', 'S/N', 144.99, 179.99, '<p style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 1rem; font-family: &quot;Open Sans&quot;, arial, sans-serif; font-size: 13px;\"><font color=\"#000000\">La nueva gama de<span style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; font-weight: 700;\">&nbsp;memorias RAM G.Skill&nbsp;Trident Z RGB&nbsp;</span>ofrece soluciones para un&nbsp;<u style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased;\">rendimiento increíble</u>. Estos kits optimizan el rendimiento de las plataformas de nueva generación, con la ventaja añadida de&nbsp;un alto potencial de&nbsp;<em style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased;\">overclocking</em>. Además, estas rápidas memorias incorporan un sistema de iluminación LED RGB con hasta 16.8 millones de colores con varios modos de iluminación por software. Simplemente pincha la memoria&nbsp;<span style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; font-weight: 700;\">Trident Z RGB&nbsp;</span>en tu placa base<span style=\"-webkit-font-smoothing: antialiased; font-weight: 700; box-sizing: inherit; box-sizing: inherit;\"></span>y disfruta de la iluminación.</font></p><p style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 1rem; font-family: &quot;Open Sans&quot;, arial, sans-serif; font-size: 13px;\"><font color=\"#000000\">La compañía G.Skill, gracias a un intenso trabajo de I+D durante sus más de 25 años de historia, ha diseñado y fabricado las memorias Trident Z RGB para el overclocking y el gaming más exigente. Con un PCB de alta calidad de 10 capas, un&nbsp;<u style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased;\">disipador denso de aluminio</u>&nbsp;para una óptima temperatura, los&nbsp;<u style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased;\">mejores chips de memoria</u>&nbsp;seleccionados a mano y la tecnología Intel XMP 2.0 para un overclocking sencillo, estas memorias te darán el rendimiento que necesitas en tu sistema, tanto si vas a hacer overclocking como si vas a jugar.</font></p><h2 style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 8px; line-height: 1.1; font-size: 20px; font-family: Montserrat, sans-serif;\"><font color=\"#000000\">Características:</font></h2><ul style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 1rem; padding-left: 15px; font-family: &quot;Open Sans&quot;, arial, sans-serif; font-size: 13px;\"><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Alto rendimiento.</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Iluminación RGB por software de hasta 16.8 millones de colores.</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Optimizadas para la nueva generación de procesadores y placas base.</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Diseñadas y fabricadas con los mejores componentes para los sistemas más exigente en&nbsp;<em style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased;\">overcloking&nbsp;</em>o&nbsp;<em style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased;\">gaming</em>.</font></li></ul><h2 style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-top: 20px; margin-bottom: 8px; line-height: 1.1; font-size: 20px; font-family: Montserrat, sans-serif;\"><font color=\"#000000\">Especificaciones Trident Z RGB:</font></h2><ul style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 1rem; padding-left: 15px; font-family: &quot;Open Sans&quot;, arial, sans-serif; font-size: 13px;\"><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Tipo de la memoria DDR4</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Capacidad 16GB (2x8GB)</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Multi-Channel Kit de doble canal</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Velocidad Probada 3200MHz</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Latencia Probada&nbsp; 16-18-18-38</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Voltaje Probada 1.35v</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Dimensiones 16 x 13,7 x 1.4 cm</font></li><li style=\"box-sizing: inherit; -webkit-font-smoothing: antialiased; margin-bottom: 6px;\"><font color=\"#000000\">Peso 186g</font></li></ul>', 1, 1, 1, 2, 1);

-- ----------------------------
-- Table structure for proveedor
-- ----------------------------
DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor`  (
  `idProveedor` int(11) NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(13) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idProveedor`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of proveedor
-- ----------------------------
INSERT INTO `proveedor` VALUES (2, '0985478563001', 'MTEC S.A', '12 DE OCTUBRE Y RAMON ROCA', '0987452136');

-- ----------------------------
-- Table structure for salida
-- ----------------------------
DROP TABLE IF EXISTS `salida`;
CREATE TABLE `salida`  (
  `idSalida` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `formaPago` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `fecha` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `subtotal` float NULL DEFAULT NULL,
  `descuento` float NULL DEFAULT NULL,
  `iva` float NULL DEFAULT NULL,
  `total` float NULL DEFAULT NULL,
  `idVendedor` int(11) NULL DEFAULT NULL,
  `idCliente` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idSalida`) USING BTREE,
  INDEX `idVendedor`(`idVendedor`) USING BTREE,
  INDEX `idCliente`(`idCliente`) USING BTREE,
  CONSTRAINT `salida_ibfk_1` FOREIGN KEY (`idVendedor`) REFERENCES `vendedor` (`idVendedor`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `salida_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salida
-- ----------------------------
INSERT INTO `salida` VALUES (1, 'dasd', 'EFECTIVO', '2018-11-08 17:55:09', 11.11, 12.33, 22.25, 10.62, NULL, NULL);

-- ----------------------------
-- Table structure for ubicacion
-- ----------------------------
DROP TABLE IF EXISTS `ubicacion`;
CREATE TABLE `ubicacion`  (
  `idUbicacion` int(11) NOT NULL AUTO_INCREMENT,
  `lugar` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idAlmacen` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idUbicacion`) USING BTREE,
  INDEX `idAlmacen`(`idAlmacen`) USING BTREE,
  CONSTRAINT `ubicacion_ibfk_1` FOREIGN KEY (`idAlmacen`) REFERENCES `almacen` (`idAlmacen`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ubicacion
-- ----------------------------
INSERT INTO `ubicacion` VALUES (2, 'A1', 3);
INSERT INTO `ubicacion` VALUES (3, 'A2', 3);
INSERT INTO `ubicacion` VALUES (4, 'A3', 3);
INSERT INTO `ubicacion` VALUES (5, 'B1', 3);
INSERT INTO `ubicacion` VALUES (6, 'B2', 3);
INSERT INTO `ubicacion` VALUES (7, 'B3', 3);

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `contrasena` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `rol` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `estado` tinyint(4) NULL DEFAULT NULL,
  `plataforma` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 'master@fpc.net', 'b2c85151f7f5602a6ed6', 'ADMINISTRADOR', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (2, 'vendedor@fpc.net', 'b2c85151f7f5602a6ed6', 'VENDEDOR', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (3, 'fernando@gmail.com', 'b2c85151f7f5602a6ed6', 'CLIENTE', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (41, 'carloshz@gmail.com', 'd2885256fcf661296bdd', 'VENDEDOR', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (42, 'jorge@gmail.com', 'd2885257f1f962286cd6', 'VENDEDOR', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (80, 'mariofpalomoa@gmail.com', 'b2c85151f7f5602a6ed6', 'CLIENTE', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (81, 'aby@gmail.com', 'b2c85151f7f5602a6ed6', 'CLIENTE', 1, 'ELECTRONIX');
INSERT INTO `usuario` VALUES (83, 'fernando@hotmail.com', 'b2c85151f7f5602a6ed6', 'CLIENTE', 1, 'ELECTRONIX');

-- ----------------------------
-- Table structure for vendedor
-- ----------------------------
DROP TABLE IF EXISTS `vendedor`;
CREATE TABLE `vendedor`  (
  `idVendedor` int(11) NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(13) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `nombre` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `telefono` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `direccion` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '',
  `idUsuario` int(11) NULL DEFAULT NULL,
  `foto` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `fotoLugar` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idVendedor`) USING BTREE,
  INDEX `idUsuario`(`idUsuario`) USING BTREE,
  CONSTRAINT `vendedor_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vendedor
-- ----------------------------
INSERT INTO `vendedor` VALUES (5, '1725874523', 'CARLOS HERNANDEZ', '0987456321', 'LA MASCOTA', 41, 'user-profile.png', 'ELECTRONIX');
INSERT INTO `vendedor` VALUES (6, '1724587458', 'JORGE CRESPO', '0978451236', 'MAGDALENA', 42, 'user-profile.png', 'ELECTRONIX');

-- ----------------------------
-- Procedure structure for buscarProducto
-- ----------------------------
DROP PROCEDURE IF EXISTS `buscarProducto`;
delimiter ;;
CREATE PROCEDURE `buscarProducto`()
SELECT
producto.idProducto,
producto.codigo,
producto.serie,
producto.modelo,
producto.ensamblador,
CAST(producto.precioEntrada AS CHAR) AS 'precioEntrada',
CAST(producto.precioSalida AS CHAR) AS 'precioSalida',
producto.descripcion,
IF(producto.estado = 1, 'VENDIDO', 'SIN VENDER') AS 'estado',
producto.idCategoria,
categoria.nombre AS 'categoria',
producto.idMarca,
marca.nombre AS 'marca',
almacen.idAlmacen,
almacen.nombre AS 'almacen',
producto.idUbicacion,
ubicacion.lugar AS 'ubicacion',
producto.idEntrada,
entrada.codigo AS 'entrada',
GROUP_CONCAT(
CONCAT(imagen_producto.url) SEPARATOR ' - '
)  AS 'imagenes'
FROM
producto
INNER JOIN categoria ON producto.idCategoria = categoria.idCategoria
INNER JOIN marca ON producto.idMarca = marca.idMarca
INNER JOIN ubicacion ON producto.idUbicacion = ubicacion.idUbicacion
INNER JOIN almacen ON ubicacion.idAlmacen = almacen.idAlmacen
LEFT JOIN entrada ON producto.idEntrada = entrada.idEntrada
INNER JOIN imagen_producto ON imagen_producto.idProducto = producto.idProducto
GROUP BY 
producto.idProducto
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PaginarUsuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `PaginarUsuario`;
delimiter ;;
CREATE PROCEDURE `PaginarUsuario`(limite INT, valor TEXT)
BEGIN
	
	DECLARE registros DOUBLE;
	DECLARE promedio INT;
	
	SELECT COUNT(usuario.idUsuario) INTO registros FROM usuario;
	
	IF(registros <= 7)THEN
		
		SELECT usuario.idUsuario, usuario.email, usuario.rol, usuario.estado FROM usuario;

	ELSE

		SELECT usuario.idUsuario, usuario.email, usuario.rol, usuario.estado FROM usuario LIMIT 7 OFFSET 1;
					
	END IF;

END
;;
delimiter ;

-- ----------------------------
-- Function structure for UsuarioGestion
-- ----------------------------
DROP FUNCTION IF EXISTS `UsuarioGestion`;
delimiter ;;
CREATE FUNCTION `UsuarioGestion`(email TEXT, contrasena TEXT)
 RETURNS int(11)
BEGIN
				
				DECLARE msm INT;
				DECLARE email_ TEXT;
				DECLARE contrasena_ TEXT;
				DECLARE id_ INT;
				DECLARE estado_ INT;
				DECLARE rol_ TEXT;

				SELECT usuario.email INTO email_ FROM usuario
				WHERE
				usuario.email = email
				AND usuario.contrasena = contrasena;

				SELECT usuario.contrasena INTO contrasena_ FROM usuario
				WHERE
				usuario.email = email
				AND usuario.contrasena = contrasena;

				SELECT usuario.estado INTO estado_ FROM usuario
				WHERE
				usuario.email = email
				AND usuario.contrasena = contrasena;

				SELECT usuario.idUsuario INTO id_ FROM usuario
				WHERE
				usuario.email = email
				AND usuario.contrasena = contrasena;

				SELECT usuario.rol INTO rol_ FROM usuario
				WHERE
				usuario.email = email
				AND usuario.contrasena = contrasena;

				IF ((email_ = email AND contrasena_ = contrasena) AND (estado_ = 1) AND (rol_ = 'ADMINISTRADOR')) THEN
				
					SET msm = id_;

				ELSEIF ((email_ = email AND contrasena_ = contrasena) AND (estado_ = 1) AND (rol_ = 'VENDEDOR')) THEN

					SET msm = id_;

				ELSEIF ((email_ = email AND contrasena_ = contrasena) AND (estado_ = 1) AND (rol_ = 'CLIENTE')) THEN
		
					SET msm = id_;

				ELSE

					SET msm = 0;
					
				END IF;

    RETURN msm;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
