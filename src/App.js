import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
  #todoListModel = new TodoListModel();
  #todoListView = new TodoListView();

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  /**
   * Todoを編集したときに呼ばれるリスナー関数
   * @param {{ id: number, title: string}}
   */
  handleEdit({ id, title }) {
    this.#todoListModel.editTodo({ id, title });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      const todoListElement = this.#todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },

        onEditTodo: ({ id, title }) => {
          this.handleEdit({ id, title });
        },
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `全てのタクス:${this.#todoListModel.getTotalCount()}
        完了済み:${this.#todoListModel.getCompletedCount()}
        未完了:${this.#todoListModel.getNotcompletedCount()}`;
    });
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
