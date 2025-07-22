"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCalcResult = void 0;
const renderCalcResult = (result, writer) => {
    result.result.forEach(element => {
        writer(element);
    });
};
exports.renderCalcResult = renderCalcResult;
