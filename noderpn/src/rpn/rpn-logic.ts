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

class RPNResult {
    success: boolean;
    result: any[];

    constructor(success: boolean, result: any[]) {
        this.success = success;
        this.result = result;
    }
}

const isNumeric = (token: string | number): boolean => {
    return typeof token === 'number' || (!isNaN(Number(token)) && !isNaN(parseFloat(token)));
}

const classifyToken = (token: string): Token => {
    const tokenType = isNumeric(token) ? TokenType.NUMBER : TokenType.OPERATOR;
    return new Token(tokenType, token);
}

const identifyOperator = (operator: string): OperatorType => {
    const operators: { [key: string]: OperatorType } = {
        "+": OperatorType.ADDITION,
        "-": OperatorType.SUBTRACTION,
        "*": OperatorType.MULTIPLICATION,
        "/": OperatorType.DIVISION,
    };
    return operators[operator] || null;
}

const checkRPN = (tokens: string[]): boolean => tokens.every(token => isNumeric(token) || identifyOperator(token) !== null);



const processRPNStep = (acc: any[], token: any): any[] => {
    if (isNumeric(token)) {
        return [...acc, Number(token)];
    } else {
        if (acc.length < 2) {
            return [...acc, new Error("Insufficient values in the stack for operation")];
        }

        const [a, b] = acc.slice(-2);
        const leftAcc = acc.slice(0, -2);


        switch (identifyOperator(String(token))) {
            case OperatorType.ADDITION:
                return [...leftAcc, a + b];
            case OperatorType.SUBTRACTION:
                return [...leftAcc, a - b];
            case OperatorType.MULTIPLICATION:
                return [...leftAcc, a * b];
            case OperatorType.DIVISION:
                if (b === 0) {
                    return [...acc, new Error("Division by zero")];
                }
                return [...leftAcc, a / b];

            default:
                return [...acc, new Error(`Unknown operator: ${token}`)];

        }
    }
}

const evaluateRPN = (tokens: string[]): RPNResult => {
    return checkRPN(tokens) ? new RPNResult(true,
        tokens.map(item => isNumeric(item) ? Number(item) : item).reduce(processRPNStep, [])) :
        new RPNResult(false, tokens);
}

export { TokenType, OperatorType, Token, isNumeric, classifyToken, identifyOperator, RPNResult, checkRPN, evaluateRPN, processRPNStep };