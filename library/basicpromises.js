var request = require('request');
var prompt = require('prompt');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sqltemppassword',
  database : 'addressbook'
});

function connectionQuery(thequery) {
	connection.connect();
	return new Promise(function(resolve, reject) {
		connection.query(thequery, function(err, result) {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		})
		connection.end();
	});
}

// request promise
function requestPromise(url) {
	return new Promise(function(resolve, reject) {
		request(url, function(err, result) {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		})
	});
}

// prompt promise
function promptPromise(question) {
	return new Promise(function(resolve, reject) {
		prompt.get(question, function(err, answer) {
			if (err) {
				reject(err);
			}
			else {
				resolve(answer);
			}
		})
	});
}

// request as JSON
function requestJSON(url) {
	return ( 
		requestPromise(url)
		.then(function(result) {
			var actualResult = JSON.parse(result.body);
			return actualResult;
		})
	);	
}

// stringify the sql query
function niceQuery(query) {
	return (
		connectionQuery(query)
		.then(function(result) {
			var actualQuery = JSON.stringify(result, null, 4);
			return actualQuery;
		})
	);
}

exports.connectionQuery = connectionQuery;
exports.requestPromise = requestPromise;
exports.promptPromise = promptPromise;
exports.requestJSON = requestJSON;
exports.niceQuery = niceQuery; 