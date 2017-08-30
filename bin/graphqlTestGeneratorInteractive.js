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
}, {
	type: "input",
	name: "overwriteFiles",
	message: "Should existing tests be overwritten?"
}, {
	type: "input",
	name: "importLocation",
	message: "What is the path to your test function generator?"
}];

inquirer.prompt(questions).then(graphqlTestGenerator);
