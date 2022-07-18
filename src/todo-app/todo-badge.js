import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

class TodoBadge extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-badge";
  }

  static get properties() {
    return {
      count: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      }
    };
  }

  static get template() {
    return html`
      <style>
        .count-badge {
          font-size: 12px;
          font-weight: normal !important;
          min-width: 24px;
          min-height: 24px;
          text-align: center;
          border-radius: 50%;
          background-color: var(--paper-grey-300);
        }
      </style>
      <template is="dom-if" if="{{_isVisible(count)}}">
        <div class="count-badge">{{count}}</div>
      </template>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  _isVisible() {
    return this.count > 0;
  }
}

window.customElements.define(TodoBadge.is, TodoBadge);
