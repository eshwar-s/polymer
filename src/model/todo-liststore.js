import { TodoList } from "./todo-list.js";

const todo_list_storage_id = "todo-lists";

export async function loadTodoLists() {
  return new Promise((resolve) => {
    // Using a timeout to simulate slower fetch
    setTimeout(() => {
      const todoLists = [];
      const listData = window.localStorage.getItem(todo_list_storage_id);

      for (const listId of JSON.parse(listData)) {
        const itemData = window.localStorage.getItem(listId);
        todoLists.push(new TodoList().deserialize(itemData));
      }

      resolve(todoLists);
    }, 300);
  });
}

export function saveTodoLists(todoLists) {
  window.localStorage.setItem(
    todo_list_storage_id,
    JSON.stringify(todoLists.map((list) => list.id))
  );

  for (const todoList of todoLists) {
    window.localStorage.setItem(todoList.id, todoList.serialize());
  }
}
