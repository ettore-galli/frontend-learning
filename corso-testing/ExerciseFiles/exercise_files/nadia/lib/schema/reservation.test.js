const Reservation = require('./reservation');

describe("combine date time", () => {
    it("Shoud do coso", () => {
        const date = "2023/03/31";
        const time = "07:15 PM";

        const expected = "2023-03-31T19:15:00.000Z";
        const actual = Reservation.combineDateTime(date, time);

        expect(actual).toEqual(expected);
    });


    it("fails", () => {

        const date = "aasdad";
        const time = "fail";

        expect(Reservation.combineDateTime(date, time)).toBeNull();

    })
});


describe("async test", () => {
    it("callback test", done => {
        function cb(testo) {
            try {
                expect(testo).toEqual("AAA");
                done();
            } catch (error) {
                done(error);
            }
        }

        Reservation.cosoAsincrono(cb, "AAA");
    });
});


describe("validate", () => {
    it("optionals-empty-ok", done => {

        const exampleRes = {
            party: 2,
            name: "ettore",
            email: "mail@coso.it",
            date: "2023/03/31",
            time: "12:00:00",
        };

        const reserv = new Reservation(exampleRes);

        function validateCb(error, value) {
            try {
                expect(value).toEqual(reserv);
                expect(error).toBe(undefined);
                done();
            } catch (error) {
                done(error);
            }
        }

        reserv.validate(validateCb);




    });


    it("invalid-email", done => {

        const exampleRes = {
            party: 2,
            name: "ettore",
            email: "***",
            date: "2023/03/31",
            time: "12:00:00",
        };

        const reserv = new Reservation(exampleRes);

        function validateCb(error) {
            try {
                expect(error).toBeInstanceOf(Error);
                done();
            } catch (error) {
                done(error);
            }
        }

        reserv.validate(validateCb);
    });

    // it("validate-called", async () => {
    //     const mock = jest.spyOn(reserv, "validate");

    //     const value = undefined;

    //     await expect(reserv.validate(value))
    //         .rejects.toThrow("cannot read property \"validate\" of undefined");

    //     expect(mock).toBeCalledWitd(value);

    //     mock.mockRestore();


    // });
});