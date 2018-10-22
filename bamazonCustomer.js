var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    read();
});

function read() {
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        orderInfo();
    });
}

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
        var stockQuantity;
        var requestedAmount = order.units;
        var itemPrice;
        var totalCost;
        var query = "SELECT stock_quantity, price FROM products WHERE ?";
        connection.query(query, {
            id: order.productID
        }, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                stockQuantity = res[i].stock_quantity;
                itemPrice = res[i].price;
                totalCost = res[i].price * requestedAmount;
                if (stockQuantity >= requestedAmount) {
                    console.log("Your order was processed successfully.")
                    console.log("The total cost of your order is $" + totalCost + ".")
                } else if (stockQuantity < requestedAmount) {
                    console.log("Sorry, but there aren't enough units in stock to fulfill your order.");
                    console.log("Please order less units or a different item.");
                }
            }
        });
    });
}