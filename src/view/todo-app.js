import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { loadTodoLists, saveTodoLists } from "../model/todo-store.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "./todo-styles.js";
import "./todo-sidebar.js";
import "./todo-spinner.js";
import "./todo-collapse.js";
import "./todo-mainpanel.js";

class TodoApp extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
    this._unloadListener = this._unload.bind(this);
  }

  static get is() {
    return "todo-app";
  }

  static get properties() {
    return {
      loading: {
        type: Boolean,
        value: true
      },
      todoLists: {
        type: Array,
        value: [],
        notify: true
      }
    };
  }

  static get template() {
    return html`
      <style
        is="custom-style"
        include="paper-material-styles todo-shared-styles"
      >
        :host {
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
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
          flex-grow: 1;
        }
        .sidebar {
          width: var(--sidebar-width);
          height: 100%;
        }
        @media only screen and (max-width: 600px) {
          .sidebar {
            display: none;
          }
        }
      </style>

      <todo-spinner id="spinner" loading="[[loading]]">
        <div class="container">
          <div class="sidebar">
            <todo-sidebar
              id="sidebar"
              lists="{{todoLists}}"
              selected="{{selectedList}}"
            ></todo-sidebar>
          </div>
          <div class="main">
            <todo-mainpanel todo-lists="{{todoLists}}"></todo-mainpanel>
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
    this.loading = false;
  }

  _unload() {
    if (!this.loading) {
      saveTodoLists(this.todoLists);
    }
  }
}

window.customElements.define(TodoApp.is, TodoApp);
