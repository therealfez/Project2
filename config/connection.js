//set up connection to mySQL
var mysql = require("mysql");

require("dotenv").config();

var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.pass,
  database: "exampledb"
};

var connection = mysql.createConnection(process.env.JAWSDB_URL || options);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
