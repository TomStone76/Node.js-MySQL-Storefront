DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (ID)
);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (1, "Laptop", "Tech", 1000, 25);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (2, "Printer", "Tech", 200, 30);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (3, "Smart phone", "Tech", 600, 35);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (4, "Cutlery set", "Kitchen", 100, 40);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (5, "Dish set", "Kitchen", 100, 40);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (6, "Dish detergent", "Kitchen", 5, 50);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (7, "Dog food", "Pet", 30, 45);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (8, "Cat food", "Pet", 30, 45);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (9, "Basketball", "Sports", 15, 20);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (10, "Basketball hoop", "Sports", 250, 10);