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
                                <p class="card-text"> $
                                ${product.precio * product.count}
                                </p>
                                <p> Cantidad: ${product.count} </p>
                            </div>
                        </div>
                        <button id="${product.modelo}" class="botonSuma"> + </button>
                        <button id="${product.modelo}" class="botonResta"> - </button>
                    
                    </div>
                </div>`;
};

const updateShoppingCartHTML = (productos) => {
    console.log(productos);
    if (productos.length > 0) {
        productos.forEach((product) => {
            drawCart(product);
        });
    }
};

let productos = JSON.parse(localStorage.getItem("cart"));
updateShoppingCartHTML(productos);

const btnSuma = document.querySelectorAll(".botonSuma");
const btnResta = document.querySelectorAll(".botonResta");

btnSuma.forEach(btnSuma => {
    btnSuma.addEventListener("click", (e) => {
        productos.forEach((product) => {
            let id = e.target.id;
            if (product.modelo == id) {
                product.count++;
                localStorage.setItem("cart", JSON.stringify(productos));
                let newProducts = JSON.parse(localStorage.getItem("cart"));
                console.log(JSON.parse(localStorage.getItem("cart")));
                updateShoppingCartHTML(newProducts);
                location.reload();
            }
        });
    });
});
btnResta.forEach(btnResta => {
    btnResta.addEventListener("click", (e) => {
        productos.forEach((product) => {
            let id = e.target.id;
            if (product.modelo == id) {
                if (product.count <= 0) {
                    return 0
                }
                product.count--;

                let filtrado = productos.filter(producto =>
                    producto.count !== 0
                )

                localStorage.setItem("cart", JSON.stringify(filtrado));
                let newProducts = JSON.parse(localStorage.getItem("cart"));
                console.log(JSON.parse(localStorage.getItem("cart")));
                updateShoppingCartHTML(newProducts);
                location.reload();
            }
        });
    });
});




