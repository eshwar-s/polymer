import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-dropdown/iron-dropdown.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/image-icons.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";
import "./todo-menuitem.js";
import "./todo-deletelist.js";
import "./todo-themepicker.js";

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
      openDeleteDialog: {
        type: Boolean,
        value: false
      },
      openThemeDialog: {
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
      <paper-icon-button
        id="menu-icon-button"
        icon="more-horiz"
        slot="dropdown-trigger"
        alt="[[localize('menu')]]"
        aria-haspopup="true"
        on-tap="_handleMenuOpenEvent"
      ></paper-icon-button>
      <iron-dropdown
        id="dropdown"
        horizontal-align="right"
        vertical-align="top"
        vertical-offset="36"
      >
        <div role="menu" class="dropdown-content" slot="dropdown-content">
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
            on-tap="_openThemePickerDialog"
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
      </iron-dropdown>
      <todo-deletelist
        opened="{{openDeleteDialog}}"
        list-id="[[list.id]]"
        list-name="[[list.name]]"
      ></todo-deletelist>
      <todo-themepicker
        opened="{{openThemeDialog}}"
        settings="{{settings}}"
        selected-theme="[[settings.theme]]"
      >
      </todo-themepicker>
    `;
  }

  _handleMenuOpenEvent(e) {
    this.$.dropdown.positionTarget = e.currentTarget;
    this.$.dropdown.open();
  }

  _toggleShowCompletedTasks() {
    this.set("settings.showCompleted", !this.settings.showCompleted);
    this.$.dropdown.close();
  }

  _openDeleteListDialog() {
    this.openDeleteDialog = true;
    this.$.dropdown.close();
  }

  _openThemePickerDialog() {
    this.openThemeDialog = true;
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoListMenu.is, TodoListMenu);
