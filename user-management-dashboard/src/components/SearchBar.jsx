export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {search && (
        <button
          className="clear-search-btn"
          onClick={() => setSearch("")}
        >
          ✕
        </button>
      )}

    </div>
  );
}