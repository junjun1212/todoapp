import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  /**
   * todoItemsに対応するTodoリストのHTML要素を作成して返す
   * @param {TodoItemModel[]} todoItems TodoItemModel の配列
   * @param {function({id:number, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} TodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(todoItems, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
    const todoListElement = element`<ul></ul>`;
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
        onEditTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
