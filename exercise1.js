var core = require('./library/basicpromises.js');
var colors = require('colors');
var Table = require('cli-table');

var query = `
	show tables;
`;

function getData() {
	core.connectionQuery(query)
	.then(function(result) {

		var table = new Table ({
			head: ['Tables in the databases'.bold.white]
		});

		var resultArray = [];
		result.forEach(function(item) {
			resultArray.push(item.Tables_in_addressbook);
		})

		table.push([resultArray.join('\n')]);

		console.log(table.toString());

	})
	.catch(function(error) {
		console.log(error);
	})
}

getData();