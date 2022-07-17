import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";

class TodoEditLabel extends PolymerElement {
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
        reflectToAttribute: true
      },
      editable: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      clickToEdit: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        :host([heading]) {
          display: block;
        }
        :host([heading]) > * {
          font-size: 1.5em;
          font-weight: bold;
          margin: 10px 0;
        }
        paper-input.custom {
          border: 1px solid #bdbdbd;
          border-radius: 3px;

          --paper-input-container-input: {
            box-sizing: border-box;
            font: inherit;
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
        <template is="dom-if" if="{{clickToEdit}}">
          <div on-tap="_handleClick">{{value}}</div>
        </template>
        <template is="dom-if" if="{{!clickToEdit}}">
          <div>{{value}}</div>
        </template>
      </template>
      <template is="dom-if" if="{{editable}}">
        <paper-input
          class="custom"
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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  setEditable(isEditable) {
    this.editable = isEditable;
  }

  _handleClick(e) {
    this.editable = true;
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
      const customEvent = new CustomEvent("updated", {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(customEvent);
    }
  }
}

window.customElements.define(TodoEditLabel.is, TodoEditLabel);
