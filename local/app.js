#!/usr/bin/env node
const express = require('express');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const app = express();

// Relative imports
const Setup = require('./utils/setup');
const Wallet = require('./utils/wallet');

// Constants
const PORT = 3210;

// Clear terminal & show message.
clear();
console.log(
	chalk.yellow(
		figlet.textSync('ETH-SSH', { horizontalLayout: 'full' })
	)
);

// CLI
if (!process.argv[2]) {
	console.log('Incorrect command...');
	console.log('TODO: Use npm yargs');
	// process.exit(1);
} else {
	// Always verify the correct directory structure is in place
	Setup.Verify();
	switch (process.argv[2].toLowerCase()) {
		case 'setup':
			Setup.Setup();
			break;
		case 'new-wallet':
			Wallet.createWallet();
			break;
		case 'start':
			app.listen(PORT);
			break;
		default:
			console.log('Incorrect command...');
			console.log('TODO: Use npm yargs');
			process.exit(1);
			break;
	}
}
// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

app.get('/', (req, res) => res.send({connected: true}));

app.get('/getAccounts', (req, res) => {
  console.log('Received request');
});
