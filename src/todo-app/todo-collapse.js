import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-collapse/iron-collapse.js";
import "@polymer/iron-icons/iron-icons.js";

class TodoCollapse extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-collapse";
  }

  static get properties() {
    return {
      text: {
        type: String,
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        paper-button {
          text-transform: none;
          font-weight: bold;
          padding: 7px;
        }
        iron-icon {
          margin-right: 5px;
        }
      </style>
      <paper-button on-click="_toggleCollapse"
        ><iron-icon id="icon"></iron-icon>{{text}}</paper-button
      >
      <iron-collapse id="collapse">
        <slot></slot>
      </iron-collapse>
    `;
  }

  ready() {
    super.ready();
    this._toggleCollapse();
  }

  _toggleCollapse() {
    this.$.icon.icon = this.$.collapse.opened ? "chevron-right" : "expand-more";
    this.$.collapse.toggle();
  }
}

window.customElements.define(TodoCollapse.is, TodoCollapse);
