DROP DATABASE IF EXISTS bamazon;
CREATE database products;

CREATE TABLE costumer (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
 
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (position)
);

SELECT * FROM costumer;
