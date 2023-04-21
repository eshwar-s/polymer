import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "./todo-styles.js";
import EventsMixin from "../common/events-mixin.js";
import LocalizeMixin from "../common/localize-mixin.js";

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
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        .list-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: var(--primary-background-color);
          margin-bottom: 2px;
          border-radius: 4px;
        }
        .list-item:hover {
          background-color: var(--paper-grey-100);
        }
        paper-checkbox {
          --paper-checkbox-label-spacing: 16px;
        }
        paper-menu-button {
          --paper-menu-button: {
            padding: 6px;
          }
        }
        div [slot="dropdown-content"] {
          background-color: var(--primary-background-color);
          @apply --shadow-elevation-3dp;
        }
      </style>
      <paper-item class="list-item">
        <div class="left-wrapper">
          <paper-checkbox checked="{{item.isCompleted}}">
            <template is="dom-if" if="[[!item.isCompleted]]">
              [[item.title]]
            </template>
            <template is="dom-if" if="[[item.isCompleted]]">
              <del>[[item.title]]</del>
            </template>
          </paper-checkbox>
        </div>
        <div class="right-wrapper">
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
          <paper-menu-button
            id="dropdown"
            vertical-align="top"
            horizontal-align="right"
            vertical-offset="36"
          >
            <paper-icon-button
              icon="more-horiz"
              slot="dropdown-trigger"
              alt="menu"
            ></paper-icon-button>
            <div slot="dropdown-content">
              <template is="dom-if" if="[[!item.isImportant]]">
                <todo-menuitem
                  icon="star"
                  text="[[localize('markAsImportant')]]"
                  on-tap="_toggleMarkAsImportantEvent"
                ></todo-menuitem>
              </template>
              <template is="dom-if" if="[[item.isImportant]]">
                <todo-menuitem
                  icon="star-border"
                  text="[[localize('removeImportance')]]"
                  on-tap="_toggleMarkAsImportantEvent"
                ></todo-menuitem>
              </template>
              <template is="dom-if" if="[[!item.isCompleted]]">
                <todo-menuitem
                  icon="check-circle"
                  text="[[localize('markAsCompleted')]]"
                  on-tap="_toggledMarkAsCompletedEvent"
                ></todo-menuitem>
              </template>
              <template is="dom-if" if="[[item.isCompleted]]">
                <todo-menuitem
                  icon="radio-button-unchecked"
                  text="[[localize('markAsNotCompleted')]]"
                  on-tap="_toggledMarkAsCompletedEvent"
                ></todo-menuitem>
              </template>
              <todo-menuitem
                icon="delete-forever"
                text="[[localize('deleteForever')]]"
                on-tap="_handleDeleteItemEvent"
              ></todo-menuitem>
            </div>
          </paper-menu-button>
        </div>
      </paper-item>
    `;
  }

  _toggleMarkAsImportantEvent() {
    this.set("item.isImportant", !this.item.isImportant);
    this.$.dropdown.close();
  }

  _toggledMarkAsCompletedEvent() {
    this.set("item.isCompleted", !this.item.isCompleted);
    this.$.dropdown.close();
  }

  _handleDeleteItemEvent() {
    this.fire("remove", { id: this.item.id });
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoTaskRow.is, TodoTaskRow);
