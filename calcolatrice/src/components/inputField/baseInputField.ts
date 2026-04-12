class BaseInputField extends HTMLElement {
    protected root: ShadowRoot;
    protected _input: HTMLInputElement | null = null;

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "closed" });
    }

    render(root: ShadowRoot, value: string) {
        root.innerHTML = `<input value="${value}"></input>`;
    }

    connectedCallback() {
        this.render(this.root, this.getAttribute("value") || "");
        this._input = this.root?.querySelector("input");

    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        console.log("changed", name, newVal)
        this.render(
            this.root, newVal
        );
    }

    get value(): string | undefined {
        return this._input?.value;
    }

    set value(val: string) {
        if (this._input) {
            this._input.value = val;
        }
    }
}

export { BaseInputField };
