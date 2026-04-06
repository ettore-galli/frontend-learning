import { evaluateRPN, RPNResult } from "./rpn/rpn-logic";
import { renderCalcResult } from "./rpn/rpn-output";

const main = (args: string[]): void => {
  const result: RPNResult = evaluateRPN(args);
  renderCalcResult(result, console.log);
}


export { main };

main(process.argv.slice(2));