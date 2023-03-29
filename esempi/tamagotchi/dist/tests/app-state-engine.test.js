"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_state_engine_1 = require("../src/app-state-engine");
describe("Test application state", () => {
    it("Tests state inistalization", () => {
        const state = new app_state_engine_1.ApplicationState();
        state.setState("TEST", { value: "test-value" });
        expect(state.centralAppState).toStrictEqual({ "TEST": { value: "test-value" } });
    });
});
