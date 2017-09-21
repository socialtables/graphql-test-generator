##  GraphQL Test Generator
Generates tests for graphql queries that compare the query against the schema. Exports one function for generating tests and another function for extracting queries and generating tests. It can also be installed globally and used through the command line.

### Install

```bash
npm install graphql-test-generator --save-dev
```

### graphqlTestGenerator

#### Arguments
* entry - directory containing the graphql queries to be tested
* output - directory to write the files to
* schemaLocation - directory of the schemas to compare the queries to
* overwriteFiles - optional boolean indicating whether old test files should be overwritten
* importLocation - optional directory for including other test functions

#### Use

##### In JavaScript
```js
const { graphqlTestGenerator } = require('graphql-test-generator');

// This will find graphql queries in the entry directory, generate tests against the schema and write them to the test directory.

graphqlTestGenerator({ entry: './graphqlQueries', output: './tests', schemaLocation: './schemas', overwriteFiles: false, importLocation: './generateTestFunction' });
```

##### Command line usage
``` bash
graphqlTestGenerator -e ./src -o ./test -s ../server/schema
```

### gqlTestExtraction

#### Arguments
* entry - directory containing the application code with graphql queries in template strings
* output - directory to write the files to
* schemaLocation - directory of the schemas to compare the queries to
* overwriteFiles - optional boolean indicating whether old test files should be overwritten
* importLocation - optional directory for including other test functions

#### Use

##### In JavaScript
```js
const { gqlTestExtraction } = require('graphql-test-generator');

// This will find graphql queries in the source, extract queries that are in tagged template strings being called by the function exported from the graphql-tag library, generate tests against the schema and write them to the test directory.

gqlTestExtraction({ entry: './src', output: './tests', schemaLocation: './schemas', overwriteFiles: false, importLocation: './generateTestFunction' });
```
##### Command line usage
``` bash
gqlTestExtraction -e ./src -o ./test -s ../server/schema
```

