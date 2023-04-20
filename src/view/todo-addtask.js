import { html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/paper-styles/color.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-input/paper-input.js";
import { TodoBaseImpl } from "./todo-base.js";

class TodoAddTask extends TodoBaseImpl {
  constructor() {
    super();
  }

  static get is() {
    return "todo-addtask";
  }

  static get properties() {
    return {
      value: {
        type: String,
        reflectToAttribute: true
      },
      startIcon: {
        type: String,
        reflectToAttribute: true
      },
      placeholder: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        paper-input {
          background-color: rgba(0, 0, 0, 0.15);
          padding-left: 10px;
          border-radius: 4px;
          color: var(--primary-background-color);

          --paper-input-container-underline: {
            display: none;
          }
          --paper-input-container-underline-focus: {
            display: none;
          }
          --paper-input-container-label: {
            color: var(--primary-background-color);
          }
          --paper-input-container-input-color: var(--primary-background-color);
        }
        iron-icon {
          margin-right: 10px;
          color: var(--primary-background-color);
        }
      </style>

      <paper-input
        id="textField"
        value="{{value}}"
        no-label-float
        on-keypress="_handleKeyPressEvent"
        on-focus="_handleFocusEvent"
        on-focusout="_handleFocusLostEvent"
        label="[[placeholder]]"
      >
        <iron-icon id="icon" icon="[[startIcon]]" slot="prefix"></iron-icon>
      </paper-input>
    `;
  }

  ready() {
    super.ready();
    this.addEventListener("app-localize-resources-loaded", function () {
      this._handleFocusLostEvent();
    });
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
    this.startIcon = "radio-button-unchecked";
    this.placeholder = this.localize("addTaskExample");
  }

  _handleFocusLostEvent() {
    this.startIcon = "add";
    this.placeholder = this.localize("addTaskPlaceholder");
  }
}

window.customElements.define(TodoAddTask.is, TodoAddTask);
