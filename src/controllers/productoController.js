
const Producto = require("../database/models/Producto");

let controlador = {
  carrito: (req, res) => {
    res.render(path.resolve("views/carrito"));
  },

  home: (req, res) => {
    let productos;

    Producto.findAll().then((result) => {
      productos = result;
    });

    res.render("home", { productos });
  },

  detalle: (req, res) => {
    let productFound;

    Producto.findByPk(req.params.id).then((resultado) => {
      productFound = resultado;
    });

    res.render("detalle", { productFound });
  },

  nuevoProducto: (req, res) => {
    res.render("crear-producto");
  },

  store: (req, res) => {
    Producto.create({
      nombre: req.body.nombre,
      precio: req.body.precio,
      fecha_creacion: req.body,
      fecha_baja: req.body,
      imagen: req.file.filename,
      marca_id: req.body.marca,
      descripcion: req.body.descripcion,
    });
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

    Producto.update(
      {
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.file.filename,
        marca_id: req.body.marca,
        descripcion: req.body.descripcion,
      },
      {
        where: {
          id: idProduct,
        },
      }
    );

    res.redirect("/");
  },

  borrar: (req, res) => {
    Producto.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/");
  },
};

module.exports = controlador;
