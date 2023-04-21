import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";

export default dedupingMixin(
  (superClass) =>
    class extends superClass {
      fire(eventName, detail) {
        const customEvent = new CustomEvent(eventName, {
          bubbles: true,
          composed: true,
          detail: detail
        });
        this.dispatchEvent(customEvent);
      }
    }
);
