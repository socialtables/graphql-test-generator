#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require("inquirer");
const mkdir = require('mkdirp');
const generateTest = require('./generateTest');

const questions = [{
	type: 'input',
	name: 'entry',
	message: 'What is the entry directory?'
}, {
	type: 'input',
	name: 'output',
	message: 'What is the test output directory?'
}, {
	type: 'input',
	name: 'schemaLocation',
	message: 'What is the schema directory'
}];

function errorExit(err) {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
}

function readQueriesAndGenerateTests({ entry, output, schemaLocation }) {
	fs.readdir(entry, function(err, files) {
		errorExit(err);
		files.forEach(file => {
			const fullFile = path.join(entry, file);
			fs.stat(fullFile, function(err, stat) {
				errorExit(err);
				const isFile = stat.isFile();
				if (isFile && file.includes('.graphql')) {
					fs.readFile(fullFile, 'utf-8', function(err, query) {
						mkdir(output, function(err) {
							errorExit(err);
							const queryName = file.split('.graphql')[0];
							fs.writeFileSync(path.join(output, `${queryName}-test.js`), generateTest({ query, schemaLocation, queryName }));
							console.log(`test written for ${queryName}`);
						});
					});
				} else if (!isFile) {
					readQueriesAndGenerateTests({ entry: fullFile, output, schemaLocation});
				}
			});
		});
	});
}

inquirer.prompt(questions)
	.then(readQueriesAndGenerateTests);
