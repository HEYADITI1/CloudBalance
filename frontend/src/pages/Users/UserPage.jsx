import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import { getUsers, updateUser } from "../../api/userApi";

export default function UserPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  useEffect(() => {
    if (!role) return;

    if (role === "CUSTOMER") {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUsers();

        const normalized = res.data.map((u) => ({
          ...u,
          role: typeof u.role === "object" ? u.role.name : u.role,
          active: u.active ?? u.isActive ?? false,
        }));

        setUsers(normalized);
        setError(null);
      } catch (err) {
        console.error("Failed to load users", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.active).length;

  const handleAddUser = () => {
    navigate("/users/add");
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedUserId(null);
  };

  const handleToggleActive = async (id) => {
    const u = users.find((u) => u.id === id);
    if (!u) return;

    const updated = { ...u, active: !u.active };
    const prev = users;

    setUsers((prevUsers) => prevUsers.map((x) => (x.id === id ? updated : x)));

    try {
      await updateUser(id, updated);
    } catch (err) {
      console.error("Failed to update user status", err);
      setUsers(prev);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const baseDisplayedUsers = useMemo(
    () => (activeTab === "active" ? users.filter((u) => u.active) : users),
    [users, activeTab]
  );

  const displayedUsers = useMemo(() => {
    if (selectedUserId) {
      return baseDisplayedUsers.filter((u) => u.id === selectedUserId);
    }
    return baseDisplayedUsers;
  }, [baseDisplayedUsers, selectedUserId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full p-6 pb-28">
        <div className="flex gap-6 h-full">
          <Sidebar selected="users" />

          <div className="flex-1">
            <div className="w-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mb-6">
                {role === "ADMIN" && (
                  <button
                    onClick={handleAddUser}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium shadow-sm"
                  >
                    + Add New User
                  </button>
                )}

                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm"
                >
                  Reset Filters
                </button>
              </div>

              {/* Content */}
              {loading ? (
                <div className="p-6 text-center text-gray-500">
                  Loading users...
                </div>
              ) : error ? (
                <div className="p-6 text-center text-red-500 text-sm">
                  {error}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full overflow-hidden">
                  {/* Tabs */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                    <button
                      onClick={() => {
                        setActiveTab("active");
                        setSelectedUserId(null);
                      }}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        activeTab === "active"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      Active ({activeUsersCount})
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("all");
                        setSelectedUserId(null);
                      }}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        activeTab === "all"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      All ({totalUsersCount})
                    </button>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            First Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Last Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Email ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Last Login
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-100">
                        {displayedUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm">{u.firstName}</td>
                            <td className="px-6 py-4 text-sm">{u.lastName}</td>
                            <td className="px-6 py-4 text-sm text-blue-600">
                              {u.email}
                            </td>
                            <td className="px-6 py-4 text-sm">{u.role}</td>
                            <td className="px-6 py-4 text-sm">
                              {u.lastLogin
                                ? u.lastLogin.replace("T", " ").split(".")[0]
                                : "---"}
                            </td>

                            <td className="px-6 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                {role === "ADMIN" && (
                                  <button
                                    onClick={() => handleEdit(u.id)}
                                    title="Edit"
                                    className="p-1 rounded hover:bg-gray-50"
                                  >
                                    <svg
                                      className="w-5 h-5 text-blue-600"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {displayedUsers.length === 0 && (
                      <div className="p-6 text-center text-gray-500">
                        No users found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
