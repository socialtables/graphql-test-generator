##  GraphQL Test Generator
[![CircleCI](https://circleci.com/gh/socialtables/graphql-test-generator.svg?style=svg)](https://circleci.com/gh/socialtables/graphql-test-generator)
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
* overwriteFiles - optional boolean indicating whether old test files should be overwritten (defaults to false)
* importLocation - optional directory for including other test functions (defaults to generating tape test)

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
* overwriteFiles - optional boolean indicating whether old test files should be overwritten (defaults to false)
* importLocation - optional directory for including other test functions (defaults to generating tape test)

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

- - -

Copyright (C) 2017 Social Tables, Inc. (https://www.socialtables.com) All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
