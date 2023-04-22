import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-input/paper-textarea.js";
import LocalizeMixin from "../common/localize-mixin.js";

class TodoTaskDetails extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-taskdetails";
  }

  static get properties() {
    return {
      item: {
        type: Object,
        value: null,
        notify: true
      }
    };
  }

  static get template() {
    return html`
      <style is="custom-style" include="paper-material-styles">
        :host {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: var(--secondary-color);
        }
        #pane-main {
          width: 100%;
          display: flex;
        }
        #pane-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      </style>
      <div id="pane-top">
        <div id="pane-main">
          <paper-checkbox checked="{{item.isCompleted}}">
            [[item.title]]
          </paper-checkbox>
          <template is="dom-if" if="[[!item.isImportant]]">
            <paper-icon-button
              icon="star-border"
              on-click="_toggleMarkAsImportantEvent"
            ></paper-icon-button>
          </template>
          <template is="dom-if" if="[[item.isImportant]]">
            <paper-icon-button
              icon="star"
              on-click="_toggleMarkAsImportantEvent"
            ></paper-icon-button>
          </template>
        </div>
        <paper-textarea label="[[localize('addNote')]]"></paper-textarea>
      </div>
      <div id="pane-footer">
        <paper-icon-button icon="chevron-right"></paper-icon-button>
      </div>
    `;
  }

  _toggleMarkAsImportantEvent() {
    this.set("item.isImportant", !this.item.isImportant);
  }

  _toggledMarkAsCompletedEvent() {
    this.set("item.isCompleted", !this.item.isCompleted);
  }
}

window.customElements.define(TodoTaskDetails.is, TodoTaskDetails);
