import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/element-styles/paper-material-styles.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-dropdown/iron-dropdown.js";
import "@polymer/iron-icons/image-icons.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import "../common/shared-styles.js";
import "./delete-list.js";
import "./icon-label.js";

class TodoSideBarMenu extends LocalizeMixin(PolymerElement) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-sidebar-menu";
  }

  static get properties() {
    return {
      menuOpen: {
        type: Boolean,
        value: false,
        notify: true
      },
      lists: {
        type: Array,
        value: [],
        notify: true
      },
      selectedList: {
        type: Object,
        value: null
      },
      positionTarget: {
        type: Object
      },
      openDeleteDialog: {
        type: Boolean,
        notify: true
      }
    };
  }

  static get template() {
    return html`
      <style include="paper-material-styles todo-shared-styles"></style>
      <iron-dropdown
        id="dropdown"
        opened="{{menuOpen}}"
        horizontal-align="left"
        vertical-align="top"
        position-target="[[positionTarget]]"
      >
        <paper-listbox
          id="menu"
          role="menu"
          class="dropdown-content"
          slot="dropdown-content"
          selectable="paper-item"
        >
          <paper-item
            role="menuitem"
            class="menu-item"
            disabled="[[!selectedList]]"
            on-click="_renameTodoList"
          >
            <todo-icon-label
              start-icon="image:flip"
              text="[[localize('renameList')]]"
            ></todo-icon-label>
          </paper-item>
          <paper-item
            role="menuitem"
            class="menu-item"
            on-click="_printTodoList"
          >
            <todo-icon-label
              start-icon="print"
              text="[[localize('printList')]]"
            >
            </todo-icon-label>
          </paper-item>
          <div class="divider"></div>
          <paper-item
            role="menuitem"
            class="menu-item"
            disabled="[[!selectedList]]"
            on-click="_openDeleteListDialog"
          >
            <todo-icon-label
              start-icon="delete-forever"
              text="[[localize('deleteList')]]"
            >
            </todo-icon-label>
          </paper-item>
        </paper-listbox>
      </iron-dropdown>
      <todo-delete-list
        id="deleteDialog"
        opened="{{openDeleteDialog}}"
        list-id="[[selectedList.id]]"
        list-name="[[selectedList.name]]"
        on-delete-list="_deleteTodoList"
      ></todo-delete-list>
    `;
  }

  openMenu(positionTarget, selectedList) {
    this.$.menu.selectIndex(-1);
    this.menuOpen = true;
    this.positionTarget = positionTarget;
    this.selectedList = selectedList;
  }

  _deleteTodoList(e) {
    const listId = e.detail.list;
    const index = this.lists.findIndex((list) => list.id === listId);
    if (index !== -1) {
      this.splice("lists", index, 1);
    }
  }

  _renameTodoList() {
    this.$.dropdown.close();
  }

  _printTodoList() {
    this.$.dropdown.close();
  }

  _openDeleteListDialog() {
    this.openDeleteDialog = true;
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoSideBarMenu.is, TodoSideBarMenu);
