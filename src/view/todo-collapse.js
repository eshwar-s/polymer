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
      },
      opened: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      startIcon: {
        type: String,
        computed: "_computeIcon(opened)",
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
        ><iron-icon id="icon" icon="[[startIcon]]"></iron-icon
        >[[text]]</paper-button
      >
      <iron-collapse id="collapse" opened="[[opened]]">
        <slot></slot>
      </iron-collapse>
    `;
  }

  ready() {
    super.ready();
  }

  _toggleCollapse() {
    this.opened = !this.opened;
  }

  _computeIcon(opened) {
    return opened ? "chevron-right" : "expand-more";
  }
}

window.customElements.define(TodoCollapse.is, TodoCollapse);
