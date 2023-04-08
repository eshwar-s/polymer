import { uuidv4 } from "./uuid.js";

export class TodoList {
  constructor(listName) {
    this.id = uuidv4();
    this.name = listName;
    this.items = [];
  }

  static new() {
    return new TodoList("Untitled");
  }

  printTodoList() {
    console.log(`listName: ${this.name}`);
    this.items.forEach((value) => console.log(value));
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(json) {
    let serializedObj = JSON.parse(json);
    return Object.assign(this, serializedObj);
  }
}
