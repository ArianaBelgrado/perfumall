const productoRoutes = require("./src/routes/productoRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const mainRoutes = require("./src/routes/mainRoutes");
const methodOverride = require("method-override");
const express = require("express");
const path = require("path");
const mercadopago = require("mercadopago");
const flash = require("connect-flash");
const app = express();

const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");
const isAdmin = require("./src/middlewares/isAdmin");

mercadopago.configure({
    access_token:
        "TEST-5397122799407856-122700-bb5356165e973e75dc1b49d8c7076ef6-138345962",
});

const session = require("express-session");
app.set("view engine", "ejs");

app.use(
    session({
        secret: "Es un secreto",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash())
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(isAdmin);

app.use("/", mainRoutes);

app.use("/producto", productoRoutes);

app.use("/usuario", usuarioRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("Servidor corriendo");
});
