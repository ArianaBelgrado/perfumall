const addToCartBtn = document.querySelector(".addToCart");
let modeloProducto = document.querySelector(".modelo").innerText;
let marcaProducto = document.querySelector(".marca").innerText;
let precioProducto = document.querySelector(".precio").innerText;
let descripcionProducto = document.querySelector(".descripcion").innerText;
let imgProducto = document.querySelector("img").src;
let precioNuevo = precioProducto.split("$")[1];

//let productsInCart = JSON.parse(localStorage.getItem("cart"));
// productsInCart ? productsInCart : (productsInCart = []);
let producto = {
    modelo: modeloProducto,
    marca: marcaProducto,
    precio: precioNuevo,
    descripcion: descripcionProducto,
    img: imgProducto,
};
let productsInCart = JSON.parse(localStorage.getItem("cart"));
productsInCart ? productsInCart : (productsInCart = []);

addToCartBtn.addEventListener("click", (e) => {
    let id = e.target.id;
    let productCoincide = false;
    let productoEncontrado;

    productsInCart.forEach((p) => {
        if (p.modelo == id) {
            productCoincide = true;
            productoEncontrado = p;
        }
    });
    console.log(productCoincide);

    if (productCoincide) {
        productoEncontrado.count++;

        let arrayNuevo = productsInCart.filter((p) => p != productoEncontrado);

        arrayNuevo.push(productoEncontrado);
        localStorage.setItem("cart", JSON.stringify(productsInCart));

        console.log("count count");
    } else {
        producto.count = 1;
        productsInCart.push(producto);
        localStorage.setItem("cart", JSON.stringify(productsInCart));
    }
});
