import { useContext } from "react";
import "./display.css";
import { CalcStateContext } from "../../logic/CalculatorContext";

function Display() {
    const state = useContext(CalcStateContext);
    const lines: (string | number)[] = state ? state.stack.map(value => (typeof value !== "undefined") ? value : "") : [];

    const displpayInputLine: boolean = state ? (state && !!state.currentInput) : false;
    const displpayErrorLine: boolean = state ? (state && !state.success) : false;

    type DisplayLine = {
        key: string,
        value: string | number,
        type: string
    };
    interface StyledDisplayLine extends DisplayLine {
        class: string
    };

    const displayLines: DisplayLine[] =
        lines.map(
            (line, index): DisplayLine => {
                return {
                    key: `line-${index}`,
                    value: line,
                    type: "line"
                };
            }
        ).concat(displpayInputLine ? [
            {
                key: "input",
                value: state?.currentInput,
                type: "input"
            } as DisplayLine
        ] : []).concat(displpayErrorLine ? [
            {
                key: "error",
                value: "ERROR",
                type: "error"
            } as DisplayLine
        ] : []);

    const displayLinesWithStyle = displayLines.map(
        (line: DisplayLine, index: number): StyledDisplayLine => {
            const isFirst: boolean = index === 0;
            const isLast: boolean = index === displayLines.length - 1
            const addedClass = [{ cond: isFirst, value: "stack-top" }, { cond: isLast, value: "stack-bottom" }, { cond: true, value: "stack-mid" }].find(element => element.cond)?.value;
            return {
                ...line,
                class: `${line.type} ${addedClass}`
            }
        }
    )

    return (
        <div className="display">
            {
                displayLinesWithStyle.map(
                    (line) => {
                        return <div className={line.class} key={line.key} >{line.value}</div>;
                    }
                )
            }
        </div>
    )
}

export default Display
