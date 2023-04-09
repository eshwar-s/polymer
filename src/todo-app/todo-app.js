import { html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import { TodoBaseImpl } from "./todo-base.js";
import "./todo-sidebar.js";
import "./todo-spinner.js";
import "./todo-collapse.js";
import "./todo-mainpanel.js";
import { loadTodoLists, saveTodoLists } from "../model/todo-liststore.js";

class TodoApp extends TodoBaseImpl {
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
        value: true,
        reflectToAttribute: true
      },
      todoLists: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
      }
    };
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
          flex-grow: 1;
        }
        .sidebar {
          width: 250px;
          height: 100%;
          padding: 12px;
        }
        .drawer {
          display: none;
        }
        @media only screen and (max-width: 800px) {
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
            <todo-mainpanel todo-lists="{{todoLists}}"> </todo-mainpanel>
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
