import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { beforeNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/iron-dropdown/iron-dropdown.js";
import "../common/shared-styles.js";

class TodoSubmenu extends PolymerElement {
  constructor() {
    super();
  }

  static get is() {
    return "todo-submenu";
  }

  static get properties() {
    return {
      parentMenuOpen: {
        type: Boolean,
        observer: "_parentMenuOpenChanged"
      },
      horizontalAlign: {
        type: String,
        value: "left"
      },
      verticalAlign: {
        type: String,
        value: "top"
      },
      horizontalOffset: {
        type: Number,
        value: 0
      },
      verticalOffset: {
        type: Number,
        value: 0
      }
    };
  }

  static get template() {
    return html`
      <style include="todo-shared-styles"></style>
      <div on-tap="_handleTapEvent">
        <slot id="menutrigger" name="menu-trigger"></slot>
      </div>
      <iron-dropdown
        id="dropdown"
        allow-click-through
        horizontal-align="[[horizontalAlign]]"
        vertical-align="[[verticalAlign]]"
        horizontal-offset="[[horizontalOffset]]"
        vertical-offset="[[verticalOffset]]"
        on-iron-overlay-opened="_handleMenuOpened"
        on-iron-overlay-closed="_handleMenuClosed"
      >
        <slot
          id="menucontent"
          slot="dropdown-content"
          name="menu-content"
        ></slot>
      </iron-dropdown>
    `;
  }

  ready() {
    super.ready();
    this.addEventListener("keydown", this._handleKeyDownEvent);
    this.addEventListener("focus", this._handleFocusEvent);
  }

  _handleTapEvent(event) {
    this.$.dropdown.open();
    event.stopPropagation();
  }

  _handleKeyDownEvent(event) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowRight"
    ) {
      this.$.dropdown.open();
      event.stopPropagation();
    }
  }

  _handleFocusEvent(event) {
    beforeNextRender(this, () => {
      const triggerNode = this.$.menutrigger.assignedNodes()[0];
      triggerNode.setAttribute("tabindex", "0");
      triggerNode.focus({ focusVisible: true });
    });
  }

  _handleMenuOpened() {
    const triggerNode = this.$.menutrigger.assignedNodes()[0];
    triggerNode.classList.add("iron-selected");
  }

  _handleMenuClosed() {
    const triggerNode = this.$.menutrigger.assignedNodes()[0];
    triggerNode.classList.remove("iron-selected");

    if (this.parentMenuOpen) {
      const triggerNode = this.$.menutrigger.assignedNodes()[0];
      triggerNode.focus({ focusVisible: true });
    }
  }

  _parentMenuOpenChanged() {
    this.$.dropdown.close();
  }
}

window.customElements.define(TodoSubmenu.is, TodoSubmenu);
