import { evaluateRPN } from "./rpn/rpn-logic";


const main = (args: string[]): void => {

  console.log(console.log(evaluateRPN(args)));
}


main(process.argv.slice(2));