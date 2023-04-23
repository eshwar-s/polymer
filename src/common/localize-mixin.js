import { AppLocalizeBehavior } from "@polymer/app-localize-behavior";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";

/* @polymerMixin */
export const LocalizeMixin = dedupingMixin((superClass) => {
  class LocalizeMixin extends mixinBehaviors(
    [AppLocalizeBehavior],
    superClass
  ) {
    static get properties() {
      return {
        language: {
          type: String,
          value: "en"
        }
      };
    }

    attached() {
      super.attached();
      // Resources are cached so they aren't loaded each time
      this.loadResources("/locales.json");
    }
  }

  return LocalizeMixin;
});
