describe("test-average-1", () => {
    let statistics;

    beforeAll(() => {
        statistics = require('./statistics');
        jest.spyOn(statistics, "total").mockImplementation(_ => 150);
    });

    it("does-average-1", () => {
        expect(statistics.average([1, 2, 3])).toBe(50);
    });

});
describe("explore", () => {
    let statistics;

    beforeAll(() => {
        statistics = require('./statistics');
        jest.spyOn(statistics, "total").mockImplementation(_ => 150);
    });

    it("does-average-x", () => {
        //expect(statistics.average([1, 2, 3])).toBe(50);
        console.log(statistics.module)
        const  { total, average, futureAverage } = require('./statistics');
        console.log(total)
        console.log(average)
    });

});

describe("average-b", () => {
    let statistics;
    let original;

    beforeAll(() => {
        statistics = require('./statistics');
        original = statistics.total;
        statistics.total = jest.fn().mockReturnValue(150)
    });

    afterAll(() => {
        statistics.total = original;
    })

    it("b-average", () => {
        expect(statistics.average([1, 2])).toBe(75);
    });

});


describe("test-average-2", () => {
    let statistics;
    let original;

    beforeAll(() => {
        jest.mock('./statistics', () =>  {
            const actual = jest.requireActual('./statistics');
            return {
                ...actual,
                total: jest.fn().mockReturnValue(150)
            }
        })
        console.log("statistics ==> ", statistics)
        statistics = require('./statistics');
        console.log("statistics ==> ", statistics)

    });

    afterAll(() => {
        jest.unmock("./statistics")
    })

    it("does-average-2", () => {
        expect(statistics.total([1, 2])).toBe(150);
        expect(statistics.average([1, 2])).toBe(75);
    });

});

describe("future", () => {
    let statistics;
    let original;

    beforeAll(() => {
        statistics = require('./statistics');
        original = statistics.total;
        statistics.total = jest.fn().mockReturnValue(150)
    });

    afterAll(() => {
        statistics.total = original;
    })

    it("future-average", async () => {
        await expect(statistics.futureAverage([1, 2]))
            .resolves.toBe(75);
    });

});