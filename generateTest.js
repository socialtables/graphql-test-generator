const path = require("path");
const DEFAULT_IMPORT_LOCATION =  path.join(__dirname, "./default-test-return");
function generateTest({ query, schemaLocation, queryName, importLocation = DEFAULT_IMPORT_LOCATION}) {
	return `const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("${schemaLocation}");
const query = \`${`${query}`}\`;
const queryAST = parse(query);
const errors = validate(schema, queryAST);
const isValid = !errors.length;
${require(importLocation === DEFAULT_IMPORT_LOCATION ? importLocation :  path.join(process.cwd(), importLocation))({ queryName })};
`
}

module.exports = generateTest;
