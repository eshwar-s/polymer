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

        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listbox {
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
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .start-icon {
          margin-right: 10px;
        }

        .divider {
          border-top: 1px solid var(--secondary-color);
        }

        .dropdown-content {
          background-color: var(--primary-background-color);
          min-width: 200px;
          @apply --shadow-elevation-3dp;
          border-radius: 4px;
        }

        .dialog {
          --paper-dialog: {
            min-width: 300px;
            max-width: 500px;
            border-radius: 8px;
          }
        }
        .dialog-button-container {
          display: flex;
        }
        .dialog-accept,
        .dialog-cancel {
          flex-grow: 1;
        }
        .dialog-accept {
          --paper-button: {
            background-color: var(--primary-color);
            color: var(--primary-background-color);
            padding: 0.5em 0.5em;
            font-size: 13px;
          }
        }
        .dialog-cancel {
          --paper-button: {
            background-color: var(--secondary-color);
            padding: 0.5em 0.5em;
            font-size: 13px;
          }
        }
      </style>
    </template>
  `.content
);
styleMod.register("todo-shared-styles");
