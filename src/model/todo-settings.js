export const ThemeColor = {
  INDIGO: "indigo",
  BLUE: "blue",
  PURPLE: "purple",
  RED: "red",
  GREEN: "green",
  TEAL: "teal"
};

export const TodoSortOrder = {
  ALPHABETICAL: 0,
  IMPORTANCE: 1,
  CREATION_DATE: 2
};

export class TodoSettings {
  constructor() {
    this.theme = ThemeColor.INDIGO;
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
