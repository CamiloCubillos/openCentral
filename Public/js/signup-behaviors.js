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

function generateRandomString(len) {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += "a";
  }
  return str;
}

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

  let mockupData = generateRandomString(100000000) + "@hotmail.com";
  console.log(mockupData.length);

  node_input_email.children = [
    new OCNodeValidation_email(mockupData),
    new OCNodeValidation_emptiness(mockupData),
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
  var end, start;
  start = new Date();

  checkValues();
  let response = tree_formSignup.isValid();
  if (response.status != true) {
    for (const input of response.errors) {
      for (const error of input.errors) {
        console.log(`Error en ${input.childID}: ${error}`);
      }
    }
  } else {
    console.log("Usuario valido!");
  }

  end = new Date();
  console.log("Operation took " + (end.getTime() - start.getTime()) + " msec");
});
