import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import { TodoSortOrder } from "../model/todo-settings.js";
import "../common/shared-styles.js";
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
      selectedItem: {
        type: Object,
        value: null,
        notify: true
      },
      sortOrder: {
        type: Number,
        value: TodoSortOrder.CREATION_DATE
      },
      showCompleted: {
        type: Boolean,
        value: true
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
        .list-item {
          display: block;
          padding: 0;
          margin-bottom: 2px;
          border-radius: 4px;

          --paper-item: {
            background-color: var(--primary-background-color);
          }
          --paper-item-selected: {
            background-color: var(--light-primary-color);
          }
        }

        #completed-label > * {
          font-size: 14px;
          font-weight: bold;
          user-select: none;
          color: var(--primary-background-color);
        }
      </style>
      <paper-listbox
        id="incomplete-tasks"
        class="listbox"
        selected="{{selectedItem}}"
        attr-for-selected="item"
        selected-attribute="selected"
      >
        <template
          is="dom-repeat"
          items="{{items}}"
          filter="[[_computeFilter(filter.INCOMPLETE)]]"
          sort="[[_computeSort(sortOrder)]]"
          observe="isImportant isCompleted"
        >
          <paper-item class="list-item" role="listitem" item="{{item}}">
            <todo-taskrow item="{{item}}"></todo-taskrow>
          </paper-item>
        </template>
      </paper-listbox>
      <template is="dom-if" if="[[showCompleted]]">
        <div
          id="completed-label"
          hidden$="[[!_hasCompletedTasks(items, items.*)]]"
        >
          <iron-icon icon="expand-more"></iron-icon>
          <span>[[localize('completedTasks')]]</span>
        </div>
        <paper-listbox
          id="completed-tasks"
          class="listbox"
          selected="{{selectedItem}}"
          attr-for-selected="item"
          selected-attribute="selected"
        >
          <template
            is="dom-repeat"
            items="{{items}}"
            filter="[[_computeFilter(filter.COMPLETED)]]"
            sort="[[_computeSort(sortOrder)]]"
            observe="isImportant isCompleted"
          >
            <paper-item class="list-item" role="listitem" item="{{item}}">
              <todo-taskrow item="{{item}}"></todo-taskrow>
            </paper-item>
          </template>
        </paper-listbox>
      </template>
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

  _hasCompletedTasks() {
    if (this.items) {
      const completedItems = this.items.filter((item) => item.isCompleted);
      return completedItems.length > 0;
    }
    return false;
  }
}

window.customElements.define(TodoTaskList.is, TodoTaskList);
