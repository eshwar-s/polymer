import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { TodoItem } from "../model/todo-item.js";
import "./todo-addtask.js";
import "./todo-editlabel.js";
import "./todo-tasklist.js";
import "./todo-collapse.js";
import LocalizeMixin from "../common/localize-mixin.js";

class TodoListView extends LocalizeMixin(PolymerElement) {
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
        todo-collapse {
          color: var(--primary-background-color);
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
          <todo-collapse id="collapse" text="[[localize('completedTasks')]]">
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
      const completedItems = this.list.items.filter((item) => item.isCompleted);
      return completedItems.length > 0;
    }
    return false;
  }
}

window.customElements.define(TodoListView.is, TodoListView);
