describe("average", () => {
    let statistics;

    beforeAll(() => {
        statistics = require('./statistics');
        jest.spyOn(statistics, "total").mockImplementation(_ => 150);
    });

    it("does-average", () => {
        expect(statistics.average([1, 2, 3])).toBe(50);
    });

});

describe("average-alternative", () => {
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

    it("alternative-average", () => {
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