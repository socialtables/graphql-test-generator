const { graphqlTestGenerator, gqlTestExtraction } = require('../index');
const path = require('path');

const queryPath = path.join(__dirname, '../example');
graphqlTestGenerator({ entry: queryPath, output: path.join(__dirname, '../generatedTests-graphqlTestGenerator'), schemaLocation: '../tests/schema', overwriteFiles: true });

gqlTestExtraction({ entry: queryPath, output: path.join(__dirname, '../generatedTests-gqlTestExtraction'), schemaLocation: '../tests/schema', overwriteFiles: true });