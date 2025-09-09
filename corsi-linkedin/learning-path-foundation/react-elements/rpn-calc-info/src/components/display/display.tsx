import { useContext } from "react";
import "./display.css";
import { CalcStateContext } from "../../logic/CalculatorContext";


// const NOTHING = "-"
// class DisplayProps {

//     lines: (string | number)[]

//     constructor(lines: (string | number | null | undefined)[]) {
//         this.lines = lines.map(line => line || NOTHING);
//     }
// }


function Display() {
    const state = useContext(CalcStateContext);
    const lines: (string | number)[] = state ? state.stack.map(value => (typeof value !== "undefined") ? value : "") : [];

    const errorOccurred: boolean = state ? (state && !state.success) : false;

    return (
        <div className="display">
            {
                lines.map(
                    (line, index) => {
                        return <input className="line" key={`line-${index}`} readOnly={true} type="text" value={line}></input>;
                    }
                )
            }

            {
                <input className="input" key={`input`} readOnly={true} type="text" value={state?.currentInput}></input>
            }


            {
                errorOccurred && <input className="error" key={`error`} readOnly={true} type="text" value={"ERROR"}></input>
            }

        </div>
    )
}

export default Display
