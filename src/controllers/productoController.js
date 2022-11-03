let path = require("path");
let fs = require("fs");

const productosFilePath = path.join(
  __dirname,
  "../database/productos-json/catalogo.json"
);
let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

let controlador = {
  carrito: (req, res) => {
    res.render(path.resolve("views/carrito"));
  },

  home: (req, res) => {
    res.render("views/home", { productos: productos });
  },

  detalle: (req, res) => {
    let id = req.params.id;
    let producto;
    productos.forEach((p) => {
      if (p.id == id) {
        producto = p;
      }
    });
    res.render("detalle", { producto });
  },

  nuevoProducto: (req, res) => {
    res.render("crear-producto");
  },
  store: (req, res) => {
    let objet = {
      id: productos[productos.length - 1].id + 1,
      //img: req.file.filename,
      marca: req.body.marca,
      modelo: req.body.modelo,
      descuento: req.body.descuento,
      precio: req.body.precio,
      medida: req.body.medida,
      descripcion: req.body.descripcion,
      estado: req.body.estado,
    };
    productos.push(objet);
    fs.writeFileSync(productosFilePath, JSON.stringify(productos, " ", null));
    res.redirect("/producto/crear-producto");
  },
  renderizarEditarProducto: (req, res) => {
    let idProduct = req.params.id;

    let product;

    productos.forEach((p) => {
      if (idProduct == p.id) {
        product = p;
      }
    });
    res.render("editar-producto", { product });
  },

  editar: (req, res) => {
    let idProduct = req.params.id;

    let asd = {
      id: req.params.id,
      marca: req.body.marca,
      modelo: req.body.modelo,
      descuento: req.body.descuento,
      precio: req.body.precio,
      medida: req.body.medida,
    };
    console.log(asd);
    productos.forEach((p) => {
      if (p.id == idProduct) {
        p.marca = req.body.marca;
        p.modelo = req.body.modelo;
        p.descuento = req.body.descuento;
        p.precio = req.body.precio;
        p.medida = req.body.medida;
        p.descripcion = req.body.descripcion;
        p.estado = req.body.estado;
      }
    });

    fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
    res.redirect("/");
  },

  borrar: (req, res) => {
    let id = req.params.id;

    productosNuevos = productos.filter((p) => {
      return p.id != id;
    });

    fs.writeFileSync(
      productosFilePath,
      JSON.stringify(productosNuevos, null, " ")
    );
    res.redirect("/");
  },
};

module.exports = controlador;
