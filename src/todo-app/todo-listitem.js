import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";

class TodoListItem extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-listitem";
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
      <style>
        .todo-item {
          background-color: var(--paper-grey-200);
          margin-bottom: 3px;
          border-radius: 3px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .todo-item:hover {
          background-color: var(--paper-grey-100);
        }
        .menu-icon {
          margin-right: 10px;
        }
      </style>
      <paper-item class="todo-item">
        <div class="left-wrapper">
          <paper-checkbox checked="{{item._isCompleted}}">
            <template is="dom-if" if="{{!item._isCompleted}}">
              {{item._title}}
            </template>
            <template is="dom-if" if="{{item._isCompleted}}">
              <del>{{item._title}}</del>
            </template>
          </paper-checkbox>
        </div>
        <div class="right-wrapper">
          <template is="dom-if" if="{{!item._isImportant}}">
            <iron-icon
              icon="star-border"
              on-click="_toggleMarkAsImportantEvent"
            ></iron-icon>
          </template>
          <template is="dom-if" if="{{item._isImportant}}">
            <iron-icon
              icon="star"
              on-click="_toggleMarkAsImportantEvent"
            ></iron-icon>
          </template>
          <paper-menu-button
            id="dropdown"
            vertical-align="top"
            horizontal-align="right"
          >
            <paper-icon-button
              icon="more-horiz"
              slot="dropdown-trigger"
              alt="menu"
            ></paper-icon-button>
            <div slot="dropdown-content">
              <paper-item on-tap="_toggleMarkAsImportantEvent">
                <template is="dom-if" if="{{!item._isImportant}}">
                  <iron-icon class="menu-icon" icon="star"></iron-icon>Mark as
                  important
                </template>
                <template is="dom-if" if="{{item._isImportant}}">
                  <iron-icon class="menu-icon" icon="star-border"></iron-icon
                  >Remove importance
                </template>
              </paper-item>
              <paper-item on-tap="_toggledMarkAsCompletedEvent">
                <template is="dom-if" if="{{!item._isCompleted}}">
                  <iron-icon class="menu-icon" icon="check-circle"></iron-icon
                  >Mark as completed
                </template>
                <template is="dom-if" if="{{item._isCompleted}}">
                  <iron-icon
                    class="menu-icon"
                    icon="radio-button-unchecked"
                  ></iron-icon
                  >Mark as not completed
                </template>
              </paper-item>
              <paper-item on-tap="_handleDeleteItemEvent"
                ><iron-icon class="menu-icon" icon="delete-forever"></iron-icon
                >Delete task
              </paper-item>
            </div>
          </paper-menu-button>
        </div>
      </paper-item>
    `;
  }

  _toggleMarkAsImportantEvent() {
    this.set("item._isImportant", !this.item._isImportant);
    this.$.dropdown.close();
  }

  _toggledMarkAsCompletedEvent() {
    this.set("item._isCompleted", !this.item._isCompleted);
    this.$.dropdown.close();
  }

  _handleDeleteItemEvent() {
    const customEvent = new CustomEvent("remove", {
      bubbles: true,
      composed: true,
      detail: { id: this.item._id }
    });
    this.dispatchEvent(customEvent);
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoListItem.is, TodoListItem);
