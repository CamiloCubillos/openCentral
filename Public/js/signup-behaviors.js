let tree_formSignup = new OCNodeValidation();

let input_username = document.querySelector("#username");
let input_email = document.querySelector("#email");
let input_password = document.querySelector("#password");
let input_verifyPassword = document.querySelector("#verifyPassword");
let btn_formSignup = document.querySelector("#btn_formSignup");

let node_input_username = new OCNodeValidation_input(input_username);
let node_input_email = new OCNodeValidation_input(input_email);
let node_input_password = new OCNodeValidation_input(input_password);
let node_input_verifyPassword = new OCNodeValidation_input(
  input_verifyPassword
);

tree_formSignup.children = [
  node_input_username,
  node_input_email,
  node_input_password,
  node_input_verifyPassword,
];

function checkValues() {
  node_input_username.children = [
    new OCNodeValidation_len(6, 20, input_username.value),
    new OCNodeValidation_username(input_username.value),
    new OCNodeValidation_emptiness(input_username.value),
  ];

  node_input_email.children = [
    new OCNodeValidation_email(input_email.value),
    new OCNodeValidation_emptiness(input_email.value),
  ];

  node_input_password.children = [
    new OCNodeValidation_len(8, 100, input_password.value),
    new OCNodeValidation_password(input_password.value),
    new OCNodeValidation_emptiness(input_password.value),
  ];

  node_input_verifyPassword.children = [
    new OCNodeValidation_password(input_password.value),
    new OCNodeValidation_verifyPassword(
      input_password.value,
      input_verifyPassword.value
    ),
    new OCNodeValidation_emptiness(input_verifyPassword.value),
  ];
}

btn_formSignup.addEventListener("click", () => {
  checkValues(); // Collect values from form;

  let errorSection = document.querySelector("#error-section");
  errorSection.innerHTML = "";
  let response = tree_formSignup.isValid();
  if (response.status != true) {
    for (const input of response.errors) {
      for (const error of input.errors) {
        let currInput = document.querySelector(`#${input.childID}`);

        currInput.classList.add("border-danger");

        let errorLine = document.createElement("div");
        let errorMessage = document.createElement("p");
        let errorIcon = document.createElement("i");

        errorLine.classList.add("error-line");
        errorIcon.classList.add(
          "fas",
          "fa-exclamation-circle",
          "mx-3",
          "danger-status"
        );
        errorMessage.innerHTML = `${
          input.childID.charAt(0).toUpperCase() + input.childID.slice(1)
        }: ${error}`;
        errorMessage.classList.add("d-inline");

        errorLine.appendChild(errorIcon);
        errorLine.appendChild(errorMessage);

        errorSection.appendChild(errorLine);
      }
    }
  } else {
    // Guardar data de los inputs
    let form_data = {
      username: input_username.value,
      email: input_email.value,
      password: input_password.value,
    };

    // Reiniciar estilos de los input

    input_username.classList.remove("border-danger");
    input_username.value = "";
    input_email.classList.remove("border-danger");
    input_email.value = "";
    input_password.classList.remove("border-danger");
    input_password.value = "";
    input_verifyPassword.classList.remove("border-danger");
    input_verifyPassword.value = "";

    // Peticion asincrona al servidor

    fetch("/signupUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form_data),
    })
      .then(function (response) {
        if (response.status == 200) {
          let statusSection = document.querySelector("#error-section");
          let statusLine = document.createElement("div");
          let statusMessage = document.createElement("p");
          let statusIcon = document.createElement("i");

          statusLine.classList.add("error-line");
          statusIcon.classList.add(
            "fas",
            "fa-exclamation-circle",
            "mx-3",
            "success-status"
          );
          statusMessage.innerHTML = "¡Usuario registrado con exito!";
          statusMessage.classList.add("d-inline");

          statusLine.appendChild(statusIcon);
          statusLine.appendChild(statusMessage);

          statusSection.appendChild(statusLine);
        } else {
          let statusSection = document.querySelector("#error-section");
          let statusLine = document.createElement("div");
          let statusMessage = document.createElement("p");
          let statusIcon = document.createElement("i");

          statusLine.classList.add("error-line");
          statusIcon.classList.add(
            "fas",
            "fa-exclamation-circle",
            "mx-3",
            "danger-status"
          );
          statusMessage.innerHTML =
            "Hubo un error al registrar el usuario. Intentelo de nuevo más tarde.";
          statusMessage.classList.add("d-inline");

          statusLine.appendChild(statusIcon);
          statusLine.appendChild(statusMessage);

          statusSection.appendChild(statusLine);
        }
      })
      .catch(function (error) {
        throw error;
      });
  }
});
