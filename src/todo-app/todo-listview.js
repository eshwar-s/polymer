import { html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { TodoBaseImpl } from "./todo-base.js";
import { TodoItem } from "../model/todo-item.js";
import "./todo-addtask.js";
import "./todo-editlabel.js";
import "./todo-tasklist.js";
import "./todo-collapse.js";

class TodoListView extends TodoBaseImpl {
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
        }
        .content {
          flex-grow: 1;
        }
        .heading {
          --todo-edit-label: {
            font-size: 1.5em;
            font-weight: bold;
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
        <todo-tasklist items="{{list.items}}" filter="1"></todo-tasklist>
        <template is="dom-if" if="[[_showCompletedTasks(list, list.*)]]">
          <todo-collapse id="collapse" text="{{localize('completedTasks')}}">
            <todo-tasklist items="{{list.items}}" filter="0"></todo-tasklist>
          </todo-collapse>
        </template>
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

  _showCompletedTasks() {
    if (this.list) {
      let completedItems = this.list.items.filter((item) => item.isCompleted);
      return completedItems.length > 0;
    }
    return false;
  }
}

window.customElements.define(TodoListView.is, TodoListView);