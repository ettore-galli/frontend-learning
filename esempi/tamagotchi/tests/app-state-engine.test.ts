import { ApplicationState } from '../src/app-state-engine';


describe("Test application state", () => {
    it("Tests state inistalization", () => {
        const state = new ApplicationState();
        state.setState("TEST", { value: "test-value" });
        expect(state.centralAppState).toStrictEqual({ "TEST": { value: "test-value" } });
    })
})