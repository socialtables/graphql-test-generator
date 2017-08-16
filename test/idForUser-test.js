const test = require("tape");
const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("./schema");
const query = `
    query idForUser {
        user {
            id
        }
    }
`;
test("idForUser query adheres to application schema", assert => {
	const queryAST = parse(query);
	const errors = validate(schema, queryAST);
	assert.ok(!errors.length, "idForUser contains no schema errors");
	assert.end();
});
	