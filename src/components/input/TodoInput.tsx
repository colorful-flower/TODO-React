type Props = {
  text: string;
  onChange: (v: string) => void;
  onAdd: () => void;
};

export default function TodoInput({ text, onChange, onAdd }: Props) {
  return (
    <div className="input-area">
      <input
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder="やること"
      />
      <button className="primary" onClick={onAdd} disabled={!text.trim()}>
        追加
      </button>
    </div>
  );
}
