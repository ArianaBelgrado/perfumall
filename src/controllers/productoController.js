let path = require("path");
let fs = require("fs");
const producto = require("../database/models/producto");

const productosFilePath = path.join(__dirname, "../database/models/producto .js");
let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

let controlador = {
  carrito: (req, res) => {
    res.render(path.resolve("views/carrito"));
  },

  home: (req, res) => {
    let productos;
    let productFound;

    Producto.findByPk(req.params.id).then((resultado) => {
      productFound = resultado;
    })

    // let id = req.params.id;
    // let producto;
    // productos.forEach((p) => {
    //   if (p.id == id) {
    //     producto = p;
    //   }
    // });

    res.render("detalle", { productFound });
  },

  nuevoProducto: (req, res) => {
    res.render("crear-producto");
  },

  store: (req, res) => {

    Producto.create({
      nombre: req.body.nombre,
      precio: req.body.precio,
      fecha_creacion: req.body ,
      fecha_baja: req.body , 
      imagen: req.file.filename,
      marca_id: req.body.marca,
      descripcion: req.body.descripcion
    })

  }, 
  renderizarEditarProducto: (req, res) => {

    let idProduct = req.params.id;

    let product;

    Producto.findByPk(idProduct).then((resultado) => {
      product = resultado;
    });

    res.render("editar-producto", { product });
  },

  editar: (req, res) => {
     let idProduct = req.params.id;

     Producto.update({
      nombre: req.body.nombre,
      precio: req.body.precio, 
      imagen: req.file.filename,
      marca_id: req.body.marca,
      descripcion: req.body.descripcion
     },{
      where: {
        id: idProduct
      }
     })

    // let asd = {
    //   id: req.params.id,
    //   marca: req.body.marca,
    //   modelo: req.body.modelo,
    //   descuento: req.body.descuento,
    //   precio: req.body.precio,
    //   medida: req.body.medida,
    // };

    // productos.forEach((p) => {
    //   if (p.id == idProduct) {
    //     p.marca = req.body.marca;
    //     p.modelo = req.body.modelo;
    //     p.descuento = req.body.descuento;
    //     p.precio = req.body.precio;
    //     p.medida = req.body.medida;
    //     p.descripcion = req.body.descripcion;
    //     p.estado = req.body.estado;
    //   }
    // });

    // fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
    res.redirect("/");
  },

  borrar: (req, res) => {

    Producto.destroy ({
      where: {
        id : req.params.id
      }
    })

    // let id = req.params.id;

    // productosNuevos = productos.filter((p) => {
    //   return p.id != id;
    // });

    // fs.writeFileSync(
    //   productosFilePath,
    //   JSON.stringify(productosNuevos, null, " ")
    // );
    res.redirect("/");
  },
};

module.exports = controlador;


