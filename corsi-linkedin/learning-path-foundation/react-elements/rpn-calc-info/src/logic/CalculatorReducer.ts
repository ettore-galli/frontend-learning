import { useReducer } from 'react';

const CalculatorState = {
    stack: [] as (string | number | undefined)[],
    success: true
};

const initialCalculatorState: typeof CalculatorState = {
    stack: [3.1415, 2.71828, 9.81],
    success: true
};

class CalculatorAction {
    type: string
    payload?: string | number | undefined
    constructor(type: string, payload?: string | number | undefined) {
        this.type = type;
        this.payload = payload;
    }
}

const calculatorReducer = (state = CalculatorState, action: CalculatorAction): typeof CalculatorState => {
    switch (action.type) {
        case 'PUSH':
            return {
                ...state,
                stack: [...state.stack, action.payload],
            };
        case 'POP':
            if (state.stack.length === 0) {
                return {
                    ...state,
                    success: false
                };
            }
            return {
                ...state,
                stack: state.stack.slice(0, -1),
            };
        case 'SWAP':
            if (state.stack.length < 2) {
                return {
                    ...state,
                    success: false
                };
            }
            return {
                ...state,
                stack: state.stack.slice(0, -1),
            };
        case 'DROP':
            if (state.stack.length < 1) {
                return {
                    ...state,
                    success: false
                };
            }
            return {
                ...state,
                stack: state.stack.slice(0, -1),
            };
        default:
            return state;
    }
};

const useCalculator = () => {
    const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);
    return { state, dispatch };
};


export { CalculatorState, CalculatorAction, calculatorReducer, useCalculator };