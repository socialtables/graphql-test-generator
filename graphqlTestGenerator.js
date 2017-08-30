const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');
const generateTest = require('./generateTest');

function errorExit(err) {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
}

function writeFile(fileName, query, schemaLocation, queryName, importLocation) {
	fs.writeFileSync(fileName, generateTest({ query, schemaLocation, queryName, importLocation }));
	console.log(`test written for ${queryName}`);
}

function graphqlTestGenerator({ entry, output, schemaLocation, overwriteFiles, importLocation }) {
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
							const fileName = path.join(output, `${queryName}-test.js`);
							if (overwriteFiles) {
								writeFile(fileName, query, schemaLocation, queryName, importLocation);
							} else {
								fs.stat(fileName, function(err, stat) {
									const fileDoesNotExist = err || !stat.isFile();
									if (fileDoesNotExist) {

										writeFile(fileName, query, schemaLocation, queryName, importLocation);
									}
								});
							}
						});
					});
				} else if (!isFile) {
					graphqlTestGenerator({ entry: fullFile, output, schemaLocation, overwriteFiles, importLocation });
				}
			});
		});
	});
}

module.exports = graphqlTestGenerator;
