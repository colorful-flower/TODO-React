type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function TodoActions({ onEdit, onDelete }: Props) {
  return (
    <div className="todo-actions">
      <button onClick={onEdit}>編集</button>
      <button className="danger" onClick={onDelete}>
        削除
      </button>
    </div>
  );
}
