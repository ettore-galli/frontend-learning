
const CalculatorKeyFunctions = {
  ENTER: "ENTER",
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  EMPTY: "EMPTY",
  SWAP: "SWAP",
  DROP: "DROP"
} as const;

type CalculatorKeyFunctionsType = typeof CalculatorKeyFunctions[keyof typeof CalculatorKeyFunctions];

export { CalculatorKeyFunctions }
export type { CalculatorKeyFunctionsType }