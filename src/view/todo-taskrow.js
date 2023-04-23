import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import { EventsMixin } from "../common/events-mixin.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "./todo-styles.js";

class TodoTaskRow extends EventsMixin(LocalizeMixin(PolymerElement)) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-taskrow";
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
          background-color: var(--primary-background-color);
          margin-bottom: 2px;
          border-radius: 4px;
          padding: 0px 16px;
          @apply --paper-font-subhead;
        }
        :host([selected]) {
          background-color: var(--light-primary-color);
        }
        paper-checkbox {
          --paper-checkbox-label-spacing: 16px;
        }
      </style>
      <div>
        <paper-checkbox
          checked="{{item.isCompleted}}"
          noink
          on-tap="_handleClickEvent"
        >
          <template is="dom-if" if="[[!item.isCompleted]]">
            [[item.title]]
          </template>
          <template is="dom-if" if="[[item.isCompleted]]">
            <del>[[item.title]]</del>
          </template>
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

  _handleClickEvent(e) {
    e.stopPropagation();
  }

  _toggleMarkAsImportant(e) {
    this.set("item.isImportant", !this.item.isImportant);
    e.stopPropagation();
  }
}

window.customElements.define(TodoTaskRow.is, TodoTaskRow);
