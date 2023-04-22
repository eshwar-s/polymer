import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import { TodoSortOrder } from "../model/todo-settings.js";
import "./todo-styles.js";
import "./todo-taskrow.js";

class TodoTaskList extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-tasklist";
  }

  static get properties() {
    return {
      items: {
        type: Array,
        value: [],
        notify: true
      },
      sortOrder: {
        type: Number,
        value: TodoSortOrder.IMPORTANCE
      },
      filter: {
        type: Object,
        value: {
          INCOMPLETE: 0,
          COMPLETED: 1
        },
        readOnly: true
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        .list {
          margin: 10px 0;
        }
        #completed-label > * {
          font-size: 14px;
          font-weight: bold;
          user-select: none;
          color: var(--primary-background-color);
        }
      </style>
      <div class="list">
        <template
          is="dom-repeat"
          items="{{items}}"
          filter="[[_computeFilter(filter.INCOMPLETE)]]"
          sort="[[_computeSort()]]"
          observe="isImportant isCompleted"
        >
          <todo-taskrow
            item="{{item}}"
            on-remove="_removeTodoItem"
          ></todo-taskrow>
        </template>
      </div>
      <div
        id="completed-label"
        hidden$="[[!_showCompletedTasks(items, items.*)]]"
      >
        <iron-icon icon="expand-more"></iron-icon>
        <span>[[localize('completedTasks')]]</span>
      </div>
      <div class="list">
        <template
          is="dom-repeat"
          items="{{items}}"
          filter="[[_computeFilter(filter.COMPLETED)]]"
          sort="[[_computeSort()]]"
          observe="isImportant isCompleted"
        >
          <todo-taskrow
            item="{{item}}"
            on-remove="_removeTodoItem"
          ></todo-taskrow>
        </template>
      </div>
    `;
  }

  _computeSort() {
    if (this.sortOrder === TodoSortOrder.IMPORTANCE) {
      return function (item1, item2) {
        return item2.isImportant - item1.isImportant;
      };
    } else if (this.sortOrder === TodoSortOrder.ALPHABETICAL) {
      return function (item1, item2) {
        return item1.title.localeCompare(item2.title);
      };
    } else if (this.sortOrder === TodoSortOrder.CREATION_DATE) {
      return function (item1, item2) {
        return Date.parse(item1.creationTime) - Date.parse(item2.creationTime);
      };
    }
    return null;
  }

  _computeFilter(filter) {
    if (filter === this.filter.INCOMPLETE) {
      return function (item) {
        return !item.isCompleted;
      };
    } else if (filter === this.filter.COMPLETED) {
      return function (item) {
        return item.isCompleted;
      };
    }
    return null;
  }

  _showCompletedTasks() {
    if (this.items) {
      const completedItems = this.items.filter((item) => item.isCompleted);
      return completedItems.length > 0;
    }
    return false;
  }

  _removeTodoItem(e) {
    const index = this.items.findIndex((item) => item.id === e.detail.id);
    if (index !== -1) {
      this.splice("items", index, 1);
    }
  }
}

window.customElements.define(TodoTaskList.is, TodoTaskList);
