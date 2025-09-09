import { createContext } from 'react';
import { CalculatorState, CalculatorAction } from './CalculatorReducer';


export const CalcStateContext = createContext<typeof CalculatorState | null>(null);
export const CalcDispatchContext = createContext<React.Dispatch<CalculatorAction> | null>(null);