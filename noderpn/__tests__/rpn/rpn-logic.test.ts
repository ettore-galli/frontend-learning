import { isNumeric, classifyToken, Token, TokenType } from '../../src/rpn/rpn-logic';

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

