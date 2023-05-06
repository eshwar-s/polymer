import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";
import "./icon-label.js";
import "./delete-list.js";
import "./theme-picker.js";

class TodoListMenu extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-listmenu";
  }

  static get properties() {
    return {
      menuOpen: {
        type: Boolean,
        notify: true,
        observer: "_handleMenuOpenChanged"
      },
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
      <paper-menu-button
        horizontal-align="right"
        vertical-align="top"
        vertical-offset="36"
        opened="{{menuOpen}}"
      >
        <paper-icon-button
          icon="more-horiz"
          slot="dropdown-trigger"
          alt="[[localize('menu')]]"
          aria-haspopup="true"
        ></paper-icon-button>
        <paper-listbox
          id="dropdown"
          role="menu"
          class="dropdown-content"
          slot="dropdown-content"
          selectable="paper-item"
        >
          <paper-item role="menuitem" class="menu-item">
            <todo-icon-label
              start-icon="image:flip"
              text="[[localize('renameList')]]"
            ></todo-icon-label>
          </paper-item>
          <paper-item role="menuitem" class="menu-item">
            <todo-icon-label
              start-icon="sort"
              text="[[localize('sortList')]]"
              sub-menu
            >
            </todo-icon-label>
          </paper-item>
          <paper-item
            role="menuitem"
            class="menu-item"
            on-click="_openThemePickerDialog"
          >
            <todo-icon-label
              start-icon="image:color-lens"
              text="[[localize('changeTheme')]]"
            ></todo-icon-label>
          </paper-item>
          <paper-item role="menuitem" class="menu-item">
            <todo-icon-label
              start-icon="print"
              text="[[localize('printList')]]"
            ></todo-icon-label>
          </paper-item>
          <paper-item
            role="menuitem"
            class="menu-item"
            on-click="_toggleShowCompletedTasks"
          >
            <template is="dom-if" if="[[settings.showCompleted]]">
              <todo-icon-label
                start-icon="check-circle"
                text="[[localize('hideCompletedTasks')]]"
              ></todo-icon-label>
            </template>
            <template is="dom-if" if="[[!settings.showCompleted]]">
              <todo-icon-label
                start-icon="check-circle"
                text="[[localize('showCompletedTasks')]]"
              ></todo-icon-label>
            </template>
          </paper-item>
          <div class="divider"></div>
          <paper-item
            role="menuitem"
            class="menu-item"
            on-click="_openDeleteListDialog"
          >
            <todo-icon-label
              start-icon="delete-forever"
              text="[[localize('deleteList')]]"
            ></todo-icon-label>
          </paper-item>
        </paper-listbox>
      </paper-menu-button>
      <todo-delete-list
        opened="{{openDeleteDialog}}"
        list-id="[[list.id]]"
        list-name="[[list.name]]"
      ></todo-delete-list>
      <todo-theme-picker
        opened="{{openThemeDialog}}"
        settings="{{settings}}"
        selected-theme="[[settings.theme]]"
      >
      </todo-theme-picker>
    `;
  }

  _handleMenuOpenChanged() {
    this.$.dropdown.selected = -1;
  }

  _toggleShowCompletedTasks() {
    this.set("settings.showCompleted", !this.settings.showCompleted);
  }

  _openDeleteListDialog() {
    this.openDeleteDialog = true;
  }

  _openThemePickerDialog() {
    this.openThemeDialog = true;
  }
}

window.customElements.define(TodoListMenu.is, TodoListMenu);
