import { supersomma } from '../../lib/math';

describe("Test somma", () => {
    it("Esegue la somma", () => {
        expect(supersomma(1, 2)).toEqual(3);
    })
})


