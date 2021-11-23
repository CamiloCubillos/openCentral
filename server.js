const express = require("express");
const app = express();
const bp = require("body-parser");
const bdGestor = require("mysql");

// BD config

let bdConfig = {
  host: "localhost",
  database: "bgu8bsc5k7tcemc6ycq7",
  user: "root",
  password: "Marioloco456",
};

// Middlewares

app.use(express.static("public"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  //Main route
  res.sendFile(__dirname + "/Public/index.html");
});

app.get("/searchresults", (req, res) => {
  res.sendFile(__dirname + "/Public/searchresults.html");
});

// Generate random data. BE CAREFUL AND REQUEST THIS ROUTE ONLY WHEN IT IS NECESSARY

app.get("/sdadasdasdas", (req, res) => {
  let bdConnection = bdGestor.createConnection(bdConfig);

  bdConnection.connect((error) => {
    if (error) {
      bdConnection.end();
      res.end();
      throw error;
    }
  });

  console.log("Iniciando insercion de datos");

  for (let i = 0; i < 105; i++) {
    bdConnection.query(
      `INSERT INTO \`apps\` VALUES(NULL,'TESTING-NAME','TESTING-AUTOR','TESTING-DESCRIPTION',5,'TESTING-IMAGE','TESTING-KEYWORDS','TESTING-MIRRORS','TESTING-VERSION')`,
      (error, result) => {
        if (error) {
          bdConnection.end();
          res.end();
          throw error;
        } else {
          console.log("Query ejecutado");
        }
      }
    );
  }

  console.log("Inserción de datos terminada");

  bdConnection.end();
  res.end();
});

// Retrieve all related to search's keywords apps from BD

app.post("/getApps", (req, res) => {
  let keywords = req.body.keywords;
  console.log(keywords);
  let bdConnection = bdGestor.createConnection(bdConfig);

  bdConnection.connect((error) => {
    if (error) {
      bdConnection.end();
      res.end();
      throw error;
    }
  });

  bdConnection.query(
    `SELECT * FROM \`apps\` WHERE nombre LIKE '%${keywords}%' OR autor LIKE '%${keywords}%' OR descripcion LIKE '%${keywords}%' OR keywords LIKE '%${keywords}%'`,
    (error, result) => {
      if (error) {
        bdConnection.end();
        res.end();
        throw error;
      } else {
        res.send(JSON.stringify(result));
      }
    }
  );

  bdConnection.end();
});

//404 route (SIEMPRE MANTENER ESTA RUTA COMO LA ULTIMA EN CONSULTAR)
app.get("*", function (req, res) {
  res.status(404).sendFile(__dirname + "/Public/404.html");
});

// Server listening

app.listen(8080, () => {
  console.log(`Servidor iniciado en: http://localhost:8080`);
});
