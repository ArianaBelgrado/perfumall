const db = require("../database/models");

let controller = {
  carrito: (req, res) => {
    res.render(path.resolve("views/carrito"));
  },

  home: (req, res) => {
    let productos;

    db.Producto.findAll()
      .then((result) => (productos = result))
      .then((productos) => res.render("home", { productos }));
  },

  detalle: (req, res) => {
    let productFound;

    db.Producto.findByPk(req.params.id)
      .then((result) => (productFound = result))
      .then((result) => res.render("detalle", { productFound }))
      .catch((e) => res.send(e));
  },
  nuevoProducto: (req, res) => {
    res.render("crear-producto");
  },

  store: (req, res) => {
    db.Producto.create({
      nombre: req.body.nombre,
      precio: req.body.precio,
      modelo: req.body.modelo,
      fecha_creacion: req.body.fecha_creacion,
      fecha_baja: req.body.fecha_baja,
      descuento: req.body.descuento,
      imagen: req.file.filename,
      marca_id: req.body.marca,
      estado: req.body.estado,
      descripcion: req.body.descripcion,
    })

      .then(function (result) {
        if (result) {
          res.redirect("/");
        } else {
          res.send("Tu producto es malaso");
        }
      })


      .catch((e) => res.send(e));
  },

  renderizarEditarProducto: (req, res) => {
    let idProduct = req.params.id;

    db.Producto.findByPk(idProduct)
      .then((result) => res.render("editar-producto", { result }))
      .catch((e) => res.send(e));
  },

  editar: (req, res) => {
    let idProduct = req.params.id;

    db.Producto.update(
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
    db.Producto.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => res.redirect("/"))

  },


  borrar: (req, res) => {
    id = req.params.id;
    db.Producto.destroy({
      where: {
        id: id,
      },
    }).then(function (result) {
      if (result) {
        res.redirect("/");
      } else {
        res.send("Tu producto fue borrado!");
      }
    });
  },
};

module.exports = controller;
