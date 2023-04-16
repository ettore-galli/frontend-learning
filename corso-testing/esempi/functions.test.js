describe("test-total", () => {
    const functions = require('./functions');

    it("sums", () => {
        expect(functions.total([1, 2, 3, 4])).toBe(10);
    });

});

describe("test-future-total", () => {
    const functions = require('./functions');

    it("will-sum", async () => {
        await expect(functions.willSum([1, 2, 3, 4, 5])).resolves.toBe(15);
    });

});

describe("test-totalizer", () => {
    const functions = require('./functions');

    it("calls-total", (done) => {

        functions.totalizer([1, 2, 3, 4, 5], (items) => {
            try {
                expect(items).toEqual([1, 2, 3, 4, 5])
                return done()
            } catch (error) {
                return done(error)
            }

        });


    });

});


describe("test-callback", () => {
    const functions = require('./functions');
    // I want to test that the callback is called, and I want the test
    // to fail if the callback is not called
    it("callback-not-called", (done) => {

        functions.callbackNotCalled((callbackParam) => {
            try {
                expect(callbackParam).toEqual("X")
                return done()
            } catch (error) {
                return done(error)
            }

        });

    });
});

describe("test-average-1", () => {
    let functions;

    beforeAll(() => {
        functions = require('./functions');
        jest.spyOn(functions, "total").mockImplementation(_ => 150);
    });

    it("does-average-1", () => {
        expect(functions.average([1, 2, 3])).toBe(50);
    });

});

describe("explore", () => {
    let functions;

    beforeAll(() => {
        functions = require('./functions');
        jest.spyOn(functions, "total").mockImplementation(_ => 150);
    });

    it("does-average-x", () => {
        //expect(functions.average([1, 2, 3])).toBe(50);
        console.log(functions.module)
        const { total, average, futureAverage } = require('./functions');
        console.log(total)
        console.log(average)
    });

});

describe("average-b", () => {
    let functions;
    let original;

    beforeAll(() => {
        functions = require('./functions');
        original = functions.total;
        functions.total = jest.fn().mockReturnValue(150)
    });

    afterAll(() => {
        functions.total = original;
    })

    it("b-average", () => {
        expect(functions.average([1, 2])).toBe(75);
    });

});


describe("test-average-2", () => {
    let functions;
    let original;

    beforeAll(() => {
        jest.mock('./functions', () => {
            const actual = jest.requireActual('./functions');
            return {
                ...actual,
                total: jest.fn().mockReturnValue(150)
            }
        })
        console.log("functions ==> ", functions)
        functions = require('./functions');
        console.log("functions ==> ", functions)

    });

    afterAll(() => {
        jest.unmock("./functions")
    })

    it("does-average-2", () => {
        expect(functions.total([1, 2])).toBe(150);
        expect(functions.average([1, 2])).toBe(75);
    });

});

describe("future", () => {
    let functions;
    let original;

    beforeAll(() => {
        functions = require('./functions');
        original = functions.total;
        functions.total = jest.fn().mockReturnValue(150)
    });

    afterAll(() => {
        functions.total = original;
    })

    it("future-average", async () => {
        await expect(functions.futureAverage([1, 2]))
            .resolves.toBe(75);
    });

});