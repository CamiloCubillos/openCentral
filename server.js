const express = require("express");
const app = express();
const bp = require("body-parser");

// Middlewares

app.use(express.static("public"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  //Main route
  res.sendFile(__dirname + "/Public/index.html");
});

//404 route (SIEMPRE MANTENER ESTA RUTA COMO LA ULTIMA EN CONSULTAR)
app.get("*", function (req, res) {
  res.status(404).sendFile(__dirname + "/Public/404.html");
});

// Server listening

app.listen(8080, () => {
  console.log(`Servidor iniciado en: http://localhost:8080`);
});
