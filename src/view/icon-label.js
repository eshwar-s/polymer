import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icons/iron-icons.js";
import "../common/shared-styles.js";

class TodoIconLabel extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-icon-label";
  }

  static get properties() {
    return {
      startIcon: {
        type: String
      },
      text: {
        type: String
      },
      endIcon: {
        type: String,
        value: null
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        :host {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-grow: 1;
        }
        iron-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
      </style>
      <div>
        <iron-icon class="start-icon" icon="[[startIcon]]"></iron-icon>
        <span class="label">[[text]]</span>
      </div>
      <template is="dom-if" if="[[endIcon]]">
        <div>
          <iron-icon icon="[[endIcon]]"></iron-icon>
        </div>
      </template>
    `;
  }
}

window.customElements.define(TodoIconLabel.is, TodoIconLabel);
