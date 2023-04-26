import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/image-icons.js";
import "@polymer/iron-icons/iron-icons.js";
import { EventsMixin } from "../common/events-mixin.js";

class TodoThemeColor extends EventsMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-themecolor";
  }

  static get properties() {
    return {
      themeColor: {
        type: String
      },
      selectedTheme: {
        type: String,
        notify: true
      }
    };
  }

  static get template() {
    return html`
      <style include="paper-material-styles">
        paper-icon-button {
          width: 64px;
          height: 64px;
        }
        :host([theme-color="indigo"]) > paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-indigo-400);
          }
        }
        :host([theme-color="blue"]) > paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-blue-400);
          }
        }
        :host([theme-color="purple"]) > paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-purple-400);
          }
        }
        :host([theme-color="red"]) > paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-red-400);
          }
        }
        :host([theme-color="green"]) > paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-green-400);
          }
        }
        :host([theme-color="teal"]) > paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-teal-400);
          }
        }
      </style>
      <template is="dom-if" if="[[!_isSelected(themeColor, selectedTheme)]]">
        <paper-icon-button
          icon="image:brightness-1"
          alt="[[themeColor]]"
          aria-pressed="false"
          on-tap="_handleSelectionChanged"
        ></paper-icon-button>
      </template>
      <template is="dom-if" if="[[_isSelected(themeColor, selectedTheme)]]">
        <paper-icon-button
          icon="check-circle"
          alt="[[themeColor]]"
          aria-pressed="true"
          on-tap="_handleSelectionChanged"
        ></paper-icon-button>
      </template>
    `;
  }

  _isSelected() {
    return this.selectedTheme === this.themeColor;
  }

  _handleSelectionChanged() {
    this.selectedTheme = this.themeColor;
  }
}

window.customElements.define(TodoThemeColor.is, TodoThemeColor);
