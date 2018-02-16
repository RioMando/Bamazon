var mysql = require('mysql');
var express = require('express');
var inquirer = require('inquirer');

// Server app setup
var app = express();
var port = 5050;
app.listen(port);

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'rootroot',
	database: "bamazon_DB"
});

//Stablish the connection with bamazon_DB and lounch the program with allProducts()
connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as id ' + connection.threadId);
	console.log('\n\n');
	allProducts();
});

var inventory = 0;
//Variable used with inquirer to ask the ID and quantity to purchase
var questions = [
	{
		message: "Which ID number do you want to purchase?",
		type: "input",
		name: "id",
	    validate: validateName
	},{
		message: "How many units do you want to buy?",
		type: "input",
		name: "quantity",
	    validate: validateName
	}
];

//This function validates that the user type something (not enter without data)
function validateName(name){
        return name !== '';
};

//Display of all products fron bamazon_DB displaying: ID, Name and Price
function allProducts() {
	var query = connection.query('SELECT * FROM products;', function(err, res) {
		console.log('\n--------------------------------------------------');

		for (var i = 0; i < res.length; i++){
			console.log(res[i].item_id + " | " + res[i].product_name + ' | ' + "$ " + res[i].price);
		};
		console.log('--------------------------------------------------\n');
	productToBuy();
	});
};

//Ask to the client wich product ID and quantity wants to buy
function productToBuy() {
	inquirer.prompt(questions, validateName)
	.then(function(answer){
		// console.log(answer);
		// console.log(answer.id);
		// console.log(answer.quantity);
		findProduct(answer.id, parseInt(answer.quantity));
	});
};

//Function that look in bamazon_DB for the ID requested by the client and cjeck that there is enof quantity to be sold.
function findProduct(id, quantity){
	var query = connection.query('SELECT stock_quantity FROM products WHERE item_id=?', [id], function(err, res) {
		inventory = parseInt(JSON.stringify(res[0].stock_quantity));
		if (quantity <= inventory){
			updateQuantity(id, quantity);
		} else {
			console.log("insufficient quantity!\n\n");
			allProducts();
		};
	});
};

//Funtion that process the purchase and updates stock_quantity in bamazon_DB with newQtty
function updateQuantity(id, quantity){
	//New quantity to be update in bamazon_DB after substract the purchase
	newQtty = inventory - quantity;
	var query = connection.query('UPDATE products SET ? WHERE ?',
	[
		{
			stock_quantity: newQtty
		},
		{
			item_id: id
		}
	],
	function(err, res){
		costOfPurchase(id, quantity);
	});
};

//Function that display to the client the amount of the purchase
var costOfPurchase = function(id, quantity){
	var query = connection.query('SELECT price FROM products WHERE item_id=?', [id], function(err, res) {
		cost = parseFloat(JSON.stringify(res[0].price)).toFixed(4);
		console.log("Your total is $ " + quantity*cost);
		allProducts();
	});
};
