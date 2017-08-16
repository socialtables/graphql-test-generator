const fs = require('fs');
const path = require('path');
const inquirer = require("inquirer");
const mkdir = require('mkdirp');
const gqlExtract = require("gql-extract");

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
		name: "graphqlOutput",
		message: "What is the extracted graphql output location?"
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

function generateTest(query) {
	const test = `const test = require("tape");
const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("${schemaLocation}");
const query = \`${`${data}`}\`;
test("${queryName} query adheres to application schema", assert => {
	const queryAST = parse(query);
	const errors = validate(schema, queryAST);
	assert.ok(!errors.length, "${queryName} contains no schema errors");
	assert.end();
});
	`
}

function readDirectoryAndGenerateTests({ entry, output, graphqlOutput, schemaLocation }) {
	fs.readdir(entry, (err, files) => {
		errorExit(err);
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
							queriesWritten.forEach((queryPath, queryName) => {
								fs.readFile(queryPath, "utf-8", (err, data) => {
									errorExit(err);
									const test = generateTest(data);
									mkdir(output, err => {
										errorExit(err);
										fs.writeFile(path.join(output, `${queryName}-test.js`), test)
									});
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
}

inquirer.prompt(paramQuestions).then(({ entry, output, graphqlOutput, schemaLocation }) => {
	readDirectoryAndGenerateTests({ entry, output, graphqlOutput, schemaLocation});
});
