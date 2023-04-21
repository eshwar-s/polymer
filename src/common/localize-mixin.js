import { AppLocalizeBehavior } from "@polymer/app-localize-behavior";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";

export default dedupingMixin(
  (superClass) =>
    class extends mixinBehaviors([AppLocalizeBehavior], superClass) {
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
        super.attached();
        // Resources are cached so they aren't loaded each time
        this.loadResources("/locales.json");
      }
    }
);
