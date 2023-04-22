import { html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/color.js";
import "@polymer/paper-styles/default-theme.js";

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
          margin-bottom: 4px;
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

        .menu-item .start-icon {
          width: 20px;
          height: 20px;
        }
      </style>
    </template>
  `.content
);
styleMod.register("todo-shared-styles");
