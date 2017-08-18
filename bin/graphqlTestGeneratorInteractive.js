#!/usr/bin/env node
const inquirer = require("inquirer");
const graphqlTestGenerator = require("../graphqlTestGenerator");

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

inquirer.prompt(questions).then(graphqlTestGenerator);
