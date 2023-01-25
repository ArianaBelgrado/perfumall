let formulario = document.querySelector("form.validations");

let errores = [];
let arraySinRepetidos;
const validar = (campo) => {
    errores.push(campo);
    console.log(campo);
};

formulario.addEventListener("submit", function (e) {
    let campoNombre = document.querySelector("input#nombre").value;

    if (campoNombre == "" || campoNombre.length <= 3)
        validar("El nombre debe contener 3 o mas letras");

    let apellido = document.querySelector("input#apellido").value;
    if (apellido == "" || apellido.length <= 3)
        validar("El apellido debe contener 3 o mas letras");

    let email = document.querySelector("input#email").value;
    if (email == "") validar("Debes completar el mail");

    let password = document.getElementById("password").value;
    if (password == "" || password.length <= 5)
        validar("Tu contraseña debe tener al menos 6 carácteres");

    let image = document.getElementById("image").value;
    if (image == "") validar("Debes subir una imagen");

    function validateFile() {
        let allowedExtension = ["jpeg", "jpg"];
        let fileExtension = document
            .getElementById("image")
            .value.split(".")
            .pop()
            .toLowerCase();
        let isValidFile = false;

        for (var index in allowedExtension) {
            if (fileExtension === allowedExtension[index]) {
                isValidFile = true;
                break;
            }
        }

        return isValidFile;
    }
    if (!validateFile()) validar("Esto tiene que ser un archivo jpg o jepg");
    erroresToSet = new Set(errores);
    console.log(errores);
    if (errores.length > 0) {
        let erroresA = [...erroresToSet];
        console.log(errores);
        e.preventDefault();
        let ulErrores = document.querySelector("div.ulErrores ul");
        let arrayLi = [];
        let error;
        erroresA.forEach((e) => {
            arrayLi.push(
                `<li class= "alert alert-danger mb-2 lix">' +${e}+ "</li>`
            );
        });
        arrayLi.forEach((e) => {
            ulErrores.append(e);
        });
    }
});
