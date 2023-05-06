import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";
import { EventsMixin } from "../common/events-mixin.js";
import "../common/shared-styles.js";

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
        type: String,
        value: "false",
        notify: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          @apply --todo-edit-label;
        }
        [contenteditable] {
          outline: 0px solid transparent;
        }
      </style>
      <div
        id="input"
        on-click="_handleClickEvent"
        on-keydown="_handleKeyDownEvent"
        on-blur="_handleFocusLostEvent"
        contenteditable$="[[editable]]"
        spellcheck="false"
      >
        [[value]]
      </div>
    `;
  }

  _handleClickEvent() {
    this.editable = "true";
  }

  _handleKeyDownEvent(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      if (e.key === "Escape") {
        this.$.input.innerText = this.value;
      }
      this._handleFocusLostEvent();
      e.preventDefault();
      e.stopPropagation();
    }
  }

  _handleFocusLostEvent() {
    this.editable = "false";
    const newValue = this.$.input.innerText;

    if (newValue) {
      this.fire("updated", { value: newValue });
    } else {
      this.$.input.innerText = this.value;
    }
  }
}

window.customElements.define(TodoEditLabel.is, TodoEditLabel);
