import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-icons/iron-icons.js";

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
      <style>
        .menu-icon {
          margin-right: 10px;
        }
        paper-item {
          user-select: none;
        }
        paper-item:hover {
          background-color: var(--paper-grey-100);
        }
      </style>
      <paper-item
        ><iron-icon class="menu-icon" icon="[[icon]]"></iron-icon>[[text]]
      </paper-item>
    `;
  }
}

window.customElements.define(TodoMenuItem.is, TodoMenuItem);
