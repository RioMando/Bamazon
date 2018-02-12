-- DROP DATABASE IF EXISTS bamazon_DB;

CREATE database bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("USB Android Charging Cord", "Electronics", 5.75, 125);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("CPU Power Cord", "Electronics", 4.5, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("C Cord", "Electronics", 12, 52);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("PLastic Disposable Coup 6oz, 100 count", "Home", 7.5, 520);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Regular Napkins, White, 250 Ct.", "Home", 6.30, 1250);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Napkins, Deluxe, Torque/White, 125 Ct.", "Home", 15, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Hose, 3/4, Plastic, 30 ft.", "Garden", 25, 850);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Hose, 1/2, Plastic, 30 ft", "Garden", 12.10, 1250);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Fertilizer, Grass Ever Green, 10 pd", "Garden", 30, 325);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Fertilizer, Fruit Trees, 25 pd", "Garden", 125.70, 450);


SELECT * FROM costumer;
