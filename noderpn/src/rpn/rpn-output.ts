import { RPNResult } from "./rpn-logic";



const renderCalcResult = (result: RPNResult, writer: (output: string) => void) => {
    result.result.forEach(element => {
        writer(element);
    });
}

export { renderCalcResult }