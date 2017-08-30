#!/usr/bin/env node
const program = require("commander");
const gqlTestExtraction = require("../gqlTestExtraction");

program
.version('0.0.0')
.option('-e, --entry [value]', 'in directory')
.option('-o, --output [value]', 'out directory')
.option('-s, --schema [value]', 'schema location')
.option('-r, --replace', 'overwrite existing test files')
.option('-t, --testGeneratorFunction', 'path to a function, relative to your current working directory, that takes query name as argument with isValid in scope and returns a test file in the framework of your choice')
.parse(process.argv);

if (program.entry && program.output && program.schema) {
	gqlTestExtraction({ entry: program.entry, output: program.output, schemaLocation: program.schema, overwriteFiles: program.replace, importLocation: program.testGeneratorFunction });	
}