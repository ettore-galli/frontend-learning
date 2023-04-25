import { remindMe } from '../../lib/reminder';

describe("Test reminder", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
    })

    it("Esempio di mock di Timeout", () => {

        jest.spyOn(global, 'setTimeout');

        remindMe("test", 1234, jest.fn());
 
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1234);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.anything(), 1234);

    })

    it("Esempio di simulazione di delay", () => {
        const callback = jest.fn();
        remindMe("test", 0, callback);
        expect(callback).not.toBeCalled();
        jest.runAllTimers();
        expect(callback).toBeCalled();
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBe
    })
})