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
        acc.push(token);
    } else {
        if (acc.length < 2) {
            throw new Error("Insufficient values in the stack for operation");
        }
        // Pop the last two numbers from the stack
        const b = acc.pop();
        const a = acc.pop();

        switch (identifyOperator(String(token))) {
            case OperatorType.ADDITION:
                acc.push(a + b);
                break;
            case OperatorType.SUBTRACTION:
                acc.push(a - b);
                break;
            case OperatorType.MULTIPLICATION:
                acc.push(a * b);
                break;
            case OperatorType.DIVISION:
                if (b === 0) {
                    throw new Error("Division by zero");
                }
                acc.push(a / b);
                break;
            default:
                throw new Error(`Unknown operator: ${token}`);
        }
    }
    return acc;
}

const evaluateRPN = (tokens: string[]): RPNResult => {
    return checkRPN(tokens) ? new RPNResult(true,
        tokens.map(item => isNumeric(item) ? Number(item) : item).reduce(processRPNStep, [])) :
        new RPNResult(false, tokens);
}

export { TokenType, OperatorType, Token, isNumeric, classifyToken, identifyOperator, RPNResult, checkRPN, evaluateRPN };