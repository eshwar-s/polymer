import { html } from "@polymer/polymer/polymer-element.js";

const styleMod = document.createElement("dom-module");
styleMod.appendChild(
  html`
    <template>
      <style>
        paper-button {
          text-transform: none;
        }

        paper-listbox {
          --paper-listbox-background-color: transparent;
        }

        .list-item,
        .menu-item {
          --paper-item-selected-weight: normal;
          --paper-font-subhead: {
            font-size: 14px;
            font-weight: normal;
          }
          user-select: none;
        }

        .start-icon {
          margin-right: 10px;
        }
      </style>
    </template>
  `.content
);
styleMod.register("todo-shared-styles");
