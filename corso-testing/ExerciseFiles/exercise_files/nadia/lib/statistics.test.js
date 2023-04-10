

describe("average", () => {
    let statistics;

    beforeAll(() => {

        statistics = require('./statistics');

        jest.spyOn(statistics, "total").mockImplementation(_ => 50);

    });

    it("does-average", () => {
        expect(statistics.average([1, 2, 3])).toBe(2);
    });

    it("mocked-does-average", () => {
        expect(statistics.average([1, 2, 3])).toBe(50);
    });

});

 