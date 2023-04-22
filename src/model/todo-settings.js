export const TodoSortOrder = {
  ALPHABETICAL: 0,
  IMPORTANCE: 1,
  CREATION_DATE: 2
};

export class TodoSettings {
  constructor() {
    this.showCompleted = true;
    this.sortOrder = TodoSortOrder.CREATION_DATE;
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(json) {
    let serializedObj = JSON.parse(json);
    return Object.assign(this, serializedObj);
  }
}
