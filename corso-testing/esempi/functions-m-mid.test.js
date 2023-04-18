const fun = require('./functions-m-mid.js');

function dumpObject(obj) {
    const line = "------------------------------------------------"
    const newline = "\n"
    console.log(line, newline, obj, newline, Object.keys(obj || []), newline, line);
}

describe("test-use-my-function", () => {

    beforeAll(() => {
        //jest.spyOn(fun.exports, 'myFunction').mockImplementation(() => 51 * 49);
        //fun.exports = { ...fun.exports, myFunction: () => 51 * 49 }
        dumpObject(fun)
        dumpObject(fun.useMyFunction)

    })

    afterAll(() => {

    })

    it("is-replaced", () => {
        const result = fun.useMyFunction(2);
        expect(result).toEqual(51 * 49)
    });


});

