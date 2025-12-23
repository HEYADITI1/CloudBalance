import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import { getUsers, updateUser } from "../../api/userApi";

export default function UserPage() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("users");

  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API on mount
  useEffect(() => {
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
        console.log(normalized);
        
        setError(null);
      } catch (err) {
        console.error("Failed to load users", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.active).length;

  // Handlers
  const handleAddUser = () => {
    navigate("/users/add");
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedUserId(null);
  };

  const handleToggleActive = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const updated = { ...user, active: !user.active };
    const prev = users;
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === id ? updated : u))
    );

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

  const handleResend = (id) => {
    console.log("Resend invite / link to user id:", id);
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
      <Header
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((s) => !s)}
      />

      <main className="flex-1 w-full px-6 py-6 pb-28">
        <div className="flex items-start gap-6">
          <Sidebar
            selected={selectedMenu}
            onSelect={setSelectedMenu}
            collapsed={collapsed}
          />

          <div className="flex-1">
            <div className="w-full">
              {selectedMenu === "users" ? (
                <>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-800">
                        Users
                      </h1>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="hidden md:inline">
                          Two-factor Authentication
                        </span>
                        <button
                          onClick={() => setTwoFactorAuth((s) => !s)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            twoFactorAuth ? "bg-blue-600" : "bg-gray-200"
                          }`}
                          aria-label="toggle-2fa"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              twoFactorAuth
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={handleAddUser}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium shadow-sm"
                    >
                      + Add New User
                    </button>

                    <button
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm"
                    >
                      Reset Filters
                    </button>
                  </div>

                  {/* Loading / Error / Table */}
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
                            {displayedUsers.map((user) => (
                              <tr
                                key={user.id}
                                className="bg-white hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {user.firstName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {user.lastName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                  {user.email}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-700">
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {user.lastLogin || "---"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="flex items-center gap-2">
                                    {/* active toggle */}
                                    <button
                                      onClick={() => handleToggleActive(user.id)}
                                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        user.active
                                          ? "bg-blue-600"
                                          : "bg-gray-200"
                                      }`}
                                      title={
                                        user.active ? "Active" : "Inactive"
                                      }
                                    >
                                      <span
                                        className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform ${
                                          user.active
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                        }`}
                                      />
                                    </button>

                                    {/* edit icon */}
                                    <button
                                      onClick={() => handleEdit(user.id)}
                                      title="Edit"
                                      className="p-1 rounded hover:bg-gray-50"
                                    >
                                      <svg
                                        className="w-5 h-5 text-blue-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
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

                                    {/* resend button */}
                                    <button
                                      onClick={() => handleResend(user.id)}
                                      className="px-2 py-1 text-xs border rounded"
                                    >
                                      Resend
                                    </button>
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
                </>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Coming soon...
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