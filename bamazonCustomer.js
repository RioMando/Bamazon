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
connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as id ' + connection.threadId);
	console.log('\n\n');
	allProducts();
	// productToBuy();
	// processAnswers();
});

//--------------------------------
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

function validateName(name){
        return name !== '';
};
//----------------------------------

function allProducts() {
	var query = connection.query('SELECT * FROM products;', function(err, res) {
		console.log('--------------------------------------------------');

		for (var i = 0; i < res.length; i++){
			console.log(res[i].item_id + " | " + res[i].product_name + ' | ' + res[i].price);
			
		};
		console.log('--------------------------------------------------\n');
	productToBuy();
	});
	
};

function productToBuy() {
	inquirer.prompt(questions, validateName)
	.then(function(anser){
		// console.log(anser);
		// console.log(anser.id);
		// console.log(anser.quantity);
		findProduct(anser.id, anser.quantity);
	});
};

function findProduct(id, quantity){
	console.log(id + "   " + quantity);
	var query = connection.query('SELECT stock_quantity FROM products WHERE item_id=?', [id], function(err, res) {
		var qtty = JSON.stringify(res[0].stock_quantity);
		console.log(qtty);
		if (quantity<=qtty){
			purchase(id, quantity);
		} else {
			console.log("insufficient quantity!\n\n");
			allProducts();
		};
	});
};

function purchase(id, quantity){
	console.log("Processing your purchase.");
};
	
