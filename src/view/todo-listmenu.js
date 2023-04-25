import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/image-icons.js";
import "../common/shared-styles.js";
import "../view/todo-menuitem.js";
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
        div [slot="dropdown-content"] {
          @apply --shadow-elevation-3dp;
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
        <div slot="dropdown-content">
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
              on-tap="toggleShowCompletedTasks_"
            ></todo-menuitem>
          </template>
          <template is="dom-if" if="[[!settings.showCompleted]]">
            <todo-menuitem
              start-icon="check-circle"
              text="[[localize('showCompletedTasks')]]"
              on-tap="toggleShowCompletedTasks_"
            ></todo-menuitem>
          </template>
          <div class="divider"></div>
          <todo-menuitem
            start-icon="delete-forever"
            text="[[localize('deleteForever')]]"
          ></todo-menuitem>
        </div>
      </paper-menu-button>
    `;
  }

  toggleShowCompletedTasks_() {
    this.set("settings.showCompleted", !this.settings.showCompleted);
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoListMenu.is, TodoListMenu);
