const Producto = require("../database/models/Producto");

let controller = {
  carrito: (req, res) => {
    res.render(path.resolve("views/carrito"));
  },

  home: (req, res) => {
    let productos;

    Producto.findAll()
      .then((result) => (productos = result))
      .then((result) => res.render("home", { productos }));
  },

  detalle: (req, res) => {
    let productFound;

    Producto.findByPk(req.params.id)
      .then((result) => (productFound = result))
      .then((result) => res.render("detalle", { productFound }))
      .catch((e) => res.send(e));
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
    })
      .then((result) => res.redirect("/"))
      .catch((e) => res.send(e));
  },

  renderizarEditarProducto: (req, res) => {
    let idProduct = req.params.id;

    Producto.findByPk(idProduct)
      .then((result) => res.render("editar-producto", { result }))
      .catch((e) => res.send(e));
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
    )
      .then((result) => res.redirect("/"))
      .then((e) => res.send(e));
  },

  borrar: (req, res) => {
    Producto.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => res.redirect("/"))
      .then((e) => res.send(e));
  },
};

module.exports = controller;
