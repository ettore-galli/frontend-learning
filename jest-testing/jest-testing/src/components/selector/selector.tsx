import React, { useState } from "react";

class SelectorProps {
    title: string | null = null;
}

const Selector = (props: SelectorProps) => {

    const [selected, setSelected] = useState("");
    const options: Array<number | string> = ["", "A", "B", "C"]
    return <>
        <div>{props.title} [{selected}]</div>

        <select onChange={(e) => setSelected(e.target.value)}>
            {options.map(opt => <option key={opt} value={opt} >{opt}</option>)}
        </select>
    </>
}


export { Selector };