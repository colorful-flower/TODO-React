type Props = {
  filter: Filter;
  sortOrder: SortOrder;
  onChangeFilter: (f: Filter) => void;
  onChangeSort: (s: SortOrder) => void;
};

export default function FilterBar({
  filter,
  sortOrder,
  onChangeFilter,
  onChangeSort,
}: Props) {
  return (
    <>
      <div className="controls">
        <button
          onClick={() => onChangeFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          すべて
        </button>
        <button
          onClick={() => onChangeFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          未完了
        </button>
        <button
          onClick={() => onChangeFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          完了
        </button>
      </div>

      <select
        value={sortOrder}
        onChange={(e) => onChangeSort(e.target.value as SortOrder)}
      >
        <option value="new">新しい順</option>
        <option value="old">古い順</option>
      </select>
    </>
  );
}
