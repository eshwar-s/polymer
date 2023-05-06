import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-input/paper-textarea.js";
import { EventsMixin } from "../common/events-mixin.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";

class TodoTaskDetails extends EventsMixin(LocalizeMixin(PolymerElement)) {
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
      <style
        is="custom-style"
        include="paper-material-styles todo-shared-styles"
      >
        :host {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px;
          box-sizing: border-box;
          background-color: var(--secondary-color);
        }
        #top-wrapper {
          display: flex;
          flex-direction: column;
        }
        #top-row {
          display: flex;
          align-items: center;
        }
        #task-title {
          flex-grow: 1;
          margin-left: 4px;
          --todo-edit-label: {
            font-size: 15px;
          }
        }
        #task-notes {
          --paper-input-container-input: {
            padding: 4px 0;
            font-size: 14px;
          }
          --paper-font-subhead: {
            font-size: 14px;
          }
        }
        #bottom-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        paper-icon-button {
          flex-shrink: 0;
        }
      </style>
      <div id="top-wrapper">
        <div id="top-row">
          <template is="dom-if" if="[[!item.isCompleted]]">
            <paper-icon-button
              icon="check-box-outline-blank"
              alt="[[localize('markAsCompleted')]]"
              on-click="_toggledMarkAsCompleted"
            ></paper-icon-button>
          </template>
          <template is="dom-if" if="[[item.isCompleted]]">
            <paper-icon-button
              icon="check-box"
              alt="[[localize('markAsNotCompleted')]]"
              on-click="_toggledMarkAsCompleted"
            ></paper-icon-button>
          </template>
          <todo-edit-label
            id="task-title"
            value="{{item.title}}"
            on-updated="_todoItemChanged"
          ></todo-edit-label>
          <template is="dom-if" if="[[!item.isImportant]]">
            <paper-icon-button
              icon="star-border"
              alt="[[localize('markAsImportant')]]"
              on-click="_toggleMarkAsImportant"
            ></paper-icon-button>
          </template>
          <template is="dom-if" if="[[item.isImportant]]">
            <paper-icon-button
              icon="star"
              alt="[[localize('removeImportance')]]"
              on-click="_toggleMarkAsImportant"
            ></paper-icon-button>
          </template>
        </div>
        <paper-textarea
          id="task-notes"
          label="[[localize('addNote')]]"
          value="{{item.notes}}"
          max-rows="5"
        ></paper-textarea>
      </div>
      <div id="bottom-wrapper">
        <paper-icon-button
          id="dismiss-button"
          icon="chevron-right"
          alt="[[localize('dismissDetails')]]"
          on-click="_dismissDetailsPanel"
        ></paper-icon-button>
        <span class="no-select"
          >[[localize('createdDate', 'date', item.creationTime)]]</span
        >
        <paper-icon-button
          id="delete-button"
          icon="delete-forever"
          alt="[[localize('deleteTask')]]"
          on-click="_deleteTodoItem"
        ></paper-icon-button>
      </div>
    `;
  }

  _todoItemChanged(e) {
    this.set("item.title", e.detail.value);
  }

  _toggleMarkAsImportant() {
    this.set("item.isImportant", !this.item.isImportant);
  }

  _toggledMarkAsCompleted() {
    this.set("item.isCompleted", !this.item.isCompleted);
  }

  _deleteTodoItem() {
    this.fire("delete", null);
  }

  _dismissDetailsPanel() {
    this.item = null;
  }
}

window.customElements.define(TodoTaskDetails.is, TodoTaskDetails);
