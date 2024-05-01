import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  #items;
  /**
   * @param {TodoItemModel[]} [items]
   */
  constructor(items = []) {
    super();
    this.#items = items;
  }

  /**
   * TodoItem の合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.#items.length;
  }

  /**
   * 完了済みのTodoItemの数を返す
   * @returns {number}
   */
  getCompletedCount() {
    return this.#items.filter((item) => item.completed).length;
  }

  /**
   * 未完了のTodoItemの数を返す
   * @returns {number}
   */
  getNotcompletedCount() {
    return this.#items.filter((item) => !item.completed).length;
  }

  /**
   * 表示できるTodoItem の配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.#items;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompleteを更新する
   * @param {{ id: number, completed: boolean }}
   */

  updateTodo({ id, title, completed }) {
    const todoItem = this.#items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    if (typeof completed !== "undefined") {
      todoItem.completed = completed;
    }
    if (typeof title !== "undefined") {
      todoItem.title = title;
    }
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{ id: number }}
   */

  deleteTodo({ id }) {
    if (confirm("本当に削除してもよろしいですか？")) {
      this.#items = this.#items.filter((todo) => {
        return todo.id !== id;
      });
      this.emitChange();
    } else {
      return;
    }
  }

  editTodo({ id, title }) {
    const todoItem = this.#items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.title = title;
    this.emitChange();
  }
}
