const mysql = require("mysql");

class OpeCentralBDApi {
  constructor() {
    this.host = "localhost";
    this.database = "bgu8bsc5k7tcemc6ycq7";
    this.user = "root";
    this.password = "Marioloco456";
  }

  createConnection() {
    let connection = mysql.createConnection({
      host: "localhost",
      database: "bgu8bsc5k7tcemc6ycq7",
      user: "root",
      password: "Marioloco456",
    });
    return connection;
  }

  connect(connection) {
    connection.connect((error) => {
      if (error) {
        throw error;
      }
    });
  }

  execute(query) {
    let connection = this.createConnection();
    this.connect(connection);
    connection.query(query, (error) => {
      if (error) {
        throw error;
      }
    });
    connection.end();
  }

  getApps() {
    let connection = this.createConnection();
    this.connect(connection);

    connection.query(
      "SELECT * FROM `usuarios` WHERE id= 1",
      (error, result, fields) => {
        if (error) throw error;
        console.log(result);
        return result;
      }
    );
  }
}

module.exports = OpeCentralBDApi;
