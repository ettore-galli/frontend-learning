import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../../src/components/inputField/numberInputField'; // importa la definizione del custom element

describe('number-input-field – rendering', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('number-input-field');
    document.body.appendChild(el);
  });

  it('renders without crashing', () => {
    expect(el).toBeInstanceOf(HTMLElement);
  });

  it('contains an input element', () => {
    const input = el.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
  });
});

describe('number-input-field – numberValue', () => {
  const el = document.createElement('number-input-field');
  document.body.appendChild(el);

  it('numberValue property workd', () => {
    el.numberValue = 42;
    expect(el.numberValue).toBe(42);
  });
});

it('number-input-field – rawValue', () => {
  const el = document.createElement('number-input-field');
  document.body.appendChild(el);

  el.rawValue = '88';

  expect(el.rawValue).toBe('88');
});

it('reacts to attribute changes', () => {
  const el = document.createElement('number-input-field');
  document.body.appendChild(el);

  const renderSpy = vi.spyOn(el, 'render');

  el.setAttribute('value', '99');
  el.numberValue = 99;

  expect(renderSpy).toHaveBeenCalled();
});
