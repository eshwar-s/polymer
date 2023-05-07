import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-button/paper-button.js";
import { LocalizeMixin } from "../common/localize-mixin.js";
import { EventsMixin } from "../common/events-mixin.js";
import "../common/shared-styles.js";

class TodoDeleteList extends EventsMixin(LocalizeMixin(PolymerElement)) {
  constructor() {
    super();
  }

  static get is() {
    return "todo-delete-list";
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        value: false,
        notify: true
      },
      listId: {
        type: String,
        reflectToAttribute: true
      },
      listName: {
        type: String,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html` <style include="todo-shared-styles">
        img {
          display: block;
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
      <paper-dialog
        class="dialog"
        role="alert-dialog"
        opened="{{opened}}"
        modal="true"
        with-backdrop
      >
        <img src="/images/favicon.png" aria-hidden="true" />
        <h2>[[localize('deleteDialogTitle', 'listName', listName)]]</h2>
        <div style="text-align:center">
          [[localize('deleteDialogDescription')]]
        </div>
        <div class="dialog-button-container">
          <paper-button
            class="dialog-cancel"
            raised
            noink
            on-click="_handleDialogCancel"
            >[[localize('deleteDialogCancel')]]</paper-button
          >
          <paper-button
            class="dialog-accept"
            raised
            noink
            autofocus
            on-click="_handleDialogAccept"
            >[[localize('deleteDialogConfirm')]]</paper-button
          >
        </div>
      </paper-dialog>`;
  }

  _handleDialogAccept() {
    this.fire("delete-list", { list: this.listId });
    this.opened = false;
  }

  _handleDialogCancel() {
    this.opened = false;
  }
}

window.customElements.define(TodoDeleteList.is, TodoDeleteList);
