import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { TodoItem } from "../model/todo-item.js";
import "./todo-addtask.js";
import "./todo-editlabel.js";
import "./todo-tasklist.js";
import "./todo-collapse.js";

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
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style is="custom-style" include="paper-material-styles">
        :host {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 12px;
          background-color: var(--primary-color);
        }
        .content {
          flex-grow: 1;
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
      </style>
      <div class="content" style="overflow-y:auto">
        <todo-editlabel
          id="listName"
          class="heading"
          value="[[list.name]]"
          on-updated="_todoListNameChanged"
          click-to-edit
        ></todo-editlabel>
        <todo-tasklist items="{{list.items}}"></todo-tasklist>
      </div>
      <div class="footer">
        <todo-addtask on-add="_addTodoItem"></todo-addtask>
      </div>
    `;
  }

  _addTodoItem(e) {
    this.push(`list.items`, new TodoItem(e.detail.task));
  }

  _todoListNameChanged(e) {
    this.set(`list.name`, e.detail.value);
  }
}

window.customElements.define(TodoListView.is, TodoListView);
