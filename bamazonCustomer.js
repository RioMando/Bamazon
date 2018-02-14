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
});

function allProducts() {
	var query = connection.query('SELECT * FROM products;', function(err, res) {
		console.log('--------------------------------------------------');

		for (var i = 0; i < res.length; i++){
			console.log(res[i].item_id + " | " + res[i].product_name + ' | ' + res[i].price);
			
		}
		console.log('--------------------------------------------------');
	productToBuy();
	})
	
}

function productToBuy() {
	inquirer
		.prompt({
			name: "id",
			type: "input",
			message: "Which ID number do you want to purchase?"
		 },
		 {
			name: "quantity",
			type: "input",
			message: "How many units do you want to buy?"
		})
		.then(function(answer){
			console.log(answer);
			console.log(answer[0].id);
			console.log(answer[1].quantity);
		})
		
};
	
