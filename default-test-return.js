module.exports = function defaultTestReturn({ queryName }) {
	return `const test = require("tape");
test("${queryName} query adheres to application schema", assert => {
	assert.ok(isValid, "${queryName} contains no schema errors");
	assert.end();
});`
};