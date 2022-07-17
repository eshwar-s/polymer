import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/app-layout/app-drawer/app-drawer.js";

class TodoDrawer extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-drawer";
  }

  static get template() {
    return html`
      <style>
        app-drawer {
          --app-drawer-width: 300px;
        }
      </style>
      <paper-icon-button
        icon="menu"
        on-click="_openDrawerClicked"
      ></paper-icon-button>
      <app-drawer id="drawer" style="z-index:1">
        <slot></slot>
      </app-drawer>
    `;
  }

  ready() {
    super.ready();
  }

  _openDrawerClicked() {
    this.$.drawer.open();
  }
}

window.customElements.define(TodoDrawer.is, TodoDrawer);
