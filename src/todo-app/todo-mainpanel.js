import { html } from "@polymer/polymer/polymer-element.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import { TodoBaseImpl } from "./todo-base.js";
import "./todo-listview.js";

class TodoMainPanel extends TodoBaseImpl {
  constructor() {
    super();
  }

  static get is() {
    return "todo-mainpanel";
  }

  static get properties() {
    return {
      currentRoute: {
        type: Object,
        value: { page: null, id: 0 },
        reflectToAttribute: true
      },
      todoLists: {
        type: Array,
        value: [],
        notify: true,
        reflectToAttribute: true
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
        role="main"
        selected="[[currentRoute.page]]"
        attr-for-selected="name"
      >
        <todo-listview name="lists" list="{{selectedTodoList}}">
        </todo-listview>
      </iron-pages>
    `;
  }

  _routeChanged(page, id) {
    this.currentRoute = { page: page || "lists", id: id || 0 };

    switch (this.currentRoute.page) {
      case "lists":
        if (this.currentRoute.id < this.todoLists.length) {
          this.$.selector.select(this.todoLists[this.currentRoute.id]);
        }
        break;
    }
  }
}

window.customElements.define(TodoMainPanel.is, TodoMainPanel);
