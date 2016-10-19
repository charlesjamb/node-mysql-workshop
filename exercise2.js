var core = require('./library/basicpromises.js');
var colors = require('colors');
var Table = require('cli-table');

var query = `
	SELECT *
	FROM Account
	LIMIT 5;
`;

core.connectionQuery(query)
	.then(function(result) {
		result.forEach(function(item) {
			console.log(('#' + item.id + ': ').red.bold + item.email);
		})
	})
	.catch(function(error) {
		console.log(error);
	})
