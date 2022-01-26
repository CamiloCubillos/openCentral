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

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/Public/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/Public/signup.html");
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

// Signup users

app.post("/signupUser", (req, res) => {
  let bdConnection = bdGestor.createConnection(bdConfig);

  bdConnection.connect((error) => {
    if (error) {
      bdConnection.end();
      res.end();
      throw error;
    }
  });

  bdConnection.query(
    `INSERT INTO \`usuarios\` VALUES(NULL,"${req.body.username}","${req.body.username}","${req.body.email}",0,"${req.body.password}","")`,
    (error) => {
      if (error) {
        bdConnection.end();
        res.sendStatus(500);
        res.end();
        throw error;
      } else {
        res.sendStatus(200);
      }
    }
  );

  bdConnection.end();
});

// Login users

app.post("/loginUser", (req, res) => {
  console.log(req.body);
  let bdConnection = bdGestor.createConnection(bdConfig);

  bdConnection.connect((error) => {
    if (error) {
      bdConnection.end();
      res.sendStatus(500);
      res.end();
    } else {
      let sqlQuery = `SELECT COUNT(*) AS total FROM \`usuarios\` WHERE username="${req.body.username}" AND password="${req.body.password}"`;
      bdConnection.query(sqlQuery, (error, result) => {
        if (result[0].total != 1) {
          bdConnection.end();
          res.sendStatus(201);
          res.end();
        } else {
          res.sendStatus(200);
          bdConnection.end();
          res.end();
        }
      });
    }
  });
});

//404 route (SIEMPRE MANTENER ESTA RUTA COMO LA ULTIMA EN CONSULTAR)
app.get("*", function (req, res) {
  res.status(404).sendFile(__dirname + "/Public/404.html");
});

// Server listening

app.listen(8080, () => {
  console.log(`Servidor iniciado en: http://localhost:8080`);
});
