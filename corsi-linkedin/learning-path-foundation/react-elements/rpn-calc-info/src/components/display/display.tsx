import { useContext } from "react";
import "./display.css";
import { CalcStateContext, CalcDispatchContext } from "../../logic/CalculatorContext";

const NOTHING = "-"
class DisplayProps {

    lines: (string | number)[]

    constructor(lines: (string | number | null | undefined)[]) {
        this.lines = lines.map(line => line || NOTHING);
    }
}


function Display(props: DisplayProps) {
    const state = useContext(CalcStateContext);
    const dispatch = useContext(CalcDispatchContext);
    
    console.log(state)
    console.log(dispatch)

    return (
        <div className="display">
            {props.lines.map(
                (line, index) => {
                    return <input className="line" key={`line-${index}`} readOnly={true} type="text" value={line}></input>;
                }
            )}
        </div>
    )
}

export default Display
