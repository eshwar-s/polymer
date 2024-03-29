import { uuidv4 } from "./uuid.js";

export class TodoItem {
  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.creationTime = new Date().toDateString();
    this.isImportant = false;
    this.isCompleted = false;
    this.owner = null;
    this.notes = "";
  }
}
