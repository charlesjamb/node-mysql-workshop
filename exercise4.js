var core = require('./library/basicpromises.js');
var colors = require('colors');
var Table = require('cli-table');
var mysql = require('mysql');

var query = `
	SELECT Account.id, Account.email, AddressBook.name 
	FROM Account
	LEFT JOIN AddressBook
	ON (AddressBook.accountId=Account.id)
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
				console.log(('#' + item.id + ': ').red.bold + item.email);
				if (item.name) {
					console.log(item.name)
				}
				else {
					console.log('--no address books--')
				}
				info[item.id] += item.name;
			}
		})

	})
	.catch(function(error) {
		console.log(error);
	})



