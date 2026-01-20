type Props = {
  onClear: () => void;
};

export default function DangerZone({ onClear }: Props) {
  return (
    <div className="danger-zone">
      <button className="clear-all" onClick={onClear}>
        全削除
      </button>
    </div>
  );
}
