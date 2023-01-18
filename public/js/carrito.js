const mainContainer = document.querySelector(".total");
const cardContainer = document.querySelector(".container-carrito");



const drawCart = (product) => {




    cardContainer.innerHTML += `
    <div class="card mb-3 container-carrito clase border-0 rounded" style="width: 620px">
                    <div class="row g-0 juansito" id="d">
                        <div class="col-md-4">
                            <img 
                                src="${product.img}"
                                alt="Trendy Pants and Shoes"
                                class="img-fluid rounded-start"
                                style="height:250px"
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title m-1">${product.modelo}</h5>
                                <p class="card-text m-1">
                                ${product.descripcion}
                                </p>
                                <p class="card-text m-1">
                                ${product.marca}
                                </p>
                                <p class="card-text"> $
                                ${product.precio * product.count}
                                </p>
                                <p> Cantidad:  <button id="${product.modelo}" class="botonResta rounded m-3 p-2"> - </button> ${product.count} <button id="${product.modelo}" class="botonSuma rounded m-3 p-2"> + </button>  </p>
                            </div>
                        </div>
                      
                    
                    </div>
                </div>
                `
        ;
    mainContainer.innerHTML = `
         <h2>Total$: ${total} </h2>
        `
};


// let total = []
// function actualizarTotal(productos) {
//     productos.forEach((p) => {
//         total.push(parseInt(p.precio))

//     })
//     total = total.reduce((a, b) => a + b)

// }


let total = [];




const updateShoppingCartHTML = (productos) => {
    console.log(productos);
    if (productos.length > 0) {
        productos.forEach((product) => {
            drawCart(product);



            productsTotal = product.precio * product.count;


            total.push(productsTotal)

        });
        // actualizarTotal(productos)
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




