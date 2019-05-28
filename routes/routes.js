var express = require('express');
var multer = require("multer");
var upload = multer({ dest: "./productos/" });
var router = express.Router();
var controllers = require('.././controllers');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//DOCUMENTO ENTRADA
router.get('/buscarEntradas', controllers.Usuario.seguridad, controllers.Entrada.buscarEntradas);
router.get('/buscarEntradasCombo', controllers.Usuario.seguridad, controllers.Entrada.buscarEntradasCombo);
router.post('/guardarEntrada', controllers.Usuario.seguridad, controllers.Entrada.guardarEntrada);
router.post('/modificarEntrada', controllers.Usuario.seguridad, controllers.Entrada.modificarEntrada);
router.get('/eliminarEntrada', controllers.Usuario.seguridad, controllers.Entrada.eliminarEntrada);

//TARJETAS-CREDITO-DEBITO
router.get('/buscarTarjeta', controllers.Usuario.seguridad, controllers.Tarjetas.buscarTarjeta);
router.post('/guardarTarjeta', controllers.Usuario.seguridad, controllers.Tarjetas.guardarTarjeta);
router.post('/modificarTarjeta', controllers.Usuario.seguridad, controllers.Tarjetas.modificarTarjeta);
router.get('/eliminarTarjeta', controllers.Usuario.seguridad, controllers.Tarjetas.eliminarTarjeta);

//IMAGEN PRODUCTO
router.post('/subirImagenes', upload.array('file', 5), controllers.Imagenes.subirImagenes);
router.get('/guardarImagenes',  controllers.Usuario.seguridad, controllers.Imagenes.guardarImagenes);

//PRODUCTOS
router.get('/buscarProductos', controllers.Usuario.seguridad, controllers.Producto.buscarProductos);
router.post('/guardarProducto', controllers.Usuario.seguridad, controllers.Producto.guardarProducto);
router.post('/modificarProducto', controllers.Usuario.seguridad, controllers.Producto.modificarProducto);
router.get('/eliminarProducto', controllers.Usuario.seguridad, controllers.Producto.eliminarProducto);

//PROVEEDORES
router.get('/buscarProveedores', controllers.Usuario.seguridad, controllers.Proveedor.buscarProveedores);
router.get('/buscarProveedoresCombo', controllers.Usuario.seguridad, controllers.Proveedor.buscarProveedoresCombo);
router.post('/guardarProveedor', controllers.Usuario.seguridad, controllers.Proveedor.guardarProveedor);
router.post('/modificarProveedor', controllers.Usuario.seguridad, controllers.Proveedor.modificarProveedor);
router.get('/eliminarProveedor', controllers.Usuario.seguridad, controllers.Proveedor.eliminarProveedor);

//CATEGORIAS
router.get('/buscarCategorias', controllers.Usuario.seguridad, controllers.Categoria.buscarCategorias);
router.get('/buscarCategoriasCombo', controllers.Usuario.seguridad, controllers.Categoria.buscarCategoriasCombo);
router.post('/guardarCategoria', controllers.Usuario.seguridad, controllers.Categoria.guardarCategoria);
router.post('/modificarCategoria', controllers.Usuario.seguridad, controllers.Categoria.modificarCategoria);
router.get('/eliminarCategoria', controllers.Usuario.seguridad, controllers.Categoria.eliminarCategoria);

//MARCAS
router.get('/buscarMarcas', controllers.Usuario.seguridad, controllers.Marca.buscarMarcas);
router.get('/buscarMarcasCombo', controllers.Usuario.seguridad, controllers.Marca.buscarMarcasCombo);
router.post('/guardarMarca', controllers.Usuario.seguridad, controllers.Marca.guardarMarca);
router.post('/modificarMarca', controllers.Usuario.seguridad, controllers.Marca.modificarMarca);
router.get('/eliminarMarca', controllers.Usuario.seguridad, controllers.Marca.eliminarMarca);

//UBICACIONES
router.get('/buscarUbicaciones', controllers.Usuario.seguridad, controllers.Ubicacion.buscarUbicaciones);
router.get('/buscarUbicacionesCombo', controllers.Usuario.seguridad, controllers.Ubicacion.buscarUbicacionesCombo);
router.post('/guardarUbicacion', controllers.Usuario.seguridad, controllers.Ubicacion.guardarUbicacion);
router.post('/modificarUbicacion', controllers.Usuario.seguridad, controllers.Ubicacion.modificarUbicacion);
router.get('/eliminarUbicacion', controllers.Usuario.seguridad, controllers.Ubicacion.eliminarUbicacion);

//ALMACENES
router.get('/buscarAlmacenes', controllers.Usuario.seguridad, controllers.Almacen.buscarAlmacenes);
router.get('/buscarAlmacenesCombo', controllers.Usuario.seguridad, controllers.Almacen.buscarAlmacenesCombo);
router.post('/guardarAlmacen', controllers.Usuario.seguridad, controllers.Almacen.guardarAlmacen);
router.post('/modificarAlmacen', controllers.Usuario.seguridad, controllers.Almacen.modificarAlmacen);
router.get('/eliminarAlmacen', controllers.Usuario.seguridad, controllers.Almacen.eliminarAlmacen);

//VENDEDORES
router.get('/buscarVendedores', controllers.Usuario.seguridad, controllers.Vendedor.buscarVendedores);
router.post('/guardarVendedor', controllers.Usuario.seguridad, controllers.Vendedor.guardarVendedor);
router.post('/modificarVendedor', controllers.Usuario.seguridad, controllers.Vendedor.modificarVendedor);
router.post('/modificarVendedorFoto', controllers.Usuario.seguridad, controllers.Vendedor.modificarVendedorFoto);
router.get('/eliminarVendedor', controllers.Usuario.seguridad, controllers.Vendedor.eliminarVendedor);

//CLIENTES
router.get('/buscarClientes', controllers.Usuario.seguridad, controllers.Cliente.buscarClientes);
router.get('/buscarCliente', controllers.Usuario.seguridad, controllers.Cliente.buscarCliente);
router.post('/guardarCliente', controllers.Usuario.seguridad, controllers.Cliente.guardarCliente);
router.post('/guardarClienteUsuario', controllers.Cliente.guardarClienteUsuario);
router.post('/modificarCliente', controllers.Usuario.seguridad, controllers.Cliente.modificarCliente);
router.post('/modificarClienteFoto', controllers.Usuario.seguridad, controllers.Cliente.modificarClienteFoto);
router.get('/eliminarCliente', controllers.Usuario.seguridad, controllers.Cliente.eliminarCliente);

//USUARIOS
router.post('/login', controllers.Usuario.iniciarSesion);
router.post('/guardarUsuario', controllers.Usuario.guardarUsuario);
router.post('/modificarUsuario', controllers.Usuario.seguridad, controllers.Usuario.modificarUsuario);
router.get('/eliminarUsuario', controllers.Usuario.seguridad, controllers.Usuario.eliminarUsuario);
router.get('/reestablecerUsuario', controllers.Usuario.seguridad, controllers.Usuario.reestablecerUsuario);
router.get('/buscarUsuarios', controllers.Usuario.seguridad, controllers.Usuario.buscarUsuarios);

router.get('/comprobarExistenciaUsuario', controllers.Usuario.comprobarExistenciaUsuario);
router.get('/buscarUsuario', controllers.Usuario.buscarUsuario);

router.get('/seguridad', controllers.Usuario.seguridad);

module.exports = router;