import { html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/app-route/app-location.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-dropdown/iron-dropdown.js";
import "@polymer/iron-icons/iron-icons.js";
import { TodoBaseImpl } from "./todo-base.js";
import "./todo-editlabel.js";
import "./todo-badge.js";
import { TodoList } from "../model/todo-list.js";

class TodoSideBar extends TodoBaseImpl {
  constructor() {
    super();
  }

  static get is() {
    return "todo-sidebar";
  }

  static get properties() {
    return {
      lists: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
      },
      selected: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true,
        observer: "_selectionChanged"
      }
    };
  }

  static get template() {
    return html`
      <style include="paper-material-styles">
        :host {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          user-select: none;
          --todo-edit-label: {
            display: inline-block;
          }
        }
        iron-dropdown [slot="dropdown-content"] {
          width: 250px;
          @apply --shadow-elevation-3dp;
        }
        paper-item:hover {
          background-color: var(--paper-grey-100);
        }
        paper-button {
          text-transform: none;
          width: 100%;
          justify-content: flex-start;
        }
        iron-icon {
          margin-right: 10px;
        }
      </style>
      <nav class="list">
        <paper-listbox selected="{{selected}}">
          <template id="list" is="dom-repeat" items="{{lists}}">
            <paper-item
              class="list-item"
              on-contextmenu="_handleContextMenuOpen"
            >
              <div class="list-name">
                <iron-icon icon="list"></iron-icon>
                <todo-editlabel
                  value="[[item.name]]"
                  on-updated="_todoListNameChanged"
                ></todo-editlabel>
              </div>
              <todo-badge count="{{_getBadgeCount(item, item.*)}}">
              </todo-badge>
              <paper-ripple></paper-ripple>
            </paper-item>
          </template>
        </paper-listbox>
        <app-location route="{{route}}"></app-location>
        <iron-dropdown
          id="dropdown"
          horizontal-align="left"
          vertical-align="top"
        >
          <div class="dropdown-content" slot="dropdown-content">
            <paper-listbox>
              <paper-item on-tap="_renameTodoListEvent">
                <iron-icon class="menu-icon" icon="create"></iron-icon
                >{{localize('renameList')}}
              </paper-item>
              <paper-item on-tap="_deleteTodoListEvent">
                <iron-icon class="menu-icon" icon="delete-forever"></iron-icon
                >{{localize('deleteList')}}
              </paper-item>
            </paper-listbox>
          </div>
        </iron-dropdown>
      </nav>
      <paper-button on-tap="_newTodoListEvent">
        <iron-icon icon="add"></iron-icon>
        {{localize('newList')}}
      </paper-button>
    `;
  }

  _selectionChanged() {
    this.set("route.path", `/lists/${this.selected}`);
  }

  _getBadgeCount(item) {
    return item ? item.items.filter((task) => !task.isCompleted).length : 0;
  }

  _newTodoListEvent(e) {
    this.push("lists", TodoList.new());
    this.set("selected", this.lists.length - 1);
  }

  _renameTodoListEvent(e) {
    const model = this.$.list.modelForElement(this.$.dropdown.positionTarget);
    const id = model.get("item.id");
    const index = this.lists.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.set("selected", index);
      const element =
        this.$.dropdown.positionTarget.querySelector("todo-editlabel");
      element.setEditable(true);
    }
    this.$.dropdown.close();
  }

  _deleteTodoListEvent(e) {
    const id = this.$.list
      .modelForElement(this.$.dropdown.positionTarget)
      .get("item.id");
    const index = this.lists.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.splice("lists", index, 1);
      if (index === this.selected) {
        this.set("selected", this.lists.length - 1);
      }
    }
    this.$.dropdown.close();
  }

  _handleContextMenuOpen(e) {
    e.preventDefault();
    this.$.dropdown.positionTarget = e.currentTarget;
    this.$.dropdown.open();
  }

  _todoListNameChanged(e) {
    if (
      this.selected >= 0 &&
      this.selected < this.lists.length &&
      e.detail.value
    ) {
      this.set(`lists.${this.selected}.name`, e.detail.value);
    }
  }
}

window.customElements.define(TodoSideBar.is, TodoSideBar);
