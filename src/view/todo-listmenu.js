import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/image-icons.js";
import "../common/shared-styles.js";
import "../view/todo-menuitem.js";
import "../view/todo-deletelist.js";
import { LocalizeMixin } from "../common/localize-mixin.js";

class TodoListMenu extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-listmenu";
  }

  static get properties() {
    return {
      list: {
        type: Object,
        notify: true
      },
      settings: {
        type: Object,
        notify: true
      },
      deleteList: {
        type: Boolean,
        value: false
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        paper-menu-button {
          --paper-menu-button: {
            padding: 0px;
          }
        }
        paper-icon-button {
          --paper-icon-button: {
            color: var(--primary-background-color);
          }
        }
      </style>
      <paper-menu-button
        id="dropdown"
        vertical-align="top"
        horizontal-align="right"
        vertical-offset="36"
      >
        <paper-icon-button
          id="menu-icon-button"
          icon="more-horiz"
          slot="dropdown-trigger"
          alt="menu"
        ></paper-icon-button>
        <div class="dropdown-content" slot="dropdown-content">
          <todo-menuitem
            start-icon="image:flip"
            text="[[localize('renameList')]]"
          ></todo-menuitem>
          <todo-menuitem
            start-icon="sort"
            text="[[localize('sortList')]]"
          ></todo-menuitem>
          <todo-menuitem
            start-icon="image:color-lens"
            text="[[localize('changeTheme')]]"
          ></todo-menuitem>
          <todo-menuitem
            start-icon="print"
            text="[[localize('printList')]]"
          ></todo-menuitem>
          <template is="dom-if" if="[[settings.showCompleted]]">
            <todo-menuitem
              start-icon="check-circle"
              text="[[localize('hideCompletedTasks')]]"
              on-tap="_toggleShowCompletedTasks"
            ></todo-menuitem>
          </template>
          <template is="dom-if" if="[[!settings.showCompleted]]">
            <todo-menuitem
              start-icon="check-circle"
              text="[[localize('showCompletedTasks')]]"
              on-tap="_toggleShowCompletedTasks"
            ></todo-menuitem>
          </template>
          <div class="divider"></div>
          <todo-menuitem
            start-icon="delete-forever"
            text="[[localize('deleteList')]]"
            on-tap="_openDeleteListDialog"
          ></todo-menuitem>
        </div>
      </paper-menu-button>
      <todo-deletelist
        opened="{{deleteList}}"
        list="{{list}}"
      ></todo-deletelist>
    `;
  }

  _toggleShowCompletedTasks() {
    this.set("settings.showCompleted", !this.settings.showCompleted);
    this.$.dropdown.close();
  }

  _openDeleteListDialog() {
    this.deleteList = true;
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoListMenu.is, TodoListMenu);
