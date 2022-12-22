const addToCartBtn = document.getElementById("addToCart");
let modeloProducto = document.querySelector(".modelo").innerText;
let marcaProducto = document.querySelector(".marca").innerText;
let precioProducto = document.querySelector(".precio").innerText;
let descripcionProducto = document.querySelector(".descripcion").innerText;
let imgProducto = document.querySelector("img").src;
let producto = {
    modelo: modeloProducto,
    marca: marcaProducto,
    precio: precioProducto,
    descripcion: precioProducto,
    img: imgProducto,
};

let productsInCart = JSON.parse(localStorage.getItem("cart"));

productsInCart ? productsInCart : productsInCart = [];

addToCartBtn.addEventListener("click", () => {
    console.log(productsInCart);
    productsInCart.push(producto);
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    console.log(productsInCart);
});

/*
// Create an array to store the items in the cart
let cart = [];

// Define an object constructor for the items in the cart
function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
}

// Define a function to add an item to the cart
function addItemToCart(name, price, count) {
    for (let i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            return;
        }
    }
    let item = new Item(name, price, count);
    cart.push(item);
}

// Define a function to remove an item from the cart
function removeItemFromCart(name) {
    for (let i in cart) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
}

// Define a function to clear the cart
function clearCart() {
    cart = [];
}

// Define a function to calculate the total cost of the items in the cart
function calculateTotal() {
    let total = 0;
    for (let i in cart) {
        total += cart[i].price * cart[i].count;
    }
    return total.toFixed(2);
}

// Define a function to list the items in the cart
function listCart() {
    let cartCopy = [];
    for (let i in cart) {
        let item = cart[i];
        let itemCopy = {};
        for (let p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}
*/
