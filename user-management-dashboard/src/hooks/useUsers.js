import { useEffect, useState } from "react";
import { getUsers } from "../api/userService";
import { mapUser } from "../utils/helpers";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response =
        await getUsers();

      setUsers(
        response.data.map(mapUser)
      );
    } catch {
      setError(
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    setUsers,
    loading,
    error,
  };
}