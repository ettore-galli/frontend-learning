import { evaluateRPN } from "./rpn/rpn-logic";

const main = (args: string[]): void => {
  console.log("Evaluating RPN expression:", args);
  console.log(console.log(evaluateRPN(args)));
}


export { main };

main(process.argv.slice(2));