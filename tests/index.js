const { graphqlTestGenerator, gqlTestExtraction } = require('../index');
const path = require('path');

const queryPath = path.join(__dirname, '../example');
graphqlTestGenerator({ entry: queryPath, output: path.join(__dirname, '../generatedTests/graphqlTestGenerator'), schemaLocation: '../../tests/schema', overwriteFiles: true });

gqlTestExtraction({ entry: queryPath, output: path.join(__dirname, '../generatedTests/gqlTestExtraction'), schemaLocation: '../../tests/schema', overwriteFiles: true });

const failQueryPath = path.join(__dirname, '../exampleWillFail');
graphqlTestGenerator({ entry: failQueryPath, output: path.join(__dirname, '../generatedTests/graphqlTestGeneratorWillFail'), schemaLocation: '../../tests/schema', overwriteFiles: true, importLocation: './tests/test-for-failure' });

gqlTestExtraction({ entry: failQueryPath, output: path.join(__dirname, '../generatedTests/gqlTestExtractionWillFail'), schemaLocation: '../../tests/schema', overwriteFiles: true, importLocation: './tests/test-for-failure' });