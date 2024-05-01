import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * todoItemに対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id: number, completed: boolean})} inUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */

  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked><span class="title"><s>${todoItem.title}</s></span><button class="edit">(編集)</button><button class="delete">(削除)</button></li>`
      : element`<li><input type="checkbox" class="checkbox"><span class="title">${todoItem.title}</span><button class="edit">(編集)</button><button class="delete">(削除)</button></li>`;

    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });

    const editButtonElement = todoItemElement.querySelector(".edit");
    const titleSpan = todoItemElement.querySelector(".title");

    editButtonElement.addEventListener("click", () => {
      const inputArea = document.createElement("input");
      inputArea.type = "text";
      inputArea.value = todoItem.title;
      titleSpan.parentNode.replaceChild(inputArea, titleSpan);

      const saveButton = document.createElement("button");
      saveButton.classList.add("save");
      saveButton.textContent = "(保存)";
      editButtonElement.parentNode.replaceChild(saveButton, editButtonElement);

      inputArea.focus();
      inputArea.setSelectionRange(inputArea.value.length, inputArea.value.length);

      saveButton.addEventListener("click", () => {
        const newTitle = inputArea.value;
        onEditTodo({
          id: todoItem.id,
          title: newTitle,
        });
        titleSpan.textContent = inputArea.value;
        inputArea.parentNode.replaceChild(titleSpan, inputArea);
        saveButton.parentNode.replaceChild(editButtonElement, saveButton);
      });
    });

    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id,
      });
    });

    return todoItemElement;
  }
}
