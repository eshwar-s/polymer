import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { TodoItem } from "../model/todo-item.js";
import "./todo-addtask.js";
import "./todo-editlabel.js";
import "./todo-tasklist.js";
import "./todo-taskdetails.js";
import "./todo-listmenu.js";

class TodoListView extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-listview";
  }

  static get properties() {
    return {
      route: {
        type: Object,
        observer: "_routeChanged"
      },
      list: {
        type: Object,
        value: null,
        notify: true
      },
      selectedItem: {
        type: Object,
        value: null,
        notify: true,
        observer: "_selectedItemChanged"
      },
      settings: {
        type: Object,
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
        }
        div[role="main"] {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          background-color: var(--primary-color);
          padding: 12px;
        }
        #list-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .heading {
          --todo-edit-label: {
            display: block;
            color: var(--primary-background-color);
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 8px;
          }
        }
        todo-taskdetails {
          width: 300px;
          height: 100%;
          flex-shrink: 1;
        }
        @media only screen and (max-width: 800px) {
          todo-taskdetails {
            display: none;
          }
        }
      </style>
      <div role="main">
        <div style="overflow-y:auto; flex-grow: 1">
          <div id="list-heading">
            <todo-editlabel
              id="list-name"
              class="heading"
              value="[[list.name]]"
              on-updated="_todoListNameChanged"
            ></todo-editlabel>
            <todo-listmenu list="{{list}}" settings="{{settings}}">
            </todo-listmenu>
          </div>
          <todo-tasklist
            items="{{list.items}}"
            selected-item="{{selectedItem}}"
            sort-order="{{settings.sortOrder}}"
            show-completed="{{settings.showCompleted}}"
          ></todo-tasklist>
        </div>
        <div id="add-task">
          <todo-addtask on-add="_addTodoItem"></todo-addtask>
        </div>
      </div>
      <template is="dom-if" if="{{selectedItem}}">
        <todo-taskdetails
          id="task-details"
          role="complementary"
          item="{{selectedItem}}"
          on-delete="_deleteTodoItem"
        ></todo-taskdetails>
      </template>
    `;
  }

  _routeChanged() {
    this.selectedItem = null;
  }

  _todoListNameChanged(e) {
    this.set("list.name", e.detail.value);
  }

  _addTodoItem(e) {
    this.push("list.items", new TodoItem(e.detail.task));
  }

  _deleteTodoItem() {
    const index = this.list.items.findIndex(
      (item) => item.id === this.selectedItem.id
    );
    if (index !== -1) {
      this.splice("list.items", index, 1);
    }
    this.selectedItem = null;
  }

  _selectedItemChanged() {
    if (this.selectedItem) {
      const index = this.list.items.findIndex(
        (item) => item.id === this.selectedItem.id
      );
      this.linkPaths("selectedItem", `list.items.${index}`);
    } else {
      this.unlinkPaths("selectedItem");
    }
  }
}

window.customElements.define(TodoListView.is, TodoListView);
