enum TokenType {
    NUMBER = "NUMBER",
    OPERATOR = "OPERATOR",
}

enum OperatorType {
    ADDITION = "+",
    SUBTRACTION = "-",
    MULTIPLICATION = "*",
    DIVISION = "/",
}

class Token {
    type: TokenType;
    value: string;

    constructor(type: TokenType, value: string) {
        this.type = type;
        this.value = value;
    }
}

const isNumeric = (token: string): boolean => {
    return !isNaN(Number(token)) && !isNaN(parseFloat(token));
}

const classifyToken = (token: string): Token => {
    const tokenType = isNumeric(token) ? TokenType.NUMBER : TokenType.OPERATOR;
    return new Token(tokenType, token);
}

export { TokenType, OperatorType, Token, isNumeric, classifyToken };