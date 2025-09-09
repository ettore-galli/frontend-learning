
import { CalculatorKeyFunctions, type CalculatorKeyFunctionsType } from '../../logic/CalculatorKeyFunctions';
import { CalcStateContext, CalcDispatchContext } from "../../logic/CalculatorContext";
import "./keyboard.css"
import { useContext } from 'react';
import { CalculatorAction } from '../../logic/CalculatorReducer';



class CalcButton {
    label: string
    value: CalculatorKeyFunctionsType | number | undefined
    span: number
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined

    constructor(
        value: CalculatorKeyFunctionsType | number | undefined,
        span: number,
        label?: string,
        onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined

    ) {
        this.value = value;
        this.span = span;
        this.label = value === CalculatorKeyFunctions.EMPTY ? "" : label || String(value);
        this.onClick = onClick
    }
}





function renderButton(button: CalcButton, index: number) {

    const key = `button-${index}`

    return (
        button.value !== CalculatorKeyFunctions.EMPTY
            ?
            <button
                className={`key key-span-${button.span}`}
                key={key}
                value={button.value}
                onClick={button.onClick}
            >
                {button.label}
            </button>
            :
            <div
                className={`key-placeholder key-span-${button.span}`}
                key={key}
            >
            </div>
    );
}

function Keyboard() {
    const dispatch = useContext(CalcDispatchContext);

    const PLUS_SIGN = "+";
    const MINUS_SIGN = "−"
    const MULT_SIGN = "×";
    const DIV_SIGN = "÷";

    const buttonDefinitions: CalcButton[] = [
        new CalcButton(1, 1),
        new CalcButton(2, 1),
        new CalcButton(3, 1),
        new CalcButton(CalculatorKeyFunctions.ADD, 1, PLUS_SIGN),
        //
        new CalcButton(4, 1),
        new CalcButton(5, 1),
        new CalcButton(6, 1),
        new CalcButton(CalculatorKeyFunctions.SUBTRACT, 1, MINUS_SIGN),
        //
        new CalcButton(7, 1),
        new CalcButton(8, 1),
        new CalcButton(9, 1),
        new CalcButton(CalculatorKeyFunctions.MULTIPLY, 1, MULT_SIGN),
        //
        new CalcButton(CalculatorKeyFunctions.EMPTY, 1),
        new CalcButton(0, 1),
        new CalcButton(CalculatorKeyFunctions.EMPTY, 1),
        new CalcButton(CalculatorKeyFunctions.DIVIDE, 1, DIV_SIGN),
        //
        new CalcButton(CalculatorKeyFunctions.SWAP, 1, "SWP", (_) => {
            if (dispatch) {
                dispatch(new CalculatorAction(CalculatorKeyFunctions.SWAP, undefined))
            }
        }),
        new CalcButton(CalculatorKeyFunctions.SWAP, 1, "DRP", (_) => {
            if (dispatch) {
                dispatch(new CalculatorAction(CalculatorKeyFunctions.DROP, undefined))
            }
        }),
        new CalcButton(CalculatorKeyFunctions.ENTER, 2),


    ]
    return (
        <>
            <div className="keyboard">
                {buttonDefinitions.map(renderButton)}
            </div>
        </>
    )
}

export default Keyboard
