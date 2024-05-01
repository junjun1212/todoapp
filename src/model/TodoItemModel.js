// ユニークな ID を管理する変数
let todoIdx = 0;

export class TodoItemModel {
  /** @type {number} Todo アイテムのID */
  id;
  /** @type {string} Todo アイテムのタイトル */
  title;
  /** @type {boolean} Todo アイテムが完了済みならば true、そうでない場合は false */
  completed;

  /**
   * @param {{ title: string, completed: boolean }}
   */
  constructor({ title, completed }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
