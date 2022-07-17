import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/paper-styles/color.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-input/paper-input.js";
import { TodoBaseImpl } from "./todo-base.js";

class TodoAddItem extends TodoBaseImpl {
  constructor() {
    super();
  }

  static get is() {
    return "todo-additem";
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    };
  }

  static get template() {
    return html`
      <style>
        paper-input {
          background-color: var(--paper-grey-300);
          padding-left: 10px;
          border-radius: 3px;

          --paper-input-container-underline: {
            display: none;
          }
          --paper-input-container-underline-focus: {
            display: none;
          }
          --paper-input-container-underline-disabled: {
            display: none;
          }
        }
        iron-icon {
          margin-right: 5px;
        }
      </style>

      <paper-input
        id="textField"
        value="{{value}}"
        no-label-float
        on-keypress="_handleKeyPressEvent"
        on-focus="_handleFocusEvent"
        on-focusout="_handleFocusLostEvent"
        label="{{localize('addTaskPlaceholder')}}"
      >
        <iron-icon id="icon" icon="add" slot="prefix"></iron-icon>
      </paper-input>
    `;
  }

  ready() {
    super.ready();
  }

  _handleKeyPressEvent(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const customEvent = new CustomEvent("add", {
        bubbles: true,
        composed: true,
        detail: { task: this.value }
      });
      this.dispatchEvent(customEvent);
      this.value = "";
    }
  }

  _handleFocusEvent() {
    this.$.icon.icon = "radio-button-unchecked";
    this.$.textField.label = this.localize("addTaskExample");
  }

  _handleFocusLostEvent() {
    this.$.icon.icon = "add";
    this.$.textField.label = this.localize("addTaskPlaceholder");
  }
}

window.customElements.define(TodoAddItem.is, TodoAddItem);
