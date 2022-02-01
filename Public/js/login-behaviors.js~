let tree_formLogin = new OCNodeValidation();

let input_username = document.querySelector("#username");
let input_password = document.querySelector("#password");
let btn_formSignup = document.querySelector("#btn_formLogin");

let node_input_username = new OCNodeValidation_input(input_username);
let node_input_password = new OCNodeValidation_input(input_password);

tree_formLogin.children = [node_input_username, node_input_password];

function checkValues() {
  node_input_username.children = [
    new OCNodeValidation_len(6, 20, input_username.value),
    new OCNodeValidation_username(input_username.value),
    new OCNodeValidation_emptiness(input_username.value),
  ];

  node_input_password.children = [
    new OCNodeValidation_len(8, 100, input_password.value),
    new OCNodeValidation_password(input_password.value),
    new OCNodeValidation_emptiness(input_password.value),
  ];
}

btn_formLogin.addEventListener("click", () => {
  checkValues(); // Collect values from form;

  let response = tree_formLogin.isValid();
  if (response.status != true) {
    for (const input of response.errors) {
      for (const error of input.errors) {
        console.log(error);
      }
    }
  } else {
    // Guardar data de los inputs
    let form_data = {
      username: input_username.value,
      password: input_password.value,
    };

    // Reiniciar estilos de los input

    input_username.classList.remove("border-danger");
    input_username.value = "";
    input_password.classList.remove("border-danger");
    input_password.value = "";

    // Peticion asincrona al servidor

    fetch("/loginUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form_data),
    })
      .then(function (response) {
        if (response.status == 200) {
          window.location.href = "/searchresults";
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
          statusMessage.innerHTML = "Usuario o contraseñas incorrectos";
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
