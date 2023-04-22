import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-spinner/paper-spinner.js";

class TodoSpinner extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-spinner";
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      }
    };
  }

  static get template() {
    return html`
      <template is="dom-if" if="[[loading]]">
        <paper-spinner active></paper-spinner>
      </template>
      <template is="dom-if" if="[[!loading]]">
        <slot></slot>
      </template>
    `;
  }
}

window.customElements.define(TodoSpinner.is, TodoSpinner);
