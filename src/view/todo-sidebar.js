import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/app-route/app-location.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-dropdown/iron-dropdown.js";
import "@polymer/iron-icons/image-icons.js";
import { TodoList } from "../model/todo-list.js";
import LocalizeMixin from "../common/localize-mixin.js";
import "./todo-styles.js";
import "./todo-menuitem.js";
import "./todo-editlabel.js";
import "./todo-badge.js";

class TodoSideBar extends LocalizeMixin(PolymerElement) {
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
        type: String,
        notify: true,
        reflectToAttribute: true,
        observer: "_selectionChanged"
      }
    };
  }

  static get template() {
    return html`
      <style include="paper-material-styles todo-shared-styles">
        :host {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 12px;
          background-color: var(--secondary-color);
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          --paper-item-min-height: 36px;
        }
        .list-item .start-icon {
          color: var(--primary-color);
        }
        iron-dropdown [slot="dropdown-content"] {
          min-width: 200px;
          background-color: var(--primary-background-color);
          @apply --shadow-elevation-2dp;
        }
        paper-button {
          width: 100%;
          font-size: 15px;
          justify-content: flex-start;
        }
      </style>
      <nav>
        <app-location route="{{route}}"></app-location>
        <paper-listbox
          selected="{{selected}}"
          attr-for-selected="link"
          fallback-selection="/lists/0"
        >
          <template id="list" is="dom-repeat" items="{{lists}}">
            <paper-item
              class="list-item"
              link="/lists/{{index}}"
              on-contextmenu="_handleContextMenuOpen"
            >
              <div>
                <iron-icon class="start-icon" icon="list"></iron-icon>
                [[item.name]]
              </div>
              <todo-badge count="[[_getBadgeCount(item, item.*)]]">
              </todo-badge>
            </paper-item>
          </template>
        </paper-listbox>
        <iron-dropdown
          id="dropdown"
          horizontal-align="left"
          vertical-align="top"
        >
          <div class="dropdown-content" slot="dropdown-content">
            <todo-menuitem
              on-tap="_renameTodoListEvent"
              icon="image:flip"
              text="[[localize('renameList')]]"
            >
            </todo-menuitem>
            <todo-menuitem
              on-tap="_printTodoListEvent"
              icon="print"
              text="[[localize('printList')]]"
            >
            </todo-menuitem>
            <todo-menuitem
              on-tap="_deleteTodoListEvent"
              icon="delete-forever"
              text="[[localize('deleteList')]]"
            >
            </todo-menuitem>
          </div>
        </iron-dropdown>
      </nav>
      <paper-button noink on-tap="_newTodoListEvent">
        <iron-icon class="start-icon" icon="add"></iron-icon>
        [[localize('newList')]]
      </paper-button>
    `;
  }

  _selectionChanged() {
    this.set("route.path", this.selected);
  }

  _getBadgeCount(item) {
    return item ? item.items.filter((task) => !task.isCompleted).length : 0;
  }

  _newTodoListEvent(e) {
    this.push("lists", TodoList.new());

    afterNextRender(this, () => {
      this.set("selected", `/lists/${this.lists.length - 1}`);
    });
  }

  _renameTodoListEvent() {
    this.$.dropdown.close();
  }

  _printTodoListEvent() {
    this.$.dropdown.close();
  }

  _deleteTodoListEvent() {
    const id = this.$.list
      .modelForElement(this.$.dropdown.positionTarget)
      .get("item.id");
    const index = this.lists.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.splice("lists", index, 1);
    }
    this.$.dropdown.close();
  }

  _handleContextMenuOpen(evt) {
    evt.preventDefault();
    evt.currentTarget.click();
    this.$.dropdown.positionTarget = evt.currentTarget;
    this.$.dropdown.open();
  }
}

window.customElements.define(TodoSideBar.is, TodoSideBar);
