window.addEventListener("load", function () {
  let formulario = document.querySelector("form.validations");

  formulario.addEventListener("submit", function (e) {
    let errores = [];
    let campoNombre = document.querySelector("input#nombre")

    if (campoNombre.value == "") {
      errores.push("Tenes que compeltar el nombre")
    }
    else if (campoNombre.value.length <= 5) {
      errores.push("El nombre debe contener mas de 5 letras")
    }


    let apellido = document.querySelector("input#apellido")
    if (apellido.value == "") {
      errores.push("Debes poner tu apellido")
    }
    else if (apellido.value.length <= 4) {
      errores.push("Tu apellido debe tener 4 carácteres")

    }

    let email = document.querySelector("input#email")
    if (email.value == "") {
      errores.push("Debes poner tu email")
    }


    let password = document.getElementById("password")
    if (password.value == "") {
      errores.push("Debes aclarar una contraseña")
    }
    else if (password.value.length <= 6) {
      errores.push("Tu contraseña debe tener al menos 6 carácteres")
    }

    let image = document.getElementById("image")
    if (image.value == "") {
      errores.push("Debes subir una imagen")
    }

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
    }
    if (errores.length > 0) {
      console.log(errores)
      e.preventDefault();
      let ulErrores = document.querySelector("div.ulErrores ul");
      console.log(ulErrores)
      errores.forEach(e => {
        ulErrores.innerHTML += '<li class= "alert alert-danger mb-2 lix">' + e + '</li>'
      });
    }

  })
})


