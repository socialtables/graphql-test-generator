module.exports = function defaultTestReturn({ queryName }) {
	return `const test = require("tape");
test("${queryName} query adheres to application schema", assert => {
	assert.notOk(isValid, "${queryName} contains schema errors");
	assert.end();
});`
};