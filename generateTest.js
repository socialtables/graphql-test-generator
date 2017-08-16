function generateTest({ query, schemaLocation, queryName }) {
	return `const test = require("tape");
const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("${schemaLocation}");
const query = \`${`${query}`}\`;
test("${queryName} query adheres to application schema", assert => {
	const queryAST = parse(query);
	const errors = validate(schema, queryAST);
	assert.ok(!errors.length, "${queryName} contains no schema errors");
	assert.end();
});
	`
}

module.exports = generateTest;
