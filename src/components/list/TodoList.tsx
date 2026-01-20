// components/list/TodoList.tsx
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

export default function TodoList({ todos, dispatch }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}
