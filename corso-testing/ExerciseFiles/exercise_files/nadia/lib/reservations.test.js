const { after } = require('lodash');
const Reservation = require('./schema/reservation');



describe("validate", () => {
    let reservations;


    beforeAll(() => {
        reservations = require('./reservations');

    });

    it("optionals-empty-ok", () => {

        const reservation = new Reservation({
            party: 2,
            name: "ettore",
            email: "mail@coso.it",
            date: "2023/03/31",
            time: "12:00:00",
        });

        return reservations.validate(reservation)
            .then(
                value => { expect(value).toEqual(reservation) }
            );

    });


    it("invalid-email-error", () => {

        const reservation = new Reservation({
            party: 2,
            name: "ettore",
            email: "mail",
            date: "2023/03/31",
            time: "12:00:00",
        });

        expect.assertions(1);

        return reservations.validate(reservation)
            .catch(
                error => { expect(error).toBeInstanceOf(Error) }
            );

    });

    it("reject-empty", async () => {
        const mock = jest.spyOn(reservations, "validate");

        const value = undefined;

        await expect(reservations.validate(value))
            .rejects.toThrow("Cannot read properties of undefined (reading 'validate')");

        expect(mock).toBeCalledWith(value);
    })

});


describe("validate-asyncawait-version", () => {
    it("optionals-empty-ok", async () => {

        const reservation = new Reservation({
            party: 2,
            name: "ettore",
            email: "mail@coso.it",
            date: "2023/03/31",
            time: "12:00:00",
        });

        const value = await reservations.validate(reservation);
        value => { expect(value).toEqual(reservation) }

    });


    it("invalid-email-error", async () => {

        const reservation = new Reservation({
            party: 2,
            name: "ettore",
            email: "mail",
            date: "2023/03/31",
            time: "12:00:00",
        });

        expect.assertions(1);

        try {
            await reservations.validate(reservation);
        } catch (err) {
            expect(err).toBeInstanceOf(Error)
        }

    });

    it("optionals-empty-ok-via-resolve", async () => {

        const reservation = new Reservation({
            party: 2,
            name: "ettore",
            email: "mail@coso.it",
            date: "2023/03/31",
            time: "12:00:00",
        });

        await expect(reservations.validate(reservation)).resolves.toEqual(reservation)

    });


    it("invalid-email-error-via-rejects", async () => {

        const reservation = new Reservation({
            party: 2,
            name: "ettore",
            email: "mail",
            date: "2023/03/31",
            time: "12:00:00",
        });

        expect.assertions(1);

        await expect(reservations.validate(reservation)).rejects.toBeInstanceOf(Error)

    });
});


describe("create", () => {

    it("validation-fails-mocked", async () => {

        let reservations;

        const expectedError = new Error("fail");

        reservations = require('./reservations');

        const mockValidation = jest.spyOn(reservations, "validate")
        mockValidation.mockImplementation(_ => Promise.reject(expectedError));

        await expect(reservations.create({}))
            .rejects.toBe(expectedError);

        expect(reservations.validate).toBeCalledTimes(1);

    });

    it("validation-fails-mocked-2", async () => {

        let reservations;

        const expectedError = new Error("fail");

        reservations = require('./reservations');
        
        const mockRes= jest.spyOn(reservations, 'validate');
        mockRes.mockImplementation(__ => Promise.reject(expectedError));
        
        // jest.mock('./reservations', () => {
        //     const expectedError = new Error("fail");
        //     return {
        //         __esModule: true,
        //         ...jest.requireActual('./reservations'),
        //         validate: _ => Promise.reject(expectedError)
        //     }
        // })

        // reservations = require('./reservations');

        await expect(reservations.validate({}))
            .rejects.toEqual(expectedError);

        await expect(reservations.create({}))
            .rejects.toBe(expectedError);

        // expect(reservations.validate).toBeCalledTimes(1);

    });


})




describe("fetch", () => {
    let reservations;

    const mockDebug = jest.fn();
    const mockInsert = jest.fn().mockResolvedValue([1]);

    beforeAll(() => {
        jest.mock('./reservations');
        reservations = require('./reservations');

    });

    afterAll(() => {
        jest.unmock('./reservations');
    });

    it("fetch-works", () => {
        expect(reservations.fetch()).toBeUndefined();
    })

});


describe("save", () => {
    let reservations;

    const mockDebug = jest.fn();
    const mockInsert = jest.fn().mockResolvedValue([1]);

    beforeAll(() => {
        jest.mock('debug', () => () => mockDebug);
        jest.mock('./knex', () => () => ({ insert: mockInsert }));

        reservations = require('./reservations');

    });

    afterAll(() => {
        jest.unmock('debug');
        jest.unmock('./knex');
    });

    it("resolve-with-id", async () => {
        const value = { "test": true };
        const expected = [1];

        const actual = await reservations.save(value);

        expect(actual).toEqual(expected);
        expect(mockDebug).toBeCalledTimes(1);
        expect(mockInsert).toBeCalledWith(value);

    })

});




describe("create", () => {

    let reservations;

    beforeAll(() => {
        reservations = require('./reservations');
    });

    it("validate-called", async () => {
        const mock = jest.spyOn(reservations, "validate");

        const value = undefined;

        await expect(reservations.validate(value))
            .rejects.toThrow("Cannot read properties of undefined (reading 'validate')");

        expect(mock).toBeCalledWith(value);

        mock.mockRestore();

    });


    it("reject-validation-spy", async () => {
        const mock = jest.spyOn(reservations, "validate");

        const error = new Error("fail");

        mock.mockImplementation()
        await expect(reservations.validate(value))
            .rejects.toThrow("Cannot read properties of undefined (reading 'validate')");

        expect(mock).toBeCalledWith(value);

        mock.mockRestore();

    });




})


