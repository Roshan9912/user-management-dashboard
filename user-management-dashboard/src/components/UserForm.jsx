import { useState } from "react";
import { validateUser } from "../utils/validators";

export default function UserForm({
  user,
  onSave,
  onClose,
}) {

  const [form, setForm] =
    useState(
      user || {
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      }
    );

  const [errors, setErrors] =
    useState({});

  const handleChange = (
    field,
    value
  ) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const validationErrors =
      validateUser(form);

    if (
      Object.keys(
        validationErrors
      ).length
    ) {
      setErrors(
        validationErrors
      );
      return;
    }

    onSave(form);
  };

  return (
    <div className="modal">

      <h2>
        {user
          ? "Edit User"
          : "Add User"}
      </h2>

      <form
        className="form"
        onSubmit={submit}
      >

        <label>
          First Name
        </label>

        <input
          type="text"
          placeholder="Enter first name"
          value={form.firstName}
          onChange={(e) =>
            handleChange(
              "firstName",
              e.target.value
            )
          }
        />

        {errors.firstName && (
          <span className="error">
            {errors.firstName}
          </span>
        )}

        <label>
          Last Name
        </label>

        <input
          type="text"
          placeholder="Enter last name"
          value={form.lastName}
          onChange={(e) =>
            handleChange(
              "lastName",
              e.target.value
            )
          }
        />

        {errors.lastName && (
          <span className="error">
            {errors.lastName}
          </span>
        )}

        <label>
          Email
        </label>

        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) =>
            handleChange(
              "email",
              e.target.value
            )
          }
        />

        {errors.email && (
          <span className="error">
            {errors.email}
          </span>
        )}

        <label>
          Department
        </label>

        <select
          value={form.department}
          onChange={(e) =>
            handleChange(
              "department",
              e.target.value
            )
          }
        >
          <option value="">
            Select Department
          </option>

          <option value="IT">
            IT
          </option>

          <option value="Engineering">
            Engineering
          </option>

          <option value="HR">
            HR
          </option>

          <option value="Finance">
            Finance
          </option>

          <option value="Sales">
            Sales
          </option>
        </select>

        {errors.department && (
          <span className="error">
            {errors.department}
          </span>
        )}

        <div className="form-buttons">

          <button
            className="save-btn"
            type="submit"
          >
            Save
          </button>

          <button
            className="cancel-btn"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}