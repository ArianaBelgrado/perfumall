window.addEventListener("load", function () {
    let productoForm = document.querySelector(".crearProducto")


    productoForm.addEventListener("submit", function (event) {
        let errores = [];
        let modelo = document.getElementById("modelo");
        if (modelo.value == "") {
            errores.push("Tenes que completar el modelo")
        } else if (modelo.value.length < 4) {
            errores.push("El modelo debe tener mas de cuatro caractéres");
        };
        let descripcion = document.getElementById("descripcion");
        if (descripcion.value == "") {
            errores.push("Necesitas completar la descripcion")
        } else if (descripcion.value.length < 4) {
            errores.push("La descripcion debe tener mas de cuatro caractéres");
        };
        let precio = document.getElementById("precio", function () {
            if (precio.value <= 0) {
                errores.push("Debes asignar un precio")
            };
        });
        let stock = document.getElementById("stock", function () {
            if (stock.value == 0) {
                errores.push("Debes tener al menos 1 producto en stock")
            }
        });
        function validateFile() {
            let allowedExtension = ['jpeg', 'jpg'];
            let fileExtension = document.getElementById('image').value.split('.').pop().toLowerCase();
            let isValidFile = false;

            for (var index in allowedExtension) {

                if (fileExtension === allowedExtension[index]) {
                    isValidFile = true;
                    break;
                }
            }

            return isValidFile;
        }
        if (!validateFile()) {
            errores.push("Esto tiene que ser un archivo jpg o jepg")
        };
        if (errores.length > 0) {
            console.log(errores)
            event.preventDefault();
            let ulErrors = document.querySelector("div.ulErrors ul");
            console.log(ulErrors)
            for (let i = 0; i < errores.length; i++) {

                ulErrors.innerHTML += '<li class= "alert alert-danger mb-2 lix">' + errores[i] + '</li>'

            }
            ;
        }

    });
});