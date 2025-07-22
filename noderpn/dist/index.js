"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const rpn_logic_1 = require("./rpn/rpn-logic");
const rpn_output_1 = require("./rpn/rpn-output");
const main = (args) => {
    const result = (0, rpn_logic_1.evaluateRPN)(args);
    (0, rpn_output_1.renderCalcResult)(result, console.log);
};
exports.main = main;
main(process.argv.slice(2));
