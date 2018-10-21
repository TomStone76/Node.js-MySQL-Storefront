var inquirer = require("inquirer");
var mysql = require("mysql");

// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 8889,
//     user: "root",
//     password: "root",
//     database: "bamazon"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     productInfo();
// });

var orderIdNumber;
    var orderUnits;

function orderInfo() {
    inquirer.prompt([{
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
            orderIdNumber = order.productID;
            orderUnits = order.units;
            console.log("You have placed an order for " + orderUnits + " unit(s) of item number " + orderIdNumber + ".");
        });
}

orderInfo();


