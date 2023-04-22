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
        value: 0
      },
      maxCount: {
        type: Number,
        value: 99
      }
    };
  }

  static get template() {
    return html`
      <style>
        .badge {
          font-size: 12px;
          font-weight: normal !important;
          min-width: 24px;
          min-height: 24px;
          text-align: center;
        }
      </style>
      <template is="dom-if" if="{{_isVisible(count)}}">
        <span class="badge">[[_getValue(count)]]</span>
      </template>
    `;
  }

  _isVisible() {
    return this.count > 0;
  }

  _getValue() {
    return Math.min(this.count, this.maxCount);
  }
}

window.customElements.define(TodoBadge.is, TodoBadge);
