
const CalculatorKeyFunctions = {
  TYPE: "TYPE",
  ENTER: "ENTER",
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  EMPTY: "EMPTY",
  SWAP: "SWAP",
  DROP: "DROP",
  POINT: "."
} as const;

type CalculatorKeyFunctionsType = typeof CalculatorKeyFunctions[keyof typeof CalculatorKeyFunctions];

export { CalculatorKeyFunctions }
export type { CalculatorKeyFunctionsType }