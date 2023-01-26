let formulario = document.querySelector("form.validations");

let errores;
let ulErrores = document.querySelector("div.ulErrores ul");
const validar = (campo) => {
    if (!errores.includes(campo)) {
        errores.push(campo);
    }
};

formulario.addEventListener("submit", function (e) {
    errores = [];
    ulErrores.innerHTML = "";
    let campoNombre = document.querySelector("input#nombre").value;

    if (campoNombre == "" || campoNombre.length <= 2)
        validar("El nombre debe contener 3 o mas letras");

    let apellido = document.querySelector("input#apellido").value;
    if (apellido == "" || apellido.length <= 2)
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

        erroresA.forEach((e) => {
            ulErrores.innerHTML += `<li class= "alert alert-danger mb-2 lix"> ${e}</li>`;
        });
    }
});
