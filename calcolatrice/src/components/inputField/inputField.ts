
interface Properties {
    value: Number,
    placeholder: string | null
}

class InputField extends HTMLElement {
    static get getObservedproperties() { return ["value", "placeholder"] };
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" })
    }

    getInputElement(): (HTMLInputElement | null) {
        return this.shadow.querySelector("input");
    }

    getIputElementValue(): string {
        const inputElement: HTMLInputElement | null = this.getInputElement()
        return inputElement ? inputElement.value : "";
    }

    set value(val: Number) {
        this.getInputElement()!.value = String(val);
    }

    get value(): Number {
        return Number(this.getIputElementValue());
    }

    set properties(props: Properties) {
        this.setAttribute("value", String(props.value));
        props.placeholder === null ? this.removeAttribute("placeholder") : this.setAttribute("placeholder", props.placeholder);
    }

    render(props: Properties) {
        this.shadow.innerHTML = `<input type='number' placeholder='${props.placeholder || 'some value'}' value='${props.value}'></input>`
    }

    getCurrentproperties(): Properties {
        return {
            value: Number(this.getAttribute("number")),
            placeholder: this.getAttribute("placeholder")
        }
    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        const properties = {
            ...this.getCurrentproperties(),
            [name]: newVal
        }
        this.render(properties);
    }

    connectedCallback() {
        this.render(this.getCurrentproperties());
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "input-field": InputField;
    }
}

customElements.define("input-field", InputField, { extends: "input" });