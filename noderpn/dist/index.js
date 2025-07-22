"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const rpn_logic_1 = require("./rpn/rpn-logic");
const main = (args) => {
    console.log("Evaluating RPN expression:", args);
    console.log(console.log((0, rpn_logic_1.evaluateRPN)(args)));
};
exports.main = main;
main(process.argv.slice(2));
