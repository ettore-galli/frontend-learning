
import {
    supersomma,
    totalizer,
    willSum,
    willSumSmallNumbers,
    willSumViaCallback,
    totalOrderQty
} from '../../lib/math';

import { Order, OrderItem } from '../../lib/data';

const mockOrder: Order = new Order(123, [new OrderItem("pere", 7), new OrderItem("banane", 4)]);

jest.mock('../../lib/data', () => {
    return {
        ...jest.requireActual('../../lib/data'),
        fetchOrder: (orderNumber: number) => mockOrder
    }
});

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
                return done(err)
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

// Promise / rejected
describe("Test will sum small numbers", () => {
    it("Fallisce", async () => {
        await expect(willSumSmallNumbers([1, 2, 1001])).rejects.toEqual("Some items are too big");
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


// Mock 1 - Mock funzione - semplice sostitutivo
describe("Test totalizer mock", () => {
    it("La callback è richiamata correttamente", () => {
        const mockCallback = jest.fn()
        willSumViaCallback([1, 2], mockCallback);
        expect(mockCallback.mock.calls).toHaveLength(1);
        expect(mockCallback.mock.calls).toEqual([[[1, 2]]]);
    })
});

// Mock 2 - Mock modulo data
describe("Test totalOrderQty", () => {
    it("Esegue la somma delle quantità", () => {
        expect(totalOrderQty(1)).toEqual(11);
    })
});
