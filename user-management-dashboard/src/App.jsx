import { useState, useMemo } from "react";

import useUsers from "./hooks/useUsers";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";

import {
  createUser,
  updateUser,
  removeUser,
} from "./api/userService";

export default function App() {
  const {
    users,
    setUsers,
    loading,
    error,
  } = useUsers();

  const [search, setSearch] =
    useState("");

  const [filters, setFilters] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

  const [showFilters,
    setShowFilters] =
    useState(false);

  const [sortField,
    setSortField] =
    useState("id");

  const [sortOrder,
    setSortOrder] =
    useState("asc");

  const [page,
    setPage] =
    useState(1);

  const [pageSize,
    setPageSize] =
    useState(10);

  const [showForm,
    setShowForm] =
    useState(false);

  const [editUser,
    setEditUser] =
    useState(null);

  const [deleteUser,
    setDeleteUser] =
    useState(null);

  const handleSort = (
    field
  ) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredUsers =
    useMemo(() => {

      return [...users]

        .filter((user) => {

          const searchTerm =
            search.toLowerCase();

          const searchMatch =
            user.firstName
              .toLowerCase()
              .includes(searchTerm) ||

            user.lastName
              .toLowerCase()
              .includes(searchTerm) ||

            user.email
              .toLowerCase()
              .includes(searchTerm) ||

            user.department
              .toLowerCase()
              .includes(searchTerm);

          const filterMatch =
            user.firstName
              .toLowerCase()
              .includes(
                filters.firstName.toLowerCase()
              ) &&

            user.lastName
              .toLowerCase()
              .includes(
                filters.lastName.toLowerCase()
              ) &&

            user.email
              .toLowerCase()
              .includes(
                filters.email.toLowerCase()
              ) &&

            user.department
              .toLowerCase()
              .includes(
                filters.department.toLowerCase()
              );

          return (
            searchMatch &&
            filterMatch
          );
        })

        .sort((a, b) => {

          if (
            a[sortField] <
            b[sortField]
          )
            return sortOrder === "asc"
              ? -1
              : 1;

          if (
            a[sortField] >
            b[sortField]
          )
            return sortOrder === "asc"
              ? 1
              : -1;

          return 0;
        });

    }, [
      users,
      search,
      filters,
      sortField,
      sortOrder,
    ]);

  const totalPages =
    Math.ceil(
      filteredUsers.length /
      pageSize
    );

  const paginatedUsers =
    filteredUsers.slice(
      (page - 1) *
        pageSize,
      page * pageSize
    );

  const handleSave =
    async (user) => {

      if (editUser) {

        await updateUser(
          user.id,
          user
        );

        setUsers(
          users.map((u) =>
            u.id === user.id
              ? user
              : u
          )
        );

      } else {

        await createUser(
          user
        );

        setUsers([
          {
            ...user,
            id: Date.now(),
          },
          ...users,
        ]);
      }

      setShowForm(false);
      setEditUser(null);
    };

  const handleDelete =
    async () => {

      await removeUser(
        deleteUser.id
      );

      setUsers(
        users.filter(
          (u) =>
            u.id !==
            deleteUser.id
        )
      );

      setDeleteUser(null);
    };

  if (loading)
    return (
      <div className="loading">
        Loading...
      </div>
    );

  if (error)
    return (
      <h2>{error}</h2>
    );

  return (
    <div className="app">

      <Header
        onAdd={() => {
          setEditUser(null);
          setShowForm(true);
        }}
      />

      <div className="controls">

        <SearchBar
          search={search}
          setSearch={
            setSearch
          }
        />

        <button
          onClick={() =>
            setShowFilters(
              true
            )
          }
        >
          Filters
        </button>

      </div>

      <div className="table-container">

        <UserTable
          users={
            paginatedUsers
          }
          onEdit={(user) => {
            setEditUser(
              user
            );
            setShowForm(
              true
            );
          }}
          onDelete={
            setDeleteUser
          }
          sortField={
            sortField
          }
          sortOrder={
            sortOrder
          }
          onSort={
            handleSort
          }
        />

      </div>

      <Pagination
        currentPage={page}
        setCurrentPage={
          setPage
        }
        totalPages={
          totalPages
        }
        pageSize={
          pageSize
        }
        setPageSize={
          setPageSize
        }
      />

      {showFilters && (
        <FilterPopup
          filters={filters}
          setFilters={
            setFilters
          }
          onClose={() =>
            setShowFilters(
              false
            )
          }
        />
      )}

      {showForm && (
        <UserForm
          user={editUser}
          onSave={
            handleSave
          }
          onClose={() =>
            setShowForm(
              false
            )
          }
        />
      )}

      {deleteUser && (
        <ConfirmDelete
          onConfirm={
            handleDelete
          }
          onCancel={() =>
            setDeleteUser(
              null
            )
          }
        />
      )}

    </div>
  );
}