import { supersomma } from '../../lib/math';

describe("Test somma", () => {
    it("Esegue la somma", () => {
        expect(supersomma(1, 2)).toEqual(3);
    })
    it("Esegue 1 + 1", () => {
        expect(supersomma(1, 1)).toEqual(1.999999999874635);
    })
})


