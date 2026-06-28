export default function ConfirmDelete({
  onConfirm,
  onCancel,
}) {

  return (
    <div className="modal">

      <h2>
        Delete User
      </h2>

      <p>
        Are you sure you want
        to delete this user?
      </p>

      <div className="form-buttons">

        <button
          className="delete-btn"
          onClick={onConfirm}
        >
          Delete
        </button>

        <button
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

      </div>

    </div>
  );
}