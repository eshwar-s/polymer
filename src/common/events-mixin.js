import { dedupingMixin } from "@polymer/polymer/lib/utils/mixin.js";

/* @polymerMixin */
export const EventsMixin = dedupingMixin((superClass) => {
  class EventsMixin extends superClass {
    fire(eventName, detail) {
      const customEvent = new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: detail
      });
      this.dispatchEvent(customEvent);
    }
  }

  return EventsMixin;
});
