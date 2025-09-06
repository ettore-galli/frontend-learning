
const CalculatorKeyFunctions = {
  ENTER: "ENTER",
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  EMPTY: "EMPTY"
} as const;

type CalculatorKeyFunctionsType = typeof CalculatorKeyFunctions[keyof typeof CalculatorKeyFunctions];

export { CalculatorKeyFunctions }
export type { CalculatorKeyFunctionsType }