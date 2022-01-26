// Inputs verificables

let tree_formApp = new OCNodeValidation();

let input_name = document.querySelector("#appname");
let input_autor = document.querySelector("#appauthor");
let input_logo = document.querySelector("#applogo");
let input_mirror = document.querySelector("#appmirror");
let input_description = document.querySelector("#appdescription");
let tagSection = document.querySelector("#tagsection");

let node_input_name = new OCNodeValidation_input(input_name);
let node_input_autor = new OCNodeValidation_input(input_autor);
let node_input_mirror = new OCNodeValidation_input(input_mirror);
let node_input_description = new OCNodeValidation_input(input_description);

// Creación del arbol de verificación

tree_formApp.children = [
  node_input_name,
  node_input_autor,
  node_input_mirror,
  node_input_description,
];

// Tags y mirror data

let iTag = 1;
let TAGS = {};

function checkValues() {
  node_input_name.children = [
    new OCNodeValidation_len(2, 50, input_name.value),
    new OCNodeValidation_emptiness(input_name.value),
  ];

  node_input_autor.children = [
    new OCNodeValidation_len(1, 50, input_autor.value),
    new OCNodeValidation_emptiness(input_autor.value),
  ];

  node_input_mirror.children = [
    new OCNodeValidation_len(6, 200, input_mirror.value),
    new OCNodeValidation_emptiness(input_mirror.value),
  ];

  node_input_description.children = [
    new OCNodeValidation_len(1, 250, input_description.value),
    new OCNodeValidation_emptiness(input_description.value),
  ];
}

btn_formLogin.addEventListener("click", () => {
  checkValues(); // Collect values from form;

  let response = tree_formApp.isValid();
  let errorSection = document.querySelector("#error-section");
  errorSection.innerHTML = "";
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
      appname: input_name.value,
      appautor: input_autor.value,
      appmirror: input_mirror.value,
      appdescription: input_description.value,
      apptags: TAGS,
    };

    // Reiniciar estilos de los input

    input_name.classList.remove("border-danger");
    input_name.value = "";
    input_autor.classList.remove("border-danger");
    input_autor.value = "";
    input_mirror.classList.remove("border-danger");
    input_mirror.value = "";
    input_description.classList.remove("border-danger");
    input_description.value = "";
    tagSection.innerHTML = "";

    // Peticion asincrona al servidor

    fetch("/uploadAppPetition", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form_data),
    })
      .then(function (response) {
        if (response.status == 200) {
          TAGS = {};
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
          statusMessage.innerHTML =
            "¡Petición de publicación enviada con exito!";
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
            "Hubo un error al enviar la petición. Por favor, intentelo de nuevo mas tarde.";
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

let tagField = document.querySelector("#apptags");
tagField.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    // 13 -> Código de la tecla ESPACIO

    if (tagField.value.charAt(tagField.value.length - 1) === ",") {
      // Obtener el tag

      let newTag = tagField.value.slice(0, tagField.value.length - 1);
      TAGS[iTag] = newTag;

      // Resetear el estado del tagInput
      tagField.value = "";

      // Renderizar el tag en la tagSection

      let newTagRender = document.createElement("span");
      let newTagRenderX = document.createElement("span");

      newTagRender.id = `tag_${iTag}`;
      newTagRender.classList.add(
        "tag",
        "bg-primary",
        "p-1",
        "text-light",
        "border"
      );
      newTagRender.innerHTML = newTag;

      newTagRenderX.id = `xtag_${iTag}`;
      newTagRenderX.classList.add("xtag", "mx-2", "text-danger");
      newTagRenderX.innerHTML = "x";
      newTagRenderX.addEventListener("click", () => {
        let tagToDelete = document.querySelector(
          `#${newTagRenderX.id.slice(1)}`
        );
        delete TAGS[
          parseInt(newTagRenderX.id.slice(5, newTagRenderX.id.length))
        ];
        console.log(tagToDelete);
        tagSection.removeChild(tagToDelete);
        console.log("ITEM REMOVIDO");
        console.log(TAGS);
      });

      newTagRender.appendChild(newTagRenderX);
      tagSection.appendChild(newTagRender);
      iTag++;

      console.log("ITEM AÑADIDO");
      console.log(TAGS);
    }
  }
});
