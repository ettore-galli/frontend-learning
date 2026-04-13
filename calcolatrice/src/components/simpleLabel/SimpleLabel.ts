class SimpleLabel extends HTMLElement {
  static get observedAttributes() {
    return ['label-text', 'label-level'];
  }

  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
  }

  render() {
    const labelText: string = this.getAttribute('label-text') || '<empty>';
    const labelLevel: string | null = this.getAttribute('label-level');
    const labelTag = labelLevel ? 'h' + labelLevel : 'p';

    const componentHTML = `<span><${labelTag}>${labelText}<${labelTag}/></span>`;

    this.innerHTML = componentHTML;
  }

  attributeChangedCallback(_name: string, _oldVal: string, newVal: string) {
    const textSpan = this.querySelector('span');
    if (textSpan) {
      textSpan.textContent = newVal;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('simple-label', SimpleLabel);
