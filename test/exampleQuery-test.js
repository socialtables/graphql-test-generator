const test = require("tape");
const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("./schema");
const query = `query nameForUser {
	user {
		id
	}
}`;
test("exampleQuery query adheres to application schema", assert => {
	const queryAST = parse(query);
	const errors = validate(schema, queryAST);
	assert.ok(!errors.length, "exampleQuery contains no schema errors");
	assert.end();
});
	