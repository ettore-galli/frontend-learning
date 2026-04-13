class CustomNumber extends HTMLElement {
  static get observedAttributes(): string[] {
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

  get numberValue(): number {
    return Number(this.getAttribute('number-value'));
  }

  render(numberValue: number): void {
    const rendered: string = `*${numberValue}*`;
    const componentHTML = `<span id="number">${rendered}</span>`;

    this.shadow.innerHTML = componentHTML;
  }

  attributeChangedCallback(_name: string, _oldVal: string, newVal: string): void {
    this.render(Number(newVal));
  }

  connectedCallback(): void {
    this.render(this.numberValue);
  }
}

customElements.define('custom-number', CustomNumber);
