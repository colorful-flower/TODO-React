import "./styles.css";
import { useReducer, useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import Header from "./components/header/Header";
import TodoInput from "./components/input/TodoInput";
import FilterBar from "./components/filter/FilterBar";
import TodoList from "./components/list/TodoList";
import DangerZone from "./components/danger/ClearAllButton";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  editing: boolean;
};

type Filter = "all" | "active" | "completed";
type SortOrder = "new" | "old";

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "START_EDIT"; payload: number }
  | { type: "SAVE_EDIT"; payload: { id: number; text: string } }
  | { type: "CANCEL_EDIT"; payload: number }
  | { type: "CLEAR_ALL"; payload: any };

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    // 追加する
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
          editing: false,
        },
      ];

    // 完了状態を反転する
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    // 指定したID以外のものだけ残す→削除
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    // 編集モードにする
    case "START_EDIT":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, editing: true } : todo
      );

    // idが一致したtodoのtextを書き換える
    case "SAVE_EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              editing: false,
            }
          : todo
      );

    // 編集をキャンセル→editingをfalseに戻す
    case "CANCEL_EDIT":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, editing: false } : todo
      );

    // 全削除
    case "CLEAR_ALL":
      return [];

    // デフォルト
    default:
      return state;
  }
};

//  データをlocalstrageに保存
const initializer = (): Todo[] => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
};

export default function TodoApp() {
  // 新規todoの入力用
  const [text, setText] = useState("");
  // 編集中のtext用
  const [editText, setEditText] = useState("");

  const [todos, dispatch] = useReducer(reducer, [], initializer);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  // 機能
  const [filter, setFilter] = useState<Filter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("new");

  // フィルター
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // 並び替え
  const visibleTodos = filteredTodos
    .slice()
    .sort((a, b) => (sortOrder === "new" ? b.id - a.id : a.id - b.id));

  // 件数
  const activeCount = todos.filter((todo) => !todo.completed).length;

  // 全削除
  const clearAll = () => {
    if (!todos.length) return;
    if (!window.confirm("すべて削除しますか？")) return;
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <div className="app">
      {/* <h1>やることリスト</h1>
      <p className="count">残り {activeCount} 件</p> */}
      <Header remainingCount={activeCount} />
      {/* <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="やること"
        />

        <button className="primary" onClick={addTodo} disabled={!text.trim()}>
          追加
        </button>
      </div> */}

      <TodoInput text={text} onChange={setText} onAdd={addTodo} />
      <FilterBar
        filter={filter}
        sortOrder={sortOrder}
        onChangeFilter={setFilter}
        onChangeSort={setSortOrder}
      />
      <TodoList todos={visibleTodos} dispatch={dispatch} />
      <DangerZone onClear={clearAll} />

      {/* <div className="controls">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          すべて
        </button>

        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          未完了
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          完了
        </button>
      </div>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="new">新しい順</option>
        <option value="old">古い順</option>
      </select> */}

      {/* <div className="todo-actions">
        <button>編集</button>
        <button className="danger">削除</button>
      </div> */}

      {/* <button className="clear-all" onClick={clearAll}>
        全削除
      </button> */}
      {/* <ul>
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </ul> */}
    </div>
  );
}
