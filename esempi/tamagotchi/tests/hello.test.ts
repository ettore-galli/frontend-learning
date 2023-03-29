import { sayHello } from '../src/hello';

describe("Test hello functions", ()=>{
    it("Builds Hello sentence", ()=>{
        expect(sayHello("World")).toBe("Hello, World!")
    })
})