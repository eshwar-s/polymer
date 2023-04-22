import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";
import EventsMixin from "../common/events-mixin.js";
import "./todo-styles.js";

class TodoEditLabel extends EventsMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-editlabel";
  }

  static get properties() {
    return {
      value: {
        type: String,
        notify: true
      },
      editable: {
        type: Boolean,
        value: false,
        notify: true
      },
      clickToEdit: {
        type: Boolean,
        value: false
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          @apply --todo-edit-label;
        }
        paper-input {
          border-radius: 3px;

          --paper-input-container-input: {
            box-sizing: border-box;
            font: inherit;
            color: inherit;
          }
          --paper-input-container: {
            padding: 0;
          }
          --paper-input-container-underline: {
            display: none;
            height: 0;
          }
          --paper-input-container-underline-focus: {
            display: none;
          }
          --paper-font-caption: {
            display: none;
          }
        }
      </style>
      <template is="dom-if" if="{{!editable}}">
        <div on-tap="_handleClick">{{value}}</div>
      </template>
      <template is="dom-if" if="{{editable}}">
        <paper-input
          value="{{value}}"
          autofocus
          on-change="_handleChangeEvent"
          on-keydown="_handleKeyDownEvent"
          on-focusout="_handleFocusLostEvent"
        >
        </paper-input>
      </template>
    `;
  }

  setEditable(isEditable) {
    this.editable = isEditable;
  }

  _handleClick(e) {
    if (this.clickToEdit) {
      this.editable = true;
    }
  }

  _handleKeyDownEvent(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      this.editable = false;
      e.preventDefault();
      e.stopPropagation();
    }
  }

  _handleFocusLostEvent() {
    this.editable = false;
  }

  _handleChangeEvent() {
    if (this.value) {
      this.fire("updated", { value: this.value });
    }
  }
}

window.customElements.define(TodoEditLabel.is, TodoEditLabel);
