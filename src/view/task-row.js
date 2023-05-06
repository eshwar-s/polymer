import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import { EventsMixin } from "../common/events-mixin.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";

class TodoTaskRow extends EventsMixin(LocalizeMixin(PolymerElement)) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-task-row";
  }

  static get properties() {
    return {
      item: {
        type: Object,
        notify: true
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        :host {
          min-height: 52px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-grow: 1;
          padding: 0px 16px;
        }
        paper-checkbox {
          --paper-checkbox-label-spacing: 16px;
          --paper-checkbox-label-checked: {
            text-decoration: line-through;
          }
        }
      </style>
      <div>
        <paper-checkbox
          checked="{{item.isCompleted}}"
          on-tap="_stopClickEventPropogation"
        >
          [[item.title]]
        </paper-checkbox>
      </div>
      <div>
        <template is="dom-if" if="[[!item.isImportant]]">
          <paper-icon-button
            icon="star-border"
            alt="[[localize('markAsImportant')]]"
            on-tap="_toggleMarkAsImportant"
          ></paper-icon-button>
        </template>
        <template is="dom-if" if="[[item.isImportant]]">
          <paper-icon-button
            icon="star"
            alt="[[localize('removeImportance')]]"
            on-tap="_toggleMarkAsImportant"
          ></paper-icon-button>
        </template>
      </div>
    `;
  }

  _stopClickEventPropogation(e) {
    e.stopPropagation();
  }

  _toggleMarkAsImportant(e) {
    this.set("item.isImportant", !this.item.isImportant);
    e.stopPropagation();
  }
}

window.customElements.define(TodoTaskRow.is, TodoTaskRow);
