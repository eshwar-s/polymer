import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "./todo-listitem.js";

export const Filter = { Completed: 0, NotCompleted: 1 };

class TodoListItems extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-listitems";
  }

  static get properties() {
    return {
      items: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
      },
      selected: {
        type: Number,
        value: undefined,
        notify: true,
        reflectToAttribute: true
      },
      filter: {
        type: Number,
        value: undefined,
        observer: "_validateFilter"
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          margin-bottom: 10px;
        }
      </style>
      <paper-listbox selected="{{selected}}">
        <template
          is="dom-repeat"
          items="{{items}}"
          sort="{{_computeSort(filter)}}"
          filter="{{_computeFilter(filter)}}"
          observe="_isImportant _isCompleted"
        >
          <todo-listitem
            item="{{item}}"
            on-remove="_removeTodoItem"
          ></todo-listitem>
        </template>
      </paper-listbox>
    `;
  }

  ready() {
    super.ready();
  }

  _validateFilter(newValue, oldValue) {
    if (newValue !== Filter.Completed && newValue !== Filter.NotCompleted) {
      this.filter = undefined;
    }
  }

  _computeFilter(filter) {
    // No filter is applied when undefined, otherwise if 'true' return completed
    // items or if 'false' return not completed items
    if (filter !== undefined) {
      return function (item) {
        return filter === Filter.Completed
          ? item._isCompleted
          : !item._isCompleted;
      };
    }
    return null;
  }

  _computeSort(filter) {
    if (filter === Filter.NotCompleted) {
      return function (item1, item2) {
        if (item1._isImportant !== item2._isImportant) {
          return item1._isImportant ? -1 : 1;
        }
        return 0;
      };
    }
    return null;
  }

  _removeTodoItem(e) {
    const index = this.items.findIndex((item) => item._id === e.detail.id);
    if (index !== -1) {
      this.splice("items", index, 1);
    }
  }
}

window.customElements.define(TodoListItems.is, TodoListItems);
