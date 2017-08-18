const test = require("tape");
const { parse } = require("graphql/language");
const { validate } = require("graphql/validation");
const schema = require("../schema");
const query = `
    query roomTemplatesForUser {
        user {
            space_templates {
                id,
                name,
                image,
                created_at
            }
        }
    }
`;
test("roomTemplatesForUser query adheres to application schema", assert => {
	const queryAST = parse(query);
	const errors = validate(schema, queryAST);
	assert.ok(!errors.length, "roomTemplatesForUser contains no schema errors");
	assert.end();
});
	