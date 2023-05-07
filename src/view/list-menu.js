import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/iron-icons/notification-icons.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import { TodoSortOrder } from "../model/todo-settings.js";
import "../common/shared-styles.js";
import "./icon-label.js";
import "./submenu.js";
import "./delete-list.js";
import "./theme-picker.js";

class TodoListMenu extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-list-menu";
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
        paper-item {
          --paper-item-selected: {
            background-color: var(--secondary-color);
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
          id="menu"
          role="menu"
          class="dropdown-content"
          slot="dropdown-content"
          selectable="paper-item, todo-submenu"
        >
          <paper-item role="menuitem" class="menu-item">
            <todo-icon-label
              start-icon="image:flip"
              text="[[localize('renameList')]]"
            ></todo-icon-label>
          </paper-item>
          <todo-submenu
            parent-menu-open="[[menuOpen]]"
            horizontal-align="left"
            vertical-align="top"
            horizontal-offset="-200"
          >
            <paper-item role="menuitem" class="menu-item" slot="menu-trigger">
              <todo-icon-label
                start-icon="sort"
                text="[[localize('sortList')]]"
                end-icon="chevron-right"
              >
              </todo-icon-label>
            </paper-item>
            <paper-listbox
              id="sortmenu"
              role="menu"
              slot="menu-content"
              class="dropdown-content"
            >
              <paper-item
                role="menuitem"
                class="menu-item"
                on-tap="_sortTasksByImportance"
              >
                <todo-icon-label
                  start-icon="star-border"
                  text="[[localize('sortByImportance')]]"
                ></todo-icon-label>
              </paper-item>
              <paper-item
                role="menuitem"
                class="menu-item"
                on-tap="_sortTasksByAphabetically"
              >
                <todo-icon-label
                  start-icon="av:sort-by-alpha"
                  text="[[localize('sortAlphabetically')]]"
                ></todo-icon-label>
              </paper-item>
              <paper-item
                role="menuitem"
                class="menu-item"
                on-tap="_sortTasksByCreationDate"
              >
                <todo-icon-label
                  start-icon="notification:event-note"
                  text="[[localize('sortByCreateDate')]]"
                ></todo-icon-label>
              </paper-item>
            </paper-listbox>
          </todo-submenu>
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
    this.$.menu.selectIndex(-1);
    this.$.sortmenu.selectIndex(-1);
  }

  _sortTasksByImportance() {
    this.set("settings.sortOrder", TodoSortOrder.IMPORTANCE);
  }

  _sortTasksByAphabetically() {
    this.set("settings.sortOrder", TodoSortOrder.ALPHABETICAL);
  }

  _sortTasksByCreationDate() {
    this.set("settings.sortOrder", TodoSortOrder.CREATION_DATE);
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
