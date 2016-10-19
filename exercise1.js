var core = require('./library/basicpromises.js');
var colors = require('colors');
var Table = require('cli-table');

var query = `
	show tables;
`;

function getData() {
	core.niceQuery(query)
	.then(function(result) {
		console.log(result);
	})
	.catch(function(error) {
		console.log(error);
	})
}

getData();