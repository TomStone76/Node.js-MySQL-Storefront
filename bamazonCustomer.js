var inquirer = require("inquirer");
var mySql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "databaseNanme"
});