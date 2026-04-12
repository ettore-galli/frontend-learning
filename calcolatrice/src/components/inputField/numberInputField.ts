import { BaseInputField } from './baseInputField.js'

class NumberInputField extends BaseInputField {






    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        console.log("changed", name, newVal)
        this.render(
            this.root, newVal
        );
    }

    get numberValue(): Number | undefined {
        return Number(this._input?.value);
    }

    set numberValue(val: Number) {
        if (this._input) {
            this._input.value = String(val);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "number-input-field": NumberInputField;
    }
}

customElements.define("number-input-field", NumberInputField);