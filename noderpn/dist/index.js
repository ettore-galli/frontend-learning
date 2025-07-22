"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpn_logic_1 = require("./rpn/rpn-logic");
const main = (args) => {
    console.log(console.log((0, rpn_logic_1.evaluateRPN)(args)));
};
main(process.argv.slice(2));
