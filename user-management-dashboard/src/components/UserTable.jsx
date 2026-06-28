import UserRow from "./UserRow";

export default function UserTable({
  users,
  onEdit,
  onDelete,
  sortField,
  sortOrder,
  onSort,
}) {

  const getArrow = (field) => {
    if (sortField !== field) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <table>
      <thead>
        <tr>

          <th onClick={() => onSort("id")}>
            ID{getArrow("id")}
          </th>

          <th onClick={() => onSort("firstName")}>
            First Name{getArrow("firstName")}
          </th>

          <th onClick={() => onSort("lastName")}>
            Last Name{getArrow("lastName")}
          </th>

          <th onClick={() => onSort("email")}>
            Email{getArrow("email")}
          </th>

          <th onClick={() => onSort("department")}>
            Department{getArrow("department")}
          </th>

          <th>
            Actions
          </th>

        </tr>
      </thead>

      <tbody>
        {users.length ? (
          users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No Users Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}