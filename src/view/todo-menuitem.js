import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-icons/iron-icons.js";
import "../common/shared-styles.js";

class TodoMenuItem extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-menuitem";
  }

  static get properties() {
    return {
      icon: {
        type: String,
        reflectToAttribute: true
      },
      text: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        .menu-item:hover {
          background-color: var(--paper-grey-100);
        }
      </style>
      <paper-item class="menu-item"
        ><iron-icon class="start-icon" icon="[[icon]]"></iron-icon>[[text]]
      </paper-item>
    `;
  }
}

window.customElements.define(TodoMenuItem.is, TodoMenuItem);
