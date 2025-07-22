"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRPNStep = exports.evaluateRPN = exports.checkRPN = exports.RPNResult = exports.identifyOperator = exports.classifyToken = exports.isNumeric = exports.Token = exports.OperatorType = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType["NUMBER"] = "NUMBER";
    TokenType["OPERATOR"] = "OPERATOR";
})(TokenType || (exports.TokenType = TokenType = {}));
var OperatorType;
(function (OperatorType) {
    OperatorType["ADDITION"] = "+";
    OperatorType["SUBTRACTION"] = "-";
    OperatorType["MULTIPLICATION"] = "*";
    OperatorType["DIVISION"] = "/";
})(OperatorType || (exports.OperatorType = OperatorType = {}));
class Token {
    type;
    value;
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
exports.Token = Token;
class RPNResult {
    success;
    result;
    constructor(success, result) {
        this.success = success;
        this.result = result;
    }
}
exports.RPNResult = RPNResult;
const isNumeric = (token) => {
    return typeof token === 'number' || (!isNaN(Number(token)) && !isNaN(parseFloat(token)));
};
exports.isNumeric = isNumeric;
const classifyToken = (token) => {
    const tokenType = isNumeric(token) ? TokenType.NUMBER : TokenType.OPERATOR;
    return new Token(tokenType, token);
};
exports.classifyToken = classifyToken;
const identifyOperator = (operator) => {
    const operators = {
        "+": OperatorType.ADDITION,
        "-": OperatorType.SUBTRACTION,
        "*": OperatorType.MULTIPLICATION,
        "/": OperatorType.DIVISION,
    };
    return operators[operator] || null;
};
exports.identifyOperator = identifyOperator;
const checkRPN = (tokens) => tokens.every(token => isNumeric(token) || identifyOperator(token) !== null);
exports.checkRPN = checkRPN;
const processRPNStep = (acc, token) => {
    if (isNumeric(token)) {
        return [...acc, Number(token)];
    }
    else {
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
};
exports.processRPNStep = processRPNStep;
const evaluateRPN = (tokens) => {
    if (!checkRPN(tokens)) {
        return new RPNResult(false, tokens);
    }
    let stack = [];
    for (const token of tokens) {
        stack = processRPNStep(stack, token);
        if (stack[stack.length - 1] instanceof Error) {
            return new RPNResult(false, stack);
        }
    }
    return new RPNResult(true, stack);
};
exports.evaluateRPN = evaluateRPN;
