var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    read();
});

function read() {
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    orderInfo();
    });
}

function orderInfo() {
    
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "What is the ID of the product you want to buy?"
        },
        {
            name: "units",
            type: "input",
            message: "How many units of the product do you want to buy?"
        }
    ]).then(function (order) {
        var requestedAmount;
        var query = "SELECT stock_quantity FROM products WHERE ?";
        connection.query(query, {id: order.productID}, function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                requestedAmount = res[i].stock_quantity;
                console.log(requestedAmount);
            }
        });
   });
}