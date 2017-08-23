const path = require("path");
function generateTest({ query, schemaLocation, queryName, importLocation =  path.join(__dirname, "default-test-return")}) {
	return `const path = require("path");
const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("${schemaLocation}");
const query = \`${`${query}`}\`;
const queryAST = parse(query);
const errors = validate(schema, queryAST);
const isValid = !errors.length;
return ${require("path.join(__dirname, importLocation)")({ queryName, isValid})};
`
}

module.exports = generateTest;
