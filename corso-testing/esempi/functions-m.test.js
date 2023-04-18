const fun = require('./functions-m.js');

 

describe("test-use-my-function", () => {

    beforeAll(() => {
        jest.spyOn(fun, 'myFunction').mockImplementation(() => 51 * 49);
    })

    afterAll(() => {

    })

    it("is-replaced", () => {
        const result = fun.useMyFunction(2);
        expect(result).toEqual(51 * 49)
    });


});


describe("test-class-use-my-function", () => {


    beforeAll(() => {
        jest.spyOn(fun, 'myFunction').mockImplementation(() => 51 * 49);
    })

    afterAll(() => {

    })

    it("class-replaced", () => {
        const funs = new fun.Functions()
        funs.aFunction = () => 123
        const result = funs.useFunction(5)
        expect(result).toEqual(123)
    });


});
