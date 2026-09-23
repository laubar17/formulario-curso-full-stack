const boton = document.getElementById('alto_contraste');

boton.addEventListener('click', () => {
  document.body.classList.toggle('efecto-invertido');
});

const form = document.querySelector("form");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("mail");
const fecha = document.getElementById("fecha");
const pais = document.getElementById("pais");

const nombreError = document.querySelector("#nombre + span.error");
const apellidoError = document.querySelector("#apellido + span.error");
const emailError = document.querySelector("#mail + span.error");
const fechaError = document.querySelector("#fecha + span.error");
const paisError = document.querySelector("#pais + span.error");


// Función para mostrar/quitar errores
function validarCampo(input, error) {

    // Primero validaciones HTML
    if (!input.validity.valid) {

        if (input.validity.valueMissing) {
            error.textContent = "Este campo es obligatorio.";

        } else if (input.validity.typeMismatch) {
            error.textContent =
                "Debes introducir una dirección de correo electrónico.";

        } else if (input.validity.rangeOverflow) {
            error.textContent =
                "La fecha debe ser anterior a 2027.";

        } else if (input.validity.tooShort) {
            error.textContent =
                `Debe tener al menos ${input.minLength} caracteres.`;

        } else if (input.validity.patternMismatch) {
            error.textContent =
                "El formato introducido no es válido.";
        }

        error.className = "error active";
        return false;
    }


    // Validación de nombre, apellido y país
    if (
        input === nombre ||
        input === apellido ||
        input === pais
    ) {

        const valor = input.value;

        // No puede comenzar con espacio
        if (/^\s/.test(valor)) {
            error.textContent =
                "No puede comenzar con un espacio.";

            error.className = "error active";
            return false;
        }

        // No puede terminar con espacio
        if (/\s$/.test(valor)) {
            error.textContent =
                "No puede terminar con un espacio.";

            error.className = "error active";
            return false;
        }

        // Solo letras, espacios, acentos y ñ
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/.test(valor)) {
            error.textContent =
                "Solo se permiten letras y espacios.";

            error.className = "error active";
            return false;
        }
    }


    // Si llegó hasta acá, el campo es válido
    error.textContent = "";
    error.className = "error";

    return true;
}


// Validar mientras el usuario escribe
nombre.addEventListener("input", () => {
    validarCampo(nombre, nombreError);
});

apellido.addEventListener("input", () => {
    validarCampo(apellido, apellidoError);
});

email.addEventListener("input", () => {
    validarCampo(email, emailError);
});

fecha.addEventListener("input", () => {
    validarCampo(fecha, fechaError);
});

pais.addEventListener("input", () => {
    validarCampo(pais, paisError);
});


// Validar al enviar el formulario
form.addEventListener("submit", (event) => {

    const nombreValido = validarCampo(nombre, nombreError);
    const apellidoValido = validarCampo(apellido, apellidoError);
    const emailValido = validarCampo(email, emailError);
    const fechaValida = validarCampo(fecha, fechaError);
    const paisValido = validarCampo(pais, paisError);

    if (
        !nombreValido ||
        !apellidoValido ||
        !emailValido ||
        !fechaValida ||
        !paisValido
    ) {
        event.preventDefault();
    }
});