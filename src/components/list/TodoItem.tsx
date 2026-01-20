import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  editing: boolean;
};

type Action =
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "START_EDIT"; payload: number }
  | { type: "SAVE_EDIT"; payload: { id: number; text: string } }
  | { type: "CANCEL_EDIT"; payload: number };

type Props = {
  todo: Todo;
  dispatch: React.Dispatch<Action>;
};

export default function TodoItem({ todo, dispatch }: Props) {
  const [editText, setEditText] = useState(todo.text);

  return (
    <li className={`todo ${todo.completed ? "completed" : ""}`}>
      {todo.editing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button
            onClick={() =>
              dispatch({
                type: "SAVE_EDIT",
                payload: { id: todo.id, text: editText },
              })
            }
          >
            保存
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "CANCEL_EDIT",
                payload: todo.id,
              })
            }
          >
            キャンセル
          </button>
        </>
      ) : (
        <>
          <span
            onClick={() =>
              dispatch({
                type: "TOGGLE_TODO",
                payload: todo.id,
              })
            }
            className="todo-text"
          >
            {todo.text}
          </span>

          <button
            onClick={() =>
              dispatch({
                type: "START_EDIT",
                payload: todo.id,
              })
            }
          >
            編集
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "DELETE_TODO",
                payload: todo.id,
              })
            }
          >
            削除
          </button>
        </>
      )}
    </li>
  );
}
