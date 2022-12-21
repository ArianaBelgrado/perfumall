const cardContainer = document.querySelector(".container-carrito");

const drawCart = (product) => {
    cardContainer.innerHTML += `
    <div class="card mb-3 container-carrito" style="max-width: 540px">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
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
                                
                            </div>
                        </div>
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
