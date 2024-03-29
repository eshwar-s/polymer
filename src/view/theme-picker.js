import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";
import "./theme-color.js";

class TodoThemePicker extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-theme-picker";
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true
      },
      settings: {
        type: Object,
        notify: true
      },
      selectedTheme: {
        type: String,
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html` <style include="todo-shared-styles">
        #theme-container {
          display: flex;
        }
      </style>
      <paper-dialog
        class="dialog"
        role="alert-dialog"
        opened="{{opened}}"
        modal="true"
        with-backdrop
      >
        <h2>[[localize('themeDialogTitle')]]</h2>
        <div id="theme-container">
          <todo-theme-color
            theme-color="indigo"
            selected-theme="{{selectedTheme}}"
          ></todo-theme-color>
          <todo-theme-color
            theme-color="blue"
            selected-theme="{{selectedTheme}}"
          ></todo-theme-color>
          <todo-theme-color
            theme-color="purple"
            selected-theme="{{selectedTheme}}"
          ></todo-theme-color>
          <todo-theme-color
            theme-color="red"
            selected-theme="{{selectedTheme}}"
          ></todo-theme-color>
          <todo-theme-color
            theme-color="green"
            selected-theme="{{selectedTheme}}"
          ></todo-theme-color>
          <todo-theme-color
            theme-color="teal"
            selected-theme="{{selectedTheme}}"
          ></todo-theme-color>
        </div>
        <div class="dialog-button-container">
          <paper-button
            class="dialog-cancel"
            raised
            noink
            on-click="_handleDialogCancel"
            >[[localize('themeDialogCancel')]]</paper-button
          >
          <paper-button
            class="dialog-accept"
            raised
            noink
            autofocus
            on-click="_handleDialogAccept"
            >[[localize('themeDialogConfirm')]]</paper-button
          >
        </div>
      </paper-dialog>`;
  }

  _handleDialogAccept() {
    this.opened = false;
    this.set("settings.theme", this.selectedTheme);
  }

  _handleDialogCancel() {
    this.opened = false;
    this.selectedTheme = this.settings.theme;
  }
}

window.customElements.define(TodoThemePicker.is, TodoThemePicker);
