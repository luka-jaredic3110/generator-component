import { ApplicationElement, html } from '<%= applicationElementSource %>';

import translations from './translations.js';
import style from './style.lit.css';

/**
 * TODO: Description
 *
 * @prop exampleProp - TODO: description
 *
 * @slot default - TODO: description
 * @slot namedSlot - TODO: description
 */

export default class <%= className %> extends ApplicationElement {
  static styles = [ApplicationElement.styles, style];

  static properties = {
    exampleProp: { type: String },
  };

  constructor() {
    super();
    // this.exampleProp = 0;
  }

  /** @internal */
  static translations = translations;

  render() {
    return html`Hello from <%= tagName %> component!`;
  }
}

<%= className %>.registerTagName('<%= tagName %>');

customElements.get('<%= tagName %>') ||
  customElements.define('<%= tagName %>', <%= className %>);
