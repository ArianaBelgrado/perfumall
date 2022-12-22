const cardContainer = document.querySelector(".container-carrito");


const drawCart = (product) => {
    cardContainer.innerHTML += `
    <div class="card mb-3 container-carrito" style="max-width: 540px">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img 
                                src="${product.img}"
                                alt="Trendy Pants and Shoes"
                                class="img-fluid rounded-start"
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.modelo}</h5>
                                <p class="card-text">
                                ${product.descripcion}
                                </p>
                                <p class="card-text">
                                ${product.marca}
                                </p>
                                <p class="card-text">
                                ${product.precio}
                                </p>
                                <p> Cantidad: ${product.count} </p>
                            </div>
                        </div>
                        <button id="${product.modelo}" class="botonSuma"> + </button>
                        <button id="${product.modelo}" class="botonResta"> - </button>
                    
                    </div>
                </div>`;
};

const updateShoppingCartHTML = function () {
    const productos = JSON.parse(localStorage.getItem("cart"));
    productos.forEach((product) => {
        console.log(product);
    });

    if (productos.length > 0) {
        productos.forEach((product) => {
            drawCart(product);
        });
    }
};




updateShoppingCartHTML();

const btnSuma = document.querySelector(".botonSuma")
const btnResta = document.querySelector(".botonResta")


btnSuma.addEventListener("click", (e) => {

    console.log(e.target.id)
    productos.forEach(product => {

        if (product.modelo == e.target.id) {


            product.count++;

            updateShoppingCartHTML()
        }
    });



    productsInCart.push(product)
    console.log(producto.count)
})
