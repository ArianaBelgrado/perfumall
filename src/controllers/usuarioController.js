const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const  DataTypes  = require("sequelize");

const controlador = {
  login: (req, res) => {
    res.render("login");
  },

  loginProcess: (req, res) => {
    db.User.findAll()
      .then((result) => console.log(result))
      .catch((err) => console.log({ Error: err }));

    /* db.User.findOne({
      where: {
        email: req.body.mail,
      },
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err)); */

    /*  if (userToLogin) {
      let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);

      if (passwordOk) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        return res.redirect("/");
      }

      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("login", {
      errors: {
        email: {
          msg: "No se encuentra registrado este email",
        },
      },
    }); */
  },

  profile: (req, res) => {
    return res.render("profile", { user: req.session.userLogged });
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },

  editar: (req, res) => {
    res.render("editar-perfil", { user: req.session.userLogged });
    res.redirect("/");
  },

  create: (req, res) => {
    res.render("crear");
  },

  store: (req, res) => {
    db.User.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.mail,
      password: bcryptjs.hashSync(req.body.password, 10),
      ciudad: req.body.ciudad,
      provincia: req.body.provincia,
      imagenPerfil: req.file.filename,
    }).then((r) => console.log(r));

    /* const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("crear", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      db.User.findOne({
        where: {
          email: req.body.mail,
        },
      })
        .then((result) => {
          if (result) {
            return res.render("crear", {
              errors: { mail: { msg: "Este mail ya fue registrado" } },
              oldData: req.body,
            });
          }
        })
        .then((result) => {
          db.User.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.mail,
            password: bcryptjs.hashSync(req.body.password, 10),
            ciudad: req.body.ciudad,
            provincia: req.body.provincia,
            imagenPerfil: req.file.filename,
          });
        })
        .then((result) => {
          res.redirect("/usuario/login");
        })
        .catch((err) => console.log(err));
    } */
  },

  change: (req, res) => {
    let idUsuario = req.params.id;
    let userFound = User.findByPk(idUsuario).then((result) => (userFound = result));

    res.render("editar-perfil", { usuario: userFound });
  },

  update: (req, res) => {
    let idUsuario = req.params.id;
    let userFound = User.findByPk(idUsuario).then((result) => (userFound = result));

    res.redirect("/usuario/profile");
  },

  borrar: (req, res) => {
    let id = req.params.id;

    User.destroy({
      where: {
        id: id,
      },
    });

    res.redirect("/");
  },
};
module.exports = controlador;
