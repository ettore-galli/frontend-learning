import "./components/simpleLabel/SimpleLabel.js";
import "./components/customNumber/CustomNumber.js";
import "./components/inputField/inputField.js";

export function renderApp(root: HTMLElement) {
    const label = document.createElement("simple-label");
    label.setAttribute("label-text", "H3ll0, w0r1|>");
    label.setAttribute("label-level", "1");



    root?.appendChild(label);

    [1, 2, 3, 4, 5].forEach((number) => {
        console.log("number", number)
        const numb = document.createElement("custom-number");
        numb.setAttribute("number-value", String(number));
        numb.setAttribute("id", `num-${String(number)}`);
        root?.appendChild(numb);


        const btn = document.createElement("button") as HTMLButtonElement;

        btn.textContent = `Click-${number}`;

        root?.appendChild(btn);

        const inp1 = document.createElement("input-field");

        root?.appendChild(inp1);

        btn.onclick = () => {
            numb.setAttribute("number-value", String(inp1.value));
        }

    })

}