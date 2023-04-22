import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { TodoItem } from "../model/todo-item.js";
import "./todo-addtask.js";
import "./todo-editlabel.js";
import "./todo-tasklist.js";

class TodoListView extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-listview";
  }

  static get properties() {
    return {
      list: {
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
        }
        div[role="main"] {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          background-color: var(--primary-color);
          padding: 12px;
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
        #task-list {
          flex-grow: 1;
        }
      </style>
      <div id="main" role="main">
        <div id="task-list" style="overflow-y:auto">
          <todo-editlabel
            id="listName"
            class="heading"
            value="[[list.name]]"
            on-updated="_todoListNameChanged"
            click-to-edit
          ></todo-editlabel>
          <todo-tasklist items="{{list.items}}"></todo-tasklist>
        </div>
        <div id="add-task">
          <todo-addtask on-add="_addTodoItem"></todo-addtask>
        </div>
      </div>
    `;
  }

  _addTodoItem(e) {
    this.push("list.items", new TodoItem(e.detail.task));
  }

  _todoListNameChanged(e) {
    this.set("list.name", e.detail.value);
  }
}

window.customElements.define(TodoListView.is, TodoListView);
