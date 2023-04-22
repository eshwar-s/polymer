import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-collapse/iron-collapse.js";
import "@polymer/iron-icons/iron-icons.js";
import "./todo-styles.js";

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
        type: String
      },
      opened: {
        type: Boolean,
        value: true
      },
      startIcon: {
        type: String,
        computed: "_computeIcon(opened)"
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles">
        paper-button {
          padding: 0px;
          font-size: 14px;
          font-weight: bold;
        }
        iron-icon {
          margin-right: 5px;
        }
      </style>
      <paper-button noink on-click="_toggleCollapse"
        ><iron-icon icon="[[startIcon]]"></iron-icon>[[text]]</paper-button
      >
      <iron-collapse id="collapse" opened="[[opened]]">
        <slot></slot>
      </iron-collapse>
    `;
  }

  _toggleCollapse() {
    this.opened = !this.opened;
  }

  _computeIcon(opened) {
    return opened ? "expand-more" : "chevron-right";
  }
}

window.customElements.define(TodoCollapse.is, TodoCollapse);
