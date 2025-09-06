
import { CalculatorKeyFunctions, type CalculatorKeyFunctionsType } from '../../logic/CalculatorKeyFunctions';
import "./keyboard.css"

class CalcButton {
    label: string
    value: CalculatorKeyFunctionsType | number | undefined
    span: number
    constructor(
        value: CalculatorKeyFunctionsType | number | undefined,
        span: number,
        label?: string,

    ) {
        this.value = value;
        this.span = span;
        this.label = value === CalculatorKeyFunctions.EMPTY ? "" : label || String(value);
    }
}

const buttonDefinitions: CalcButton[] = [
    new CalcButton(1, 1), new CalcButton(2, 1), new CalcButton(3, 1),
    new CalcButton(4, 1), new CalcButton(5, 1), new CalcButton(6, 1),
    new CalcButton(7, 1), new CalcButton(8, 1), new CalcButton(9, 1),
    new CalcButton(0, 1), new CalcButton(CalculatorKeyFunctions.ENTER, 2),
]

function renderButton(button: CalcButton) {
    const buttonClass = `key key-span-${button.span}`;

    return (
        <button className={buttonClass} key={button.value} value={button.value}>{button.label}</button>
    );
}



function Keyboard() {
    return (
        <>
            <div className="keyboard">
                {buttonDefinitions.map(renderButton)}
            </div>
        </>
    )
}

export default Keyboard
