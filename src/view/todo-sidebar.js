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
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";
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
        notify: true
      },
      selected: {
        type: String,
        notify: true,
        observer: "_handleSelectionChanged"
      }
    };
  }

  static get template() {
    return html`
      <style include="paper-material-styles todo-shared-styles">
        :host {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px;
          background-color: var(--secondary-color);
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          --paper-item-min-height: 36px;
          --paper-item-selected: {
            background-color: var(--secondary-color);
            filter: brightness(90%);
          }
        }
        .list-item .start-icon {
          color: var(--primary-color);
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
          id="navigation-pane"
          selected="{{selected}}"
          attr-for-selected="link"
          fallback-selection="/lists/0"
        >
          <template id="list" is="dom-repeat" items="{{lists}}">
            <paper-item
              class="list-item"
              link="/lists/{{index}}"
              on-contextmenu="_handleContextMenuEvent"
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
              on-tap="_renameTodoList"
              start-icon="image:flip"
              text="[[localize('renameList')]]"
            >
            </todo-menuitem>
            <todo-menuitem
              on-tap="_printTodoList"
              start-icon="print"
              text="[[localize('printList')]]"
            >
            </todo-menuitem>
            <div class="divider"></div>
            <todo-menuitem
              on-tap="_deleteTodoList"
              start-icon="delete-forever"
              text="[[localize('deleteList')]]"
            >
            </todo-menuitem>
          </div>
        </iron-dropdown>
      </nav>
      <paper-button noink on-tap="_newTodoList">
        <iron-icon class="start-icon" icon="add"></iron-icon>
        [[localize('newList')]]
      </paper-button>
    `;
  }

  _handleSelectionChanged() {
    this.set("route.path", this.selected);
  }

  _getBadgeCount(item) {
    return item ? item.items.filter((task) => !task.isCompleted).length : 0;
  }

  _newTodoList() {
    this.push("lists", TodoList.new());

    afterNextRender(this, () => {
      this.set("selected", `/lists/${this.lists.length - 1}`);
    });
  }

  _deleteTodoList() {
    const listId = this.$.list
      .modelForElement(this.$.dropdown.positionTarget)
      .get("item.id");
    const index = this.lists.findIndex((list) => list.id === listId);
    if (index !== -1) {
      this.splice("lists", index, 1);
    }
    this.$.dropdown.close();
  }

  _renameTodoList() {
    this.$.dropdown.close();
  }

  _printTodoList() {
    this.$.dropdown.close();
  }

  _handleContextMenuEvent(e) {
    e.preventDefault();
    e.currentTarget.click();
    this.$.dropdown.positionTarget = e.currentTarget;
    this.$.dropdown.open();
  }
}

window.customElements.define(TodoSideBar.is, TodoSideBar);
