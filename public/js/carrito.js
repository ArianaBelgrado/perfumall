const mainContainer = document.querySelector(".total");
const cardContainer = document.querySelector(".container-carrito");

const drawCart = (product) => {
    cardContainer.innerHTML += `
    <div class="card mb-3 container-carrito clase border-0 rounded" style="width: 620px ">
                    <div class="row g-0 juansito" id="d">
                        <div class="col-md-4">
                            <img 
                                src="${product.img}"
                                class="img-fluid rounded-start"
                                style="height:260px"
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title m-2"> Modelo: ${product.modelo
        }</h4>
                                <h5 class="card-title m-2"> Precio: $ ${product.precio
        }</h5>
                                <h6 class="card-text m-2">
                                ${product.descripcion}
                                </h6>
                                <h6 class="card-text m-2">Marca: 
                                ${product.marca}
                                </h6>
                                <h6 class="card-text mx-2"> Precio total por cantidad:  $
                                ${product.precio * product.count}
                                </h6>
                                <h6 class="card-text mx-2"> Cantidad:  <button id="${product.modelo
        }" class="botonResta rounded m-3 p-2"> - </button> ${product.count
        } <button id="${product.modelo
        }" class="botonSuma rounded m-3 p-2"> + </button>  </h6>
                            </div>
                        </div>
                      
                    
                    </div>
                </div>
                `;
    mainContainer.innerHTML = `
         <h2>Total$: ${productsTotal} </h2>
        `;
};

let productsTotal = 0;

const updateShoppingCartHTML = (productos) => {
    if (productos.length > 0) {
        productos.forEach((product) => {
            productsTotal += product.precio * product.count;

            drawCart(product);
        });
        // actualizarTotal(productos)
    }
};

let productos = JSON.parse(localStorage.getItem("cart"));
updateShoppingCartHTML(productos);

const btnSuma = document.querySelectorAll(".botonSuma");
const btnResta = document.querySelectorAll(".botonResta");

btnSuma.forEach((btnSuma) => {
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
btnResta.forEach((btnResta) => {
    btnResta.addEventListener("click", (e) => {
        productos.forEach((product) => {
            let id = e.target.id;
            if (product.modelo == id) {
                if (product.count <= 0) {
                    return 0;
                }
                product.count--;

                let filtrado = productos.filter(
                    (producto) => producto.count !== 0
                );

                localStorage.setItem("cart", JSON.stringify(filtrado));
                let newProducts = JSON.parse(localStorage.getItem("cart"));
                console.log(JSON.parse(localStorage.getItem("cart")));
                updateShoppingCartHTML(newProducts);
                location.reload();
            }
        });
    });
});
