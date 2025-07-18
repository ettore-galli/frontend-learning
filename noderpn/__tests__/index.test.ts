import { somma } from '../src/index';

test('somma di 2 + 3 deve essere 5', () => {
    expect(somma(2, 3)).toBe(5);
});
