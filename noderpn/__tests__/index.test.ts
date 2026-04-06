import { main } from '../src/index';

test('Main runs', () => {
    expect(main(["2", "3", "+"])).toBe(undefined);
});
