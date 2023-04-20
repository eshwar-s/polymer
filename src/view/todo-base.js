import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { AppLocalizeBehavior } from "@polymer/app-localize-behavior/app-localize-behavior.js";

export class TodoBaseImpl extends mixinBehaviors(
  [AppLocalizeBehavior],
  PolymerElement
) {
  static get properties() {
    return {
      language: {
        type: String,
        value: "en",
        reflectToAttribute: true
      }
    };
  }

  attached() {
    // Resources are cached so they aren't loaded each time
    this.loadResources("/locales.json");
  }
}
