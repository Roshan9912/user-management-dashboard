export default function FilterPopup({
  filters,
  setFilters,
  onClose,
}) {

  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  return (
    <div className="modal">

      <div className="modal-header">

        <h3>
          Advanced Filters
        </h3>

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

      </div>

      <div className="form">

        <input
          placeholder="First Name"
          value={filters.firstName}
          onChange={(e) =>
            setFilters({
              ...filters,
              firstName: e.target.value,
            })
          }
        />

        <input
          placeholder="Last Name"
          value={filters.lastName}
          onChange={(e) =>
            setFilters({
              ...filters,
              lastName: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={filters.email}
          onChange={(e) =>
            setFilters({
              ...filters,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Department"
          value={filters.department}
          onChange={(e) =>
            setFilters({
              ...filters,
              department: e.target.value,
            })
          }
        />

        <div className="form-buttons">

          <button
            className="save-btn"
            onClick={onClose}
          >
            Apply
          </button>

          <button
            className="cancel-btn"
            onClick={clearFilters}
          >
            Clear
          </button>

        </div>

      </div>

    </div>
  );
}