import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "./todo-listview.js";

class TodoMainPanel extends PolymerElement {
  constructor() {
    super();
    this._deleteListListener = this._deleteTodoList.bind(this);
  }

  static get is() {
    return "todo-mainpanel";
  }

  static get properties() {
    return {
      todoLists: {
        type: Array,
        value: [],
        notify: true
      },
      todoSettings: {
        type: Object,
        notify: true
      }
    };
  }

  static get observers() {
    return ["_routeChanged(routeData.page, subrouteData.id, todoLists.*)"];
  }

  static get template() {
    return html`
      <style>
        iron-pages {
          height: 100%;
          margin: 0px;
        }
        * {
          box-sizing: border-box;
        }
      </style>
      <app-location route="{{route}}"></app-location>
      <app-route
        route="{{route}}"
        pattern="/:page"
        data="{{routeData}}"
        tail="{{subroute}}"
      >
      </app-route>
      <app-route route="{{subroute}}" pattern="/:id" data="{{subrouteData}}">
      </app-route>
      <array-selector
        id="selector"
        items="{{todoLists}}"
        selected-item="{{selectedTodoList}}"
      ></array-selector>
      <iron-pages
        id="page-selector"
        selected="[[routeData.page]]"
        attr-for-selected="name"
      >
        <todo-listview
          name="lists"
          route="{{route}}"
          list="{{selectedTodoList}}"
          settings="{{todoSettings}}"
        >
        </todo-listview>
      </iron-pages>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("delete-list", this._deleteListListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("delete-list", this._deleteListListener);
  }

  _routeChanged() {
    switch (this.routeData.page) {
      case "lists":
        if (this.subrouteData.id < this.todoLists.length) {
          this.$.selector.select(this.todoLists[this.subrouteData.id]);
        }
        break;
    }
  }

  _deleteTodoList(e) {
    const listId = e.detail.list;
    const index = this.todoLists.findIndex((list) => list.id === listId);
    if (index !== -1) {
      this.splice("todoLists", index, 1);
    }
  }
}

window.customElements.define(TodoMainPanel.is, TodoMainPanel);
