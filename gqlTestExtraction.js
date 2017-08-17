#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require("inquirer");
const mkdir = require('mkdirp');
const gqlExtract = require("gql-extract");
const tmp = require("tmp");
const generateTest = require('./generateTest');

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
	}
];

function errorExit(err) {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
}

function readDirectoryAndGenerateTests({ entry, output, schemaLocation }) {
	tmp.dir({ unsafeCleanup: true}, (err, graphqlOutput, cleanup) => {
		fs.readdir(entry, (err, files) => {
			errorExit(err);
			let finishedCount = 0;
			files.forEach(file => {
				fs.stat(path.join(entry, file), (err, stat) => {
					errorExit(err);
					if (stat.isFile() && file.includes(".js")) {
						fs.readFile(path.join(entry, file), "utf8", (err, data) => {
							errorExit(err);
							const { queriesWritten } = gqlExtract({
								source: data,
								filePath: graphqlOutput
							});
							if (queriesWritten.size) {
								queriesWritten.forEach((query, queryName) => {
										errorExit(err);
										mkdir(output, err => {
											errorExit(err);
											fs.writeFileSync(
												path.join(output, `${queryName}-test.js`),
												generateTest({ query, queryName, schemaLocation })
											);
											console.log(`test generated for ${queryName}`);
											finishedCount++;
											if (finishedCount === files.length) {
												cleanup();
											}
										});
								});
							}
						});
					}
					else if (!stat.isFile()) {
						readDirectoryAndGenerateTests({
							entry: path.join(entry, file),
							output,
							graphqlOutput,
							schemaLocation
						});
					}
				});
			});
		});
	});
}


inquirer.prompt(paramQuestions).then(({ entry, output, schemaLocation }) => {
	readDirectoryAndGenerateTests({ entry, output, schemaLocation });
});
