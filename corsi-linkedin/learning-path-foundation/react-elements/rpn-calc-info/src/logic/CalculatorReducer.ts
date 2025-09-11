import { useReducer } from 'react';

const CalculatorState = {
    stack: [] as (string | number | undefined)[],
    currentInput: "" as string,
    success: true as boolean
};

const initialCalculatorState: typeof CalculatorState = {
    stack: [3.1415, 2.71828, 9.81],
    currentInput: "" as string,
    success: true as boolean
};

class CalculatorAction {
    type: string
    payload?: string | number | undefined
    constructor(type: string, payload?: string | number | undefined) {
        this.type = type;
        this.payload = payload;
    }
}

const applyDefaultsTostate = (state: typeof CalculatorState): typeof CalculatorState => {
    return {
        ...state, success: true
    }
}



const calculatorReducer = (state = CalculatorState, action: CalculatorAction): typeof CalculatorState => {
    switch (action.type) {
        case 'TYPE':
            return {
                ...applyDefaultsTostate(state),
                currentInput: state.currentInput + (action.payload ? String(action.payload) : ""),
            };
        case 'ENTER':
            if (state.currentInput === "") {
                return {
                    ...applyDefaultsTostate(state),
                };
            }
            try {
                const value: number = parseFloat(state.currentInput);
                return {
                    ...applyDefaultsTostate(state),
                    stack: [...applyDefaultsTostate(state).stack, value],
                    currentInput: ""
                };
            } catch (e) {
                return {
                    ...applyDefaultsTostate(state),
                    success: false,
                };
            }
        case 'PUSH':
            return {
                ...applyDefaultsTostate(state),
                stack: [...applyDefaultsTostate(state).stack, action.payload],
            };
        case 'POP':
            if (state.stack.length === 0) {
                return {
                    ...applyDefaultsTostate(state),
                    success: false
                };
            }
            return {
                ...applyDefaultsTostate(state),

                stack: state.stack.slice(0, -1),
            };
        case 'SWAP':
            if (state.stack.length < 2) {
                return {
                    ...applyDefaultsTostate(state),
                    success: false
                };
            }
            const reversed = state.stack.slice(-2).reverse();
            return {
                ...applyDefaultsTostate(state),
                stack: [...applyDefaultsTostate(state).stack.slice(0, -2), ...reversed],
            };
        case 'DROP':
            if (state.stack.length < 1) {
                return {
                    ...applyDefaultsTostate(state),
                    success: false
                };
            }
            return {
                ...applyDefaultsTostate(state),
                stack: state.stack.slice(0, -1),
            };
        case 'ADD':
            {
                if (state.stack.length < 2) {
                    return {
                        ...applyDefaultsTostate(state),
                        success: false
                    };
                }
                const [b, a] = state.stack.slice(-2) as number[];
                return {
                    ...applyDefaultsTostate(state),
                    stack: state.stack.slice(0, -2).concat([a + b]),
                };
            }
        case 'SUBTRACT':
            {
                if (state.stack.length < 2) {
                    return {
                        ...applyDefaultsTostate(state),
                        success: false
                    };
                }
                const [b, a] = state.stack.slice(-2) as number[];
                return {
                    ...applyDefaultsTostate(state),
                    stack: state.stack.slice(0, -2).concat([b - a]),
                };
            }
        case 'MULTIPLY':
            {
                if (state.stack.length < 2) {
                    return {
                        ...applyDefaultsTostate(state),
                        success: false
                    };
                }
                const [b, a] = state.stack.slice(-2) as number[];
                return {
                    ...applyDefaultsTostate(state),
                    stack: state.stack.slice(0, -2).concat([a * b]),
                };
            }
        case 'DIVIDE':
            {
                if (state.stack.length < 2) {
                    return {
                        ...applyDefaultsTostate(state),
                        success: false
                    };
                }
                const [b, a] = state.stack.slice(-2) as number[];
                if (a === 0) {
                    return {
                        ...applyDefaultsTostate(state),
                        success: false
                    };
                }
                return {
                    ...applyDefaultsTostate(state),
                    stack: state.stack.slice(0, -2).concat([b / a]),
                };
            }
        default:
            return state;
    }
};

const useCalculator = () => {
    const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);
    return { state, dispatch };
};


export { CalculatorState, CalculatorAction, calculatorReducer, useCalculator };