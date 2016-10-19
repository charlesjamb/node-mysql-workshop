var core = require('./library/basicpromises.js');
var colors = require('colors');
var Table = require('cli-table');
var mysql = require('mysql');

var query = `
	SELECT Account.id, Account.email, AddressBook.name 
	FROM AddressBook 
	JOIN Account
	WHERE(AddressBook.accountId=Account.id)
	ORDER BY Account.id;
`;

core.connectionQuery(query)
	.then(function(result) {

		var info = {};
		result.forEach(function(item) {
			if (info[item.id]) {
				console.log(item.name)
			}
			else {
				console.log(('#' + item.id + ': ').red.bold + item.email + '\n' + item.name);
				info[item.id] += item.name;
			}
		})

	})
	.catch(function(error) {
		console.log(error);
	})



