const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');
const gqlExtract = require("gql-extract");
const tmp = require("tmp");
const generateTest = require('./generateTest');

function errorExit(err) {
	if (err) {
		console.error(err.stack);
		process.exit(1);
	}
}

function gqlTestExtraction({ entry, output, schemaLocation }) {
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
						gqlTestExtraction({
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

module.exports = gqlTestExtraction;