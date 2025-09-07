import "./display.css";

const NOTHING = "-"
class DisplayProps {

    lines: (string | number)[]

    constructor(lines: (string | number | null | undefined)[]) {
        this.lines = lines.map(line => line || NOTHING);
    }
}


function Display(props: DisplayProps) {
    return (
        <div className="display">
            {props.lines.map(
                (line) => {
                    return <input className="line" readOnly={true} type="text" value={line}></input>;
                }
            )}
        </div>
    )
}

export default Display
