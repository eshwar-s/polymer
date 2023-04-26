import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/iron-icons/iron-icons.js";
import "../common/shared-styles.js";

class TodoMenuItem extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-menuitem";
  }

  static get properties() {
    return {
      startIcon: {
        type: String
      },
      text: {
        type: String
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles"></style>
      <paper-item role="menuitem" class="menu-item"
        ><iron-icon class="start-icon" icon="[[startIcon]]"></iron-icon>[[text]]
      </paper-item>
    `;
  }
}

window.customElements.define(TodoMenuItem.is, TodoMenuItem);
