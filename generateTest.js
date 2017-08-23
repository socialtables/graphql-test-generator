const path = require("path");
function generateTest({ query, schemaLocation, queryName, importLocation =  "./default-test-return"}) {
	return `const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("${schemaLocation}");
const query = \`${`${query}`}\`;
const queryAST = parse(query);
const errors = validate(schema, queryAST);
const isValid = !errors.length;
${require(path.join(__dirname, importLocation))({ queryName })};
`
}

module.exports = generateTest;
