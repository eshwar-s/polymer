import { uuidv4 } from "./uuid.js";

export class TodoItem {
  constructor(title) {
    this._id = uuidv4();
    this._title = title;
    this._isImportant = false;
    this._isCompleted = false;
    this._owner = null;
    this._notes = "";
  }

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get important() {
    return this._isImportant;
  }
  get completed() {
    return this._isCompleted;
  }
  get owner() {
    return this._owner;
  }
  get notes() {
    return this._notes;
  }

  set title(title) {
    this._title = title;
  }
  set important(important) {
    this._isImportant = important;
  }
  set completed(completed) {
    this._isCompleted = completed;
  }
  set owner(owner) {
    this._owner = owner;
  }
  set notes(notes) {
    this._notes = notes;
  }
}
