"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("../src/hello");
describe("Test hello functions", () => {
    it("Builds Hello sentence", () => {
        expect((0, hello_1.sayHello)("World")).toBe("Hello, World!");
    });
});
