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
    console.log("\nconnected as id " + connection.threadId + "\n");
    read();
});

function read() {
    console.log("Welcome to Bamazon! We currently offer the following products:\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " (Product ID: " + res[i].id + ")");
            console.log("Price: $" + res[i].price + "\n");
        }
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
        connection.query("SELECT stock_quantity, price FROM products WHERE id = ?", [order.productID],
         function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                var totalCost = res[i].price * order.units;
                var newStock = res[i].stock_quantity - order.units;
                if (res[i].stock_quantity >= order.units) {
                    console.log("Your order was processed successfully.");
                    console.log("The total cost of your order is $" + totalCost + ".");
                    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [newStock, order.productID]);
                    restartHandler();
                } else if (res[i].stock_quantity < order.units) {
                    console.log("Sorry, but there aren't enough units in stock to fulfill your order.");
                    console.log("Please order less units or a different item.");
                    restartHandler();
                }
            }
        });
    });
}

function restartHandler() {
    inquirer.prompt([{
        name: "restart",
        type: "confirm",
        message: "Would you like to continue shopping?"
    }, ]).then(function ask(shoppingPrompt) {
        if (shoppingPrompt.restart) {
            orderInfo();
        } else {
            process.exit();
        }
    });
}