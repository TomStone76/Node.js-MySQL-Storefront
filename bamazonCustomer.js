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
});

function read() {
    console.log("Displaying all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
    });
}

read();


// var orderIdNumber;
// var orderUnits;

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
// function processOrder() {
//     var query ="SELECT id, stock_quantity FROM products ?,";
//     connection.query(query, {id: order.productID, stock_quantity: order.units}, function(err,res) {
//         console.log(res);
//         if (err) throw err;
//         if (order.productID === res.id &&  order.units > res.stock_quantity) {
//             console.log("Sorry! There aren't enough units in stock to process your order. Please try again.")
//             orderInfo()
//         } else if (order.productID === res.id && order.units <= res.stock_quantity) {
//             console.log("Your order was successful.");
// //             // If the ID the user inputs matches an ID in the DB that has a stock quantity
// //             // that's bigger than or the same as the amount of units the user wants: 
// //             //     1. Update the DB to reflect the stuff the user ordered
// //             //     2. Store order.units * res.price  in a totalCost variable
// //             //     3. Print this value for the user
//         }
//     });
// }

// // orderInfo();

// processOrder();