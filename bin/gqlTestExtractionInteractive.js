#!/usr/bin/env node
const inquirer = require("inquirer");
const gqlTestExtraction = require("../gqlTestExtraction");

const paramQuestions = [
	{
		type: "input",
		name: "entry",
		message: "What is the entry directory?"
	},
	{
		type: "input",
		name: "output",
		message: "What is test output directory?"
	},
	{
		type: "input",
		name: "schemaLocation",
		message: "What is the path to your graphql schema?"
	},
	{
		type: "input",
		name: "overwriteFiles",
		message: "Should existing tests be overwritten?"
	}
];

inquirer.prompt(paramQuestions).then(gqlTestExtraction);
