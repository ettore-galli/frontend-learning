import { isNumeric, classifyToken, Token, TokenType, RPNResult, checkRPN, evaluateRPN, processRPNStep } from '../../src/rpn/rpn-logic';

test('Is Numeric', () => {
    expect(isNumeric("2")).toBe(true);
});


test.each([
    ["2", new Token(TokenType.NUMBER, "2")],
    ["+", new Token(TokenType.OPERATOR, "+")]
])("Classify Token", (token: string, expected: Token) => {
    const classifiedToken = classifyToken(token);
    expect(classifiedToken).toEqual(expected);
});


test.each([
    [["1", "2", "+", "4", "*"], true],
    [["1", "q", "+", "x", "wetyt"], false],
])("checkRPN", (tokens: string[], expectedResult) => {
    const result = checkRPN(tokens);
    expect(result).toEqual(expectedResult);
});


test.each([
    [["3", "4"], "*", [12]],
    [["1", "q", "+", "x"], "wetyt", ["1", "q", "+", "x", new Error("Unknown operator: wetyt")]],
])("processRPNStep", (stack: any[], token: any, expectedStack: any[]) => {
    const result = processRPNStep(stack, token);
    expect(result).toEqual(expectedStack);
});


test.each([
    [["1", "2", "+", "4", "*"], new RPNResult(true, [12])],
    [["1", "q", "+", "x", "wetyt"], new RPNResult(false, ["1", "q", "+", "x", "wetyt"])],
])("evaluateRPN", (tokens: string[], expectedResult) => {
    const result = evaluateRPN(tokens);
    expect(result).toEqual(expectedResult);
});

