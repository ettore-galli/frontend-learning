import { BaseInputField } from './baseInputField.js';

class NumberInputField extends BaseInputField {
  attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
    console.log('changed', name, newVal);
    this.render(this.root, newVal);
  }

  get numberValue(): number | undefined {
    return Number(this.rawValue);
  }

  set numberValue(val: number) {
    if (this._input) {
      this.rawValue = String(val);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'number-input-field': NumberInputField;
  }
}

customElements.define('number-input-field', NumberInputField);
