import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import {
  loadTodoLists,
  saveTodoLists,
  saveTodoSettings
} from "../model/todo-store.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import { TodoSettings } from "../model/todo-settings.js";
import getThemeColors from "../common/theme-colors.js";
import "../common/shared-styles.js";
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
      },
      todoSettings: {
        type: Object,
        value: new TodoSettings(),
        notify: true
      }
    };
  }

  static get observers() {
    return ["_themeChanged(todoSettings.theme)"];
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
        todo-mainpanel {
          flex-grow: 1;
        }
        todo-sidebar {
          width: 250px;
          height: 100%;
        }
        @media only screen and (max-width: 600px) {
          todo-sidebar {
            display: none;
          }
        }
      </style>

      <todo-spinner id="spinner" loading="[[loading]]">
        <div class="container" on-contextmenu="_handleContextMenuEvent">
          <todo-sidebar id="sidebar" lists="{{todoLists}}"></todo-sidebar>
          <todo-mainpanel
            id="main-panel"
            todo-lists="{{todoLists}}"
            todo-settings="{{todoSettings}}"
          ></todo-mainpanel>
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
      const { lists, settings } = await loadTodoLists();
      this.set("todoLists", lists);
      this.set("todoSettings", settings);
    } catch (error) {
      alert(`Failed encountered when loading lists: ${error.message}`);
    } finally {
      this.loading = false;
    }
  }

  _unload() {
    if (!this.loading) {
      saveTodoLists(this.todoLists);
      saveTodoSettings(this.todoSettings);
    }
  }

  _themeChanged() {
    const properties = getThemeColors(this.todoSettings.theme);
    this.updateStyles(properties);
  }

  _handleContextMenuEvent(e) {
    // Disable default context menu
    e.preventDefault();
  }
}

window.customElements.define(TodoApp.is, TodoApp);
