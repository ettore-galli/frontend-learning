class CustomNumber extends HTMLElement {
  static get observedAttributes() {
    return ['number-value'];
  }
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  set numberValue(actualValue: number) {
    this.setAttribute('number-value', String(actualValue));
  }

  get numberValue() {
    return Number(this.getAttribute('number-value'));
  }

  render(numberValue: number) {
    const rendered: string = `*${numberValue}*`;
    const componentHTML = `<span id="number">${rendered}</span>`;

    this.shadow.innerHTML = componentHTML;
  }

  attributeChangedCallback(_name: string, _oldVal: string, newVal: string) {
    this.render(Number(newVal));
  }

  connectedCallback() {
    this.render(this.numberValue);
  }
}

customElements.define('custom-number', CustomNumber);
