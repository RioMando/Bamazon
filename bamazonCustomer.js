var mysql = require('mysql');
var express = require('express');

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
});

