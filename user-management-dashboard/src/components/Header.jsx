export default function Header({ onAdd }) {
  return (
    <div className="header">
      <h1>User Management Dashboard</h1>

      <button
        className="add-btn"
        onClick={onAdd}
      >
        + Add User
      </button>
    </div>
  );
}