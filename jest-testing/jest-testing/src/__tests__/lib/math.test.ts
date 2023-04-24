import { assert, error } from 'console';
import { supersomma, totalizer, willSum, willSumViaCallback } from '../../lib/math';


// Semplice test

describe("Test somma", () => {
    it("Esegue la somma", () => {
        expect(supersomma(1, 2)).toEqual(3);
    })
    it("Esegue 1 + 1", () => {
        expect(supersomma(1, 1)).toEqual(1.999999999874635);
    })
})


// Callback

describe("Test totalizer", () => {
    it("Richiama la somma", (done) => {
        totalizer([1, 2], (samples: number[]) => {
            try {
                expect(samples).toEqual([1, 2])
                return done();
            } catch (err) {
                return done(error)
            }
        })
    })
})

// Promise
describe("Test will sum", () => {
    it("Richiama la somma con promise", async () => {
        await expect(willSum([1, 2])).resolves.toEqual(3);
    })
})

// Async/Await
describe("Test will sum", () => {
    it("Richiama la somma async", async () => {
        const result = await willSum([1, 2]);
        expect(result).toEqual(3);
    })
})

// Promise + callback
describe("Test will sum con callback", () => {
    it("La callback è richiamata correttamente", (done) => {
        willSumViaCallback([1, 2], (items: number[]) => {
            try {
                expect(items).toEqual([1, 2]);
                return done()
            } catch (err) {
                return done(err);
            }
        });
    })
});


