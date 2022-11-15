const productoRoutes = require('./src/routes/productoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const app = express();
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

const session = require('express-session');
app.set('view engine', 'ejs');

app.use(
    session({
        secret: 'Es un secreto',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', mainRoutes);

app.use('/producto', productoRoutes);

app.use('/usuario', usuarioRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log('Servidor corriendo');
});
