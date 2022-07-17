import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "./todo-additem.js";
import "./todo-editlabel.js";
import "./todo-listitems.js";
import "./todo-sidebar.js";
import "./todo-spinner.js";
import "./todo-collapse.js";
import "./todo-drawer.js";
import { TodoItem } from "../model/todo-item.js";
import { loadTodoLists, saveTodoLists } from "../model/todo-liststore.js";

class TodoApp extends PolymerElement {
  constructor() {
    super();
    this._unloadListener = this._unload.bind(this);
  }

  static get is() {
    return "todo-app";
  }

  static get properties() {
    return {
      todoLists: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
      },
      selectedList: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true,
        observer: "_selectedListChanged"
      }
    };
  }

  static get observers() {
    return ["_todoListItemsChanged(todoLists.*, selectedList)"];
  }

  static get template() {
    return html`
      <style is="custom-style" include="paper-material-styles">
        :host {
          font-family: "Roboto", "Noto", sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        * {
          box-sizing: border-box;
        }
        .container {
          display: flex;
          height: 100%;
        }
        .main {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          padding: 5px;
        }
        .sidebar {
          width: 300px;
          height: 100%;
          padding: 5px;
        }
        .drawer {
          display: none;
        }
        @media only screen and (max-width: 800px) {
          .sidebar {
            display: none;
          }
          .drawer {
            display: block;
          }
        }
      </style>

      <todo-spinner id="spinner">
        <div class="container">
          <div class="sidebar">
            <todo-sidebar
              id="sidebar"
              lists="{{todoLists}}"
              selected="{{selectedList}}"
            ></todo-sidebar>
          </div>
          <div class="main">
            <div class="content" style="overflow-y:auto">
              <todo-drawer class="drawer">
                <todo-sidebar
                  id="sidebar"
                  lists="{{todoLists}}"
                  selected="{{selectedList}}"
                ></todo-sidebar>
              </todo-drawer>
              <array-selector
                id="selector"
                items="{{todoLists}}"
                selected-item="{{selectedTodoList}}"
              ></array-selector>
              <todo-editlabel
                id="listName"
                heading
                value="[[selectedTodoList.name]]"
                on-updated="_todoListNameChanged"
                click-to-edit
              ></todo-editlabel>
              <todo-listitems
                items="{{selectedTodoList.items}}"
                criteria="0"
              ></todo-listitems>
              <todo-collapse id="collapse" text="Completed">
                <todo-listitems
                  items="{{selectedTodoList.items}}"
                  criteria="1"
                ></todo-listitems>
              </todo-collapse>
            </div>
            <div class="footer">
              <todo-additem on-add="_addTodoItem"></todo-additem>
            </div>
          </div>
        </div>
      </todo-spinner>
    `;
  }

  ready() {
    super.ready();
    this._load();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("unload", this._unloadListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("unload", this._unloadListener);
  }

  async _load() {
    try {
      this.todoLists = await loadTodoLists();
    } catch (error) {
      alert(`Failed encountered when loading lists: ${error.message}`);
    }

    this.set("todoLists", this.todoLists);
    this._selectedListChanged();

    this.$.spinner.loaded();
  }

  _unload() {
    if (!this.$.spinner.loading) {
      saveTodoLists(this.todoLists);
    }
  }

  _addTodoItem(e) {
    this.push(
      `todoLists.${this.selectedList}.items`,
      new TodoItem(e.detail.task)
    );
  }

  _todoListNameChanged(e) {
    if (this.selectedList < this.todoLists.length && e.detail.value) {
      this.set(`todoLists.${this.selectedList}.name`, e.detail.value);
    }
  }

  _selectedListChanged() {
    if (this.selectedList < this.todoLists.length) {
      this.$.selector.select(this.todoLists[this.selectedList]);
      this.$.listName.setEditable(false);
    }
  }

  _todoListItemsChanged() {
    if (this.selectedList < this.todoLists.length) {
      let completedItems = this.todoLists[this.selectedList].items.filter(
        (item) => item._isCompleted
      );
      this.$.collapse.style.display =
        completedItems.length > 0 ? "block" : "none";
    }
  }
}

window.customElements.define(TodoApp.is, TodoApp);
