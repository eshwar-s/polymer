import { uuidv4 } from "./uuid.js";

export class TodoList {
  constructor(listName) {
    this._id = uuidv4();
    this._listName = listName;
    this._todoListItems = [];
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._listName;
  }
  set name(name) {
    this._listName = name;
  }
  get items() {
    return this._todoListItems;
  }

  addTodoItem(item) {
    this._todoListItems.push(item);
  }

  removeTodoItem(id) {
    const index = this._todoListItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      this._todoListItems.splice(index, 1);
    }
  }

  printTodoList() {
    console.log(`listName: ${this._listName}`);
    this._todoListItems.forEach((value) => console.log(value));
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(json) {
    let serializedObj = JSON.parse(json);
    return Object.assign(this, serializedObj);
  }
}
